/**
 * Created by Mathys healthy on 10/21/2017.
 */
$.ready(function(){
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
            height: $(window).width(),
            wireframes: true
        }
    });


    Engine.run(engine);

    Render.run(render);

    var particleOptions = {
        friction: 0.05,
        frictionStatic: 0.1,
        render: { visible: true }
    };

    var constraintOptions = {
        render: { visible: false }
    };

    var softBody = Composites.softBody(450, 200, 10, 5, 0, 0, true, 15, particleOptions, constraintOptions);

    World.add(world, [
        softBody,
        // walls
        Bodies.rectangle(400, 0, 810, 30, { isStatic: true }),
        Bodies.rectangle(400, 400, 810, 30, { isStatic: true }),
        Bodies.rectangle(800, 200, 30, 420, { isStatic: true }),
        Bodies.rectangle(0, 200, 30, 420, { isStatic: true })
    ]);

    var addCircle = function () {
        return Composites.softBody(Math.random()*700 + 30, 100, Math.floor(Math.random()*6) + 1, 5, 0, 0, true, 10, particleOptions, constraintOptions);
    };

    $('.add-circle').on('click', function () {
        World.add(engine.world, addCircle());
    });

});