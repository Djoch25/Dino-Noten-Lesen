const levels = [];
const levelColors = ["#00ff00", "#ffff00", "#aaaaff"];

/*
0: LAGE (C-C' beide hande)
1: N Noten (3-8 beide hande)
2: beide Hande (3-3, 4-4, 5-5 ecc...)
*/

levels[0] = [];
levels[1] = [];
levels[2] = [];

//=======//
// LAGEN //
//=======//

levels[0][0] = {
	level: "C Lage \nViolin",
	staves: 1,
	clefs: ["treble"],
	noteRanges: [["c4", "d4", "e4", "f4", "g4"]],
	notes: null,
	tileSet: freeTileSet,
	color: "#00ff00",
	position: [0.2, 0.25]
}

levels[0][1] = {
	level: "D Lage \nViolin",
	staves: 1,
	clefs: ["treble"],
	noteRanges: [["d4", "e4", "f4", "g4", "a4"]],
	notes: null,
	tileSet: freeTileSet,
	color: "#00ff00",
	position: [0.4, 0.25]
}

levels[0][2] = {
	level: "E Lage \nViolin",
	staves: 1,
	clefs: ["treble"],
	noteRanges: [["e4", "f4", "g4", "a4", "b4"]],
	notes: null,
	tileSet: freeTileSet,
	color: "#00ff00",
	position: [0.6, 0.25]
}

levels[0][3] = {
	level: "F Lage \nViolin",
	staves: 1,
	clefs: ["treble"],
	noteRanges: [["f4", "g4", "a4", "b4", "c5"]],
	notes: null,
	tileSet: freeTileSet,
	color: "#00ff00",
	position: [0.8, 0.25]
}

levels[0][4] = {
	level: "G Lage \nViolin",
	staves: 1,
	clefs: ["treble"],
	noteRanges: [["g4", "a4", "b4", "c5", "d5"]],
	notes: null,
	tileSet: freeTileSet,
	color: "#00ff00",
	position: [0.2, 0.5]
}

levels[0][5] = {
	level: "A Lage \nViolin",
	staves: 1,
	clefs: ["treble"],
	noteRanges: [["a4", "b4", "c5", "d5", "e5"]],
	notes: null,
	tileSet: freeTileSet,
	color: "#00ff00",
	position: [0.4, 0.5]
}

levels[0][6] = {
	level: "B Lage \nViolin",
	staves: 1,
	clefs: ["treble"],
	noteRanges: [["b4", "c5", "d5", "e5", "f5"]],
	notes: null,
	tileSet: freeTileSet,
	color: "#00ff00",
	position: [0.6, 0.5]
}

levels[0][7] = {
	level: "C' Lage \nViolin",
	staves: 1,
	clefs: ["treble"],
	noteRanges: [["c5", "d5", "e5", "f5", "g5"]],
	notes: null,
	tileSet: freeTileSet,
	color: "#00ff00",
	position: [0.8, 0.5]
}

levels[0][8] = {
	level: "C Lage \nBass",
	staves: 1,
	clefs: ["bass"],
	noteRanges: [["c3", "d3", "e3", "f3", "g3"]],
	notes: null,
	tileSet: desertTileSet,
	color: "#ffff00",
	position: [0.2, 0.75]
}

levels[0][9] = {
	level: "D Lage \nBass",
	staves: 1,
	clefs: ["bass"],
	noteRanges: [["d3", "e3", "f3", "g3", "a3"]],
	notes: null,
	tileSet: desertTileSet,
	color: "#ffff00",
	position: [0.4, 0.75]
}

levels[0][10] = {
	level: "E Lage \nBass",
	staves: 1,
	clefs: ["bass"],
	noteRanges: [["e3", "f3", "g3", "a3", "b3"]],
	notes: null,
	tileSet: desertTileSet,
	color: "#ffff00",
	position: [0.6, 0.75]
}

levels[0][11] = {
	level: "F Lage \nBass",
	staves: 1,
	clefs: ["bass"],
	noteRanges: [["f3", "g3", "a3", "b3", "c4"]],
	notes: null,
	tileSet: desertTileSet,
	color: "#ffff00",
	position: [0.8, 0.75]
}

//=========//
// N NOTEN //
//=========//

levels[1][0] = {
	level: "3 \nNoten \nViolin",
	staves: 1,
	clefs: ["treble"],
	noteRanges: [["c4", "d4", "e4"]],
	notes: null,
	tileSet: freeTileSet,
	color: "#00ff00",
	position: [0.2, 0.25]
}

levels[1][1] = {
	level: "4 \nNoten \nViolin",
	staves: 1,
	clefs: ["treble"],
	noteRanges: [["c4", "d4", "e4", "f4"]],
	notes: null,
	tileSet: freeTileSet,
	color: "#00ff00",
	position: [0.4, 0.25]
}

levels[1][2] = {
	level: "5 \nNoten \nViolin",
	staves: 1,
	clefs: ["treble"],
	noteRanges: [["c4", "d4", "e4", "f4", "g4"]],
	notes: null,
	tileSet: freeTileSet,
	color: "#00ff00",
	position: [0.6, 0.25]
}

levels[1][3] = {
	level: "6 \nNoten \nViolin",
	staves: 1,
	clefs: ["treble"],
	noteRanges: [["c4", "d4", "e4", "f4", "g4", "a4"]],
	notes: null,
	tileSet: freeTileSet,
	color: "#00ff00",
	position: [0.8, 0.25]
}

levels[1][4] = {
	level: "7 \nNoten \nViolin",
	staves: 1,
	clefs: ["treble"],
	noteRanges: [["c4", "d4", "e4", "f4", "g4", "a4", "b4"]],
	notes: null,
	tileSet: freeTileSet,
	color: "#00ff00",
	position: [0.2, 0.5]
}

levels[1][5] = {
	level: "8 \nNoten \nViolin",
	staves: 1,
	clefs: ["treble"],
	noteRanges: [["c4", "d4", "e4", "f4", "g4", "a4", "b4", "c5"]],
	notes: null,
	tileSet: freeTileSet,
	color: "#00ff00",
	position: [0.4, 0.5]
}

levels[1][6] = {
	level: "3 \nNoten \nBass",
	staves: 1,
	clefs: ["bass"],
	noteRanges: [["c3", "f3", "g3"]],
	notes: null,
	tileSet: desertTileSet,
	color: "#ffff00",
	position: [0.6, 0.5]
}

levels[1][7] = {
	level: "4 \nNoten \nBass",
	staves: 1,
	clefs: ["bass"],
	noteRanges: [["c3", "d3", "f3", "g3"]],
	notes: null,
	tileSet: desertTileSet,
	color: "#ffff00",
	position: [0.8, 0.5]
}

levels[1][8] = {
	level: "5 \nNoten \nBass",
	staves: 1,
	clefs: ["bass"],
	noteRanges: [["c3", "d3", "e3", "f3", "g3"]],
	notes: null,
	tileSet: desertTileSet,
	color: "#ffff00",
	position: [0.2, 0.75]
}

levels[1][9] = {
	level: "6 \nNoten \nBass",
	staves: 1,
	clefs: ["bass"],
	noteRanges: [["c3", "d3", "e3", "f3", "g3", "a3"]],
	notes: null,
	tileSet: desertTileSet,
	color: "#ffff00",
	position: [0.4, 0.75]
}

levels[1][10] = {
	level: "7 \nNoten \nBass",
	staves: 1,
	clefs: ["bass"],
	noteRanges: [["c3", "d3", "e3", "f3", "g3", "a3", "b3"]],
	notes: null,
	tileSet: desertTileSet,
	color: "#ffff00",
	position: [0.6, 0.75]
}

levels[1][11] = {
	level: "8 \nNoten \nBass",
	staves: 1,
	clefs: ["treble"],
	noteRanges: [["c3", "d3", "e3", "f3", "g3", "a3", "b3", "c4"]],
	notes: null,
	tileSet: desertTileSet,
	color: "#ffff00",
	position: [0.8, 0.75]
}

//=============//
// BEIDE HÄNDE //
//=============//

levels[2][0] = {
	level: "3 \nNoten",
	staves: 2,
	clefs: ["treble", "bass"],
	noteRanges: [["c4", "d4", "e4"], ["c3", "f3", "g3"]],
	notes: null,
	tileSet: winterTileSet,
	color: "#aaaaff",
	position: [0.25, 0.25]
}

levels[2][1] = {
	level: "4 \nNoten",
	staves: 2,
	clefs: ["treble", "bass"],
	noteRanges: [["c4", "d4", "e4", "f4"], ["c3", "d3", "f3", "g3"]],
	notes: null,
	tileSet: winterTileSet,
	color: "#aaaaff",
	position: [0.5, 0.25]
}

levels[2][2] = {
	level: "5 \nNoten",
	staves: 2,
	clefs: ["treble", "bass"],
	noteRanges: [["c4", "d4", "e4", "f4", "g4"], ["c3", "d3", "e3", "f3", "g3"]],
	notes: null,
	tileSet: winterTileSet,
	color: "#aaaaff",
	position: [0.75, 0.25]
}

levels[2][3] = {
	level: "6 \nNoten",
	staves: 2,
	clefs: ["treble", "bass"],
	noteRanges: [["c4", "d4", "e4", "f4", "g4", "a4"], ["c3", "d3", "e3", "f3", "g3", "a3"]],
	notes: null,
	tileSet: winterTileSet,
	color: "#aaaaff",
	position: [0.25, 0.5]
}

levels[2][4] = {
	level: "7 \nNoten",
	staves: 2,
	clefs: ["treble", "bass"],
	noteRanges: [["c4", "d4", "e4", "f4", "g4", "a4", "b4"], ["c3", "d3", "e3", "f3", "g3", "a3", "b3"]],
	notes: null,
	tileSet: winterTileSet,
	color: "#aaaaff",
	position: [0.5, 0.5]
}

levels[2][5] = {
	level: "8 \nNoten",
	staves: 2,
	clefs: ["treble", "bass"],
	noteRanges: [["c4", "d4", "e4", "f4", "g4", "a4", "b4", "c5"], ["c3", "d3", "e3", "f3", "g3", "a3", "b3", "c4"]],
	notes: null,
	tileSet: winterTileSet,
	color: "#aaaaff",
	position: [0.75, 0.5]
}


/*
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

*/

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
