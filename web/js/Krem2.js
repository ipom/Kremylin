var Krem = class{
    constructor(){
        this.dna = randomDNA();
        this.parts = generateParts(this.dna.parts);
        this.constraints = generateConstraints(thisd.dna.constraints, this.dna.parts);
        this.body = Matter.Composite.create({
            bodies: this.parts,
            constraints: this.constraints,
            label: "Krem"
        });
    }

    properties(){
        return {
            label: "Krem",
            //restitution: 0..1
            /*slopNumber
            A Number that specifies a tolerance on how far a body is allowed to 'sink' or rotate into other bodies. Avoid changing this value unless you understand the purpose of slop in physics engines. The default should generally suffice, although very large bodies may require larger values for stable stacking.*/
            //type : A String denoting the type of object.
        };
    }

    generateConstraints(dnaContraints, parts){
        let constraints = [];
        for(let i=0; i<parts.length; i++) {
            for (let j=i+1; j<parts.length; j++) {
                dnaConstraints[i][j].bodyA = parts[i];
                dnaConstraints[i][j].bodyB = parts[j];
                constraints.push(Matter.Constraint.create(dnaConstraints[i][j]));
            }
        }
        return constraints;
    }

    generateParts(dnaParts){
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
    }

    static generateRectangle(part){
        return Matter.Bodies.rectangle(part.x, part.y, part.width, part.height, part.options);
    }

    randomDNA(){
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
                        stiffness: Math.Common.random(0.2,1),
                        damping: Math.Common.random(0,0.1)
                    };
                    dna.constraints[i][j].push(constraint);
                }
            }
        }
    }

    randomRectangleDNA(){
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
    }

    randomCircleDNA(){

    }

    randomCompositeDNA(){

    }

    randomCompoundDNA(){

    }
    /*body.density*/
};