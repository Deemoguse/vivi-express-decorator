import { Method } from '../types/method';
import { ClassController } from '../types/controller';
import { Repository, MethodRecord, ControllerRecord } from '../types/repository';
/**
 * Repository.
 **/
export declare const repository: Repository;
/**
 * Write controller class data.
 * @param controller - controller class.
 * @param url - URL of the controller.
 **/
export declare function setController(controller: ClassController, url: string): void;
/**
 * Get сontroller class data.
 * @param controller - controller class.
 **/
export declare function getController(controller: ClassController): ControllerRecord | undefined;
/**
 * Check the record for existence.
 * @param controller - controller class.
 **/
export declare function hasController(controller: ClassController): boolean;
/**
 * Get to wash down the HTTP method data.
 * @param controller - controller class.
 * @param url - URL.
 * @param method - HTTP method.
 * @param handler - сlass сontroller method.
 **/
export declare function setMethod(controller: InstanceType<ClassController>, data: MethodRecord): void;
/**
 * Create a wash down of the controller method.
 * @param controller - Controller class whose method to get.
 * @param method - сlass сontroller method.
 **/
export declare function getMethod(controller: InstanceType<ClassController>, method: Method): MethodRecord | undefined;
/**
 *	Get a list of controller methods.
 * @param controller - Controller class whose methods to get.
 **/
export declare function getMethodList(controller: ClassController): Map<Method, MethodRecord> | undefined;
/**
 * Check the record for existence.
 * @param controller - Controller class whose method to get.
 * @param method - сlass сontroller method.
 **/
export declare function hasMethod(controller: InstanceType<ClassController>, method: Method): boolean;
//# sourceMappingURL=repository.d.ts.map