class Nerves{
    constructor(_muscles, _brain){
        this.muscles = _muscles;
        this.brain = _brain;
        this.nerves = this.randomNerves(this.muscles, this.brain);
    }

    update(engine){
        for(let i=0; i<this.nerves.length; i++){
            let nerve = this.nerves[i];
            nerve.muscle.contract(this.brain.outputs[nerve.brainOutput]);
        }
    }

    /**
     * Actuellement un muscle est relié à exactement un nerf et réciproquement.
     * Une sortie du cerveau peux être reliée à plusieurs muscles
     * @param muscles
     * @param brain
     */
    /*randomNerves(muscles, brain){
        let nbMuscles = this.muscles.length;
        let nbBrainOutputs = this.brain.outputs.length;
        let nerves = [];
        for(let i=0; i<nbMuscles; i++){
            nerves[i]={
                muscle: this.muscles[i],
                brainOutput: Math.floor(Matter.Common.random(0, nbBrainOutputs)),
                coef: Matter.Common.random(0,1)
            }
        }
        return nerves;
    }*/

    /**
     * Pour simplifier dans un premier temps, on aura autant de nerfs et de brain outputs que de muscles
     * */
    randomNerves(muscles, brain){
        let nbMuscles = this.muscles.length;
        let nbBrainOutputs = this.brain.outputs.length;
        let nerves = [];
        for(let i=0; i<nbMuscles; i++){
            nerves[i]={
                muscle: this.muscles[i],
                brainOutput: i,//Math.floor(Matter.Common.random(0, nbBrainOutputs)),
                coef: Matter.Common.random(0,1)
            }
        }
        return nerves;
    }
}