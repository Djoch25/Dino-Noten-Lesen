//=======================//
// CANVAS DI PENTAGRAMMA //
//=======================//

const createScore = (cnv, options) => {
	const noteSpacing = options.noteSpacing || 1;
	const clef = options.clef || "treble";
	const x = options.staveX || 0;
	const y = options.staveY || 0;
	const w = options.staveWidth || 100;
	const notes = options.notes || [];
	const fontSize = options.fontSize || 60;
	const xClef = options.xClef || 20;

	const score = new Score(cnv, fontSize, noteSpacing);

	score.addStave().setStaveDim(x, y, w);
	score.addClef(clef).setXClef(xClef);
	score.addNotes(notes);

	return score;
}


let LEVEL;

let noteXs;
let midiNoteSet;
let midiTargetIndex = 0;

//======================//
// CANVAS DI ANIMAZIONE //
//======================//

const setLifeBarColor = (t) => {
	const halfTime = TOTAL_TIME / 2;
	let red;
	let green;

	if (t > halfTime) {
		red = Math.floor(255 * (2 - t / halfTime));
		green = 255;
	} else {
		red = 255;
		green = Math.floor(t / halfTime * 255);
	}

	return "rgb(" + red + ", " + green + ", 0)";
}

// ==============//
// LOOP DI GIOCO //
//===============//
let gameIsRunning = false;

let dino;

let time = TOTAL_TIME;
let timeFromLastFrame = 0;
let prevFrameTime = 0;

let punteggioTotale = 0;
let punteggioParziale = 0;

let ID;
let frameCounter = 0;

const mainLoop = () => {
	ID = requestAnimationFrame(mainLoop);
	frameCounter++;

	//time setting
	const gameOver = time < 0;
	
	const now = performance.now();
	timeFromLastFrame = now - timeFromLastFrame;

	if (frameCounter > 3) time -= timeFromLastFrame;
	timeFromLastFrame = now;

	const level = levels[LEVEL];

	//update
	if (gameOver && !dino.dead && !dino.isJumping) {
		dino.toDeath();
	}

	if (LEVEL !== 10 && currentMidiPitch === midiNoteSet[midiTargetIndex]) {
		dino.jump(RELATIVE_NOTE_SPACING);
	}

	dino.update(ID);

	if (punteggioParziale >= 8) {
		punteggioParziale = 0;
		animeCtx.clearRect(0, 0, WIDTH, HEIGHT);

		addBackgroundToCanvas(level.tileSet, scoreCnv, TILE_SIZE);
		setupScore(level);
		
		dino.respawn();

		midiTargetIndex = 0;
		midiNoteSet = scores[0].getMidiSet();
	}

	//graphics
	const {x, y, w, h} = LIFE_BAR_DIM;

	animeCtx.clearRect(dino.x - 50, dino.y - 50, dino.w + 100, dino.h + 100);
	animeCtx.clearRect(x, y, w, h);
	animeCtx.clearRect(TILE_SIZE * 5, 0, TILE_SIZE, TILE_SIZE);

	if (!gameOver) {
		const barLifeHeight = -time / TOTAL_TIME * h;
		animeCtx.fillStyle = setLifeBarColor(time);
		animeCtx.fillRect(x, y + h, w, barLifeHeight);
	}

	const punteggioDim = animeCtx.measureText(punteggioTotale);
	const punteggioW2 = punteggioDim.width / 2;
	const punteggioH2 = SCORE_FONT_SIZE / 2;

	animeCtx.fillStyle = level.color;
	animeCtx.fillText(punteggioTotale, TILE_SIZE * 5.5 - punteggioW2, TILE_SIZE * 0.5 + punteggioH2);

	dino.draw();

	console.log(currentMidiPitch);
}

//========================================//
// LOOP DI FADING PER LA FINE DEL LIVELLO //
//========================================//

let fadingColor;
let fadingAlpha = 0;
let endgame = false;;
let endBtn;

const endgameLoop = () => {
	ID = requestAnimationFrame(endgameLoop);

	const alpha = fadingAlpha.toString(16).padStart(2, "0");
	const color = fadingColor + alpha;

	fadingCtx.fillStyle = color;
	fadingCtx.fillRect(0, 0, WIDTH, HEIGHT);

	if (ID % 4 === 0) fadingAlpha++;

	if (fadingAlpha > 30) {
		cancelAnimationFrame(ID);

		scoreCtx.clearRect(0, 0, WIDTH, HEIGHT);
		animeCtx.clearRect(0, 0, WIDTH, HEIGHT);

		fadingCtx.fillStyle = fadingColor;
		fadingCtx.fillRect(0, 0, WIDTH, HEIGHT);

		punteggioTotale += punteggioTotale == 1 ? " PUNKT!" : " PUNKTE!";

		const punteggioDim = fadingCtx.measureText(punteggioTotale);
		const punteggioW2 = punteggioDim.width / 2;
		const punteggioH2 = SCORE_FONT_SIZE / 2;

		fadingCtx.fillStyle = "#ff0000";
		fadingCtx.fillText(punteggioTotale, WIDTH / 2 - punteggioW2, HEIGHT / 4 + punteggioH2);
	
		endBtn = createButton("BACK TO LEVEL MENU", screen.width / 2, screen.height * 0.75, 200, 100, document.body);
		endBtn.addEventListener("click", () => {
			animeCtx.clearRect(0, 0, WIDTH, HEIGHT);
			fadingCtx.clearRect(0, 0, WIDTH, HEIGHT);

			document.body.removeChild(fadingCnv);
			destroyButtons(endBtn);
			createMenu(levels);
		});
	}
}

//=========================//
// SETUP GAME E FULLSCREEN //
//=========================//

let micStarted = false;

const setupGame = async () => {
	await document.fonts.load(SCORE_FONT_SIZE + "px Bravura");

	addBackgroundToCanvas(levels[LEVEL].tileSet, scoreCnv, TILE_SIZE);

	setupScore(levels[LEVEL]);
	fadingColor = levels[LEVEL].color;

	dino = new Dino(noteXs[0] - 15, TILE_SIZE * (5 + TILE_Y_OFFSET), 3 * SCALE, animeCnv);

	dino.respawn();
	
	mainLoop();
	
	gameIsRunning = true;
};

//=================//
// CREAZIONE SCORE //
//=================//

const scores = [];

const setupScore = (level) => {
	const staveNum = level.staves;
	const bgScreenCenterX = TILE_SIZE * 5.5;
	const staveWidth = WIDTH * 0.7;
	const x = bgScreenCenterX - staveWidth * 0.5; //(WIDTH - staveWidth) * 0.5;
	const xClef = WIDTH * 0.025;
	const staveHeight = SCORE_FONT_SIZE;
	const staveDistance = staveNum === 1 ? 0 : staveHeight * 2;
	const systemHeight = staveDistance + staveHeight;
	const bgScreenCenterY = TILE_SIZE * (2.5 + TILE_Y_OFFSET);
	const y = bgScreenCenterY - systemHeight * 0.5;
	
	const scoreOptions = [];
	let connector;

	const {notes1, notes2} = getNoteSet(level);

	scoreOptions[0] = {
		staveX: x,
		staveY: y, 
		staveWidth: staveWidth,
		clef: level.clef[0],
		xClef: xClef,
		notes: notes1,
		fontSize: SCORE_FONT_SIZE,
		noteSpacing: RELATIVE_NOTE_SPACING
	};

	if (staveNum === 2) {
		scoreOptions[1] = {
			staveX: x,
			staveY: y + staveDistance, 
			staveWidth: staveWidth,
			clef: level.clef[1],
			xClef: xClef,
			notes: notes2,
			fontSize: SCORE_FONT_SIZE,
			noteSpacing: RELATIVE_NOTE_SPACING
		};
	}

	scores[0] = createScore(scoreCnv, scoreOptions[0]);
	noteXs = scores[0].getNotesAbsoluteCoordinates();
	midiNoteSet = scores[0].getMidiSet();

	if (staveNum === 2) {
		scores[1] = createScore(scoreCnv, scoreOptions[1]);
		connector = Score.createConnector(scores[0], scores[1]);
	}

	for (const score of scores) score.draw();
	if (connector) connector.draw();
}

//=================//
// SENZA MICROFONO //
//=================//

document.addEventListener("pointerdown", () => {
	if (gameIsRunning) {
		dino.jump(RELATIVE_NOTE_SPACING);
	}
});

const updateScore = () => {
	punteggioTotale++;
	punteggioParziale++;
	midiTargetIndex++;

	scoreCtx.clearRect(0, 0, WIDTH, HEIGHT);
	addBackgroundToCanvas(levels[LEVEL].tileSet, scoreCnv, TILE_SIZE);

	const notes1 = [];
	const notes2 = [];

	for (const note of scores[0].notes) {
		notes1.push(note.note);
	}

	if (scores[1]) {
		for (const note of scores[1].notes) {
			notes2.push(note.note);
		}
	}

	for (let i = 0; i < notes1.length; i++) {
		if (notes1[i] !== "m") {
			notes1[i] = "m";
			notes2[i] = "m";
			break;
		}
	}

	scores[0].addNotes(notes1);

	if (scores[1]) {
		scores[1].addNotes(notes2);

		const connector = Score.createConnector(scores[0], scores[1]);
		connector.draw();
	}

	for (let score of scores) score.draw();
}

//========================//
// PARTENZA DEL MICROFONO //
//========================//

//startMic();
