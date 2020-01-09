
/**
 * text-label
 */
AFRAME.registerComponent('text-label', {
    schema: {
        text : {type: 'string', default: 'text'},

    },

    init: function () {
        console.log('text-label')
        this.name = 'text-label';
        this.object = this.el.object3D;
        this.scene = this.el.sceneEl.object3D;


        let textEl = document.createElement('a-text');

        textEl.setAttribute('value', this.data.text);
        textEl.setAttribute('align', 'center');
        // if (this.el.tagName === 'a-plain'){
        //     let origin = this.object.position;
        //     let position = new THREE.Vector3(origin.x, origin.y, origin.z) - new THREE.Vector3( 5 ,0,0)
        //     console.log(position)
        //     textEl.setAttribute('position', position);
        //     console.log(textEl.getAttribute('position'))
        // }else{
            textEl.setAttribute('position', '0 0.01 0');
        // }
        textEl.setAttribute('rotation', '0 0 0');
        this.el.appendChild(textEl);
        this.textEl = textEl;

        },

    update: function (oldData) {
        // tracking 'activated'
        if( oldData.text !== this.data.text){
            this.textEl.setAttribute('value', this.data.text)
        }
    },

    remove: function () {
        this.el.removeChild(this.textEl);
    },
});
