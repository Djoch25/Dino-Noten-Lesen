const DINO_IMAGE_WIDTH = 68;
const DINO_IMAGE_HEIGHT = 47;
const DINO_IMAGE_ELEVATION = 15;
const DINO_SPRINT_JUMP_SPEED = -13;
const DINO_GRAVITY = 1;

class BasicDino {
	constructor(x, y, dim, cnv) {
		this.cnv = cnv;
		this.ctx = this.cnv.getContext("2d");
		this.cnv.style.pointerEvents = "none";

		this.x = x;
		this.initX = this.x;
		this.y = y;
		this.groundY = this.y + DINO_IMAGE_ELEVATION; //posizione originale prima del salto
		this.w = DINO_IMAGE_WIDTH * dim;
		this.h = DINO_IMAGE_HEIGHT * dim;

		this.dinoImgs = dinoImgs;
		this.imgI = 0;

		this.isJumping = false;
		this.velX = 0;
		this.accY = 0;
		this.velY = 0;

		this.btnIndex = 0;
	}

	jump(current, next) {
		if (this.isJumping) return;

		this.isJumping = true;

		const dX = levelCoords[next].x - levelCoords[current].x;
		const dY = levelCoords[next].y - levelCoords[current].y;

		const dirY = Math.min(dY - 1, -1);

		this.groundY = this.y + dY * 250;

		this.velY = 10 * dirY - 5;
		this.accY = 1;
		this.imgI = 10;

		let t;
		switch(dY) {
			case 0: t = 32; break;
			case -1: t = 38; break;
			case -2: t = 52; break;
			case 1: t = 43; break;
			case 2: t = 51; break;
		}

		this.velX = dX * 100 / t;
	}

	/*
	update(id) {
		const timing = id % 5 == 0;

		if (this.isJumping) {
			this.x += this.velX;
			this.y += this.velY;
			this.velY += this.accY;

			if (this.y > this.groundY && this.velY >= 0) {
				this.velX = 0;
				this.y = this.groundY;
				this.velY = 0;
				this.accY = 0;
				this.isJumping = false;
				this.imgI = 0;
			}

			if (timing) this.imgI++; 
			if (this.imgI == 20) this.imgI = 10;
		} else {
			if (timing) this.imgI++;
			if (this.imgI == 10) this.imgI = 0;
		}
	}
	*/

	draw() {
		this.ctx.drawImage(dinoImgs[this.imgI], this.x, this.y, this.w, this.h);
	}
}

class Dino extends BasicDino {
	constructor(x, y, dim, cnv) {
		super(x, y, dim, cnv);

		this.isJumping = false;
		this.velX = 0;
		this.accY = 0;
		this.velY = 0;

		this.btnIndex = 0;

		this.framePerJump = this.simulateJump();
	}

	respawn() {
		this.isJumping = true;
		this.x = this.initX;	
		this.velX = 0;
		this.y = 0;
		this.velY = 0;
		this.accY = 1;
		this.imgI = 10;

		this.dead = false;
	}

	simulateJump() {
		let y = this.y;
		let velY = DINO_SPRINT_JUMP_SPEED;
		const accY = DINO_GRAVITY;

		let timeId = 0;

		while(y <= this.y || velY < 0) {
			y += velY;
			velY += accY;

			timeId++;
		}

		return timeId;
	}

	jump(distance) {
		if (this.isJumping || this.dead) return;

		this.isJumping = true;

		this.velY = DINO_SPRINT_JUMP_SPEED;
		this.accY = DINO_GRAVITY;
		this.imgI = 10;

		this.velX = distance / this.framePerJump;

		punteggio++;
		punteggioParziale++;
	}

	update(id) {
		const timing = id % 5 == 0;

		if (timing) this.imgI++;

		if (this.isJumping) {
			this.x += this.velX;
			this.y += this.velY;
			this.velY += this.accY;

			if (this.y > this.groundY && this.velY >= 0) {
				this.velX = 0;
				this.y = this.groundY;
				this.velY = 0;
				this.accY = 0;
				this.isJumping = false;
				this.imgI = 0;
			}

			if (this.imgI == 20 && !this.dead) this.imgI = 10;
		} else {
			if (this.imgI == 10 && !this.dead) this.imgI = 0;
		}

		if (this.imgI >= 28) {
			this.imgI = 27;
			cancelAnimationFrame(id);
		}
	}

	toDeath() {
		this.dead = true;
		this.imgI = 20;
	}

	draw() {
		this.ctx.fillStyle = "#ff000077";
		//this.ctx.fillRect(this.x, this.y, this.w, this.h);
		this.ctx.drawImage(this.dinoImgs[this.imgI], this.x, this.y, this.w, this.h);
	}
}
