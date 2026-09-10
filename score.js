const FONTSIZE = 60;

class Score {
	constructor(cnv, fontSize = 40) {
		//coordinate della canvas
		this.x = parseInt(cnv.style.left);
		this.y = parseInt(cnv.style.top);
		this.w = cnv.width;
		this.h = cnv.height;

		this.fontSize = fontSize;
		
		this.lineSpacing = this.fontSize * 0.25;

		//coordinate del rigo relative alla canvas
		this.xStave = 0;
		this.yStave = 0;
		this.wStave = 100;

		//accessori
		this.stave = false;
		this.clef = null;
		this.xClef = 0;
		this.yClef = 0;
		this.clefXoffset = this.fontSize * 0.1;
		this.clefYoffset = 3 * this.lineSpacing;

		//note
		this.notes = [];
		this.noteSpacing = this.fontSize * 1.6;
		this.noteXoffset = this.fontSize * 1.25;

		//canvas grafica
		this.cnv = cnv;

		//context grafici
		this.ctx = this.cnv.getContext("2d");
		this.ctx.font = this.fontSize + "px Bravura";
		this.ctx.textAlign = "center";

		this.ctx.fillStyle = "#000000";
		this.ctx.strokeStyle = "#000000";
	}

	static glyph(ue) {
		const span = document.createElement("span");
		span.style.font = "40px Bravura";
		span.style.position = "absolute";
		span.style.left = "50px";
		span.textContent = "\u{1D173}\u{1D174}";
		document.body.appendChild(span)
	}

	static getCanvas(x, y, w, h) {
		const _cnv = document.createElement("canvas");
		_cnv.width = w;
		_cnv.height = h;
		_cnv.style.position = "absolute";
		_cnv.style.left = x + "px";
		_cnv.style.top = y + "px";

		return _cnv;
	}

	static append(cnv, wrapper = document.body) {
		wrapper.appendChild(cnv);
	}

	static noteSpacing = this.noteSpacing;

	//--- CREATORS ---

	addStave() {
		this.wStave = 100;
		this.stave = true;

		return this;
	}

	addClef(clef = "treble") {
		this.xClef = this.xStave;
		this.yClef = this.yStave;

		switch(clef) {
		case "\ue050":
		case "treble": 
			this.clef = "\u{1D11E}";
			this.clefYoffset = 3 * this.lineSpacing; 
			break;
		case "\ue062":
		case "bass": 
			this.clef = "\u{1D122}"; 
			this.clefYoffset = this.lineSpacing;
			break;
		default: this.clef = null;
			console.error("Chiave non supportata");
		}

		return this;
	}

	addNotes(notes) {
		/*notes[i] = {
			note: "c#4",
			x: **dipende da i, noteSpacing e xOffset**
			y: **dipende da .note**
			lines: **dipende da .note** (-1 = un taglio aggiuntivo sotto, 1 = sopra)
			accidental: dipende dal nome della nota
		};
		*/
		for (let i = 0; i < notes.length; i++) {
			const note = notes[i];
			const yNotePos = this.getYNote(note);

			this.notes[i] = {
				note: note,
				x: i * this.noteSpacing + this.noteXoffset,
				y: this.yStave + yNotePos.y,
				lines: yNotePos.lines,
				accidental: note.length === 3 ? note[1] : null 
			}
		}
	}

	//--- MODIFIERS ---

	setFontSize(w) {
		this.fontSize = w;
	}

	setStaveDim(x, y, w) {
		this.xStave = x;
		this.yStave = y;
		this.wStave = w;
	}

	setXClef(x) {
		this.xClef = this.xStave + x;
	}

	setYClef(y) {
		this.yClef = this.yStave + y;
	}

	//--- UTILS ---

	getYNote(note) {
		const okt = parseInt(note[note.length - 1]);
		let pitch;

		switch(note[0]) {
			case "c": pitch = 10; break;
			case "d": pitch = 9; break;
			case "e": pitch = 8; break;
			case "f": pitch = 7; break;
			case "g": pitch = 6; break;
			case "a": pitch = 5; break;
			case "b": pitch = 4; break;
		}

		const spacing = this.lineSpacing / 2;
		const yClef = this.clef == "\u{1D11E}" ? 0 : -12;

		const y = pitch - (okt - 4) * 7 + yClef;
		let lines = 0;
		
		if (y >= 10) lines = -Math.floor(y / 2) + 4;
		else if (y <= -2) lines = -Math.floor((y + 1) / 2);

		return {
			y: y * spacing, 
			lines: lines
		};
	}

	getMidiSet() {
		const midis = [];

		for (let noteObject of this.notes) {
			const note = noteObject.note;
			const okt = parseInt(note[note.length - 1]);
			const name = note[0];

			let midi = 0;

			switch(name) {
				case "c": midi = 0; break;
				case "d": midi = 2; break;
				case "e": midi = 4; break;
				case "f": midi = 5; break;
				case "g": midi = 7; break;
				case "a": midi = 9; break;
				case "b": midi = 11; break;
			}

			let accidental = 0;

			if (note[1] === "#") {
				accidental++;
			} else if (note[1] === "b") {
				accidental--;
			}

			midis.push(midi + accidental + 12 * (okt + 1));
		}

		return midis;
	}

	getNotesAbsoluteCoordinates() {
		const noteXs = [];

		for (let note of this.notes) {
			noteXs.push(note.x + this.x + this.xClef);
		}

		return noteXs;
	}

	//--- GRAPHICS ---

	draw() {
		this.ctx.fillStyle = "#000000";
		this.ctx.strokeStyle = "#000000";

		//Pentagramma
		if (this.stave) {
			for (let i = 0; i < 5; i++) {
				const y = this.yStave + i * this.lineSpacing + 0.5;

				this.ctx.beginPath();
				this.ctx.moveTo(this.xStave, y);
				this.ctx.lineTo(this.xStave + this.wStave, y);
				this.ctx.stroke();
			}
		}

		//chiave
		if (this.clef) {
			this.ctx.fillText(this.clef, this.xClef + this.clefXoffset, this.yClef + this.clefYoffset);
		}

		//note e tagli addizionali
		for (let note of this.notes) {
			const x = note.x + this.xClef;
			const lines = note.lines;

			if (lines < 0) {
				for (let j = 0; j < -lines; j++) {
					const y = this.yStave + (5 + j) * this.lineSpacing;
					this.ctx.beginPath();
					this.ctx.moveTo(x - this.fontSize * 0.35, y);
					this.ctx.lineTo(x + this.fontSize * 0.35, y);
					this.ctx.stroke();
				}
			} else if (lines > 0) {
				for (let j = 0; j < lines; j++) {
					const y = this.yStave + (-1 - j) * this.lineSpacing;

					this.ctx.beginPath();
					this.ctx.moveTo(x - this.fontSize * 0.35, y);
					this.ctx.lineTo(x + this.fontSize * 0.35, y);
					this.ctx.stroke();
				}
			}
			
			this.ctx.fillText("\u{1D15D}", x , note.y);

			//accidenti
			if (note.accidental) {
				let accidental = "\ue262";
				
				switch(note.accidental) {
					case "b": accidental = "\ue260"; break;
					case "h": accidental = "\ue261"; break;
				} 
				
				this.ctx.fillText(accidental, x - this.fontSize * 0.5, note.y);
			}
		}
	}
}