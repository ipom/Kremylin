$(document).ready(function(){
    var Engine = Matter.Engine,
        Render = Matter.Render,
        Runner = Matter.Runner,
        Composites = Matter.Composites,
        MouseConstraint = Matter.MouseConstraint,
        Mouse = Matter.Mouse,
        World = Matter.World,
        Constraint = Matter.Constraint,
        Bodies = Matter.Bodies,
        Body = Matter.Body;

    // create engine
    var engine = Engine.create(), world = engine.world;

    // create renderer
    var render = Render.create({
        element: document.body,
        engine: engine,
        options: {
            width: $(window).width(),
            height: $(window).height(),
            wireframes: false
        }
    });


    Engine.run(engine);

    Render.run(render);

    var Kremy = new Krem();

    World.add(world, [Kremy.body]);

    function run(){
        var Kremy = new Krem();
        World.add(world, [Kremy.body]);
        setTimeout(run, 1000);
    }

    run();
});

