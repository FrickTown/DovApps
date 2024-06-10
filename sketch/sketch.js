//Global variables
let Player;
let Drinks;

//Global media containers
let sounds;
let textures = {
	boga: "",
	granges: "",
	gredos: "",
	korg: "",
	pripps_b: "",
	pripps: "",
	vagn: "",
}

function preload() {
	soundFormats("wav");
	sounds = {
		//Modify properties on load
		a: (() => {
			var x = loadSound("./resource/sfx/hightom");
			x.setVolume(0.25);
			x.rate(1.25);
			return x;
		})(),
		//Simplest case
		b: loadSound("./resource/sfx/Electronic high shot"),
		bouw: (() => {
			var x = loadSound("./resource/sfx/bouw");
			x.setVolume(0.2);
			x.rate(1.5);
			return x;
		})()
	};
	
	//Load textures based on the key-names already defined in the textures object.
	//Failure callback perhaps temporary, PNG file format is a must for alpha layer.
	for (let key in textures) {
		textures[key] = loadImage("./resource/img/"+[key]+".png", null, () => {
			textures[key] = loadImage("./resource/img/"+[key]+".jpg");
		});
	}
}

function setup() {
  // Phone or desktop? Retain a 9:16 ratio regardless
  var displayRatio = 9 / 16;
  var wH = windowHeight;
  var wW = wH * displayRatio;
  var x = createCanvas(wW, wH, "webgl");
  x.mouseClicked(clickHandler);
  Player = new PlayerEntity(0, height - 50, 80);
  Drinks = new Map();
  trash = [];
}

let ticker = 0;
let tickTrigger = 20;

function draw() {
	noStroke();
	//Set origin to top left corner
  	translate(-width / 2, -height / 2)
  	background(0)
  	fill(255, 0, 0)
  	Player.update()
  	Player.draw()

	//Update all living drinks, cull those that are dead
	iterator = Drinks[Symbol.iterator]();
	element = iterator.next();
	while(!element.done){
		element.value[1].update();
		element = iterator.next();
	}

	//Spawn a new bottle at set itervals
	if(ticker++ >= tickTrigger){
		ticker = 0;
		spawnBottle();
	}
}

/**
 * onClick handler for debugging
 */
function clickHandler() {
	//Debug function
  spawnBottle(mouseX);
  sounds.bouw.play();
  console.log("New Bottle placed:", mouseX, mouseY);
}

/**
 * Helper for spawning a drink
 * @param {Number} optionalX An optional x-value to set, instead of randomized value.
 */
function spawnBottle(optionalX){
	//Determine x-coordinate
	let margin = 5;
	let maxLeft = width - (Bottle.width + margin);
	let xPos = !optionalX ? Math.random() * maxLeft : optionalX;
	let yPos = 0 - Bottle.height;

	//Determine the fall speed
	let baseSpeed = 5;
	let speedSpread = 2.5
	var newBottle = new Bottle(xPos, yPos).updateFallSpeed(baseSpeed + Math.random() * speedSpread);
	Drinks.set(newBottle.ID, newBottle);
	sounds.bouw.play();
}