import { swiftType } from './swift-type';

export class SwaggerProperty {
	constructor(public name: string, public type: string, public nullable: boolean) {
		this.name = name || 'unknown';
		this.type = type || 'unknown';
		this.nullable = nullable;
	}

	get swift() {
		return new SwiftProperty(this);
	}
}

export class SwiftProperty {
	constructor(public swagger: SwaggerProperty) {}

	private get optionalMarker() {
		return this.swagger.nullable ? '?' : '';
	}

	private get type() {
		return (swiftType[this.swagger.type] ?? `<#${this.swagger.type}#>`) + this.optionalMarker;
	}

	get declaration() {
		return `\tpublic let ${this.parameter}`;
	}

	get parameter() {
		return `${this.swagger.name}: ${this.type}`;
	}
}
