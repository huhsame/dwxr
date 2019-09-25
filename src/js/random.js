
module.exports = {
    put : function(){

            console.log('put random!!');

            let geometries = ['box', 'cone', 'cylinder','dodecahedron', 'icosahedron', 'octahedron', 'ring', 'sphere','tetrahedron', 'torus'];
            let rgb = {
                r: Math.floor( Math.random()*255),
                g: Math.floor( Math.random()*255),
                b: Math.floor( Math.random()*255)
            };
            function toHex(numbers) {
                let r = numbers.r.toString(16), /* 1 */
                    g = numbers.g.toString(16),
                    b = numbers.b.toString(16);
                /*
                * Prefix single values with an 0.
                */
                if(r.length === 1) {
                    r = 0 + r;
                }
                if(g.length === 1) {
                    g = 0 + g;
                }
                if(b.length === 1) {
                    b = 0 + b;
                }

                return r + g + b;
            }

            let object = {
                id: L.user + Math.floor( Math.random()*1000 ).toString(16),
                parent: 'scene',
                tagName: 'a-entity',
                attributes: {
                    geometry : {
                        primitive: geometries[Math.floor(Math.random()* geometries.length)]  // random geometries
                    },
                    material : {
                        color: '#'+toHex(rgb)
                    },
                    position : {
                        x : Math.random() * 16 - 8, // -8 ~ 8
                        y : Math.random() * 10 - 3, // -3 ~ 7
                        z : Math.random() * 25 - 25, // -25 ~ 0
                    },
                    rotation: {
                        x : Math.random() * 2 * Math.PI,
                        y : Math.random() * 2 * Math.PI,
                        z : Math.random() * 2 * Math.PI

                    },
                    'transform-controls' : { activated: false }
                }
            };

            let obj = G.objects.get( object.id ).put({id: object.id});

            // obj.get('id').put(object.id);
            obj.get('parent').put(object.parent);
            obj.get('tagName').put('a-entity');
            obj.get('attributes').get('geometry').put({primitive: object.attributes.geometry.primitive});
            obj.get('attributes').get('material').get('color').put(object.attributes.material.color);
            obj.get('attributes').get('position').put(object.attributes.position);
            obj.get('attributes').get('rotation').put(object.attributes.rotation);
            obj.get('attributes').get('transform-controls').put(object.attributes["transform-controls"]);

            G.scene.get('children').set( obj );

            return object;
        },
};

