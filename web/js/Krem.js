var Krem = function() {
    this.dna = this.randomDNA();
    this.parts = this.generateParts(this.dna.parts);
    this.constraints = this.generateConstraints(this.dna.constraints, this.parts);
    this.body = Matter.Composite.create({
        bodies: this.parts,
        constraints: this.constraints,
        label: "Krem"
    });
};


Krem.prototype.generateConstraints = function(dnaConstraints, parts){
    let constraints = [];
    for(let i=0; i<parts.length; i++) {
        for (let j=i+1; j<parts.length; j++) {
            let ijConstraints = dnaConstraints[i][j];
            for(let k =0; k<ijConstraints.length; k++){
                ijConstraints[k].bodyA = parts[i];
                ijConstraints[k].bodyB = parts[j];
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
                    pointA: {
                        x: Math.floor(Matter.Common.random(0, Constants.PART_MAX_WIDTH)),
                        y: Math.floor(Matter.Common.random(0, Constants.PART_MAX_HEIGHT))
                    },
                    pointB: {
                        x: Math.floor(Matter.Common.random(0, Constants.PART_MAX_WIDTH)),
                        y: Math.floor(Matter.Common.random(0, Constants.PART_MAX_HEIGHT))
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