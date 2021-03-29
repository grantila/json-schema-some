import * as traverse from 'json-schema-traverse'


export interface CallbackArgument
{
	schema: traverse.SchemaObject;
	jsonPtr: string;
	rootSchema: traverse.SchemaObject;
	parentJsonPtr?: string;
	parentKeyword?: string;
	parentSchema?: traverse.SchemaObject;
	keyIndex?: string | number;
}

type Callback = ( arg: CallbackArgument ) => boolean;

class StopError extends Error { }

export function some( schema: traverse.SchemaObject, cb: Callback )
{
	const wrappedCb: traverse.Callback =
		(
			schema,
			jsonPtr,
			rootSchema,
			parentJsonPtr,
			parentKeyword,
			parentSchema,
			keyIndex
		) =>
	{
		const arg: CallbackArgument = {
			schema,
			jsonPtr,
			rootSchema,
			parentJsonPtr,
			parentKeyword,
			parentSchema,
			keyIndex,
		};
		if ( cb( arg ) )
			throw new StopError( );
	}
	try
	{
		traverse( schema, wrappedCb );
	}
	catch ( err )
	{
		if ( err instanceof StopError )
			return true;
		throw err;
	}
	return false;
}
