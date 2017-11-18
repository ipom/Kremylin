class Body{
	constructor(_bodyDNA){
        this.bodyParts = this.generateBodyParts(_bodyDNA.bodyPartsDNA);
        let matterBodyParts = this.bodyParts.map(function(bp){
            return bp.part;
        });
        this.body = Matter.Composite.create({
            bodies: matterBodyParts,
            label: "Krem",
            isStatic: true
        });
        /**####a supprimer*/let bound = Matter.Composite.bounds(this.body);
        /**####a supprimer*/Matter.Composite.scale(this.body, 100/(bound.max.x-bound.min.x), 100/(bound.max.y-bound.min.y), {x:(bound.max.x-bound.min.x)/2,y:(bound.max.y-bound.min.y)/2});

        this.muscles = this.generateMuscles(_bodyDNA.musclesDNA, this.bodyParts);
        let matterMuscles = this.muscles.map(function(m){
            return m.muscle;
        });
        Matter.Composite.add(this.body, matterMuscles);
    }

    generateMuscles(dnaMuscles, bodyParts){
        let muscles = [];
        for(let i=0; i<bodyParts.length; i++) {
            for (let j=i+1; j<bodyParts.length; j++) {
                let ijMuscles = dnaMuscles[i][j];
                for(let k =0; k<ijMuscles.length; k++){
                    muscles.push(new Muscle(ijMuscles[k], bodyParts[i], bodyParts[j]));
                }
            }
        }
        return muscles;
    }

    generateBodyParts(bodyPartsDNA){
        let parts = [];
        for(let i=0; i<bodyPartsDNA.length; i++){
            let part = bodyPartsDNA[i];
            parts.push(new BodyPart(part));
        }
        return parts;
    }
}