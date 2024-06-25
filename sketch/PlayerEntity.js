/**
 * PlayerEntity class
 * Extends the Entity with:
 * @member Color: an object with RGBA values
 */
class PlayerEntity extends Entity {

	Color = { R: 200, G: 0, B: 0, A: 255 };
	SizeRatio = 1.0;

	constructor(xPos, yPos, width) {
		super(xPos, yPos, width, width);
		this.Texture = Textures.korg;
		this.SizeRatio = this.Texture.height / this.Texture.width;
		this.Bounds.height = this.Bounds.width * this.SizeRatio;
	}

	Update() {
		var nextX = mouseX;
		if (nextX <= 0) nextX = 0;
		if (nextX + this.Bounds.width >= width) nextX = width - this.Bounds.width;
		this.X = nextX;
		this.Y = height - this.Bounds.height;
		//Ancestor's 
		super.Update();
	}

	Draw() {
		fill(this.Color.R, this.Color.G, this.Color.B, this.Color.A);
		stroke("black");
		texture(Textures.korg);
		rect(
			this.Bounds.left,
			this.Bounds.top,
			this.Bounds.width,
			this.Bounds.height
		);
	}
}
