var defaultCategory = 0x0001,
    redCategory = 0x0002,
    greenCategory = 0x0004,
    blueCategory = 0x0008;

class Krem {
	constructor(){
	    this.dna = new DNA();
	    this.body = new Body(this.dna.bodyDNA);
	    this.brain = new Brain(this.body);
	    this.nerves = new Nerves(this.body.muscles, this.brain);
	}

	update(engine){
		this.brain.update(engine);
		//console.log(this.brain.outputs);
		this.nerves.update(engine);
	}
}