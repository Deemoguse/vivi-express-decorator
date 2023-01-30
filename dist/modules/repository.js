"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.hasMethod = exports.getMethodList = exports.getMethod = exports.setMethod = exports.hasController = exports.getController = exports.setController = exports.repository = void 0;
/**
 * Repository.
 **/
exports.repository = {
    controllers: new Map(),
    methods: new Map(),
};
/**
 * Write controller class data.
 * @param controller - controller class.
 * @param url - URL of the controller.
 **/
function setController(controller, url) {
    if (hasController(controller)) {
        const updateData = Object.assign(Object.assign({}, getController(controller)), { controller, url, middlewares: [] });
        exports.repository.controllers.set(controller, updateData);
    }
    else {
        exports.repository.controllers.set(controller, { controller, url, middlewares: [] });
    }
}
exports.setController = setController;
/**
 * Get сontroller class data.
 * @param controller - controller class.
 **/
function getController(controller) {
    return exports.repository.controllers.get(controller);
}
exports.getController = getController;
/**
 * Check the record for existence.
 * @param controller - controller class.
 **/
function hasController(controller) {
    return exports.repository.controllers.has(controller);
}
exports.hasController = hasController;
/**
 * Get to wash down the HTTP method data.
 * @param controller - controller class.
 * @param url - URL.
 * @param method - HTTP method.
 * @param handler - сlass сontroller method.
 **/
function setMethod(controller, data) {
    var _a, _b;
    if (hasMethod(controller, data.handler)) {
        const updateData = Object.assign(Object.assign({}, getMethod(controller, data.handler)), data);
        (_a = exports.repository.methods.get(controller)) === null || _a === void 0 ? void 0 : _a.set(data.handler, updateData);
    }
    else if (exports.repository.methods.has(controller)) {
        (_b = exports.repository.methods.get(controller)) === null || _b === void 0 ? void 0 : _b.set(data.handler, data);
    }
    else {
        const map = new Map();
        map.set(data.handler, data);
        exports.repository.methods.set(controller, map);
    }
}
exports.setMethod = setMethod;
/**
 * Create a wash down of the controller method.
 * @param controller - Controller class whose method to get.
 * @param method - сlass сontroller method.
 **/
function getMethod(controller, method) {
    var _a;
    if (exports.repository.methods.has(controller)) {
        return (_a = exports.repository.methods.get(controller)) === null || _a === void 0 ? void 0 : _a.get(method);
    }
    return undefined;
}
exports.getMethod = getMethod;
/**
 *	Get a list of controller methods.
 * @param controller - Controller class whose methods to get.
 **/
function getMethodList(controller) {
    if (exports.repository.methods.has(controller.prototype)) {
        return exports.repository.methods.get(controller.prototype);
    }
    return undefined;
}
exports.getMethodList = getMethodList;
/**
 * Check the record for existence.
 * @param controller - Controller class whose method to get.
 * @param method - сlass сontroller method.
 **/
function hasMethod(controller, method) {
    var _a;
    return Boolean((_a = exports.repository.methods.get(controller)) === null || _a === void 0 ? void 0 : _a.has(method));
}
exports.hasMethod = hasMethod;
//# sourceMappingURL=repository.js.map