const levels = [];
const handPositionColors = ["#00ff0077", "#ff000077", "#0000ff77", "#ffff0077"];

levels[0] = {
	noteSet: ["c4", "d4", "e4", "f4", "g4"],
	get diatonicMidiSet() {return getDiatonicMidi(this.noteSet)},
	handPositions: ["c4"],
	get midiHandPositions() {return getDiatonicMidi(this.handPositions)},
	maxInterval: 1
};

levels[1] = {
	noteSet: ["c4", "d4", "e4", "f4", "g4"],
	get diatonicMidiSet() {return getDiatonicMidi(this.noteSet)},
	handPositions: ["c4"],
	get midiHandPositions() {return getDiatonicMidi(this.handPositions)},
	maxInterval: 2
};

levels[2] = {
	noteSet: ["c4", "d4", "e4", "f4", "g4"],
	get diatonicMidiSet() {return getDiatonicMidi(this.noteSet)},
	handPositions: ["c4"],
	get midiHandPositions() {return getDiatonicMidi(this.handPositions)},
	maxInterval: 4
};

levels[3] = {
	noteSet: ["d4", "e4", "f4", "g4", "a4"],
	get diatonicMidiSet() {return getDiatonicMidi(this.noteSet)},
	handPositions: ["d4"],
	get midiHandPositions() {return getDiatonicMidi(this.handPositions)},
	maxInterval: 2
};

levels[4] = {
	noteSet: ["d4", "e4", "f4", "g4", "a4"],
	get diatonicMidiSet() {return getDiatonicMidi(this.noteSet)},
	handPositions: ["d4"],
	get midiHandPositions() {return getDiatonicMidi(this.handPositions)},
	maxInterval: 4
};

levels[5] = {
	noteSet: ["c4", "d4", "e4", "f4", "g4", "a4"],
	get diatonicMidiSet() {return getDiatonicMidi(this.noteSet)},
	handPositions: ["c4", "d4"],
	get midiHandPositions() {return getDiatonicMidi(this.handPositions)},
	maxInterval: 5
};

levels[6] = {
	noteSet: ["e4", "f4", "g4", "a4", "b4"],
	get diatonicMidiSet() {return getDiatonicMidi(this.noteSet)},
	handPositions: ["e4"],
	get midiHandPositions() {return getDiatonicMidi(this.handPositions)},
	maxInterval: 4
};

levels[7] = {
	noteSet: ["c4", "d4", "e4", "f4", "g4", "a4", "b4"],
	get diatonicMidiSet() {return getDiatonicMidi(this.noteSet)},
	handPositions: ["c4", "d4", "e4"],
	get midiHandPositions() {return getDiatonicMidi(this.handPositions)},
	maxInterval: 6
};

levels[8] = {
	noteSet: ["f4", "g4", "a4", "b4", "c5"],
	get diatonicMidiSet() {return getDiatonicMidi(this.noteSet)},
	handPositions: ["f4"],
	get midiHandPositions() {return getDiatonicMidi(this.handPositions)},
	maxInterval: 4
};

levels[9] = {
	noteSet: ["c4", "d4", "e4", "f4", "g4", "a4", "b4", "c5"],
	get diatonicMidiSet() {return getDiatonicMidi(this.noteSet)},
	handPositions: ["c4", "d4", "e4", "f4"],
	get midiHandPositions() {return getDiatonicMidi(this.handPositions)},
	maxInterval: 7
};

/*
livello	noteSet	handPos maxInterval
1 		c-g		c 		seconda
2 		c-g		c 		terza
3		c-g		c 		quinta
4		d-a		d 		terza
5		d-a		d 		quinta
6		c-a		c, d 	quinta
7		e-b		e 		quinta
8		c-b		c, d, e quinta
9		f-c'	f 		quinta
10		c-c'	c, f 	ottava
*/

const getDiatonicMidi = (notes) => {
	//c2 = 0
	//c3 = 7
	//c4 = 14
	//c5 = 21

	const midis = [];

	for (let note of notes) {
		const name = note[0];
		const okt = (parseInt(note[note.length - 1]) - 2) * 7;

		let midi = 0;

		switch (name) {
			case "c": midi = 0; break;
			case "d": midi = 1; break;
			case "e": midi = 2; break;
			case "f": midi = 3; break;
			case "g": midi = 4; break;
			case "a": midi = 5; break;
			case "b": midi = 6; break;
		}

		midis.push(midi + okt);
	}

	return midis;
}

/*
ALGORITMO PER TROVARE LE HAND-POSITION
calcola lo sforzo minore tra nota e dito precedente e nota e dito successivo
stesso dito è uno sforzo grande
dita invertite (es do-re con 2-1) è uno sforzo estremo
per le prime due note fai tutte le combinazioni [1-1, 1-2, 1-3, ..., 5-4, 5-5]

oppure calcola tutte le combinazioni:
	1-1-1-1-1-1-1-1
	1-1-1-1-1-1-1-2
	1-1-1-1-1-1-2-1
	1-1-1-1-1-1-2-2
	1-1-1-1-1-2-1-1 ecc.

*/

//5 - 1 | - | - | 3 - 1
// 

const handPositionFinder = (level, midiSequence) => {
	const diatonicMidiSet = getDiatonicMidi(midiSequence);
	const diatonicHandPositions = level.midiHandPositions;
	const handPositions = [];

	while (diatonicMidiSet.length > 0) {
		const fitness = new Array(diatonicHandPositions.length).fill(0);

		for (let i = 0; i < diatonicHandPositions.length; i++) {
			for (let j = 0; j < diatonicMidiSet.length; j++) {
				if (diatonicMidiSet[j] >= diatonicHandPositions[i] && diatonicMidiSet[j] <= diatonicHandPositions[i] + 4) {
					fitness[i]++;
				} else {
					break;
				}
			}
		}

		let maxFitness = -1;
		let maxIndex = -1;

		for (let i = 0; i < fitness.length; i++) {
			if (fitness[i] > maxFitness) {
				maxFitness = fitness[i];
				maxIndex = i;
			}
		}

		if (maxFitness === 0) {
			console.error("Non è possibile raggiungere tutte le note con le handPosition scelte");
			return;
		}

		for (let i = 0; i < maxFitness; i++) {
			handPositions.push(diatonicHandPositions[maxIndex]);
		}

		diatonicMidiSet.splice(0, maxFitness);
	}

	return handPositions;
}

//GENERATORE DI NOTESET

const generateSet = (level, num = 8) => {
	const midiSet = level.diatonicMidiSet;
	const maxInt = level.maxInterval;

	const minMidi = midiSet[0];
	const maxMidi = midiSet[midiSet.length - 1];

	const midis = [];

	midis[0] = midiSet[Math.floor(Math.random() * midiSet.length)];

	for (let i = 1; i < num; i++) {
		const prevMidi = midis[i - 1];
		const possibleMidis = [];

		for (let int = -maxInt; int <= maxInt; int++) {
			const nextMidi = prevMidi + int;
			if (nextMidi >= minMidi && nextMidi <= maxMidi) {
				possibleMidis.push(nextMidi);
			}
		}

		if (possibleMidis.length === 0) {
			console.error("Impossibile generare il set. Errore alla " + i + " iterazione");
			return;
		}

		midis[i] = possibleMidis[Math.floor(Math.random() * possibleMidis.length)];
	}

	return diatonicMidiToNotes(midis);
}


// TRADUTTORE DA DIATONICMIDI A NOTE

const diatonicMidiToNotes = (midis) => {
	const notes = [];
	const notePool = ["c", "d", "e", "f", "g", "a", "b"];

	for (let midi of midis) {
		const note = notePool[midi % 7];
		const okt = Math.floor(midi / 7) + 2;

		notes.push(note + okt);
	}

	return notes;
}

//====================================//
// CANVAS DI BACKGROUND (PENTAGRAMMA) //
//====================================//

const createScore = (cnv, fontSize, noteSpacing) => {
	const score = new Score(cnv, fontSize, noteSpacing);

	score.addStave().setStaveDim(50, 50, 1200);
	score.addClef("treble").setXClef(20);
	score.addNotes(notes);

	return score;
}

const drawHandPositions = (ctx, noteXs) => {
	const handPos = handPositionFinder(levels[LEVEL], notes);

	const spacing = noteXs[1] - noteXs[0];

	for (let i = 0; i < noteXs.length; i++) {
		ctx.fillStyle = handPositionColors[handPos[i] - 14];
		ctx.fillRect(noteXs[i] - spacing * 0.5, 30, spacing, 150);	
	}
}


const LEVEL = 9;

const scoreCnv = createCanvas();
const scoreCtx = setupCanvas(scoreCnv, 0, 0, WIDTH, HEIGHT, document.body);

const notes = generateSet(levels[LEVEL]);
let noteXs;
let midiNoteSet;


//======================//
// CANVAS DI ANIMAZIONE //
//======================//

const pointCnv = createCanvas();
const pointCtx = setupCanvas(pointCnv, 0, 0, WIDTH, HEIGHT, document.body)

let currentPointerX = 0;

let ID;
const loop = () => {
	ID = requestAnimationFrame(loop);

	const x = noteXs[currentPointerX];

	pointCtx.clearRect(0, 0, 1000, 500);
	pointCtx.fillStyle = "#ff0000";
	pointCtx.fillRect(x - 10, 200, 20, 20);

	pointCtx.font = "40px Arial";
	pointCtx.fillText(currentMidiPitch, 100, 300);
}

//========================//
// PARTENZA DEL MICROFONO //
//========================//

startMic().then(async() => {
	await document.fonts.load(SCORE_FONT_SIZE + "px Bravura");

	micStarted = true;
});


//==================//
// ENTER FULLSCREEN //
//==================//

let micStarted = false;

document.addEventListener("pointerdown", () => {
	if (document.fullscreen || !micStarted) return;

	document.body.requestFullscreen();

	const score = createScore(scoreCnv, SCORE_FONT_SIZE, 1.3);
	noteXs = score.getNotesAbsoluteCoordinates();
	midiNoteSet = score.getMidiSet();

	scoreCtx.fillStyle = "#ffffff";
	scoreCtx.fillRect(0, 0, WIDTH, HEIGHT);

	setTimeout(() => {
		//drawHandPositions(scoreCtx, noteXs);
		score.draw();
		loop();
	}, 3600);
});
