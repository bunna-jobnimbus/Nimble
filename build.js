import { execSync } from 'child_process';

console.log('build: started');

execSync('rm -rf dist');
console.log('build: removed dist directory');

await Bun.build({
	entrypoints: [
		'./src/content-scripts/github.ts',
		'./src/content-scripts/jenkins.ts',
		'./src/content-scripts/jira.ts',
		'./swagger/swagger.ts',
		'./src/content-scripts/xray.ts',
	],
	naming: '[name].[ext]',
	outdir: './dist',
	minify: true,
});
console.log('build: transpiled content scripts');

execSync('cp ./src/manifest.json ./dist/manifest.json');
console.log('build: copied manifest.json');

execSync('cp -R ./src/styles ./dist/styles');
console.log('build: copied styles');

console.log('build: finished');
