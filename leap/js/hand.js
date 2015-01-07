function Hand(hand_object) {
    this.obj = hand_object;
    this.last_position = hand_object.palmPosition;

    this.movement_direction = undefined;
    this.movement_speed = 0;
    this.moves = [];

    this.init();
}

Hand.prototype.init = function() {
    $('i.hand-' + this.obj.type).css({color: 'red'});
}

Hand.prototype.update = function(hand) {
    this.obj = hand;
}

Hand.prototype.remove = function() {
    $('i.hand-' + this.obj.type).css({color: '#000'});
}

Hand.prototype.move = function(diff) {
    var new_direction;
    if (diff[0] > 0) {
        new_direction = 'right';
    } else {
        new_direction = 'left';
    }

    if (new_direction !== this.movement_direction) {
        var move = this.moves.reduce(function(pv, cv) { return pv + cv; }, 0);

        var direction = (move > 0) ? 'next' : 'prev';
        //console.log(direction);
        //$('#myCarousel').carousel(direction).carousel('pause'); 

        this.movement_direction = new_direction;
    } else {
        //console.log(diff[0]);
        this.moves.push(diff[0]);
    }
}