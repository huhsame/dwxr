# dwxr
2019.02.21
1. Term
2. Format
3. Flow?  Scenario?
### 1. Term
`TODO: define terms with Ko at 9:30 am`

#### Atomic object
단위, 포맷, 언어 
 
-[ ] a dom element
-[ ] a HTML entity
-[ ] a webObject3D (including three.js etc)

### 2. Format

#### WXR Object

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

## 3. Flow?  Scenario?
### init
1. Replicate db
2. Create dom elements
3. Draw a scene

##### Replicate db
OrbitDB or GunDB replicate database from other peers. 
```javascript
db.events.on('replicated', ( address )=>{
    // database is replicated.
})
```


##### Create dom elements

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
##### Draw a scene
AFrame or WXR Library draws scene. 

### update
It use pub-sub system to synchronize every single scene. There are two (or more) cases by **input behavior**. Regardless of case, **A publisher is one of subscribers.** Check out some examples.

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
       
