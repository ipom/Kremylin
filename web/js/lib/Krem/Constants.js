var Constants = {
    NB_PARTS_MIN: 1,
    NB_PARTS_MAX: 10,

    NB_PART_TYPE: 1,

    //Part Types
    PART_TYPE_RECTANGLE: 1,
    PART_TYPE_CIRCLE: 2,

    //Part properties
    PART_MAX_HEIGHT: 400,
    PART_MAX_WIDTH: 400,
    PART_MAX_X: $(window).width(),
    PART_MAX_Y: $(window).height(),
    PART_MAX_DENSITY: 23,
    PART_MAX_FRICTION: 1,
    PART_MAX_FRICTIONAIR: 1,
    PART_MAX_FRICTIONSTATIC: 10,

    NB_CONSTRAINT_MAX: 3,
    NB_CONSTRAINT_TYPE: 2,

    NB_NERVES_MAX: this.NB_CONSTRAINT_MAX*this.NB_PARTS_MAX
};