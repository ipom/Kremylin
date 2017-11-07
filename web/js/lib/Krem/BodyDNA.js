class BodyDNA{
	constructor(_bodyPartsDNA, _musclesDNA){
        if(typeof(_bodyPartsDNA)==="undefined") {
            var _bodyPartsDNA = [];
            var nbBodyParts = Math.floor(Matter.Common.random(Constants.NB_PARTS_MIN, Constants.NB_PARTS_MAX));
            for(let i=0; i<nbBodyParts; i++) {
                _bodyPartsDNA.push(new BodyPartDNA());
            }
        }
        if(typeof(_musclesDNA)==="undefined") {
            var _musclesDNA = [];
            for(let i=0; i<_bodyPartsDNA.length; i++) {
                _musclesDNA[i] = [];
                for (let j=i+1; j<_bodyPartsDNA.length; j++) {
                    _musclesDNA[i][j] = [];
                    let nbMuscle = Math.floor(Matter.Common.random(0,Constants.NB_CONSTRAINT_MAX));
                    for(let k=0; k<nbMuscle; k++){
                        _musclesDNA[i][j].push(new MuscleDNA());
                    }
                }
            }
        }

		this.bodyPartsDNA = _bodyPartsDNA;
	    this.musclesDNA = _musclesDNA;
    }
}