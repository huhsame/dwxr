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
+ object
   - pub perspective. classification by HCI type
       + data
       + dom element
       + webGLObject3d
   - sub perspective
       + from data
       + for continual change or not
           - howling
### Flow 
A-Frame is based on top of HTML. 
While  
        
       
        
             
       
            
    



