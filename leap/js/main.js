// Setup Leap loop with frame callback function
var controllerOptions = {enableGestures: true};

var previous_frame,
    first_frame,
    frame_rate = 1,
    moving = false,
    dots = {},
    bus = new DataBus();
    //cube = new Cube();

//bus.add_listener(cube);


Leap.loop(controllerOptions, function(frame) {
    if (previous_frame == undefined) {
        previous_frame = frame;
        first_frame = frame;
    }

    var translation = frame.translation(previous_frame);

    if (frame.hands.length > 0) {
        var frame_hands = [];
        for (var i = 0; i < frame.hands.length; i++) {
            var hand = frame.hands[i];
            frame_hands.push(hand.id);

            if (dots[hand.id] == undefined) {
                dots[hand.id] = new Dot(hand.id);
            }
            var hand_diff = hand.translation(previous_frame);
            dots[hand.id].move(hand_diff);
            bus.fire('hand_move', [hand, hand_diff]);
        }

        var dots_ids = Object.keys(dots);
        for (var i = 0; i < dots_ids.length; i++) {
            var dot_id = dots_ids[i];
            if (frame_hands.indexOf(parseInt(dot_id)) == -1) {
                document.body.removeChild(dots[dot_id].domNode);
                delete dots[dot_id];
            }
        }
    }


    previous_frame = frame;
});
