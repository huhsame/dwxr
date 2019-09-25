
/**
 * transform-controls
 */
AFRAME.registerComponent('transform-controls', {
    schema: {
        activated: {type: 'boolean', default: false},

    },

    init: function () {
        this.name = 'transform-controls';
        this.object = this.el.object3D;
        this.scene = this.el.sceneEl.object3D;

        // when user click this object
        this._click = AFRAME.utils.bind(this._click, this);
        this.el.addEventListener('click', this._click);

        // when user drag controls of object
        this.controls = new THREE.TransformControls( this.el.sceneEl.camera, this.el.sceneEl.renderer.domElement );
        // this._change 자리에 다른 함수를 넣어야해
        // db.put 그거 흠.. 그함수를 어떻게 ? 모듈로 만들어서?
        // 책은 언제와
        this._change = AFRAME.utils.bind(this._change, this);
        this.controls.addEventListener('change', this._change);
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
        let pubLog={};
        G.objects.get(id).get('attributes').get('position').put( this.object.position );
        pubLog.transmittedAt = Date.now();
        pubLog.data = {id: id, position: {
                x : this.object.position.x,
                y: this.object.position.y,
                z: this.object.position.z
            }};
        pubLog.publisher = L.user;
        // console.log( pubLog ); // TODO 디비에 저장
        // window.bugout.log(pubLog);
        L.pubLogs.push(pubLog);


        // 에이잭스 왜안되냐???
        // jq.ajax({
        //     url: location.origin + '/api/pubLog/create',
        //     type:'POST',
        //     data: pubLog,
        //     success: function(data){
        //         // alert("완료!");
        //         // window.opener.location.reload();
        //         // self.close();
        //         console.log('publish')
        //         window.bugout.log('bugout test 2222222');
        //
        //     },
        //     error: function(jqXHR, textStatus, errorThrown){
        //         console.log("post failed - " + textStatus + ": " + errorThrown);
        //     }
        // });

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
