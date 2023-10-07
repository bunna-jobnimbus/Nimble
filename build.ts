import { execSync } from 'child_process';

print('started');

print('removing dist directory');
execSync('rm -rf dist');

print('transpiling content scripts');
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

print('copying manifest.json');
execSync('cp ./manifest.json ./dist/manifest.json');

print('copying icon');
execSync('cp ./snail.png ./dist/snail.png');

print('copying styles');
execSync('cp ./**/*.css ./dist/');

print('finished');

function print(...messages: any[]) {
	console.log(new Date(), 'build:', ...messages);
}
