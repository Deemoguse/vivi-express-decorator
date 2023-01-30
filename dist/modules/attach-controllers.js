"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.attachController = void 0;
const path_1 = require("path");
const express_1 = require("express");
const repository_1 = require("./repository");
function attachController(app, controllers) {
    // The router to which the methods defined as API will be registered:
    const apiRouter = (0, express_1.Router)();
    // Registration of controllers and its methods:
    controllers.forEach(controller => {
        const recordData = (0, repository_1.getController)(controller);
        // If the controller was found, we register it in the
        // transferred instance of the express application:
        if (recordData) {
            const controllerRouter = (0, express_1.Router)();
            const controllerInstance = new recordData.controller();
            const controllerMethods = (0, repository_1.getMethodList)(controller);
            // It is important to bind the controller instance to
            // all its methods to avoid undesirable behavior:
            controllerMethods.forEach(methodRecord => {
                const router = methodRecord.isApi ? apiRouter : controllerRouter;
                const routeURL = methodRecord.isApi ? `${recordData.url}/${methodRecord.url}` : methodRecord.url;
                const normalizeRouteURL = `/${(0, path_1.normalize)(routeURL).split(/[\\/]/).filter(w => w.match(/\w+/)).join('/')}`;
                router[methodRecord.method](normalizeRouteURL, methodRecord.middlewares || [], methodRecord.handler.bind(controllerInstance));
            });
            // Register router:
            app.use(recordData.url, recordData.middlewares || [], controllerRouter);
        }
        else {
            throw new ReferenceError(`Unregistered controller "${controller.name}" class.`);
        }
    });
    // Register API router:
    app.use('/api', apiRouter);
}
exports.attachController = attachController;
//# sourceMappingURL=attach-controllers.js.map