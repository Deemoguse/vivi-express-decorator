import Express from 'express';
import type { StorageBase } from '../storage/storage-base';
import type { MetaController } from '../meta/meta-controller';
import type { MetaHttpMethod } from '../meta/meta-http-method';
import type { StorageSetApiParams, StorageSetControllerParams, StorageSetHttpMethodParams, StorageSetMiddlewareParams } from '../storage/storage-method-params';

/**
 * Basic set of properties for an event.
 */
interface EventMapBase {
	storage: StorageBase,
}

/**
 * Generic for before attachment events.
 */
type BeforeAttachEvent<Meta = any> =
	| EventMapBase
	& { app: Express.Application, meta: Meta }
	;

/**
 * After attachment events.
 */
type AfterAttachEvent =
	| EventMapBase
	& { app: Express.Application }
	;

/**
 * Generic for set events.
 */
type BeforeSetEvent<Params = any> =
	| EventMapBase
	& { params: Params }
	;

/**
 * Attachment events.
 * Events of the beginning and end of the event by attachments.
 * Between these two events, controller attachments and Http methods occur.
 */
export interface PluginAttachEvents {
	'attach:start': Omit<BeforeAttachEvent, 'meta'>,
	'attach:end': AfterAttachEvent,
}

/**
 * Attachment controller events.
 */
export interface PluginAttachControllerEvents {
	'attach-controller:before': BeforeAttachEvent<MetaController>,
	'attach-controller:after': AfterAttachEvent,
}

/**
 * Attachment Http-method events.
 */
export interface PluginAttachHttpMethodEvents {
	'attach-http-method:before': BeforeAttachEvent<MetaHttpMethod>
	'attach-http-method:after': AfterAttachEvent
}

/**
 * Set controller events.
 */
export interface PluginSetControllerEvents {
	'set-controller:before': BeforeSetEvent<StorageSetControllerParams>,
	'set-controller:after': EventMapBase,
}

/**
 * Set HTTP-method events.
 */
export interface PluginSetHttpMethodEvents {
	'set-http-method:before': BeforeSetEvent<StorageSetHttpMethodParams>,
	'set-http-method:after': EventMapBase,
}

/**
 * Set middleware events.
 */
export interface PluginSetMiddlewareEvents {
	'set-middleware:before': BeforeSetEvent<StorageSetMiddlewareParams>,
	'set-middleware:after': EventMapBase,
}

/**
 * Set API events.
 */
export interface PluginSetApiEvents {
	'set-api:before': BeforeSetEvent<StorageSetApiParams>,
	'set-api:after': EventMapBase,
}

/**
 * Plugin events.
 */
export type PluginEventMap =
	& PluginAttachEvents
	& PluginAttachControllerEvents
	& PluginAttachHttpMethodEvents
	& PluginSetControllerEvents
	& PluginSetHttpMethodEvents
	& PluginSetMiddlewareEvents
	& PluginSetApiEvents
	;

/**
 * Plugin event names.
 */
export type PluginEventNames =
	| keyof PluginEventMap
	;