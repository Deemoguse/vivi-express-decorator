"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Middleware = void 0;
const repository = __importStar(require("./repository"));
/**
 * Use the handler as middleware.
 * A handler, an array of handlers, or a list
 * of handlers (rest spread) can be passed as an argument.
 * @param handlers - Middleware handlers.
 **/
function Middleware(...handlers) {
    function decorator(target, key) {
        // If target is class. If a decorator is used for a class,
        // then usually the key argument will not be passed. This is
        // exactly what the check will consist of, what exactly the
        // handler will be assigned to.
        // -----------------------------------------------------------
        // #TODO: Find and use a more reliable method to determine the
        //        difference between a class and a regular function.
        if (key) {
            const controllerPrototype = target;
            if (repository.hasMethod(controllerPrototype, controllerPrototype[key]) === false) {
                // Create empty method record:
                repository.setMethod(controllerPrototype, {
                    url: '',
                    method: '',
                    handler: controllerPrototype[key],
                });
            }
            const methodRecord = repository.getMethod(controllerPrototype, controllerPrototype[key]);
            methodRecord.middlewares = Array.isArray(handlers)
                ? [...((methodRecord === null || methodRecord === void 0 ? void 0 : methodRecord.middlewares) || []), ...handlers]
                : [...((methodRecord === null || methodRecord === void 0 ? void 0 : methodRecord.middlewares) || []), handlers];
            repository.setMethod(controllerPrototype, methodRecord);
        }
        else {
            const controller = target;
            if (repository.hasController(controller)) {
                // Create empty controller record:
                repository.setController(controller, '');
            }
            const controllerRecord = repository.getController(controller);
            controllerRecord.middlewares = Array.isArray(handlers)
                ? [...((controllerRecord === null || controllerRecord === void 0 ? void 0 : controllerRecord.middlewares) || []), ...handlers]
                : [...((controllerRecord === null || controllerRecord === void 0 ? void 0 : controllerRecord.middlewares) || []), handlers];
            repository.setController(controller, controllerRecord.url);
        }
    }
    return decorator;
}
exports.Middleware = Middleware;
//# sourceMappingURL=middleware.js.map