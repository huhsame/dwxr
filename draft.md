# Draft

## outline

1. intro
    + XR
    + WebXR
    + DWeb
2. (2?) Decentralized Database
    + classification by conflict-free replicated data type (CRDT)
        - Operation-based CRDTs
        - State-based CRDTs
    + publication - subscription system
    + delete
3. design (name ..)
    + flow (about A-Frame)
    + pub-sub
    + room
    + object
        - pub perspective. classification by HCI type
            + data
            + dom element
            + webGLObject3d
        - sub perspective
            + from data
            + for continual change or not
                - howling
4. prototype implementation
    + data structure
        - room
        - object
            + structure
            + partial update
            + extensibility
            + parent - children relation
                - inside
                - outside
    + pub
        - data
        - dom element
        - webGLObjdct3d
    + sub
        - dom element
        - webGLObject3d
    + synced data / calculated data
5. (ㅋ)

## 3. design
### outline
+ flow
+ pub-sub
+ room
+ ~~object~~ entity
   - pub perspective. classification by HCI type
       + data
       + dom element
       + ~~webGLObject3d~~ three.js object 
   - sub perspective
       + from data
       + for continual change or not
           - howling
### Flow 
// it need to extend to general framework including A-Frame, WXR, babylon.js etc

A-Frame is based on top of HTML. 
While A-Frame uses the DOM, its elements don't touch the browser layout engine.
When creating or updating its elements, 3D object updates in 3D scene are all done in memory by A-Frame.
A-Frame provides not only DOM APIs but also direct access to underlying three.js scene and objects by mapping relationship between A-Frame and three.js scene graphs.

The proposed method defines how to update 3D scene from data in decentralized database using two ways to access which are provided by A-Frame for rendering 3D scene .
When data is created or updated in a peer, decentralized database synchronizes data of peers
To share a 3D scene in peers, A-Frame renders 3D object updates in the 3D scene with the synchronized data in each peer.
Depending on 특징 of updated data, the data change DOM tree or three.js scene graph on A-Frame. 
After rendering 3D object updates in the 3D scene by A-Frame with synchronized data, each peer shares the 3D scene.

### pub-sub










       
        
             
       
            
    



