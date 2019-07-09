
/**
 * transform-controls
 */
AFRAME.registerComponent('selected', {
    schema: {
        by: {type: 'string'}
    },

    init: function () {
        this.name = 'selected';
        this.object = this.el.object3D;
        this.scene = this.el.sceneEl.object3D;

        this._click = AFRAME.utils.bind(this._click, this);
        this.el.addEventListener('click', this._click);

        // when user drag controls of object
        this.controls = new THREE.TransformControls( this.el.sceneEl.camera, this.el.sceneEl.renderer.domElement );
        // this._change 자리에 다른 함수를 넣어야해
        // db.put 그거 흠.. 그함수를 어떻게 ? 모듈로 만들어서?
        // 책은 언제와
        this._change = AFRAME.utils.bind(this._change, this);
        this.controls.addEventListener('change', this._change);

        // 언제 나타낼것인지 봐야지
        // 반짝이는 효과도 좀ㅅ ㅐㅇ각을 해야지
    },

    update: function (oldData) {
        // tracking 'activated'
        if( oldData.activated !== this.data.activated){
            if( this.data.activated === true ){
                // console.log('start activation')
                let others = this.el.sceneEl.querySelectorAll('['+this.name+']');
                for( let other of others ){
                    if(other !== this.el){
                        other.setAttribute(this.name, { activated : false });
                    }
                }
                this.controls.attach( this.object );
                this.scene.add( this.controls );
            }else{ // deactivate
                this.controls.detach();
                this.scene.remove( this.controls );
            }
        }
    },

    remove: function () {
        this.controls.removeEventListener('change', this._change);
        this.el.removeEventListener('click', this._click);
    },

    _change : function(){
        let id = this.el.getAttribute('id');
        G.objects.get(id).get('attributes').get('position').put( this.object.position );

        // 이벤트를 보내야하나? hmm..

        // db.put({_id:id, position: this.object.position})
        //     .then(() => docstore.get( id ))
        //     .then((value) => console.log( value ))
        //
        // console.log('put position : ' + hash);
        // sceneG.get(this.data.type+'s').get( id ).get('position').put( this.object.position );

    },

    _click : function(){
      // console.log('click');
      if( this.data.activated === false){
          this.el.setAttribute('transform-controls', {activated: true});
          // console.log('transform-controls activated');
      }
    },
});
