var defaultCategory = 0x0001,
    redCategory = 0x0002,
    greenCategory = 0x0004,
    blueCategory = 0x0008;

class Krem {
	constructor(){
	    this.dna = new BodyDNA();
	    this.body = new Body(this.dna).body;
	}
}
