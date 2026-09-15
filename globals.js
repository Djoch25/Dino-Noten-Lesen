const SCREEN_WIDTH = Math.max(screen.width, screen.height);
const SCREEN_HEIGHT = Math.min(screen.width, screen.height);
const SCALE = 0.5;
const WIDTH = 1200 * SCALE;
const HEIGHT = 700 * SCALE;

const SCORE_FONT_SIZE = WIDTH * 0.05;
const RELATIVE_NOTE_SPACING = WIDTH * 0.08;

const TILE_SIZE = WIDTH / 12;
const TILE_Y_OFFSET = 0.5;

const LIFE_BAR_DIM = {x: null, y: null, w: null, h: null};

const TOTAL_TIME = 60000;
