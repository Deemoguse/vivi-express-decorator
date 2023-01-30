"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Controller = void 0;
const repository_1 = require("./repository");
/**
 * Create a wash down of controller data
 * @param url - Route URL.
 **/
function Controller(url) {
    return function (controller) {
        controller.prototype._routerURL = url;
        (0, repository_1.setController)(controller, url);
    };
}
exports.Controller = Controller;
//# sourceMappingURL=controller.js.map