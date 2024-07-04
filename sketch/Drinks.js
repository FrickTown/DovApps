/**
 * Drink class
 * Extends the Entity class with:
 *
 */
class Drink extends Entity {
	static WIDTH = 20;
	static HEIGHT = 60;
	Color = { R: 0, G: 200, B: 0, A: 255 };
	FallSpeed = 5;

	constructor(xPos, yPos, width, height) {
		super(xPos, yPos, width, height);
		this.Texture = Textures.boga;
	}

	Update() {
		//Gravity
		this.Y += this.FallSpeed;
		//Ensure still in playfield
		if (this.Y > height) {
			//console.log("Height kill")
			this.Kill()
		}
		super.Update()
		if (this.isCollidingWith(Player) && this.Color.A > 0) {
			//console.log("Player kill")
			this.OnPlayerCatch();
		}
		else {
			this.Draw()
		}
	}

	Draw() {
		fill(this.Color.R, this.Color.G, this.Color.B, this.Color.A)
		if(!this.Texture || this.Texture == "none"){
			this.Texture = Textures.korg;
		}
		texture(this.Texture)
		rect(
			this.Bounds.left,
			this.Bounds.top,
			this.Bounds.width,
			this.Bounds.height
		)
	}

	OnPlayerCatch(){
		this.Color.A = 0;
		this.Kill();
		this.CatchCallback();
	}

	CatchCallback(){
		return;
	}

	/**
	 * Modify gravity function
	 * @param {Number} newVal The new gravity
	 * @returns a clone of the object, for easily modifying on init.
	 */
	UpdateFallSpeed(newVal) {
		this.FallSpeed = newVal;
		return this;
	}

	/**
	 * Helper for culling from entity tracker
	 */
	Kill() {
		Drinks.delete(this.ID)
	}
}

/**
 * Can class
 */
class Can extends Drink {
	static WIDTH = 22.85;
	static BASEFALLSPEED = 10;
	constructor(xPos, yPos, tex) {
		super(xPos, yPos, Can.WIDTH, Can.WIDTH * Entity.SizeRatio(tex));
		this.Texture = tex;
	}
	CatchCallback(){
		Sounds.swoosh.play();
	}
}

/**
 * Bottle class
 */
class Bottle extends Drink {
	static WIDTH = 22.85;
	static BASEFALLSPEED = 12.5;
	constructor(xPos, yPos, tex) {
		super(xPos, yPos, Bottle.WIDTH, Bottle.WIDTH * Entity.SizeRatio(tex))
		this.Texture = tex;
	}
	CatchCallback(){
		Sounds.swoosh.rate(2 + Math.random() * 0.25);
		Sounds.swoosh.play();
	}
}

/**
 * Bib class
 */
class Bib extends Drink {
	static WIDTH = 50.85;
	static BASEFALLSPEED = 15;

	StarEffect;

	constructor(xPos, yPos, tex) {
		super(xPos, yPos, Bib.WIDTH, Bib.WIDTH * Entity.SizeRatio(tex));
		this.Texture = tex;
		this.StarEffect = new StarEntity(this.Bounds.left + this.Bounds.width/2, this.Bounds.top + this.Bounds.height/2, 50);
	}

	Draw(){
		this.StarEffect.update(this.Bounds.center());
		this.StarEffect.draw();
		texture(this.Texture);
		rect(
			this.Bounds.left,
			this.Bounds.top,
			this.Bounds.width,
			this.Bounds.height
		);
	}

	CatchCallback(){
		CanvasContext.ShakeScreen(0, 1, 50);
		//Only increase the GredosLevel if we're not at the level cap yet
		GameFlags.GredosLevel = GameFlags.GredosLevel + 1 > GameFlags.MaxGredos ? GameFlags.MaxGredos : GameFlags.GredosLevel + 1;
		//Gradually increase the pitch of the Bib catch noise for GredosLevel
		Sounds.b.rate(1 + ((1/GameFlags.MaxGredos) * GameFlags.GredosLevel));
		Sounds.b.play();
		if(GameFlags.GredosLevel == GameFlags.MaxGredos){
			var x = new p5.Reverb();
			x.process(Sounds.a, 3, 2);
			x.drywet(1);
			Sounds.a.disconnect();
			Sounds.a.play();
		}
		new AlertBubble();
	}
}