class Brain{
    constructor(){
        let nbOutputs = Math.floor(Matter.Common.random(1,Constants.NB_CONSTRAINT_MAX));
        this.outputs = new Array(nbOutputs);
    }

    update(engine){
        var time = engine.timing.timestamp;
        var scale = Math.sin(time*0.001)+1;
        for(let i=0; i<this.outputs.length; i++){
            this.outputs[i]=scale;
        }
    }
}