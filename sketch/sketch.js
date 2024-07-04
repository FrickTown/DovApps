//Global variables
let Player;
let Drinks;
let CanvasContext;

let GameFlags = {
	GredosLevel: 0,
	MaxGredos: 6
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
		b: (() => {
			var x = loadSound("./resource/sfx/Electronic high shot");
			x.setVolume(0.25);
			x.rate(0.75);
			return x;
		})(),
		bouw: (() => {
			var x = loadSound("./resource/sfx/bouw");
			x.setVolume(0.1);
			x.rate(1.1);
			return x;
		})(),
		klirr: (() => {
			var x = loadSound("./resource/sfx/klirr");
			x.setVolume(0.1);
			x.rate(1.1);
			return x;
		})(),
		swoosh: (() => {
			var x = loadSound("./resource/sfx/swoosh");
			x.setVolume(0.1);
			x.rate(2);
			return x;
		})(),
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