class CanvasEffectContext {
    VectorZero;
    p5;
    dom;
    relativePos;
    rotation;

    ActiveEffects = new Map();

    constructor(p5canvas){
        this.p5 = p5canvas;
        this.dom = p5canvas.elt;
        this.relativePos = createVector(0, 0);
        this.VectorZero = createVector(0, 0);
        this.rotation = 0;
    }
    /**
     * Send the canvas in a direction specified by the vector argument (intended to be normalized),
     * and with a power specified by the scale argument
     * @param {Object} context
     * @param {p5.Vector} vector
     * @param {Number} scale
     * @param {Number} duration
     */
    ShakeScreen = function(x, y, scale){
        this.relativePos.add(createVector(x, y).mult(scale));
    }
    
    /**
     * 
     * @param {*} context 
     */
    Update = function(){
        if (!this.relativePos.equals(this.VectorZero)){
            if (this.relativePos.mag() < 2){
                this.relativePos.set(0, 0);
            }
            this.relativePos.lerp(VectorZero, 0.2);
        }
        //Set the CSS transform properties based on the objects properties
        let newString = `translate(${this.relativePos.x}px, ${this.relativePos.y}px) rotate(${this.rotation}deg)`;
        this.dom.style.transform = newString;
        //Draw all active effects, cull those that are dead
        //Iterate through the map, Update them sequentially in life order.
        iterator = this.ActiveEffects[Symbol.iterator]();
        element = iterator.next();
        while(!element.done){
            element.value[1].Draw();
            element = iterator.next();
        }
    }
}