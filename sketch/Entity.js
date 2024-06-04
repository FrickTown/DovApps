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
	update() {
	  this.bounds.update(this.xPos, this.yPos)
	}
  
	isCollidingWith(otherEntity) {
	  var b1 = this.bounds
	  var b2 = otherEntity.bounds
	  return (
		b1.left <= b2.right &&
		b1.right >= b2.left &&
		b1.top <= b2.bottom && b1.bottom >= b2.top
	  )
	}
  
	constructor(xPos, yPos, width, height = width) {
	  this.xPos = xPos
	  this.yPos = yPos
	  this.bounds = new BoundingBox(xPos, yPos, width, height)
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
	  this.yPos += this.fallSpeed
	  super.update()
	  if (this.isCollidingWith(player)) {
		this.color.A = 0
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
  }
  