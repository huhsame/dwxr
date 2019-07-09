import 'aframe'
import '../../three/postprocessing';

const PP = POSTPROCESSING;

const postprocessingSystem = {

    assets: null,
    composer: null,
    originalRenderMethod: null,

    /**
     * Sets the preloaded scene assets.
     *
     * @param {Map} assets - A collection of scene assets.
     * @return {Object} This system.
     */

    setAssets(assets) {

        this.assets = assets;
        return this;

    },



    /**
     * Initializes this system.
     */

    init() {

        const sceneEl = this.sceneEl;

        const scene = sceneEl.object3D;
        const renderer = sceneEl.renderer;
        const render = renderer.render;
        const camera = sceneEl.camera;

        const assets = this.assets;
        const clock = new THREE.Clock();
        const composer = new PP.EffectComposer(renderer);

        this.composer = composer;
        this.originalRenderMethod = render;

        const smaaEffect = new PP.SMAAEffect(assets.get("smaa-search"), assets.get("smaa-area"));

        const renderPass = new PP.RenderPass(scene, camera);
        const smaaPass = new PP.EffectPass(camera, smaaEffect);

        smaaPass.renderToScreen = true;

        composer.addPass(renderPass);
        composer.addPass(smaaPass);

        // Hijack the render method.
        let calledByComposer = false;
        renderer.render = function() {
            if(calledByComposer) {
                render.apply(renderer, arguments);
            } else {
                calledByComposer = true;
                composer.render(clock.getDelta());
                calledByComposer = false;
            }
        };
        this._addOutlinePass = AFRAME.utils.bind(this._addOutlinePass, this);
        window.addEventListener('nowuser', this._addOutlinePass);

    },

    /**
     * Clean up when the system gets removed.
     */
    remove() {
        this.composer.renderer.render = this.originalRenderMethod;
        this.composer.dispose();
    },

    _addOutlinePass(event){
        if(event.detail.color === undefined) return;
        let scene = this.sceneEl.object3D;
        let camera = this.sceneEl.camera;
        let layer = G.outlineLayerNumbers.pop();
        let newEffect = new PP.OutlineEffect(scene, camera, {
            blendFunction: 2,
            edgeStrength: 5, // white outline
            pulseSpeed: 0,
            resolutionScale: 0.3,
            visibleEdgeColor: event.detail.color,
            hiddenEdgeColor: 0x121ee6,
            blur: true,
            blurriness: 2,
            xRay: true,
            opacity: 0.5,
        });
        newEffect.selectionLayer = layer;
        let newPass =  new PP.EffectPass(camera, newEffect);
        let oldPass = G.outlinePassMap.get(event.detail.alias);
        if( oldPass !== undefined ){
               this.composer.removePass(oldPass);
        }
        G.outlinePassMap.set(event.detail.alias, newPass);

        newPass.renderToScreen = true;
        this.composer.passes.forEach(function preventRenderToScreen(pass){
            pass.renderToScreen = false;
        });
        this.composer.addPass(newPass);
    }
};

/**
 * Loads scene assets.
 *
 * @return {Promise} A promise that will be fulfilled as soon as all assets have been loaded.
 */

function load() {

    const assets = new Map();
    const loadingManager = new THREE.LoadingManager();
    console.log('postprocessing is loading')
    return new Promise((resolve, reject) => {

        let image;

        loadingManager.onError = reject;
        loadingManager.onProgress = (item, loaded, total) => {

            if(loaded === total) {

                resolve(assets);

            }

        };

        // Load the SMAA images.
        image = new Image();
        image.addEventListener("load", function() {

            assets.set("smaa-search", this);
            loadingManager.itemEnd("smaa-search");

        });

        loadingManager.itemStart("smaa-search");
        image.src = PP.SMAAEffect.searchImageDataURL;

        image = new Image();
        image.addEventListener("load", function() {

            assets.set("smaa-area", this);
            loadingManager.itemEnd("smaa-area");

        });

        loadingManager.itemStart("smaa-area");
        image.src = PP.SMAAEffect.areaImageDataURL;

    });

};

window.addEventListener('loadscene',function(){
    let sceneEl = document.querySelector('a-scene');
    if(sceneEl.getAttribute('postprocessing') !== true) return;
    console.log('postprocessing is true')
    load().then((assets) => {
        AFRAME.registerSystem("postprocessing", postprocessingSystem.setAssets(assets));
    }).catch(console.error);
});

