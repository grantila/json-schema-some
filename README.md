[![npm version][npm-image]][npm-url]
[![downloads][downloads-image]][npm-url]
[![build status][build-image]][build-url]
[![coverage status][coverage-image]][coverage-url]
[![Language grade: JavaScript][lgtm-image]][lgtm-url]
[![Node.JS version][node-version]][node-url]


# json-schema-some

`Array.prototype.some` for JSON Schema.

This package uses [json-schema-traverse][json-schema-traverse-npm-url] and exports a function `some`. This function gets an object as argument, and is expected to return a boolean. If it returns `true`, `some` returns `true`, otherwise `false`.

The argument the callback gets is an object containing the *arguments array* provided in the callback to `traverse` in [json-schema-traverse][json-schema-traverse-npm-url]. Check that documentation for further information. The object form is:

```ts
interface CallbackArgument
{
	schema: SchemaObject;
	jsonPtr: string;
	rootSchema: SchemaObject;
	parentJsonPtr?: string;
	parentKeyword?: string;
	parentSchema?: SchemaObject;
	keyIndex?: string | number;
}
```

where `SchemaObject` is a valid JSON Schema object.

## Example

```ts
import { some } from 'json-schema-some'

// Returns true if any schema object in the schemaObject tree is of type
// 'object', with 'properties' and a property called 'firstName'
const hasFirstName = some( schemaObject, ( { parentKeyword, keyIndex } ) =>
  parentKeyword === 'properties' && keyIndex === 'firstName'
);
```


[npm-image]: https://img.shields.io/npm/v/json-schema-some.svg
[npm-url]: https://npmjs.org/package/json-schema-some
[downloads-image]: https://img.shields.io/npm/dm/json-schema-some.svg
[build-image]: https://img.shields.io/github/workflow/status/grantila/json-schema-some/Master.svg
[build-url]: https://github.com/grantila/json-schema-some/actions?query=workflow%3AMaster
[coverage-image]: https://coveralls.io/repos/github/grantila/json-schema-some/badge.svg?branch=master
[coverage-url]: https://coveralls.io/github/grantila/json-schema-some?branch=master
[lgtm-image]: https://img.shields.io/lgtm/grade/javascript/g/grantila/json-schema-some.svg?logo=lgtm&logoWidth=18
[lgtm-url]: https://lgtm.com/projects/g/grantila/json-schema-some/context:javascript
[node-version]: https://img.shields.io/node/v/json-schema-some
[node-url]: https://nodejs.org/en/

[json-schema-traverse-npm-url]: https://npmjs.org/package/core-types
