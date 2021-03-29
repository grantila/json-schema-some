import { some } from './index'

describe( "json-schema-some", ( ) =>
{
	it( "simple top-level truthy", ( ) =>
	{
		expect(
			some( { type: 'string' }, ( { schema } ) =>
				schema.type === 'string'
			)
		).toBe( true );
	} );

	it( "simple top-level falsy", ( ) =>
	{
		expect(
			some( { type: 'string' }, ( { schema } ) =>
				schema.type === 'number'
			)
		).toBe( false );
	} );

	const complexObject = {
		type: 'object',
		properties: {
			foo: { type: 'string' },
			bar: { type: 'number' },
			baz: { type: 'boolean' },
			bak: {
				type: 'object',
				title: 'foo',
				properties: { inner: { type: 'null' } },
			},
		},
	};

	it( "complex truthy", ( ) =>
	{
		expect(
			some( complexObject, ( { schema } ) =>
				schema.type === 'number'
			)
		).toBe( true );
	} );

	it( "complex falsy", ( ) =>
	{
		expect(
			some( complexObject, ( { schema } ) =>
				schema.type === 'integer'
			)
		).toBe( false );
	} );

	it( "complex, stop propagating when found", ( ) =>
	{
		expect(
			some( complexObject, ( { schema } ) =>
			{
				if ( schema.type === 'null' )
					throw new Error( "shouldn't have found this" );
				return schema.title === 'foo';
			} )
		).toBe( true );
	} );

	it( "complex falsy", ( ) =>
	{
		expect(
			( ) =>
			some( complexObject, ( { schema } ) =>
			{
				if ( schema.type === 'number' )
					throw new RangeError( "forwarded error" );
				return false;
			} )
		).toThrowError( RangeError );
	} );
} );
