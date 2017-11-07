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
    }
}