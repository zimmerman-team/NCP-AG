function Dot(selector) {
    this.domNode = document.createElement('div');
    this.domNode.id = 'dot_' + selector;
    this.domNode.innerHTML = selector;
    document.body.appendChild(this.domNode);
    this.position = [800, 400];
}

Dot.prototype.draw = function(new_position) {
    position = new_position !== undefined ? new_position : this.position;

    this.domNode.style.position = 'absolute';
    this.domNode.style.left = position[0] + 'px';
    this.domNode.style.top = position[1] + 'px';
}

Dot.prototype.moveHorizontally = function(diff) {
    this.position[0] += diff * 2;

    this.draw();
}

Dot.prototype.moveVertically = function(diff) {
    this.position[1] += diff;
    this.draw();
}

Dot.prototype.move = function(diff) {
    var x = diff[0];
    var y = diff[2];

    this.moveHorizontally(x);
    this.moveVertically(y);
}
