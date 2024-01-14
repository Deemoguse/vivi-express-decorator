/*!* * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * *
 * Below is the code, part of which was copied and modified from the file
 * lib.decorators.d.ts, owned by Microsoft Corporation.
 *
 * The original code is licensed by Microsoft Corporation under the Apache License,
 * Version 2.0. See http://www.apache.org/licenses/LICENSE-2.0 for license details.
 *
 * This modified code includes changes made for the @wambata/express-decorators library,
 * and is distributed under the MIT License.
 *
 * Changes include the removal of annotations and JSdoc comments from the properties and methods of interfaces
 * for brevity and to reduce the overall size of the library.
 *
 * The original code states: "THIS CODE IS PROVIDED ON AN *AS IS* BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
 * KIND, EITHER EXPRESS OR IMPLIED, INCLUDING WITHOUT LIMITATION ANY IMPLIED
 * WARRANTIES OR CONDITIONS OF TITLE, FITNESS FOR A PARTICULAR PURPOSE,
 * MERCHANTABILITY OR NON-INFRINGEMENT."
 * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * */

type DecoratorMetadataObject = Record<PropertyKey, unknown> & object;
type DecoratorMetadata = typeof globalThis extends { Symbol: { readonly metadata: symbol; }; } ? DecoratorMetadataObject : DecoratorMetadataObject | undefined;

/**
 * Context provided to a class decorator.
 * @template Class The type of the decorated class associated with this context.
 */
export interface ClassDecoratorContext<Class extends abstract new (...args: any) => any = abstract new (...args: any) => any> {
	readonly kind: 'class';
	readonly name: string | undefined;
	readonly metadata: DecoratorMetadata;
	addInitializer(initializer: (this: Class) => void): void;
}

/**
 * Context provided to a class method decorator.
 * @template This The type on which the class element will be defined. For a static class element, this will be
 * the type of the constructor. For a non-static class element, this will be the type of the instance.
 * @template Value The type of the decorated class method.
 */
export interface ClassMethodDecoratorContext<This = unknown, Value extends (this: This, ...args: any) => any = (this: This, ...args: any) => any> {
	readonly kind: 'method';
	readonly name: string | symbol;
	readonly static: boolean;
	readonly private: boolean;
	readonly access: { has(object: This): boolean; get(object: This): Value; };
	readonly metadata: DecoratorMetadata;
	addInitializer(initializer: (this: This) => void): void;
}
