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
	X;
	Y;

	static SizeRatio = (tex) => { return !tex ? 1 : tex.height / tex.width; }

	//super update, should be called when bounding box changes have been made.
	Update() {
	  this.Bounds.update(this.X, this.Y)
	}

	/**
	 * Collision check with other Entities (or inheritors)
	 * @param {Entity} otherEntity 
	 * @returns (boolean)
	 */
	isCollidingWith(otherEntity) {
	  var b1 = this.Bounds
	  var b2 = otherEntity.Bounds
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
	  this.X = xPos
	  this.Y = yPos
	  this.Bounds = new BoundingBox(xPos, yPos, width, height);
	  this.ID = (Math.random() * 65535).toString(16);
	}
}

/**
 * Bounding box class for spatial calculations
 */
class BoundingBox {
	constructor(x, y, w, h) {
	  	this.left = x;
	  	this.top = y;
	  	this.right = x + w;
	  	this.bottom = y + h;
	  	this.width = w;
	  	this.height = h;
	}
  
	update(newX, newY) {
		this.left = newX;
	  	this.top = newY;
	  	this.right = newX + this.width;
	  	this.bottom = newY + this.height;
	}
}