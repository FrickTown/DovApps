class UIElement {
    ID;
    LifeTime;
    constructor(){
        this.LifeTime = 1;
        this.ID = (Math.random() * 65535).toString(16);
    }
        
    Kill(){
        CanvasContext.ActiveEffects.delete(this.ID);
    }
}

class ScoreKeeper extends UIElement {
    ID = "scoreKeeper";
    LifeTime = -1;

    Draw(){
        //Drawing context
        push();
        textFont(Fonts.marker);
        textAlign(RIGHT);
        textSize(20);
        text("Score: " + GameState.Score);
    }
}

class AlertBubble extends UIElement {
    constructor(){
        super();
        //Add the bubble to the list of active effects
        CanvasContext.ActiveEffects.set(this.ID, this);
        this.LifeTime = 250;
    }
}

class MeterPopup extends AlertBubble {

    GredosBarMaxWidth;

    constructor(){
        super();
        // Ensure the gredos meter is in bounds
        this.GredosBarMaxWidth = width/2;
    }
    

    Draw(){
        //Drawing context
        push();
            //Center the bubble
            translate(width/2, height/3)

            //Static text
            textFont(Fonts.marker);
            textAlign(CENTER);
            fill(255, 255, 255, this.LifeTime);
            textSize(35);
            text("GredosPower:", 0, 0);
            if (Player.GredosLevel == GameFlags.MaxGredos){
                textSize(20);
                text("Startklar och Gredo", 0, 35);
                let helpText = GameFlags.TouchScreen ? "Aktivera med två fingrar på skärmen" : "Dubbelklicka för att aktivera";
                textSize(12);
                text(helpText, 0, 90);
                translate(0, 25);
            }

            //Gredos-bar
            stroke(255, 255, 255, this.LifeTime);
            strokeWeight(2);
            noFill();
            rectMode(CENTER);
            rect(0, 35, this.GredosBarMaxWidth, 15);
            fill(137, 224, 65, this.LifeTime);
            rectMode(CENTER);
            rect(0, 35, (this.GredosBarMaxWidth/GameFlags.MaxGredos) * Player.GredosLevel, 15);
        pop();
        
        //Apply life drain, kill if past life limit.
        this.LifeTime -= 2;
        if(this.LifeTime <= 0){
            this.Kill();
        }
    }
}

class PowerPopup extends AlertBubble {
    constructor(){
        super();
    }

    Draw(){
        //Drawing context
        push();
            //Center the bubble
            translate(width/2, height/3)

            //Static text
            textFont(Fonts.marker);
            textAlign(CENTER);
            fill(255, 255, 255, this.LifeTime);
            textSize(40);
            text("GredosPower: UNLEASHED");
        pop();
        
        //Apply life drain, kill if past life limit.
        this.LifeTime -= 2;
        if(this.LifeTime <= 0){
            this.Kill();
        }
    }
}