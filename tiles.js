const getImage = (path) => {
	const img = new Image();
	img.src = path;

	return img;	
}

const getTileSet = (folderName, nameSet) => {
	const folder = folderName + "\\png\\";

	const tileSet = [];
	let i = 0;

	for (let name of nameSet) {
		const path = folder + name + ".png";
		tileSet[i++] = getImage(path);
	}

	return tileSet;
}

const addBackgroundToCanvas = (ts, cnv, size) => {
	const ctx = cnv.getContext("2d");
	
	ctx.drawImage(ts[0], 0, 0, cnv.width, cnv.height);

	if (ts[13].width) for (let i = 0; i < 12; i++) ctx.drawImage(ts[13], size * i, size * 6.75);
	if (ts[14].width) for (let i = 0; i < 12; i++) ctx.drawImage(ts[14], size * i, size * 6);

	ctx.drawImage(ts[10], size * 1, size * 5);
	for (let i = 2; i < 10; i++) ctx.drawImage(ts[11], size * i, size * 5);
	ctx.drawImage(ts[12], size * 10, size * 5);

	ctx.drawImage(ts[1], size * 0.5, size * 1.5);
	ctx.drawImage(ts[3], size * 10.5, size * 1.5);
	for (let i = 1; i < 10; i++) ctx.drawImage(ts[2], size * (i + 0.5), size * 1.5);

	ctx.drawImage(ts[4], size * 0.5, size * 2.5);
	ctx.drawImage(ts[6], size * 10.5, size * 2.5);
	for (let i = 1; i < 10; i++) ctx.drawImage(ts[5], size * (i + 0.5), size * 2.5);

	ctx.drawImage(ts[7], size * 0.5, size * 3.5);
	ctx.drawImage(ts[9], size * 10.5, size * 3.5);
	for (let i = 1; i < 10; i++) ctx.drawImage(ts[8], size * (i + 0.5), size * 3.5);

	ctx.fillStyle = "#ffffff99";
	ctx.fillRect(size * 1, size * 2, size * 10, size * 2);
}

const freeTileSet = getTileSet("freetileset", ["BG", "1", "2", "3", "4", "5", "6", "12", "9", "16", "13", "14", "15", "18", "17"]);
const desertTileSet = getTileSet("deserttileset", ["BG", "1", "2", "3", "4", "5", "6", "12", "9", "16", "13", "14", "15", "18", "17"]);
const winterTileSet = getTileSet("wintertileset", ["BG", "1", "2", "3", "4", "5", "6", "12", "9", "16", "13", "14", "15", "18", "17"]);