const BUTTON_IMAGE_WIDTH = 175;
const BUTTON_IMAGE_HEIGHT = 175;
const NORMAL_BUTTON_IMAGE_COORDS = [
	{x: 455, y: 402},
   	{x: 651, y: 402},
   	{x: 844, y: 402},
   	{x: 1044, y: 402}
];

const xoff = 0;
const yoff = 3220;
const BACK_BUTTON_IMAGE_COORDS = [
	{x:0, y: 3622},
   	{x: 193, y: 3622},
   	{x: 386, y: 3622},
   	{x: 589, y: 3622}
];

class GuiButton {
	constructor(text, x, y, w, h, wrapper, imgCoords = NORMAL_BUTTON_IMAGE_COORDS) {
		this.imgCoords = imgCoords

		this.imgW = BUTTON_IMAGE_WIDTH;
		this.imgH = BUTTON_IMAGE_HEIGHT;

		this.text = text;
		this.x = x;
		this.y = y;
		this.w = w;
		this.h = h;
		this.wrapper = wrapper;

		this.btn = document.createElement("button");
		this.btn.style.position = "absolute";
		this.btn.style.left = (this.x - this.w/2) + "px";
		this.btn.style.top = (this.y - this.h/2) + "px";
		this.btn.style.width = this.w + "px";
		this.btn.style.height = this.h + "px";

		this.btn.style.border = "none";
		this.btn.style.outline = "none";
		this.btn.style.padding = "0";
		this.btn.style.appearance = "none";
		this.btn.style.backgroundColor = "transparent";

		this.btn.textContent = this.text;
		this.btn.style.color = "#44aa33";
		this.btn.style.fontFamily = "Helvetica";
		this.btn.style.fontSize = "30px";
		this.btn.style.fontWeight = "bold";
		this.btn.style.whiteSpace = "pre-line";

		const scaleW = this.w / this.imgW;
		const scaleH = this.h / this.imgH;

		this.btn.style.backgroundImage = "url('" + buttonImg.src + "')";
		this.btn.style.backgroundPosition = "-" + this.imgCoords[0].x * scaleW + "px -" + this.imgCoords[0].y * scaleH + "px";
		this.btn.style.backgroundRepeat = "no-repeat";

		this.btn.style.backgroundSize = buttonImg.naturalWidth * scaleW + "px " + buttonImg.naturalHeight * scaleH + "px";

		this.btn.addEventListener("mouseenter", () => {
			this.btn.style.backgroundPosition = "-" + this.imgCoords[1].x * scaleW +  "px -" + this.imgCoords[1].y * scaleH + "px";
			this.btn.style.color = "#ffff55";
		});

		this.btn.addEventListener("mouseleave", () => {
			this.btn.style.backgroundPosition = "-" + this.imgCoords[0].x * scaleW +  "px -" + this.imgCoords[0].y * scaleH + "px";
			this.btn.style.color = "#44aa33";
		});

		this.btn.addEventListener("mousedown", () => {
			this.btn.style.backgroundPosition = "-" + this.imgCoords[2].x * scaleW +  "px -" + this.imgCoords[2].y * scaleH + "px";
			this.btn.style.color = "#005500";
		});

		this.btn.addEventListener("mouseup", () => {
			this.btn.style.backgroundPosition = "-" + this.imgCoords[1].x * scaleW +  "px -" + this.imgCoords[1].y * scaleH + "px";
			this.btn.style.color = "#ffff55";
		});

		if (this.wrapper) this.wrapper.appendChild(this.btn);
	}

	static destroy(...btns) {
		for (let btn of btns) btn.btn.parentElement.removeChild(btn.btn);
	}

	addEventListener(event, fn) {
		this.btn.addEventListener(event, fn);
	}
}

const buttonImg = new Image();
buttonImg.src = "freefantasygui\\Button.png";