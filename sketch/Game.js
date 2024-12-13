
function GameDraw(){
	noStroke();
	//Set origin to top left corner
  	translate(-width / 2, -height / 2)
  	background(0)
  	fill(255, 0, 0)
  	Player.Update();
  	Player.Draw();

	//Update all living drinks, cull those that are dead
	//Iterate through the map, Update them linearly
	iterator = Drinks[Symbol.iterator]();
	element = iterator.next();
	while(!element.done){
		element.value[1].Update();
		element = iterator.next();
	}

	//Spawn a new drink at set intervals by iterating through the DrinkManager's available tabs
	for (var property in DrinkManager) {
		if (Object.prototype.hasOwnProperty.call(DrinkManager, property)) {
			let drinkType = DrinkManager[property]
			if(drinkType.ticker++ >= drinkType.trigger){
				drinkType.ticker = 0;
				drinkType.callback();
			}
		}
	}

	//Draw all the UI elements and update the canvas context properties.
	CanvasContext.Update();
	//startest.draw();
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
