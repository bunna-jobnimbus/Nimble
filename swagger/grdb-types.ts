import { Optional } from '@shared/optional';
import { SwaggerSchema, SwaggerSchemaProperty } from './swagger-types';
import { codeBlock } from '@shared/code-block';

const swaggerToGRDBTypeMap: Record<string, Optional<string>> = {
	'integer($int32)': 'integer',
	'number($double)': 'double',
	'string($date-time)': 'datetime',
	boolean: 'boolean',
	string: 'text',
};

function convertSwaggerToGRDBType(type: string) {
	return swaggerToGRDBTypeMap[type] ?? `<#${type}>`;
}

class GRDBColumn {
	declaration: string;

	constructor(public schemaProperty: SwaggerSchemaProperty) {
		const name = schemaProperty.name;
		const type = convertSwaggerToGRDBType(schemaProperty.type);
		const nullable = schemaProperty.nullable;
		this.declaration = `\ttable.column("${name}", .${type})${nullable ? '' : '.notNull()'}`;
	}
}

export class GRDBTable {
	name: string;
	columns: GRDBColumn[];
	primaryKey: string;

	constructor(schema: SwaggerSchema) {
		this.name = `<#${schema.name || 'Name'}#>`;
		this.columns = schema.properties.map((column) => new GRDBColumn(column));
		this.primaryKey = `<#${schema.properties?.[0].name || 'PrimaryKey'}#>`;
	}

	toString() {
		return codeBlock(
			`try database.recreate(table: "${this.name}") { table in`,
			...this.columns.map((column) => column.declaration),
			`\ttable.primaryKey([ "${this.primaryKey}" ], onConflict: .replace)`,
			`}`
		);
	}
}
