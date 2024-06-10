/**
 * Drink class
 * Extends the Entity class with:
 *
 */
class Drink extends Entity {
	static width = 20;
	static height = 60;
	color = { R: 0, G: 200, B: 0, A: 255 };
	fallSpeed = 5;

	constructor(xPos, yPos) {
		super(xPos, yPos, Drink.width, Drink.height)
		this.Texture = textures.boga
	}

	update() {
		//Gravity
		this.Y += this.fallSpeed
		//Ensure still in playfield
		if (this.Y > height) {
			console.log("Height kill")
			this.kill()
		}
		super.update()
		if (this.isCollidingWith(Player) && this.color.A > 0) {
			console.log("Height kill")
			this.color.A = 0
			sounds.b.setVolume(0.5)
			sounds.b.rate(1.5)
			sounds.b.play()
			this.kill()
		}
		else {
			this.draw()
		}
	}

	draw() {
		fill(this.color.R, this.color.G, this.color.B, this.color.A)
		texture(this.Texture)
		rect(
			this.Bounds.left,
			this.Bounds.top,
			this.Bounds.width,
			this.Bounds.height
		)
	}

	/**
	 * Modify gravity function
	 * @param {Number} newVal The new gravity
	 * @returns a clone of the object, for easily modifying on init.
	 */
	updateFallSpeed(newVal) {
		this.fallSpeed = newVal
		return this
	}

	/**
	 * Helper for culling from entity tracker
	 */
	kill() {
		Drinks.delete(this.ID)
	}
}
/**
 * Bottle class
 */
class Bottle extends Drink {
	static width = 22.85;
	static height = 60;

	constructor(xPos, yPos) {
        var tex = textures.granges;
        var SizeRatio = tex.height / tex.width;
		super(xPos, yPos, Bottle.width, Bottle.width * SizeRatio)
		//this.Texture = textures.granges;
        //this.SizeRatio = this.Texture.height / this.Texture.width;
        console.log(this.SizeRatio, Bottle.height / Bottle.width)
        //this.Bounds.width = this.Texture.width * this.SizeRatio;
	}
}
/**
 * Can class
 */
class Can extends Drink {
	static width = 22.85;
	static height = 60;

	constructor(xPos, yPos) {
		super(xPos, yPos, Can.width, Can.height)
		this.Texture = textures.boga
	}
}
