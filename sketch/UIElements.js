class UIElement {
    ID;
    LifeTime;
    constructor(){
        this.LifeTime = 1;
        this.ID = (Math.random() * 65535).toString(16);
    }
}

class AlertBubble extends UIElement {

    GredosBarMaxWidth;

    constructor(){
        super();
        this.LifeTime = 250;
        this.GredosBarMaxWidth = width/2;
        //Add the bubble to the list of active effects
        CanvasContext.ActiveEffects.set(this.ID, this);
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
            if (GameFlags.GredosLevel == GameFlags.MaxGredos){
                textSize(20);
                text("Startklar och Gredo", 0, 35);
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
            rect(0, 35, (this.GredosBarMaxWidth/GameFlags.MaxGredos) * GameFlags.GredosLevel, 15);
        pop();
        
        //Apply life drain, kill if past life limit.
        this.LifeTime -= 2;
        if(this.LifeTime <= 0){
            this.Kill();
        }
    }
    
    Kill(){
        CanvasContext.ActiveEffects.delete(this.ID);
    }
}