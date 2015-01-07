


/*var render = function () {
	requestAnimationFrame( render );

	cube.rotation.x += 0.1;
	cube.rotation.y += 0.1;

	renderer.render(scene, camera);
};

render();*/

//renderer.render(scene, camera);

function Cube() {

    this.init();
    this.render();
}

Cube.prototype.init = function() {
    this.scene = new THREE.Scene();
    this.camera = new THREE.PerspectiveCamera( 75, window.innerWidth/window.innerHeight, 0.1, 1000 );

    this.renderer = new THREE.WebGLRenderer();
    this.renderer.setSize( window.innerWidth, window.innerHeight );
    document.body.appendChild( this.renderer.domElement );

    var geometry = new THREE.BoxGeometry( 1, 1, 1 );
    var material = new THREE.MeshBasicMaterial( { color: 0x00ff00 } );
    this.cube = new THREE.Mesh( geometry, material );
    this.scene.add( this.cube );

    this.camera.position.z = 5;
}

Cube.prototype.hand_move = function(hand, diff) {
    if (hand.type == 'right') {
        this.cube.rotation.x += diff[0] * 0.01;
        this.cube.rotation.y += diff[1] * 0.01;
        this.cube.rotation.z += diff[2] * 0.01;

        this.render();
    }
}

Cube.prototype.render = function() {
    this.renderer.render(this.scene, this.camera);
}
