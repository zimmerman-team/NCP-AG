function Logger() {
    this.log_each = 10;
    this.action_count = {};
}

Logger.prototype.hand_move = function() {
    if (this.action_count['hand_move'] == undefined || this.action_count['hand_move'] == this.log_each) {
        this.action_count['hand_move'] = 0;
    }

    if (this.action_count['hand_move'] == 0) {
        console.log(arguments);
    }

    this.action_count['hand_move'] += 1;
}

//dataBus.add_listener(new Logger());
