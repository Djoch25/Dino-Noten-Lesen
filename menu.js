const scaleBtns = [];
const scaleBtnNames = ["HIGH QUALITY", "MEDIUM QUALITY", "LOW QUALITY"];
const scaleQualities = [1, 0.75, 0.5];

for (let i = 0; i < 3; i++) {
	scaleBtns[i] = createButton(scaleBtnNames[i], window.innerWidth / 2 + (i - 1) * 300, window.innerHeight / 2, 200, 200, document.body);
	scaleBtns[i].addEventListener("click", () => {
		destroyButtons(...scaleBtns);
	
		setCanvasDimensions(scaleQualities[i]);
		setAllCanvas();

		createMenu(levels);

		document.body.requestFullscreen();
	});
}

const createMenu = (levels) => {
	const btns = [];
	document.documentElement.style.backgroundColor = "#55ff55";
	document.body.style.backgroundColor = "#55ff55";

	for (let i = 0; i < levels.length; i++) {
		const level = levels[i].level;
		const x = ((i) % 5 + 1) * WIDTH * 0.1 / SCALE;
		const y = (Math.floor(i / 5) + 1) * HEIGHT * 0.2 / SCALE;
		const w = WIDTH * 0.08 / SCALE;
		const h = w;

		btns[i] = createButton(level, x, y, w, h, document.body);
		btns[i].style.backgroundColor = "#00ff00";

		btns[i].addEventListener("click", () => {
			LEVEL = i;
			setupGame();

			destroyButtons(...btns);

			document.documentElement.style.backgroundColor = "";
			document.body.style.backgroundColor = "";
		});
	}
}
