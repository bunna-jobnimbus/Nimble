import { execSync } from 'child_process';

console.log('build: started');

execSync('rm -rf dist');
console.log('build: removed dist directory');

await Bun.build({
	entrypoints: [
		'./github/github.ts',
		'./jenkins/jenkins.ts',
		'./jira/jira.ts',
		'./swagger/swagger.ts',
		'./xray/xray.ts',
	],
	naming: '[name].[ext]',
	outdir: './dist',
	minify: true,
});
console.log('build: transpiled content scripts');

execSync('cp ./manifest.json ./dist/manifest.json');
console.log('build: copied manifest.json');

execSync('cp -R ./styles ./dist/styles');
console.log('build: copied styles');

console.log('build: finished');
