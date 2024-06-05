var player;
var bottles;
var trash;

var sounds;

function preload() {
	soundFormats("wav");
	sounds = {
		a: (() => {
			var x = loadSound("./sfx/hightom");
			x.setVolume(0.25);
			x.rate(1.25);
			return x;
		})(),
		b: loadSound("./sfx/Electronic high shot"),
		bouw: (() => {
			var x = loadSound("./sfx/bouw");
			x.setVolume(0.2);
			x.rate(1.5);
			return x;
		})()
	};
}

function setup() {
  // Phone or desktop? Retain a 9:16 ratio regardless
  var displayRatio = 9 / 16;
  var wH = windowHeight;
  var wW = wH * displayRatio;
  var x = createCanvas(wW, wH, "webgl");
  x.mouseClicked(clickHandler);
  player = new Player(0, height - 50, 50, 50);
  bottles = [];
  trash = [];
}

let ticker = 0;
let tickTrigger = 20;

function draw() {
  	fill("red");
  	rect(0, 0, 200, 200);
  	translate(-width / 2, -height / 2)
  	background(0)
  	fill(255, 0, 0)
  	player.update()
  	player.draw()
  	var i = 0;
  	while(bottles.length > 0 && bottles[i]){
		if (bottles[i].update()){
			i++;
		}
		else {
			
		}
  	}

	if(ticker++ >= tickTrigger){
		ticker = 0;
		spawnBottle();
	}
}

function clickHandler() {
	//Debug function
  bottles.push(new Bottle(mouseX, mouseY));
  sounds.bouw.play();
  console.log("New Bottle placed:", mouseX, mouseY);
}

function spawnBottle(){
	//Determine x-coordinate
	let margin = 5;
	let maxLeft = width - (Bottle.width + margin);
	let xPos = Math.random() * maxLeft;
	let yPos = 0;

	//Determine the fall speed
	let baseSpeed = 5;
	let speedSpread = 2.5
	bottles.push(
		new Bottle(xPos, yPos)
		.updateFallSpeed(baseSpeed + Math.random() * speedSpread));
	sounds.bouw.play();
}