AFRAME.registerComponent('ortho', {
    init: function () {
        let sceneEl = this.el.sceneEl;

        let frustumSize = 20;
        let aspect = window.innerWidth / window.innerHeight;
        let near = 0.1;
        let far = 1000;

        // sceneEl.addEventListener('render-target-loaded', () => {
            this.originalCamera = sceneEl.camera;
            this.cameraParent = sceneEl.camera.parent;
            // this.orthoCamera = new THREE.OrthographicCamera(-1, 1, 1, 1000);
        this.orthoCamera = new THREE.OrthographicCamera( frustumSize * aspect / - 2, frustumSize * aspect / 2, frustumSize / 2, frustumSize / - 2, near, far );
        this.cameraParent.add(this.orthoCamera);
            sceneEl.camera = this.orthoCamera;

            sceneEl.camera.position.y = 100;
            console.log(sceneEl.camera.position);
            sceneEl.camera.lookAt(0,0,0);
        // });
    },
    remove: function () {
        this.cameraParent.remove(this.orthoCamera);
        sceneEl.camera = this.originalCamera;
    }
});
