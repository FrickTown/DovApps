/**
 * PlayerEntity class
 * Extends the Entity with:
 * @member Color: an object with RGBA values
 */
class PlayerEntity extends Entity {

	Color = color(255, 20, 96, 255);
	TargetColor = color(255, 20, 96, 255);

	SizeRatio;
	ActiveEffects = new Map();

	GredosLevel = 0;
	GredosPowerDuration = 5000;
	GredosColor = color(86, 170, 22, 255);

	StandardWidth = 0;
	TargetWidth = 0;

	constructor(xPos, yPos, width) {
		// Last parameter not used for the player entity, only relevant for other entities.
		super(xPos, yPos, width, width);
		this.Texture = Textures.korg_nocolor;
		this.SizeRatio = this.Texture.height / this.Texture.width;
		this.Bounds.height = this.Bounds.width * this.SizeRatio;
		this.StandardWidth = this.Bounds.width;
		this.TargetWidth = this.Bounds.width;
	}

	Update() {
		if(this.Bounds.width != this.TargetWidth){
			this.Bounds.width = ApproachNumber(this.Bounds.width, this.TargetWidth, 6);
			this.Bounds.height = this.Bounds.width * this.SizeRatio;
		}
		if(this.TargetColor.toString() != this.Color.toString()){
			this.Color = lerpColor(this.Color, this.TargetColor, 0.8);
		}
		// Buffer the X position of most recent touch.x or mouseX pos, ensure it's in bounds.
		var nextX;
		if (GameFlags.TouchScreen){
			//If no touches are registered, just use last known safe X-pos
			if (touches.length == 0)
				nextX = this.X;
			else
				nextX = touches[0].x;
		}
		else {
			nextX = mouseX;
		}
		if (nextX <= 0) nextX = 0;
		if (nextX + this.Bounds.width >= width) nextX = width - this.Bounds.width;

		// Apply positional changes
		this.X = nextX;
		this.Y = height - this.Bounds.height;
		this.ActiveEffects.forEach(element => {
			element.Update();
		});
		//Ancestor's 
		super.Update();
	}

	Draw() {
		fill(this.Color);
		noStroke();
		tint(this.Color);
		texture(this.Texture);
		rect(
			this.Bounds.left,
			this.Bounds.top,
			this.Bounds.width,
			this.Bounds.height
		);
		tint(255, 255, 255, 255);
	}

	ActivateGredosPower() {
		if(this.GredosLevel >= GameFlags.MaxGredos){
			this.GredosLevel = 0;
			//Clear any alertbubbles if they're on the screen
			CanvasContext.ActiveEffects = new Map();
			this.TargetWidth = this.StandardWidth * 2;
			this.TargetColor = this.GredosColor;
			setTimeout(() => {
				this.TargetWidth = this.StandardWidth;
				this.TargetColor = color(255, 255, 255, 255);
			}, 5000);
		}
	}
}

class StatusEffect {
    ID;
    LifeTime;
	Parent;
    constructor(){
        this.LifeTime = 1;
        this.ID = (Math.random() * 65535).toString(16);
    }
	Update(){
		this.LifeTime -= 1;
		if(this.LifeTime <= 0){
			this.Kill();
		}
	}
	    
    Kill(){
		if(this.Parent){
			this.Parent.ActiveEffects.delete(this.ID);
		}
    }
}

class Invulnerable extends StatusEffect {
	
	constructor(parent, lifeTime){
		super();
		this.LifeTime = lifeTime;
		this.LifeTime = 2843.48;
		this.Parent = parent;
		this.Parent.ActiveEffects.set(this.ID, this);
	}
	Update(){
		this.LifeTime -= 21.22;

		if(this.LifeTime <= 0){
			this.Kill();
			this.Parent.Color.A = 255;
			return;
		}

		let thisTick = ((te) => { return Math.sign(sin(Math.pow(te/10000, -1))); })(this.LifeTime);
		console.log(thisTick);
		this.Parent.Color.A = 255 * thisTick;

	}
}
