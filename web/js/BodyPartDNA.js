class BodyPartDNA{
    constructor(_partType, _x, _y, _width, _height, _options) {
        if (typeof(_partType) === "undefined") {
            var _partType = BodyPartDNA.randomPartType();
        }

        if (_partType === Constants.PART_TYPE_RECTANGLE) {
            if(typeof('_x') === "undefined"){
                $.extend(this, BodyPartDNA.randomRectangleDNA());
            }else {
                $.extend(this,
                    {
                        x: _x,
                        y: _y,
                        width: _width,
                        height: _height,
                        options: _options
                    });
            }
        }
        /*
         partType : Constants.PART_TYPE_RECTANGLE,
         x: x,
         y: y,
         width: width,
         height: height,
         options: options
         */
    }

    static randomRectangleDNA(){
        let x = Math.floor(Matter.Common.random(0, Constants.PART_MAX_X)),
            y = Math.floor(Matter.Common.random(0, Constants.PART_MAX_Y)),
            width = Math.floor(Matter.Common.random(1, Constants.PART_MAX_WIDTH)),
            height = Math.floor(Matter.Common.random(1, Constants.PART_MAX_HEIGHT)),
            options = {
                collisionFilter: {
                    category: redCategory,
                    mask: defaultCategory
                }
            };

        return {
            partType : Constants.PART_TYPE_RECTANGLE,
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