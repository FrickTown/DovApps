class UIElement {
    ID;
    LifeTime;
    constructor(){
        this.LifeTime = 1;
        this.ID = (Math.random() * 65535).toString(16);
    }
}

class AlertBubble extends UIElement {
    constructor(){
        super();
        this.LifeTime = 250;
        CanvasContext.ActiveEffects.set(this.ID, this);
        GameFlags.GredosLevel = GameFlags.GredosLevel + 1 > GameFlags.MaxGredos ? GameFlags.MaxGredos : GameFlags.GredosLevel + 1;
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
            text("GredosLevel:", 0, 0);

            //Gredos-bar
            stroke(255, 255, 255, this.LifeTime);
            strokeWeight(2);
            noFill();
            rectMode(CENTER);
            rect(0, 35, 100 * GameFlags.MaxGredos, 15);
            fill(255, 0, 0, this.LifeTime);
            rectMode(CENTER);
            rect(0, 35, 100 * GameFlags.GredosLevel, 15);
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