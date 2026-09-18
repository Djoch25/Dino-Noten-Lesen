let SCALE;

const SCREEN_WIDTH = Math.max(screen.width, screen.height);
const SCREEN_HEIGHT = Math.min(screen.width, screen.height);

let WIDTH, HEIGHT;
let SCORE_FONT_SIZE, RELATIVE_NOTE_SPACING;
let TILE_SIZE, TILE_Y_OFFSET;

let LIFE_BAR_DIM;
	
const TOTAL_TIME = 90000;

const setCanvasDimensions = (scale) => {
	SCALE = scale;

	WIDTH = 1200 * scale;
	HEIGHT = 700 * scale;
	
	SCORE_FONT_SIZE = WIDTH * 0.05;
	RELATIVE_NOTE_SPACING = WIDTH * 0.08;
	
	TILE_SIZE = WIDTH / 12;
	TILE_Y_OFFSET = 0.5;
	
	LIFE_BAR_DIM = {x: null, y: null, w: null, h: null};
}

let scoreCnv, scoreCtx;
let animeCnv, animeCtx;
let fadingCnv, fadingCtx;

const setAllCanvas = () => {
	if (!SCALE) {
		console.error("SCALE NON DEFINITO");
	}

	scoreCnv = createCanvas();
	scoreCtx = setupCanvas(scoreCnv, 0, 0, WIDTH, HEIGHT, document.body);

	animeCnv = createCanvas();
	animeCtx = setupCanvas(animeCnv, 0, 0, WIDTH, HEIGHT, document.body)
	animeCtx.font = SCORE_FONT_SIZE + "px bold Arial";

	fadingCnv = createCanvas();
	fadingCtx = setupCanvas(fadingCnv, 0, 0, WIDTH, HEIGHT, false)
	fadingCtx.font = SCORE_FONT_SIZE + "px bold Arial";
}
