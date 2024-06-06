/**
 * Bounding box class for spatial calculations
 */
class BoundingBox {
	constructor(x, y, w, h) {
	  	this.left = x
	  	this.top = y
	  	this.right = x + w
	  	this.bottom = y + h
	  	this.width = w
	  	this.height = h
	}
  
	update(newX, newY) {
		this.left = newX
	  	this.top = newY
	  	this.right = newX + this.width
	  	this.bottom = newY + this.height
	}
}
  
/**
 * Entity class  
 * Sets fundamental properties for any Entity  
 * @member ID: a hexadecimal string to identify the Entity 
 * @member Texture: a p5 Texture object, or a string "none" if no texture exists  
 * @member Bounds: a bounding box object, for spatial calculations  
 * @function isCollidingWith(): a function for checking overlap with other entities' bounds  
 */
class Entity {

	ID = "";
	Texture = "none";
	Bounds = {};

	//super update, should be called when bounding box changes have been made.
	update() {
	  this.bounds.update(this.xPos, this.yPos)
	}

	/**
	 * Collision check with other Entities (or inheritors)
	 * @param {Entity} otherEntity 
	 * @returns (boolean)
	 */
	isCollidingWith(otherEntity) {
	  var b1 = this.bounds
	  var b2 = otherEntity.bounds
	  return (
		b1.left <= b2.right &&
		b1.right >= b2.left &&
		b1.top <= b2.bottom && b1.bottom >= b2.top
	  )
	}
	
	/**
	 * Create the bounding box and assign id for this Entity
	 * @param {number} xPos
	 * @param {number} yPos
	 * @param {number} width
	 * @param {number} height if no height is supplied, width is used.
	 */
	constructor(xPos, yPos, width, height = width) {
	  this.xPos = xPos
	  this.yPos = yPos
	  this.bounds = new BoundingBox(xPos, yPos, width, height);
	  this.id = (Math.random() * 65535).toString(16);
	}
}
  
/**
 * PlayerEntity class  
 * Extends the Entity with:  
 * @member Color: an object with RGBA values 
 */
class PlayerEntity extends Entity {
	Color = { R: 200, G: 0, B: 0, A: 255 }
  
	constructor(xPos, yPos, width, height) {
	  super(xPos, yPos, height, width)
	}
  
	update() {
	  var nextX = mouseX
	  if (nextX <= 0) nextX = 0
	  if (nextX + this.bounds.width >= width) nextX = width - this.bounds.width
	  this.xPos = nextX
	  this.yPos = height - this.bounds.height
	  super.update()
	}
  
	draw() {
	  fill(this.Color.R, this.Color.G, this.Color.B, this.Color.A)
	  stroke("black")
	  rect(
		this.bounds.left,
		this.bounds.top,
		this.bounds.width,
		this.bounds.height
	  )
	}
}
  
/**
 * Drink class
 * Extends the Entity class with:
 * 
 */
class Drink extends Entity {
	static width = 20;
	static height = 60;
	color = { R: 0, G: 200, B: 0, A: 255 }
	fallSpeed = 5
  
	constructor(xPos, yPos) {
		super(xPos, yPos, Drink.width, Drink.height)
		this.Texture = textures.boga;
	}
  
	update() {
		//Gravity
		this.yPos += this.fallSpeed
		//Ensure still in playfield
		if(this.yPos > height){
			this.kill()
		}
	  	super.update()
	  	if (this.isCollidingWith(Player) && this.color.A > 0) {
			this.color.A = 0
			sounds.b.setVolume(0.5);
			sounds.b.rate(1.5);
			sounds.b.play();
			this.kill()
	  	}
	  	else{
			this.draw();
	  	}
	}
  
	draw() {
		fill(this.color.R, this.color.G, this.color.B, this.color.A)
		texture(this.Texture);
		rect(
			this.bounds.left,
			this.bounds.top,
			this.bounds.width,
			this.bounds.height
	  	);
	}

	/**
	 * Modify gravity function
	 * @param {Number} newVal The new gravity
	 * @returns a clone of the object, for easily modifying on init.
	 */
	updateFallSpeed(newVal){
		this.fallSpeed = newVal;
		return this;
	}

	/**
	 * Helper for culling from entity tracker
	 */
	kill(){
		Drinks.delete(this.ID);
	}
}

/**
 * Bottle class
 */
class Bottle extends Drink {
	static width = 22.85;
	static height = 60;

	constructor(xPos, yPos) {
		super(xPos, yPos, Drink.width, Drink.height)
		this.Texture = textures.boga;
	}
}
  