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
 */
class Entity {
	//super update, should be called when bounding box changes have been made
	update() {
	  this.bounds.update(this.xPos, this.yPos)
	}

	//Collision check
	isCollidingWith(otherEntity) {
	  var b1 = this.bounds
	  var b2 = otherEntity.bounds
	  return (
		b1.left <= b2.right &&
		b1.right >= b2.left &&
		b1.top <= b2.bottom && b1.bottom >= b2.top
	  )
	}
	
	//Create the bounding box for this entity.
	//If no height is supplied, width is used.
	constructor(xPos, yPos, width, height = width) {
	  this.xPos = xPos
	  this.yPos = yPos
	  this.bounds = new BoundingBox(xPos, yPos, width, height);
	}
}
  
/**
 * Player class
 */
class Player extends Entity {
	color = { R: 200, G: 0, B: 0, A: 255 }
  
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
	  fill(this.color.R, this.color.G, this.color.B, this.color.A)
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
 * Bottle class
 */
class Bottle extends Entity {
	static width = 10
	static height = 30
	color = { R: 0, G: 200, B: 0, A: 255 }
	fallSpeed = 5
  
	constructor(xPos, yPos) {
	  super(xPos, yPos, Bottle.width, Bottle.height)
	}
  
	update() {
		//Gravity
		this.yPos += this.fallSpeed
		//Ensure still in playfield
		if(this.yPos > height){
			console.warn("yes", bottles.indexOf(this));
			bottles.splice(bottles.indexOf(this), 1);
		}
	  	super.update()
	  	if (this.isCollidingWith(player) && this.color.A > 0) {
			this.color.A = 0
			sounds.b.setVolume(0.5);
			sounds.b.rate(1.5);
			sounds.b.play();
			bottles.splice(bottles.indexOf(this), 1);
	  	}
	  	else{
			this.draw();
	  	}
	}
  
	draw() {
	  fill(this.color.R, this.color.G, this.color.B, this.color.A)
	  if (this.color.A == 0) noStroke()
	  else stroke("black")
	  rect(
		this.bounds.left,
		this.bounds.top,
		this.bounds.width,
		this.bounds.height
	  )
	}

	updateFallSpeed(newVal){
		this.fallSpeed = newVal;
		return this;
	}
}
  