// Setup Leap loop with frame callback function
var controllerOptions = {enableGestures: true};

var previous_frame,
    previous_frame_hands = [],
    first_frame,
    frame_rate = 1,
    moving = false;

$('#myCarousel').carousel('pause'); 

Leap.loop(controllerOptions, function(frame) {
    if (previous_frame == undefined) {
        previous_frame = frame;
        first_frame = frame;
    }

    var translation = frame.translation(previous_frame);

    var frame_hands = [];
    if (frame.hands.length > 0) {
        for (var i = 0; i < frame.hands.length; i++) {
            var hand = frame.hands[i];
            frame_hands.push(hand.id);

            var hand_diff = hand.translation(previous_frame);
            dataBus.fire('hand_move', [hand, hand_diff]);
        }
    }

    // Cleanup hands
    $.each(previous_frame_hands, function(_, id) {
        if (frame_hands.indexOf(id) == -1) {
            dataBus.fire('hand_removed', [id]);
        }
    });


    previous_frame = frame;
    previous_frame_hands = frame_hands;


    if (frame.gestures.length > 0) {
       for (var i = 0; i < frame.gestures.length; i++) {
         var gesture = frame.gestures[i];
         if(gesture.type == "swipe") {
             //Classify swipe as either horizontal or vertical
             var isHorizontal = Math.abs(gesture.direction[0]) > Math.abs(gesture.direction[1]);
             //Classify as right-left or up-down
             if(isHorizontal){
                 if(gesture.direction[0] > 0){
                     swipeDirection = "next";
                     
                 } else {
                     swipeDirection = "prev";
                 }
                 $('#myCarousel').carousel(swipeDirection).carousel('pause'); 
             } else { //vertical
                 if(gesture.direction[1] > 0){
                     swipeDirection = "up";
                 } else {
                     swipeDirection = "down";
                 }
                 console.log(swipeDirection)
             }
          }
        }
     }
});
