const levels = [];
const levelColors = ["#00ff00", "#ffff00", "#ffffff"];

levels[0] = {
	level: 1,
	staves: 1,
	clef: ["treble"],
	noteRanges: [["c4", "d4", "e4"]],
	notes: null,
	tileSet: freeTileSet,
	color: "#00ff00"
};

levels[1] = {
	level: 2,
	staves: 1,
	clef: ["treble"],
	noteRanges: [["c4", "d4", "e4", "f4"]],
	notes: null,
	tileSet: freeTileSet,
	color: "#00ff00"
};

levels[2] = {
	level: 3,
	staves: 1,
	clef: ["treble"],
	noteRanges: [["c4", "d4", "e4", "f4", "g4"]],
	notes: null,
	tileSet: freeTileSet,
	color: "#00ff00"
};

levels[3] = {
	level: 4,
	staves: 1,
	clef: ["treble"],
	noteRanges: [["c4", "d4", "e4", "f4", "g4", "a4"]],
	notes: null,
	tileSet: freeTileSet,
	color: "#00ff00"
};

levels[4] = {
	level: 5,
	staves: 1,
	clef: ["treble"],
	noteRanges: [["c4", "d4", "e4", "f4", "g4", "a4", "b4"]],
	notes: null,
	tileSet: freeTileSet,
	color: "#00ff00"
};

levels[5] = {
	level: 6,
	staves: 1,
	clef: ["treble"],
	noteRanges: [["c4", "d4", "e4", "f4", "g4", "a4", "b4", "c5"]],
	notes: null,
	tileSet: freeTileSet,
	color: "#00ff00"
};

levels[6] = {
	level: 7,
	staves: 1,
	clef: ["bass"],
	noteRanges: [["c3", "d3", "e3", "f3", "g3"]],
	notes: null,
	tileSet: desertTileSet,
	color: "#ffff00"
};

levels[7] = {
	level: 8,
	staves: 1,
	clef: ["bass"],
	noteRanges: [["c3", "d3", "e3", "f3", "g3", "a3"]],
	notes: null,
	tileSet: desertTileSet,
	color: "#ffff00"
};

levels[8] = {
	level: 9,
	staves: 1,
	clef: ["bass"],
	noteRanges: [["c3", "d3", "e3", "f3", "g3", "a3", "b3"]],
	notes: null,
	tileSet: desertTileSet,
	color: "#ffff00"
};

levels[9] = {
	level: 10,
	staves: 1,
	clef: ["bass"],
	noteRanges: [["c3", "d3", "e3", "f3", "g3", "a3", "b3", "c4"]],
	notes: null,
	tileSet: desertTileSet,
	color: "#ffff00"
};

levels[10] = {
	level: 11,
	staves: 2,
	clef: ["treble", "bass"],
	noteRanges: [["c4", "d4", "e4", "f4", "g4"], ["c3", "d3", "e3", "f3", "g3"]],
	notes: null,
	tileSet: winterTileSet,
	color: "#ffffff"
};

const getNoteSet = (level) => {
	const notes1 = [];
	const notes2 = [];
	const pool1 = level.noteRanges[0];
	const pool2 = level.noteRanges[1] || null;
	const indexes = [];

	for (let i = 0; i < 8; i++) {
		const randomIndex = Math.floor(Math.random() * pool1.length);
		notes1.push(pool1[randomIndex]);
		indexes.push(randomIndex);
	}

	if (pool2) {
		for (let i = 0; i < notes1.length; i++) {
			do {
				const randomIndex = Math.floor(Math.random() * pool2.length);
				const interval = indexes[i] - randomIndex;

				if (interval == -3 || interval == -2 || interval == 0 || interval == 2) {
					notes2[i] = pool2[randomIndex];
				}

			} while (!notes2[i]);
		}
	}

	return {notes1: notes1, notes2: notes2};
}
