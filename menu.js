const scaleBtns = [];
const scaleBtnNames = ["HIGH QUALITY", "MEDIUM QUALITY", "LOW QUALITY"];
const scaleQualities = [1, 0.75, 0.5];

for (let i = 0; i < 3; i++) {
	scaleBtns[i] = createButton(scaleBtnNames[i], SCREEN_WIDTH / 2 + (i - 1) * 300, SCREEN_HEIGHT / 2, 200, 200, false);
	scaleBtns[i].addEventListener("click", () => {
		destroyButtons(...scaleBtns);
	
		setCanvasDimensions(scaleQualities[i]);
		setAllCanvas();

		createChoiseMenu();
	});
}

const createChoiseMenu = () =>{
	document.documentElement.style.backgroundColor = "#55ff55";
	document.body.style.backgroundColor = "#55ff55";

	const btns = [];
	const choiseNames = ["HAND-\nLAGEN", "N \nNOTEN", "BEIDE \nH\u00C4NDE"];

	for (let i = 0; i < 3; i++) {
		const x = ((i + 1) * SCREEN_WIDTH / 4);
		const y = SCREEN_HEIGHT * 0.5;
		const w = SCREEN_WIDTH * 0.15;
		const h = w;

		btns[i] = new GuiButton(choiseNames[i], x, y, w, h, document.body);
		
		btns[i].addEventListener("click", () => {
			GuiButton.destroy(...btns);
			createLevelMenu(levels[i]);
		});
	}
}

const createLevelMenu = (levels) => {
	punteggioTotale = 0;
	punteggioParziale = 0;
	scores.splice(0, scores.length);
	time = TOTAL_TIME;
	frameCounter = 0;
	midiTargetIndex = 0;
	fadingAlpha = 0;

	document.documentElement.style.backgroundColor = "#55ff55";
	document.body.style.backgroundColor = "#55ff55";

	const btns = [];
	btns[0] = new GuiButton("", SCREEN_WIDTH * 0.1, SCREEN_HEIGHT * 0.1, 100, 100, document.body, BACK_BUTTON_IMAGE_COORDS);
	btns[0].addEventListener("click", () => {
		GuiButton.destroy(...btns);
		createChoiseMenu();
	});

	for (let i = 0; i < levels.length; i++) {
		const level = levels[i].level;
		const x = levels[i].position[0] * SCREEN_WIDTH;
		const y = levels[i].position[1] * SCREEN_HEIGHT;
		const w = SCREEN_WIDTH * 0.125;
		const h = w;

		btns[i + 1] = new GuiButton(level, x, y, w, h, document.body);

		btns[i + 1].addEventListener("click", () => {
			LEVEL = levels[i];
			setupGame(LEVEL);

			GuiButton.destroy(...btns);

			document.documentElement.style.backgroundColor = "";
			document.body.style.backgroundColor = "";
		});
	}
}

const micBtns = [];
const micBtnNames = ["MIC ON", "MIC OFF"];

for (let i = 0; i < 2; i++) {
	micBtns[i] = createButton(micBtnNames[i], window.innerWidth / 2 + (i * 2 - 1) * 250, window.innerHeight / 2, 200, 200, document.body);
	micBtns[i].addEventListener("click", () => {
		destroyButtons(...micBtns);

		if (i == 0) {
			startMic().then(() => {
				for (const btn of scaleBtns) document.body.appendChild(btn);

				document.body.requestFullscreen();
			});
		} else {
			for (const btn of scaleBtns) document.body.appendChild(btn);

			document.body.requestFullscreen();
		}
	});
}
