const levels = [];

levels[0] = {
	level: 0,
	staves: 1,
	clef: ["treble"],
	notes: null
};

levels[1] = {
	level: 1,
	staves: 1,
	clef: ["bass"],
	notes: null
};

levels[2] = {
	level: 2,
	staves: 2,
	clef: ["treble", "bass"],
	notes: null
};

const getNoteSet = (level) => {
	const notePool = ["c", "d", "e", "f", "g", "a", "b", "c"];
	const consonances = [2, 4, 5, 9, 11, 12, 14];

	const noteIndex1 = [];
	const noteIndex2 = [];

	for (let i = 0; i < 8; i++) {
		//range 0 - 7
		noteIndex1[i] = Math.floor(Math.random() * notePool.length);

		//range -7 - 0
		if (level === 2) {
			const consonance = consonances[Math.floor(Math.random() * consonances.length)];
			let index = noteIndex1[i] - consonance;

			if (index < -7) {
				index += 7;
			} else if (index > 0) {
				index -= 7;
			}

			noteIndex2[i] = index;
		}
	}

	const noteSet1 = [];
	const noteSet2 = [];

	for (let i = 0; i < 8; i++) {
		const note1 = notePool[noteIndex1[i]];
		let okt1 = noteIndex1[i] === 7 ? 5 : 4;

		if (level === 1) okt1--;

		noteSet1[i] = note1 + okt1;

		const note2 = notePool[noteIndex2[i] + 7];
		const okt2 = noteIndex2[i] === 0 ? 4 : 3;
		noteSet2[i] = note2 + okt2;
	}

	return {notes1: noteSet1, notes2: noteSet2};
}


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


const LEVEL = 0;

const scoreCnv = createCanvas();
const scoreCtx = setupCanvas(scoreCnv, 0, 0, WIDTH, HEIGHT, document.body);

const staveNum = levels[LEVEL].staves;
const {notes1, notes2} = getNoteSet(levels[LEVEL].level);

let noteXs;
let midiNoteSet;

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

const animeCnv = createCanvas();
const animeCtx = setupCanvas(animeCnv, 0, 0, WIDTH, HEIGHT, document.body)
animeCtx.font = SCORE_FONT_SIZE + "px bold Arial";

let pitchListener = "click";

let gameIsRunning = false;

let dino;

let time = TOTAL_TIME;
let timeFromLastFrame = 0;
let prevFrameTime = 0;

let punteggio = 0;

let ID;
const loop = () => {
	ID = requestAnimationFrame(loop);

	const gameOver = time < 0;

	//time setting
	const now = performance.now();
	timeFromLastFrame = now - timeFromLastFrame;

	if (ID > 3) time -= timeFromLastFrame;
	timeFromLastFrame = now;

	//update
	if (gameOver && !dino.dead && !dino.isJumping) {
		dino.toDeath();
	}

	dino.update(ID);

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

	const punteggioDim = animeCtx.measureText(punteggio);
	const punteggioW2 = punteggioDim.width / 2;
	const punteggioH2 = SCORE_FONT_SIZE / 2;

	animeCtx.fillText(punteggio, TILE_SIZE * 5.5 - punteggioW2, TILE_SIZE * 0.5 + punteggioH2);

	dino.draw();
}

//========================//
// PARTENZA DEL MICROFONO //
//========================//

/*
startMic().then(async() => {
	await document.fonts.load(SCORE_FONT_SIZE + "px Bravura");

	micStarted = true;
});
*/

//=========================//
// SETUP GAME E FULLSCREEN //
//=========================//

let micStarted = false;

document.addEventListener("click", async () => {
	if (document.fullscreen || gameIsRunning) return;

	document.body.requestFullscreen()
        .then(() => {
            consoleError(window.devicePixelRatio);
        })
        .catch((err) => {
            console.error("Fullscreen rejected:", err);
            consoleError(String(err));
        });
	

	/*await document.fonts.load(SCORE_FONT_SIZE + "px Bravura");

	//addBackgroundToCanvas(tileSets[LEVEL], scoreCnv, TILE_SIZE);

	const bgScreenCenterX = TILE_SIZE * 5.5;
	const staveWidth = WIDTH * 0.7;
	const x = bgScreenCenterX - staveWidth * 0.5; //(WIDTH - staveWidth) * 0.5;
	const xClef = WIDTH * 0.025;
	const staveHeight = SCORE_FONT_SIZE;
	const staveDistance = staveNum === 1 ? 0 : staveHeight * 2;
	const systemHeight = staveDistance + staveHeight;
	const bgScreenCenterY = TILE_SIZE * 2.5;
	const y = bgScreenCenterY - systemHeight * 0.5;
	
	const scoreOptions = [];
	const scores = [];
	let connector;

	scoreOptions[0] = {
		staveX: x,
		staveY: y, 
		staveWidth: staveWidth,
		clef: levels[LEVEL].clef[0],
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
			clef: levels[LEVEL].clef[1],
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
	
	//scoreCtx.fillStyle = "#ffffff";
	//scoreCtx.fillRect(0, 0, WIDTH, HEIGHT);

	dino = new Dino(noteXs[0] - DINO_IMAGE_WIDTH, HEIGHT * 0.6, 3, animeCnv);

	setTimeout(() => {
		//for (let score of scores) score.draw();
		//if (connector) connector.draw();
		dino.respawn();
		//loop();
		gameIsRunning = true;
	}, 500);
	*/
});

//=================//
// SENZA MICROFONO //
//=================//

document.addEventListener("pointerdown", () => {
	if (pitchListener !== "click" || !gameIsRunning) return;

	dino.jump(RELATIVE_NOTE_SPACING);
});
