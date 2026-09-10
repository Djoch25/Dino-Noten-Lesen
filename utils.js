const createCanvas = () => {
	return document.createElement("canvas");
}

const setupCanvas = (_cnv, _x, _y, _w, _h, _wrapper) => {
	_cnv.width = _w;
	_cnv.height = _h;
	_cnv.style.position = "absolute";
	_cnv.style.left = _x + "px";
	_cnv.style.top = _y + "px";

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