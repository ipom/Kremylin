class BodyPart{
    constructor(_bodyPartDNA){
        switch(_bodyPartDNA.partType){
            case Constants.PART_TYPE_RECTANGLE:
                this.part = Matter.Bodies.rectangle(
                    _bodyPartDNA.x,
                    _bodyPartDNA.y,
                    _bodyPartDNA.width,
                    _bodyPartDNA.height,
                    _bodyPartDNA.options);
                break;
        }
    }
}