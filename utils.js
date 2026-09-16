const createCanvas = () => {
	return document.createElement("canvas");
}

const setupCanvas = (_cnv, _x, _y, _w, _h, _wrapper) => {
	_cnv.width = _w;
	_cnv.height = _h;
	_cnv.style.position = "absolute";
	_cnv.style.left = _x + "px";
	_cnv.style.top = _y + "px";
	_cnv.style.width = SCREEN_WIDTH + "px";
	_cnv.style.height = SCREEN_HEIGHT + "px";

	if (_wrapper) _wrapper.appendChild(_cnv); 

	return _cnv.getContext("2d");
}

const getWrapper = (_wrapper) => {
	const _div = document.createElement("div");

	_div.style.position = "absolute";
	_div.style.left = "0px";
	_div.style.top = "0px";
	_div.style.width = WIDTH + "px";
	_div.style.height = HEIGHT + "px";

	if (_wrapper) _wrapper.appendChild(_div);

	return _div;
}

/*
const errorCnv = createCanvas();
const errorCtx = setupCanvas(errorCnv, 0, 0, WIDTH, HEIGHT, document.body);
errorCnv.style.zIndex = "999";
errorCtx.font = "20px Arial";

const consoleError = (err) => {
	errorCtx.clearRect(0, 0, WIDTH, HEIGHT);
	errorCtx.fillStyle = "#ff0000";
	errorCtx.fillText(err, 25, 25);
}
*/

const createButton = (text, x, y, w, h, wrapper) => {
	const _btn = document.createElement("button");
	_btn.style.position = "absolute";
	_btn.style.left = (x - w/2) + "px";
	_btn.style.top = (y - h/2) + "px";
	_btn.style.width = w + "px";
	_btn.style.height = h + "px";

	_btn.textContent = text;

	if (wrapper) wrapper.appendChild(_btn);

	return _btn;
}

const destroyButtons = (...btns) => {
	for (let btn of btns) btn.parentElement.removeChild(btn);
}
