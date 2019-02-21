# dwxr
2019.02.21

####TODO
- ~~define terms with Ko at 9:30 am~~
- update whole document with Ko's advice. 

## Contents
1. Term
2. Format
3. Flow?  Scenario?
4. save

### 1. Term

- atomic object
- interaction
    + to be synchronized for collaboration in the workspace.
    + HCI
- 

#### Atomic object

 It is logical unit that will be updated by interaction(HCI) of user. There are expressions( notation? type? ) by each side.  
- dom element
- HTML entity
- webGLObject3D
- json - _should it be named?_



### 2. Format
Data to be stored database can be expressed usng json. will develop to json-ld.

dom element 정보를 저장
그러니까 html attribute랑 음 hierarchy 

hierarchy 는 
db type 에 따라 달라
orbitdb - docs 
gundb - graph : reference 해줘야함

```html
<wxr-obj id="handle" mtl="handle.mtl" obj="handle.obj" 
        base-url="https://wxr.nyc3.cdn.digitaloceanspaces.com/ar3dp/resources/models/valve_3d" 
        webgl_uuid="62289299-3E26-451C-BE9C-4EDAD00F6F2E" 
        css3d_uuid="DBB98B68-98F7-4A08-BDB0-315F6C4D5DE1" 
        observetrigger="true"></wxr-obj>

```

```json5
{
    tagName: 'wxr-obj',
    id: 'hanldle',
    mtl: 'arrow.mtl',
    obj: 'arrow',
    baseUrl: "https://wxr.nyc3.cdn.digitaloceanspaces.com/ar3dp/resources/models/valve_3d",
    webgl_uuid: "62289299-3E26-451C-BE9C-4EDAD00F6F2E",
    css3d_uuid : "DBB98B68-98F7-4A08-BDB0-315F6C4D5DE1",
    observeTrigger: true,

    parent: 'target01',
    children: ['bolt', 'nut'] // set. id of child element
}
```


```html
<a-entity position="-2.5 0 -1.5" player="soul:jsbj980g6Je2pqUVn4jU">
    <a-entity id="w5h3" mixin="grid-plane" seat="owner:멍청한 유병현" material="color:#ff5a30"></a-entity>
    <a-entity avatar="state:ready" id="jsbj980g6Je2pqUVn4jU" position="0 0.5 0" mixin="avatar" transform-controller="enabled:true;type:avatar">
        <a-text shader="msdf" text="" font="https://raw.githubusercontent.com/myso-kr/aframe-fonts-korean/master/fonts/ofl/nanumgothic/NanumGothic-Bold.json" color="#000000" align="center" rotation="0 -90 0" position="0 0.5 0" scale="0.7 0.7 0.7" value="멍청한 유병현"></a-text>
    </a-entity>
</a-entity>
```


## 3. Flow (Scenario) + interaction(HCI)

### 3.1 init
`TODO` It should be extended to manage workspace. (using pub-sub room)


option 1 : drawing scene from a static html file provided by server. It is always loaded same. 
When a user enters a workspace. Server provide a static html file. 

option 2 : from database

Actually we have to do option2. No other choices. Because play mode and authoring mode should be integrated. Go HUH! 

1. **Replicate db**
2. Create dom elements
3. Draw a scene

##### 1) Replicate db
OrbitDB or GunDB replicate database from other peers. 
```javascript
db.events.on('replicated', ( address )=>{
    // database is replicated.
})
```


##### 2) Create dom elements

```javascript
let sceneEl = document.querySelector('wxr-space');
let handleData = gun.get('handle');

// create a dom element
let handleEl = document.createElement( handleData.tagName );

// set attributes from data
for(let attribute of handleData){
    handleEl.setAttribute( attribute.key, attribute.value );
}

// add to scene
sceneEL.appendChild( handleEl );
```
##### 3) Draw a scene
AFrame or WXR Library draws scene. We don't need to do.

### 3.2 update
It use pub-sub system to synchronize every single scene. There are two (or more) cases by **input behavior**.  It may be classified and called by `types of interation(HCI)`.Regardless of case, **A publisher is one of subscribers.** And each peer is publisher and subscriber. It need to keep in mind to implement the project. Check out some interaction(HCI) examples in the `aframe+gun demo` that you saw before.

- moving avatar
    - publisher
        1. `input` change _pub's webObject3D_ 
        2. put data to db 
    - subscriber
        1. get data from db
        2. **update the dom element including publisher**
        3. redraw a webObject3D
    
- clicking seat
    - publisher
        1. `input` emit event
        2. put data to db
    - subscriber
        1. get data from db
        2. **update the dom element including publisher**
        3. redraw a webObject3D
        
## 4. Save

_This chapter name will be changed to management workspaces using pub-sub room_

If     
