# Draft

## outline

1. intro
    + XR
    + WebXR
    + DWeb
2. (2?) Decentralized Database `<- 2에넣고 그냥 언급만 해주는정도로 릴레이트워크랑 우리랑 차이점을 좀더 설명하는게 좋겟다`
    + classification by conflict-free replicated data type (CRDT)
        - Operation-based CRDTs
        - State-based CRDTs
    + 어느 레이어에서 p2p 를 하는지도 다름
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
            + for contin뉴어스 change or not
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
// 에이프레임은 씬을 조작하는 두가지방법을 제공하고, 우리는 ddb를 통해 이 두가지방법을 이용하여 삼디씬을 멀티유저들끼리 공유하려한다. 
#### 에이프레임은 두가지 스테이트에서 조작할수잇게 제공함
A-Frame is based on top of HTML. 
While A-Frame uses the DOM, its elements do not touch the browser layout engine.
When creating or updating its elements, 3D object updates in 3D scene are all done in memory by A-Frame.
We call 'application state' in this paper as means of ~.
A-Frame provides not only DOM APIs but also direct access to underlying three.js scene by mapping relationship between A-Frame and three.js scene graphs.
// 좀만더 자세히? https://aframe.io/docs/0.9.0/introduction/developing-with-threejs.html
// 뭐라고 부를지도 Entity’s three.js Objects? 
We call 'scene graph state' ~.
**The proposed method defines how to update 3D scene from data with decentralized database using two ways to manipulate 3D scene at application state or scene graph state which are provided by `web based XR library` such as A-Frame.**

#### ddb를 통해 공유된 데이타스테이트가 (base data) 에이프레임을 통해 그려지는 플로우 
When data state is updated in a peer, decentralized database synchronizes data of peers.
From this synchronized data, A-Frame renders 3D object updates in the 3D scene in each peer.
Depending on updated data, the data changes application state or scene graph state.
After rendering 3D object updates in the 3D scene by A-Frame with synchronized data, each peer has same 3D scene.

#### 개별적인 데이터도 있다

Furthermore, in order to share 3D scene with interaction, each peer also should has individual data without synchronization by decentralized database.
Individual data is derived from synchronized data with logged in user data or interaction in each peer.
We call 'base data' in this paper as means of data to share with other peers by DDB and 'derived data' as means of data not to share for making 3D scene different.
For example, as data of user's name or camera's position should be different individually, it is derived data.

#### 구현시 차이점 -> 이거 설계에 안쓰고 구현에 써야하나 ?
Depending on WebXR project to design (구현할 웹엑살 프로그램에 따라), to classify data is required into two types: base data and derived data.
// 왜냐면 각케이스마다 씬에 반영하기위해 변경해야할 스테이트가 다르기때문이
In case of derived data, change it in application state or scene graph state directly.
In another case, base data should be changed in data state which DDB automatically makes peers publish and subscribe this base data.
// data state를 건드려야한다 까지만 이야기하고 / 그뒤에 어떻게 할지는 펍섭쪽에 가서 다시 설명

// 예를들어 박스의 색을 바꿀때, 내 화면에만 어플리케이션스테이트나 씬그래프 스테이트를 변경하면 내꺼만 변하고, 
// 모든 피어에게 박스 색 바꾸려면 내꺼 안건드리고 데이터스테이트를 변경한다. 그러면 나또한 섭스크라이버니까 변경된 데이터의 섭스크라이브를 통해 어플리테이션스테이트나 신그래프스테이트를 변경한다.


// 예를 들어 카메라의 포지션은, 처음 씬이 로드될때만 베이스데이타로부터 모든 피어들이 디폴트값으로 같은 포지션으로 이니셜라이즈되지만, 그 이후에는 유저의 인터랙션에 따라 각각 독립적인 포지션값을 가진다.
// 그러니까 원하는 씬의 목적에 맞게 이 두가지를 잘 구분해야한다. 

// 그리고 플로우 마저 더 설명
// 씬 로드될때 (입장할때) ddb로 base data

---
## 아 여기서부터 base data 자세히

### pub-sub
In order to share base data through ddb, it need to consider features of ddb's publish-subscribe pattern.

#### 중앙의 펍섭과 디의 펍섭 다른점 <- 아마 2로 옮겨야 => 내가 쓴거보다 그 미들맨이 존재한다 얘기도 해줘. mtqq ?
In server-client system, although using publish-subscribe pattern, roles of publisher and subscriber are separated. distinguished on a certain topic. (아 문장이상해 ㅋ 특정데이터에 대해 누가 펍이고 섭인지 딱 정해져잇다.)
Developer sets data to share as topic and roles of the topic who publish or subscribe.
_// should be search pub-sub system and dds._
Otherwise, In decentralized or distributed database system, each peer which is connected by gun-db or orbit-db is both publisher and subscriber.
Because every stored data can be a topic, developer does not need to additional effort to set certain data as a topic.

#### pubsub에서 고려해야할 점 그거 동시에 두개다라는거 ? 뒤에써야하나 ?
`// 표현을 못하겠어. 진짜 허승연아 아오정말`
In DDB, as every peer is both publisher and subscriber which has same script
a peer update publisher is also subscriber.
when a peer update 


### atomic data -> 아이거 그냥 4 임플리멘테이션에 써야할지도

In this paper we propose a designing method that defines room data and object data (where is user?) as atomic data to share for a 3D scene in webXR.
#### -1. room data? ~~scene? workspace?~~
A room is a logical space based on a scene with users who have authority to access the scene.
A room data includes information of the room such as id and information of name and users such as id, name and authority.
In room list page (which is rendered from rooms data), peer subscribes and replicates rooms data without objects data.
User selects one of rooms with checking authority, and enters the selected room.
If one or more user select same room, they enter the same room and share a 3D scene of the room. 

#### -2. object data 아 헷갈려 그림 필수 _ state 정의는 위에서 해버렷어 여긴 지워야해
Object means, in this paper, the unit of a 3D object in a 3D scene which is rendering state and a entity named by A-Frame in DOM tree which is application state.
_// A 3D scene is composed of 3D objects, and each 3D object is composed of multiple types of object3D(THREE.Object3D) in three.js such as mesh and light.__
Additionally object data is expression of object in data state.
A object data includes information of the object to specify a entity by A-Frame such as tagName, id and attributes.
3D scene is rendered from DOM tree objects data which belong to the room.
When a user enters the selected room, the proposed method creates DOM elements from objects data.
A-Frame renders 3D scene in this room from DOM tree. 

Peers publish or subscribe data based on these atomic data.


---

### update object data on pubside - subside 
//- sub side 랑 pub side랑 두개를 나눠섯 생각해야한다 ?
In order to synchronize base data in peers, it should be changed in data state.
To change base data in data state lets DDB publish it to other peers.
After publishing, peers get a event which notices update of base data.
Subscribers listen this event and update their 3D scene by updated base data respectively.
In this paper, we propose classifying independent two sides which is publish side and subscribe side.
Figure n shows an overview of the proposed designing method for webxr with ddb. 

#### pub-side

On publish side, data state is changed from three ways which are data state, application state, and scene graph state, as shown in Figure n(a).
Human-computer interactions in webxr can be sorted by perspective of which state is changed

#### sub-side
on the other hand, figure n(b) shows that updated base data in data state applies to application state or scene graph state on subscribe side.

