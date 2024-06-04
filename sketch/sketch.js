var player
var bottles
var trash

var sounds

function preload() {
	soundFormats("wav");
	sounds = {
		a: loadSound("./sfx/hightom")
	}
}

function setup() {
  // Phone or desktop?
  var displayRatio = 16 / 9
  var wH = windowHeight
  var wW = wH * (1 / displayRatio)
  var x = createCanvas(wW, wH, "webgl")
  x.mouseClicked(clickHandler)
  player = new Player(0, height - 50, 50, 50)
  bottles = []
  trash = []
}

function draw() {
  fill("red");
  rect(0, 0, 200, 200);
  translate(-width / 2, -height / 2)
  background(220)
  fill(255, 0, 0)
  player.update()
  player.draw()
  bottles.forEach(element => {
    element.update()
    element.draw()
  })
}

function clickHandler() {
  bottles.push(new Bottle(mouseX, mouseY))
  sounds.a.play()
  console.log("New Bottle placed:", mouseX, mouseY)
}

class Point {
  constructor(x, y) {
    this.X = x
    this.Y = y
  }
}
