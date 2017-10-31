var Krem = function() {
    this.dna = this.randomDNA();
    this.parts = this.generateParts(this.dna.parts);
    this.body = Matter.Composite.create({
        bodies: this.parts,
        label: "Krem"
    });
    let bounds = Matter.Composite.bounds(this.body);
    Matter.Composite.scale(Kremy.body, 100/(bound.max.x-bound.min.x), 100/(bound.max.y-bound.min.y), {x:(bound.max.x-bound.min.x)/2,y:(bound.max.y-bound.min.y)/2});

    this.constraints = this.generateConstraints(this.dna.constraints, this.body);

};


Krem.prototype.generateConstraints = function(dnaConstraints, parts){
    let constraints = [];
    for(let i=0; i<parts.length; i++) {
        for (let j=i+1; j<parts.length; j++) {
            let ijConstraints = dnaConstraints[i][j];
            for(let k =0; k<ijConstraints.length; k++){
                ijConstraints[k].bodyA = parts[i];
                ijConstraints[k].bodyB = parts[j];
                ijConstraints[k].pointA = {
                    x: Math.floor((parts[i].bounds.max.x-parts[i].bounds.min.x) * ijConstraints[k].pivotA.x),
                    y: Math.floor((parts[i].bounds.max.y-parts[i].bounds.min.y) * ijConstraints[k].pivotA.y)
                };
                ijConstraints[k].pointB = {
                    x: Math.floor((parts[j].bounds.max.x-parts[j].bounds.min.x) * ijConstraints[k].pivotB.x),
                    y: Math.floor((parts[j].bounds.max.y-parts[j].bounds.min.y) * ijConstraints[k].pivotB.y)
                };
                constraints.push(Matter.Constraint.create(ijConstraints[k]));
            }
        }
    }
    return constraints;
};

Krem.prototype.generateParts = function(dnaParts){
    let parts = [];
    for(let i=0; i<dnaParts.length; i++){
        let part = dnaParts[i];
        switch(part.partType){
            case Constants.PART_TYPE_RECTANGLE:
                parts.push(this.generateRectangle(part));
                break;
        }
    }
    return parts;
};

Krem.prototype.generateRectangle = function(part){
    return Matter.Bodies.rectangle(part.x, part.y, part.width, part.height, part.options);
};


/*
* DNA functions
*/
Krem.prototype.randomDNA = function(){
    let dna = {};
    //Random Parts
    dna.nbParts = Math.floor(Matter.Common.random(Constants.NB_PARTS_MIN, Constants.NB_PARTS_MAX));
    dna.parts = [];
    for(let i=0; i<dna.nbParts; i++){
        let partType = Math.floor(Matter.Common.random(1, Constants.NB_PART_TYPE));
        switch(partType){
            case Constants.PART_TYPE_RECTANGLE:
                let part = this.randomRectangleDNA();
                dna.parts.push(part);
                break;
        }
    }

    //Random constraints
    dna.constraints = [];
    for(let i=0; i<dna.nbParts; i++) {
        dna.constraints[i] = [];
        for (let j=i+1; j<dna.nbParts; j++) {
            dna.constraints[i][j] = [];
            let nbConstraints = Math.floor(Matter.Common.random(0,Constants.NB_CONSTRAINT_MAX));
            for(let k=0; k<nbConstraints; k++){
                let constraint = {
                    pivotA: {
                        x: Matter.Common.random(-0.5,0.5),
                        y: Matter.Common.random(-0.5,0.5)
                    },
                    pivotB: {
                        x: Matter.Common.random(-0.5,0.5),
                        y: Matter.Common.random(-0.5,0.5)
                    },
                    stiffness: Matter.Common.random(0.2,1),
                    damping: Matter.Common.random(0,0.1)
                };
                dna.constraints[i][j].push(constraint);
            }
        }
    }

    return dna;
};

Krem.prototype.randomRectangleDNA = function(){
    let x = Math.floor(Matter.Common.random(0, Constants.PART_MAX_X)),
        y = Math.floor(Matter.Common.random(0, Constants.PART_MAX_Y)),
        width = Math.floor(Matter.Common.random(1, Constants.PART_MAX_WIDTH)),
        height = Math.floor(Matter.Common.random(1, Constants.PART_MAX_HEIGHT)),
        options = {

        };

    return {
        partType : Constants.PART_TYPE_RECTANGLE,
        x: x,
        y: y,
        width: width,
        height: height,
        options: options
    };
};

Krem.prototype.randomCircleDNA = function(){

};

Krem.prototype.randomCompositeDNA = function(){

};

Krem.prototype.randomCompoundDNA = function(){

};
/*body.density*/


/*
 * DNA functions
 */