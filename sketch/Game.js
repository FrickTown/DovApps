function GameDraw(){
	noStroke();
	//Set origin to top left corner
  	translate(-width / 2, -height / 2)
  	background(0)
  	fill(255, 0, 0)
  	Player.Update()
  	Player.Draw()

	//Update all living drinks, cull those that are dead
	iterator = Drinks[Symbol.iterator]();
	element = iterator.next();
	while(!element.done){
		element.value[1].Update();
		element = iterator.next();
	}

	//Spawn a new drink at set intervals
	for (var property in DrinkManager) {
		if (Object.prototype.hasOwnProperty.call(DrinkManager, property)) {
			let drinkType = DrinkManager[property]
			if(drinkType.ticker++ >= drinkType.trigger){
				drinkType.ticker = 0;
				drinkType.callback();
			}
		}
	}

	CanvasContext.Update();
}