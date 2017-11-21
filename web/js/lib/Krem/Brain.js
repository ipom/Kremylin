// create the network
const { Layer, Network } = window.synaptic;

class Brain{
    constructor(_body){
        let nbOutputs = Math.floor(Matter.Common.random(1,Constants.NB_CONSTRAINT_MAX));
        this.outputs = new Array(nbOutputs);

        var inputLayer = new Layer(2);
        var hiddenLayer = new Layer(3);
        var outputLayer = new Layer(nbOutputs);

        inputLayer.project(hiddenLayer);
        hiddenLayer.project(outputLayer);

        this.network = new Network({
            input: inputLayer,
            hidden: [hiddenLayer],
            output: outputLayer
        });
    }

    /*update(engine){
        var time = engine.timing.timestamp;
        var scale = Math.sin(time*0.001)+1;
        for(let i=0; i<this.outputs.length; i++){
            this.outputs[i]=scale;
        }
    }*/

    update(engine){
        this.outputs = this.network.activate();
        this.outputHistory.push(this.outputs);
    }


}






// train the network - learn XOR
var learningRate = .3;
for (var i = 0; i < 20000; i++)
{
    // 0,0 => 0
    myNetwork.activate([0,0]);
    myNetwork.propagate(learningRate, [0]);

    // 0,1 => 1
    myNetwork.activate([0,1]);
    myNetwork.propagate(learningRate, [1]);

    // 1,0 => 1
    myNetwork.activate([1,0]);
    myNetwork.propagate(learningRate, [1]);

    // 1,1 => 0
    myNetwork.activate([1,1]);
    myNetwork.propagate(learningRate, [0]);
}

// test the network
console.log(myNetwork.activate([0,0])); // [0.015020775950893527]
console.log(myNetwork.activate([0,1])); // [0.9815816381088985]
console.log(myNetwork.activate([1,0])); // [0.9871822457132193]
console.log(myNetwork.activate([1,1])); // [0.012950087641929467]
