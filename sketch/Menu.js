let MenuFade = false;
let MenuScale = 1;

function MenuDraw() {
    noStroke();
	//Set origin to top left corner
  	translate(-width / 2, -height / 2)
    background(0,0,0);

    if(MenuFade)
        MenuScale *= 1.25;

    push();
        translate(0, 0, MenuScale);
        //Load icon texture and display it
        texture(Textures.dovicon);
        let tWidth = Textures.dovicon.width;
        let tHeight = Textures.dovicon.height;
        rect(width/2 - tWidth/2, height/2 - tHeight, tWidth, tHeight);

        //Load text font and draw text
        textFont(Fonts.marker);
        textAlign(CENTER);
        textSize(30);
        text("DovStrip: Alkis Edition", width/2, (height/4) * 2.25);
        textSize(65)
        text("Lira", width/2, (height/4) * 3);
    pop();
}

function MenuFadeOut() {
    setTimeout(() => {
        GameStates.set(GameStates.game);
    }, 500);
    MenuFade = true;
}