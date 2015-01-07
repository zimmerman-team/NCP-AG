// Setup Leap loop with frame callback function
var controllerOptions = {enableGestures: true};

var previousFrame;

var moving = false;
var diretion = null;

Leap.loop(controllerOptions, function(frame) {
    var frameString = "Frame ID: "
        + frame.id  + "<br />"
        + "Timestamp: " + frame.timestamp + " &micro;s<br />"
        + "Hands: " + frame.hands.length + "<br />"
        + "Fingers: " + frame.fingers.length + "<br />"
        + "Tools: " + frame.tools.length + "<br />"
        + "Gestures: " + frame.gestures.length + "<br />";

    if (previousFrame) {
        var translation = frame.translation(previousFrame);
        console.log(trans)
        frameString += "Translation: " + translation.join(',') + " mm <br />";

        var rotationAxis = frame.rotationAxis(previousFrame);
        var rotationAngle = frame.rotationAngle(previousFrame);
        frameString += "Rotation axis: " + vectorToString(rotationAxis, 2) + "<br />";
        frameString += "Rotation angle: " + rotationAngle.toFixed(2) + " radians<br />";

        var scaleFactor = frame.scaleFactor(previousFrame);
        frameString += "Scale factor: " + scaleFactor.toFixed(2) + "<br />";
    }
    document.getElementById('frameData').innerHTML = frameString;


    var handString = "";
    if (frame.hands.length > 0) {
        for (var i = 0; i < frame.hands.length; i++) {
            var hand = frame.hands[i];

            handString += "Hand ID: " + hand.id + "<br />";
            handString += "Direction: " + vectorToString(hand.direction, 2) + "<br />";
            handString += "Palm normal: " + vectorToString(hand.palmNormal, 2) + "<br />";
            handString += "Palm position: " + vectorToString(hand.palmPosition) + " mm<br />";
            handString += "Palm velocity: " + vectorToString(hand.palmVelocity) + " mm/s<br />";
            handString += "Sphere center: " + vectorToString(hand.sphereCenter) + " mm<br />";
            handString += "Sphere radius: " + hand.sphereRadius.toFixed(1) + " mm<br />";

            // And so on...
        }
    }
    document.getElementById('handData').innerHTML = handString;

    var pointableString = "";
    if (frame.pointables.length > 0) {
        for (var i = 0; i < frame.pointables.length; i++) {
            var pointable = frame.pointables[i];

            pointableString += "Pointable ID: " + pointable.id + "<br />";
            pointableString += "Belongs to hand with ID: " + pointable.handId + "<br />";

            if (pointable.tool) {
                pointableString += "Classified as a tool <br />";
                pointableString += "Length: " + pointable.length.toFixed(1) + " mm<br />";
                pointableString += "Width: "  + pointable.width.toFixed(1) + " mm<br />";
            }
            else {
                pointableString += "Classified as a finger<br />";
                pointableString += "Length: " + pointable.length.toFixed(1) + " mm<br />";
            }

            pointableString += "Direction: " + vectorToString(pointable.direction, 2) + "<br />";
            pointableString += "Tip position: " + vectorToString(pointable.tipPosition) + " mm<br />";
            pointableString += "Tip velocity: " + vectorToString(pointable.tipVelocity) + " mm/s<br />";
            pointableString += '------------------------------<br />';
        }
    }
    document.getElementById('pointableData').innerHTML = pointableString;

    // Display Gesture object data
    var gestureString = "";
    if (frame.gestures.length > 0) {
        for (var i = 0; i < frame.gestures.length; i++) {
            var gesture = frame.gestures[i];
            gestureString += "Gesture ID: " + gesture.id + ", "
                + "type: " + gesture.type + ", "
                + "state: " + gesture.state + ", "
                + "hand IDs: " + gesture.handIds.join(", ") + ", "
                + "pointable IDs: " + gesture.pointableIds.join(", ") + ", "
                + "duration: " + gesture.duration + " &micro;s, ";

            switch (gesture.type) {
                case "circle":
                    gestureString += "center: " + vectorToString(gesture.center) + " mm, "
                        + "normal: " + vectorToString(gesture.normal, 2) + ", "
                        + "radius: " + gesture.radius.toFixed(1) + " mm, "
                        + "progress: " + gesture.progress.toFixed(2) + " rotations";
                break;
                case "swipe":
                    gestureString += "start position: " + vectorToString(gesture.startPosition) + " mm, "
                        + "current position: " + vectorToString(gesture.position) + " mm, "
                        + "direction: " + vectorToString(gesture.direction, 2) + ", "
                        + "speed: " + gesture.speed.toFixed(1) + " mm/s";
                    break;
                case "screenTap":
                case "keyTap":
                    gestureString += "position: " + vectorToString(gesture.position) + " mm, "
                        + "direction: " + vectorToString(gesture.direction, 2);
                    break;
                default:
                    gestureString += "unknown gesture type";
            }
            gestureString += "<br />";
        }
    }
    document.getElementById('gestureData').innerHTML = gestureString;


    previousFrame = frame;
})


function vectorToString(vector, digits) {
    if (typeof digits === "undefined") {
        digits = 1;
    }
    if (vector.length) {
        return "(" + vector[0].toFixed(digits) + ", "
            + vector[1].toFixed(digits) + ", "
            + vector[2].toFixed(digits) + ")";
    }
    return '';
}
