class BoundingBox {
	private x: number;
	private y: number;
	left: number;
	top: number;
	right: number;
	bottom: number;
	width: number;
	height: number;

	constructor(x: number, y: number, w: number, h: number){
		this.left = x;
		this.top = y;
		this.right = x + w;
		this.bottom = y + h;
		this.width= w;
		this.height = h;
	}

	update(newX: number, newY: number){
	this.left = newX;
	this.top = newY;
	this.right = newX + this.width;
	this.bottom = newY + this.height;
	}
}

/**
 * Entity class
 */
class Entity {
	public xPos: number;
	public yPos: number;
	public bounds: BoundingBox;

	update() {
		this.bounds.update(this.xPos, this.yPos);
	}

	isCollidingWith(otherEntity: Entity): boolean {
		var b1 = this.bounds;
		var b2 = otherEntity.bounds;
		return (
			(b1.left <= b2.right && b1.right >= b2.left) &&
			(b1.top <= b2.bottom && b1.bottom >= b2.top)
		);
	}

	constructor(xPos: number, yPos: number, width: number, height: number = width) {
		this.xPos = xPos;
		this.yPos = yPos;
		this.bounds = new BoundingBox(xPos, yPos, width, height);
	}
}

/**
 * Player class
 */
class Player extends Entity {

	public color = { R: 200, G: 0, B: 0, A: 255 };


	constructor(xPos: number, yPos: number, width: number, height: number) {
		super(xPos, yPos, height, width);
	}

	update() {
		var nextX = mouseX;
		if (nextX <= 0) nextX = 0;
		if (nextX + this.bounds.width >= width) nextX = width - this.bounds.width;
		this.xPos = nextX;
		this.yPos = height - this.bounds.height;
		super.update();
	}

	draw() {
		fill(this.color.R, this.color.G, this.color.B, this.color.A)
		stroke("black");
		rect(
			this.bounds.left, 
			this.bounds.top, 
			this.bounds.width, 
			this.bounds.height
		);
	}
}

/**
 * Bottle class
 */
class Bottle extends Entity {
	public static width = 10;
	public static height = 30;
	public color = { R: 0, G: 200, B: 0, A: 255 };
	public fallSpeed = 5;

	constructor(xPos: number, yPos: number) {
		super(xPos, yPos, Bottle.width, Bottle.height);
	}

	update() {
		this.yPos += this.fallSpeed;
		super.update();
		if (this.isCollidingWith(player)) {
			this.color.A = 0;

		}
	}

	draw() {
		fill(this.color.R, this.color.G, this.color.B, this.color.A);
		if (this.color.A == 0)
			noStroke();
		else
			stroke("black");
		rect(
			this.bounds.left,
			this.bounds.top,
			this.bounds.width,
			this.bounds.height
		);
	}
}

