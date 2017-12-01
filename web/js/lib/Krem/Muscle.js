class Muscle{
    constructor(muscleDNA, bp1, bp2){
        this.muscle = Matter.Constraint.create({
            bodyA: bp1.part,
            bodyB: bp2.part,
            pointA: {
                x: Math.floor((bp1.part.bounds.max.x-bp1.part.bounds.min.x) * muscleDNA.pivotA.x),
                y: Math.floor((bp1.part.bounds.max.y-bp1.part.bounds.min.y) * muscleDNA.pivotA.y)
            },
            pointB: {
                x: Math.floor((bp2.part.bounds.max.x-bp2.part.bounds.min.x) * muscleDNA.pivotB.x),
                y: Math.floor((bp2.part.bounds.max.y-bp2.part.bounds.min.y) * muscleDNA.pivotB.y)
            },
            stiffness: muscleDNA.stiffness,
            damping: muscleDNA.damping
        });

        this.length = this.muscle.length; //Taille du muscle en expansion
        this.targetLengthCoef = 1;  //Taille du muscle demandé par le cerveau
        this.currentLengthCoef = 1;
        this.lastStep = 0;
        this.step = this.currentLengthCoef - this.targetLengthCoef;
    }

    /**
     *
     * @param coef valeur comprise entre 0 et 1
     */
    contract(coef, nbStep){
        if(typeof nbStep === 'undefined'){
            nbStep = 10;
        }
        this.targetLengthCoef = coef;
        //this.muscle.length = this.length*coef;
        this.step = (this.currentLengthCoef - this.targetLengthCoef)/nbStep;//En 100 steps on atteint la longueur de muscle souhaitée
    }

    update(engine) {
        var time = engine.timing.timestamp;
        if (this.step > 0 ? (this.currentLengthCoef > this.targetLengthCoef):(this.currentLengthCoef < this.targetLengthCoef)){
            this.currentLengthCoef = this.currentLengthCoef - this.step;
        }
        this.muscle.length = this.currentLengthCoef * this.length;
    }
}