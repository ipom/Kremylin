// create the network
const { Layer, Network } = window.synaptic;

class Brain{
    constructor(_body){
        this.muscles = _body.muscles;
        this.bodyParts = _body.bodyParts;
        let nbInputs = this.bodyParts.length*2;
        let nbOutputs = this.muscles.length;//Math.floor(Matter.Common.random(1,Constants.NB_CONSTRAINT_MAX));

        this.outputs = new Array(nbOutputs);

        let inputLayer = new Layer(nbInputs);
        let hiddenLayer = new Layer(nbInputs+nbOutputs);
        let outputLayer = new Layer(nbOutputs);

        inputLayer.project(hiddenLayer);
        hiddenLayer.project(outputLayer);

        this.network = new Network({
            input: inputLayer,
            hidden: [hiddenLayer, new Layer(nbInputs+nbOutputs), new Layer(nbInputs+nbOutputs),new Layer(nbInputs+nbOutputs),new Layer(nbInputs+nbOutputs),new Layer(nbInputs+nbOutputs)],
            output: outputLayer
        });

        this.outputsHistory = [];

        this.learningRate = .3;
        var that = this;
        this.outputs[0]=1;
        /*$(window).keydown(function(e){
            that.outputs[e.which-96]=0;
        }).keyup(function(e){
            that.outputs[e.which-96]=1;
        });*/
    }

    /*update(engine){
        var time = engine.timing.timestamp;
        var scale = Math.sin(time*0.001)+1;
        for(let i=0; i<this.outputs.length; i++){
            this.outputs[i]=scale;
        }
    }*/

    update(engine){
        // /console.log(this.outputs);
        let inputs = [];
        for(let i in this.bodyParts){
            let bodyPart = this.bodyParts[i];
            inputs.push(bodyPart.part.position.x);
            inputs.push(bodyPart.part.position.y);
        }
        this.outputs = this.network.activate(inputs);

        //console.log(this.outputs);
        this.outputsHistory.push({inputs: inputs, outputs: this.outputs});
    }

    treshold(outputs){
        return outputs.map(function(o){
            return (outputs>0.5)?1:0;
        });
    }

    reward(){
        for(let entry of this.outputsHistory){
            //console.log(entry);
            this.network.activate(entry.inputs);
            //console.log(entry.outputs);
            this.network.propagate(this.learningRate, entry.outputs);
        }
        this.outputsHistory = [];
    }

    punish(){
        for(let entry of this.outputsHistory){
            //console.log(entry.outputs);
            let inverseOutputs = entry.outputs.map(function(o){
                if(o!=0){
                    return 1-o;
                }
            });

            //console.log(inverseOutputs);
            this.network.activate(entry.inputs);
            this.network.propagate(this.learningRate, inverseOutputs);
        }
        this.outputsHistory = [];
    }
}