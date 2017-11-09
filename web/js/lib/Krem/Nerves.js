class Nerves{
    constructor(_muscles, _brain){
        this.muscles = _muscles;
        this.brain = _brain;
        this.nerves = this.randomNerves(this.muscles, this.brain);
    }

    update(){
        this.brain.update();

    }

    randomNerves(muscles, brain){
        let nbMuscles = this.muscles.length;
        let nbBrainOutputs = this.brain.outputs.length;
        let nbNerves = Math.floor(Matter.Common.random(0, Constants.NB_NERVES_MAX));
        let nerves = [];
        for(let i=0; i<nbNerves; i++){
            nerves[i]={
                muscle: this.muscles[Math.floor(Matter.Common.random(0,nbMuscles))],
                brainOutput: Math.floor(Matter.Common.random(0, nbBrainOutputs)),
                coef: Matter.Common.random(0,1)
            }
        }
    }
}