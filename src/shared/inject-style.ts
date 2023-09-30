export function injectStyle(css: string) {
	var style = document.createElement('style');
	style.innerText = css;
	document.head.appendChild(style);
}
