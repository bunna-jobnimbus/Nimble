import { Optional } from '@shared/optional';
import { SwaggerEndpoint, SwaggerSchema } from './swagger-types';
import { codeBlock } from '@shared/code-block';
import { pascalCase } from '@shared/pascal-case';

const swaggerToSwiftTypeMap: Record<string, Optional<string>> = {
	'integer($int32)': 'Int',
	'number($double)': 'Double',
	'string($date-time)': 'Date',
	boolean: 'Bool',
	string: 'String',
};

function convertSwaggerToSwiftType(type: string) {
	return swaggerToSwiftTypeMap[type] ?? `<#${type}>`;
}

class SwiftProperty {
	declaration: string;
	parameter: string;
	keyValuePair: string;
	assignment: string;

	constructor(public name: string, public swaggerType: string, public optional: boolean) {
		const type = convertSwaggerToSwiftType(swaggerType) + (optional ? '?' : '');
		this.declaration = `\tpublic let ${name}: ${type}`;
		this.parameter = `${name}: ${type}`;
		this.keyValuePair = `"${name}": ${name}`;
		this.assignment = `self.${name} = ${name}`;
	}
}

export class SwiftCodable {
	name: string;
	properties: SwiftProperty[];

	constructor(schema: SwaggerSchema) {
		this.name = schema.name ?? '<#Name#>';
		this.properties = schema.properties.map(
			(property) => new SwiftProperty(property.name, property.type, property.nullable)
		);
	}

	toString() {
		return codeBlock(
			`public struct ${this.name}: Codable {`,
			...this.properties.map((property) => property.declaration),
			`}`
		);
	}
}

export class SwiftRequestable {
	name: string;
	method: string;
	path: string;
	responseType: string;

	declarations: string[] = [];
	parameters: string[] = [];
	assignments: string[] = [];
	queryParameters: string[] = [];

	constructor(endpoint: SwaggerEndpoint) {
		this.name = pascalCase(endpoint.description) || '<#Name>';
		this.method = `.${endpoint.method?.toLowerCase() || '<#Method#>'}`;
		this.path = endpoint.path?.replaceAll('{', '\\(').replaceAll('}', ')') || '<#Path#>';
		this.responseType = `<#${endpoint.responseType || 'UnknownType'}#>`;
		endpoint.parameters.forEach((parameter) => {
			const property = new SwiftProperty(parameter.name, parameter.type, !parameter.required);
			this.declarations.push(property.declaration);
			this.parameters.push(property.parameter);
			this.assignments.push(property.assignment);
			if (parameter.location === '(query)') {
				this.queryParameters.push(property.keyValuePair);
			}
		});
	}

	toString() {
		return codeBlock(
			`public struct ${this.name}Request: Requestable {`,
			codeBlock(...this.declarations) || null,
			this.declarations.length ? '' : null,
			`\tpublic init(${this.parameters.join(', ')}) {`,
			`\t\t${this.assignments.join('\n\t\t') || '/* public initializer */'}`,
			`\t}`,
			'',
			'\tpublic var host: RequestHost { .api }',
			`\tpublic var method: RequestMethod { ${this.method} }`,
			`\tpublic var path: String { "${this.path}" }`,
			`\tpublic var query: RequestQuery { .init([${this.queryParameters.join(', ')}]) }`,
			'',
			`\tpublic typealias Response = ${this.responseType}`,
			'}'
		);
	}
}
