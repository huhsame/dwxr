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

        const outlineEffect = new PP.OutlineEffect(scene, camera, {
            blendFunction: PP.BlendFunction.ALPHA,
            edgeStrength: 25,
            pulseSpeed: 0.0,
            resolutionScale: 0.75,
            visibleEdgeColor: 0x000000,
            hiddenEdgeColor: 0x22090a,
            blur: true,
            xRay: true
        });

        const renderPass = new PP.RenderPass(scene, camera);
        const effectPass = new PP.EffectPass(camera, outlineEffect);
        const smaaPass = new PP.EffectPass(camera, smaaEffect);

        smaaPass.renderToScreen = true;

        composer.addPass(renderPass);
        composer.addPass(effectPass);
        composer.addPass(smaaPass);

        const abc = document.querySelector('#abc').object3D;
        outlineEffect.setSelection(abc.children);



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

    },

    /**
     * Clean up when the system gets removed.
     */

    remove() {

        this.composer.renderer.render = this.originalRenderMethod;
        this.composer.dispose();

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
    console.log('loadscene')
    load().then((assets) => {

        AFRAME.registerSystem("postprocessing", postprocessingSystem.setAssets(assets));

    }).catch(console.error);
});



