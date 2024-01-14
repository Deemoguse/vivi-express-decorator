export type IsAny<T> = 1 extends (1 & T)
	? true
	: false
	;