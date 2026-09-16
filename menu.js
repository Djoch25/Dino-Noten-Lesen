const scaleBtn1 = createButton("HIGH QUALITY", window.innerWidth / 2 - 300, window.innerHeight / 2, 200, 200, document.body);
const scaleBtn2 = createButton("LOW QUALITY", window.innerWidth / 2 + 300, window.innerHeight / 2, 200, 200, document.body);

scaleBtn1.addEventListener("click", () => {
	destroyButtons(scaleBtn1, scaleBtn2);
	
	setCanvasDimensions(1);
	setAllCanvas();

	createMenu(levels);

	document.body.requestFullscreen();
});

scaleBtn2.addEventListener("click", () => {
	destroyButtons(scaleBtn1, scaleBtn2);
	
	setCanvasDimensions(0.5);
	setAllCanvas();

	createMenu(levels);


	document.body.requestFullscreen();
});

const createMenu = (levels) => {
	const btns = [];
	document.documentElement.style.backgroundColor = "#55ff55";
	document.body.style.backgroundColor = "#55ff55";

	for (let i = 0; i < levels.length; i++) {
		const level = levels[i].level;
		const x = (i + 1) * WIDTH * 0.1 / SCALE;
		const y = HEIGHT * 0.2 / SCALE;
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
