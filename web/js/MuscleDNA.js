class MuscleDNA{
    constructor(){
        this.pivotA = {
            x: Matter.Common.random(-0.5,0.5),
            y: Matter.Common.random(-0.5,0.5)
        };
        this.pivotB = {
            x: Matter.Common.random(-0.5,0.5),
            y: Matter.Common.random(-0.5,0.5)
        };
        this.stiffness = Matter.Common.random(0.2,1);
        this.damping = Matter.Common.random(0,0.1);
    }

}