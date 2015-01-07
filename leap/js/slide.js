function Slide() {
    this.move_prescision = 10;
    this.hands = {};
}

Slide.prototype.register_hand = function(hand) {
    if (this.hands[hand.id] == undefined) {
        this.hands[hand.id] = new Hand(hand);
    } else {
        this.hands[hand.id].update(hand);
    }

    return this.hands[hand.id];
}

Slide.prototype.hand_move = function(hand, diff) {
    var hand = this.register_hand(hand);

    hand.move(diff);
}

Slide.prototype.hand_removed = function(id) {
    if (this.hands[id] !== undefined) {
        this.hands[id].remove();
        delete this.hands[id];
    }
}

dataBus.add_listener(new Slide());
