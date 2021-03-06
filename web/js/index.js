//$(document).ready(function(){
    var Engine = Matter.Engine,
        Render = Matter.Render,
        Runner = Matter.Runner,
        Events = Matter.Events,
        Composites = Matter.Composites,
        MouseConstraint = Matter.MouseConstraint,
        Mouse = Matter.Mouse,
        World = Matter.World,
        Constraint = Matter.Constraint,
        Bodies = Matter.Bodies;

    // create engine
    var engine = Engine.create(), world = engine.world;

    // create renderer
    var render = Render.create({
        element: document.body,
        engine: engine,
        options: {
            width: $(window).width(),
            height: $(window).height(),
            wireframes: false,
            background: "transparent"
        }
    });

    // add mouse control
    var mouse = Mouse.create(render.canvas);
    var mouseConstraint = MouseConstraint.create(engine, {
        mouse: mouse,
        constraint: {
            stiffness: 0.2,
            render: {
                visible: false
            }
        }
    });

    World.add(world, mouseConstraint);

    Engine.run(engine);

    Render.run(render);

    // keep the mouse in sync with rendering
    render.mouse = mouse;

    Kremy = new Krem();

    World.add(world, [Kremy.body.body]);
    World.add(world, [ Bodies.rectangle($(window).width()/2, $(window).height()+50, $(window).width(), 150, { isStatic: true })]);
    World.add(world, [ Bodies.rectangle(0-50, $(window).height()/2, 150, $(window).height(), { isStatic: true })]);
    World.add(world, [ Bodies.rectangle($(window).width()+50, $(window).height()/2, 150, $(window).height(), { isStatic: true })]);
    World.add(world, [ Bodies.rectangle($(window).width()/2, 0-50, $(window).width(), 150, { isStatic: true })]);
    //World.add(world, [Matter.Bodies.rectangle($(window).width()/2, $(window).height(), $(window).width(), 50,{isStatic: true}),Kremy.body]);

    Events.on(engine, 'afterUpdate', function(event){
        Kremy.update(engine);
        /*var time = engine.timing.timestamp;

        var scale = 100 + 100*Math.sin(time*0.001);
        var constraints = Matter.Composite.allConstraints(this.world);
        for(var i in constraints){
            constraints[i].length = scale;
        }*/
    });

    function run(){
        $("canvas").prop("style","background: transparent;");
        World.remove(world, [Kremy.body.body]);
        Kremy = new Krem();
        var bound = Matter.Composite.bounds(Kremy.body.body);
        Matter.Composite.scale(Kremy.body.body, 100/(bound.max.x-bound.min.x), 100/(bound.max.y-bound.min.y), {x:(bound.max.x-bound.min.x)/2,y:(bound.max.y-bound.min.y)/2});
        World.add(world, [Kremy.body.body]);
        setTimeout(run, 7000);
    }

    run();

    $("canvas").prop("style","background: transparent;");
//});

