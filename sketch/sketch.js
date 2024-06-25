//Global variables
let Player;
let Drinks;
let CanvasContext;

let GameFlags = {
	GredosLevel: 0,
	MaxGredos: 3
}

//Global media containers
let Sounds;
let Textures = {
	boga: "",
	granges: "",
	gredos: "",
	korg: "",
	pripps_b: "",
	pripps: "",
	vagn: "",
	dovicon: "",
}

let Fonts = {
	marker: ""
}

function preload() {
	soundFormats("wav");
	Sounds = {
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
	
	//Load textures based on the key-names already defined in the Textures object.
	//Failure callback perhaps temporary, PNG file format is a must for alpha layer.
	for (let key in Textures) {
		Textures[key] = loadImage("./resource/img/"+[key]+".png", null, () => {
			Textures[key] = loadImage("./resource/img/"+[key]+".jpg");
		});
	}

	//Load fonts based on the key-names already defined in the Fonts object.
	//Failure callback perhaps temporary, PNG file format is a must for alpha layer.
	Fonts.marker = loadFont("./resource/font/marker.ttf");


}	

//A GameState is represented by a draw function.
//The draw function must be overriden whenever the state is changed.
//This is the reason for the GameStates.set() function.
const GameStates = {
	set: (state) => {GameState = state; draw = GameState},
	menu: MenuDraw,
	game: GameDraw,
}

//Set initial GameState
let GameState = GameStates.menu;

//Overrides the draw function in order to facilitate GameState system
var draw = GameState;

function setup() {
  // Phone or desktop? Retain a 9:16 ratio regardless
  VectorZero = createVector(0,0);
  var displayRatio = 9 / 16;
  var wH = windowHeight;
  var wW = wH * displayRatio;
  
  //Create the P5 canvas and bind it to a canvas element wrapper
  var x = createCanvas(wW, wH, "webgl");
  //Global variable
  CanvasContext = new CanvasEffectContext(x);

  //Register handler to click event
  x.mouseClicked(clickHandler);

  //Create player and drink entity list. Global variables.
  Player = new PlayerEntity(0, height - 50, 80);
  Drinks = new Map();
}

//DrinkManager keeps track of when to spawn drinks and which callback to execute on spawntime.
let DrinkManager = {
	can: {
		ticker: 0,
		trigger: 20,
		callback: spawnCan
	},
	bottle: {
		ticker: 0,
		trigger: 75,
		callback: spawnBottle,
	},
	bib: {
		ticker: 0,
		trigger: 100,
		callback: spawnBib,
	}
}

/**
 * onClick handler for debugging
 */
function clickHandler() {
	//Initialize game
	if (GameState == GameStates.menu){
		MenuFadeOut();
	}
	else if (GameState == GameStates.game){
		//Debug function
		spawnCan(mouseX);
		Sounds.bouw.play();
		console.log("New Bottle placed:", mouseX, mouseY);
	}
}

/**
 * Helper for spawning a can
 * @param {Number} optionalX An optional x-value to set, instead of randomized value.
 */
function spawnCan(optionalX){
	//Determine the texture
	let availableTex = [Textures.pripps, Textures.pripps_b, Textures.boga]
	//Hack to ensure no negative indeces are chosen.
	let randomIndex = Math.max(0, Math.floor(Math.random() * availableTex.length - 0.00001));
	let tex = availableTex[randomIndex];
	//Determine x-coordinate
	let margin = 5;
	let maxLeft = width - (Can.WIDTH + margin); //Determines the maximum value for Bounds.left of the entity to not spawn out of bounds
	let xPos = !optionalX ? Math.random() * maxLeft : optionalX;
	let yPos = 0 - Can.WIDTH * Can.SizeRatio(tex); //Ensures drink is spawned above screen edge

	//Determine the fall speed
	let speedSpread = 1.25
	var newCan = new Can(xPos, yPos, tex).UpdateFallSpeed(Can.BASEFALLSPEED + ((Math.random() * speedSpread) - (speedSpread/2)));
	Drinks.set(newCan.ID, newCan);
	Sounds.bouw.play();
}

/**
 * Helper for spawning a bottle
 * @param {Number} optionalX An optional x-value to set, instead of randomized value.
 */
function spawnBottle(optionalX){
	//Determine the texture
	let availableTex = [Textures.granges]
	//Hack to ensure no negative indeces are chosen.
	let randomIndex = Math.max(0, Math.floor(Math.random() * availableTex.length - 0.00001));
	let tex = availableTex[randomIndex];
	//Determine x-coordinate
	let margin = 5;
	let maxLeft = width - (Bottle.WIDTH + margin);
	let xPos = !optionalX ? Math.random() * maxLeft : optionalX;
	let yPos = 0 - Bottle.WIDTH * Bottle.SizeRatio(tex);

	//Determine the fall speed
	let speedSpread = 2.5
	var newBottle = new Bottle(xPos, yPos, tex).UpdateFallSpeed(Bottle.BASEFALLSPEED + ((Math.random() * speedSpread) - (speedSpread/2)));
	Drinks.set(newBottle.ID, newBottle);
	Sounds.bouw.play();
}

/**
 * Helper for spawning a bib
 * @param {Number} optionalX An optional x-value to set, instead of randomized value.
 */
function spawnBib(optionalX){
	//Determine the texture
	let availableTex = [Textures.gredos]
	//Hack to ensure no negative indeces are chosen.
	let randomIndex = Math.max(0, Math.floor(Math.random() * availableTex.length - 0.00001));
	let tex = availableTex[randomIndex];

	//Determine x-coordinate
	let margin = 5;
	let maxLeft = width - (Bib.WIDTH + margin);
	let xPos = !optionalX ? Math.random() * maxLeft : optionalX;
	let yPos = 0 - Bib.WIDTH * Bib.SizeRatio(tex);

	//Determine the fall speed
	let speedSpread = 2.5
	var newBib = new Bib(xPos, yPos, tex).UpdateFallSpeed(Bib.BASEFALLSPEED + ((Math.random() * speedSpread) - (speedSpread/2)));
	Drinks.set(newBib.ID, newBib);
	Sounds.bouw.play();
}
