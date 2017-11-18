class BodyPartDNA{
    constructor(_partType, parameters) {
        if (typeof(_partType) !== "undefined") {
            this.partType = _partType;
        }else{
            this.partType = BodyPartDNA.randomPartType();
        }

        if (this.partType === Constants.PART_TYPE_RECTANGLE) {
            if(typeof(parameters) === "undefined"){
                $.extend(this, BodyPartDNA.randomRectangleDNA());
            }
            else{
                $.extend(this, parameters);
            }
        }
    }

    static randomRectangleDNA(){
        let x               = Math.floor(Matter.Common.random(0, Constants.PART_MAX_X)),
            y               = Math.floor(Matter.Common.random(0, Constants.PART_MAX_Y)),
            width           = Math.floor(Matter.Common.random(1, Constants.PART_MAX_WIDTH)),
            height          = Math.floor(Matter.Common.random(1, Constants.PART_MAX_HEIGHT)),
            options = {
                //angle           : Matter.Common.random(0, 2*Math.PI),
                /*density         : Matter.Common.random(0, Constants.PART_MAX_DENSITY),
                friction        : Matter.Common.random(0, Constants.PART_MAX_FRICTION),
                frictionAir     : Matter.Common.random(0, Constants.PART_MAX_FRICTIONAIR),
                frictionStatic  : Matter.Common.random(0, Constants.PART_MAX_FRICTIONSTATIC),
                restitution     : Matter.Common.random(0, 1),*/
                collisionFilter : {
                    category: redCategory,
                    mask    : defaultCategory
                }
            };

        return {
            x: x,
            y: y,
            width: width,
            height: height,
            options: options
        };
    }

    static randomPartType(){
        return Math.floor(Matter.Common.random(1, Constants.NB_PART_TYPE));
    }
}