# Draft

## outline

1. intro
    + XR
    + WebXR
    + DWeb
2. (2?) Decentralized Database `<- 어디에`
    + classification by conflict-free replicated data type (CRDT)
        - Operation-based CRDTs
        - State-based CRDTs
    + publication - subscription system 을 `사용하는 ddb에 대해`
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
       + object data
       + dom element
       + ~~webGLObject3d~~ 3d object 
   - sub perspective
       + from object data
       + for `continual change or not`
           - howling
### Flow 
_// it need to extend to general framework including A-Frame, WXR, babylon.js etc_

A-Frame is based on top of HTML. 
While A-Frame uses the DOM, its elements do not touch the browser layout engine.
When creating or updating its elements, 3D object updates in 3D scene are all done in memory by A-Frame.
A-Frame provides not only DOM APIs but also direct access to underlying three.js scene and objects by mapping relationship between A-Frame and three.js scene graphs.

The proposed method defines how to update 3D scene from data in decentralized database using two ways to access which are provided by A-Frame for rendering 3D scene .
When data is created or updated in a peer, decentralized database synchronizes data of peers
To share a 3D scene in peers, A-Frame renders 3D object updates in the 3D scene with the synchronized data in each peer.
Depending on 특징 of updated data, the data change DOM tree or three.js scene graph on A-Frame. 
After rendering 3D object updates in the 3D scene by A-Frame with synchronized data, each peer shares the 3D scene.

### pub-sub

In server-client system, although using publish-subscribe pattern, roles of publisher and subscriber are separated. distinguished on a certain topic. (아 문장이상해 ㅋ 특정데이터에 대해 누가 펍이고 섭인지 딱 정해져잇다.)
Developer sets data to share as topic and roles of the topic who publish or subscribe.
_// should be search pub-sub system and dds._
Otherwise, In decentralized or distributed database system, each peer which is connected by gun-db or orbit-db is both publisher and subscriber.
Because every stored data can be a topic, developer does not need to additional effort to set certain data as a topic.

### atomic data
In this paper we propose a designing method that defines room data and object data (where is user?) as atomic data to share for a 3D scene in webXR.
#### -1. room data? ~~scene? workspace?~~
A room is a logical space based on a scene with users who have authority to access the scene.
A room data includes information of the room such as id and information of name and users such as id, name and authority.
In room list page (which is rendered from rooms data), peer subscribes and replicates rooms data without objects data.
User selects one of rooms with checking authority, and enters the selected room.
If one or more user select same room, they enter the same room and share a 3D scene of the room. 

#### -2. object data 아 헷갈려 그림 필수 _ status 정의
Object means, in this paper, the unit of a 3D object in a 3D scene which is rendering status and a entity named by A-Frame in DOM tree which is application status.
_// A 3D scene is composed of 3D objects, and each 3D object is composed of multiple types of object3D(THREE.Object3D) in three.js such as mesh and light.__
Additionally object data is expression of object in data status.
A object data includes information of the object to specify a entity by A-Frame such as tagName, id and attributes.
3D scene is rendered from DOM tree objects data which belong to the room.
When a user enters the selected room, the proposed method creates DOM elements from objects data.
A-Frame renders 3D scene in this room from DOM tree.

Peers publish or subscribe data based on these atomic data.


---
### cases by HCI types - object data 만 ㅋ 
The proposed method classifies independent two sides on single peer because a peer is both a publisher and subscriber.
_(figure)_
Behaviors to change data status are publish-side and behaviors to apply updated data to application status or rendering status are subscribe-side.

#### pub-side
아 그림으로 설명하자.  용어 적어놨으니까. 정말 미치겠네
- object data
- dom element
- 3d object


















       
        
             
       
            
    



