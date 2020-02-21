let moment = require('moment-timezone');
const UserModel = require('../models/UserModel');


// gun 시간 받아와야겠는데

let animals = [
    "Aardvark",
    "Albatross",
    "Alligator",
    "Alpaca",
    "Ant",
    "Anteater",
    "Antelope",
    "Ape",
    "Armadillo",
    "Donkey",
    "Baboon",
    "Badger",
    "Barracuda",
    "Bat",
    "Bear",
    "Beaver",
    "Bee",
    "Bison",
    "Boar",
    "Buffalo",
    "Butterfly",
    "Camel",
    "Capybara",
    "Caribou",
    "Cassowary",
    "Cat",
    "Caterpillar",
    "Cattle",
    "Chamois",
    "Cheetah",
    "Chicken",
    "Chimpanzee",
    "Chinchilla",
    "Chough",
    "Clam",
    "Cobra",
    "Cockroach",
    "Cod",
    "Cormorant",
    "Coyote",
    "Crab",
    "Crane",
    "Crocodile",
    "Crow",
    "Curlew",
    "Deer",
    "Dinosaur",
    "Dog",
    "Dogfish",
    "Dolphin",
    "Dotterel",
    "Dove",
    "Dragonfly",
    "Duck",
    "Dugong",
    "Dunlin",
    "Eagle",
    "Echidna",
    "Eel",
    "Eland",
    "Elephant",
    "Elk",
    "Emu",
    "Falcon",
    "Ferret",
    "Finch",
    "Fish",
    "Flamingo",
    "Fly",
    "Fox",
    "Frog",
    "Gaur",
    "Gazelle",
    "Gerbil",
    "Giraffe",
    "Gnat",
    "Gnu",
    "Goat",
    "Goldfinch",
    "Goldfish",
    "Goose",
    "Gorilla",
    "Goshawk",
    "Grasshopper",
    "Grouse",
    "Guanaco",
    "Gull",
    "Hamster",
    "Hare",
    "Hawk",
    "Hedgehog",
    "Heron",
    "Herring",
    "Hippopotamus",
    "Hornet",
    "Horse",
    "Human",
    "Hummingbird",
    "Hyena",
    "Ibex",
    "Ibis",
    "Jackal",
    "Jaguar",
    "Jay",
    "Jellyfish",
    "Kangaroo",
    "Kingfisher",
    "Koala",
    "Kookabura",
    "Kouprey",
    "Kudu",
    "Lapwing",
    "Lark",
    "Lemur",
    "Leopard",
    "Lion",
    "Llama",
    "Lobster",
    "Locust",
    "Loris",
    "Louse",
    "Lyrebird",
    "Magpie",
    "Mallard",
    "Manatee",
    "Mandrill",
    "Mantis",
    "Marten",
    "Meerkat",
    "Mink",
    "Mole",
    "Mongoose",
    "Monkey",
    "Moose",
    "Mosquito",
    "Mouse",
    "Mule",
    "Narwhal",
    "Newt",
    "Nightingale",
    "Octopus",
    "Okapi",
    "Opossum",
    "Oryx",
    "Ostrich",
    "Otter",
    "Owl",
    "Oyster",
    "Panther",
    "Parrot",
    "Partridge",
    "Peafowl",
    "Pelican",
    "Penguin",
    "Pheasant",
    "Pig",
    "Pigeon",
    "Pony",
    "Porcupine",
    "Porpoise",
    "Quail",
    "Quelea",
    "Quetzal",
    "Rabbit",
    "Raccoon",
    "Rail",
    "Ram",
    "Rat",
    "Raven",
    "Red deer",
    "Red panda",
    "Reindeer",
    "Rhinoceros",
    "Rook",
    "Salamander",
    "Salmon",
    "Sand Dollar",
    "Sandpiper",
    "Sardine",
    "Scorpion",
    "Seahorse",
    "Seal",
    "Shark",
    "Sheep",
    "Shrew",
    "Skunk",
    "Snail",
    "Snake",
    "Sparrow",
    "Spider",
    "Spoonbill",
    "Squid",
    "Squirrel",
    "Starling",
    "Stingray",
    "Stinkbug",
    "Stork",
    "Swallow",
    "Swan",
    "Tapir",
    "Tarsier",
    "Termite",
    "Tiger",
    "Toad",
    "Trout",
    "Turkey",
    "Turtle",
    "Viper",
    "Vulture",
    "Wallaby",
    "Walrus",
    "Wasp",
    "Weasel",
    "Whale",
    "Wildcat",
    "Wolf",
    "Wolverine",
    "Wombat",
    "Woodcock",
    "Woodpecker",
    "Worm",
    "Wren",
    "Yak",
    "Zebra"
];
let pickRandom = function ( array ){
    return array[Math.floor(Math.random() * array.length)];
};
let digit5Random = function (){
    return Math.floor(Math.random()*(99999-10000+1)+10000);
}

let  createName = function (){
    return pickRandom(animals) + digit5Random();
}

let users =[];

let orders = [];
let total = 100;
for(let i = 0;i < total; i++){
    orders[i] = total-i -1;
}

module.exports = {
    create: (req, res) => {
        // todo: set time
        let time = new Date();
        let timeKR = moment.tz(time, "Asia/Seoul").format();

        // set username
        // todo: 디비에서 find해서 중복 체크
        let name = createName();
        // todo: 디비에서 find해서 이미 있으면 새로 만들어
        // todo: req.body 에 이름이 있으면 그이름으로 저장



        // set order
        let order = orders.sort(function(a, b){return b - a}).pop();

        // save user and order to session
        req.session.user ={};
        req.session.user.name = name;
        req.session.user.order = order;

        // todo: save and then redirect test space
        let user = new UserModel({
            name: name,
            timestamp: time,
            timestampKR: timeKR,
        });

        user.save()
            .then(result => {
                res.redirect('/test/speed');
            })
            .catch( err => {
                res.json({ success: false, result: err});
            });
    },

    getset: (req, res) => {
        // todo: set time
        let time = new Date();
        let timeKR = moment.tz(time, "Asia/Seoul").format();

        console.log(req.body);
        let data = req.body; // 꼭 한번 변수에 옮겨준다음에 해야함. req.body.name 이런거는 에러
        // res.send(JSON.stringify(data));

        // set username
        let name = data.name + digit5Random();

        // todo: 디비에서 find해서 이미 있으면 새로 만들어
        // todo: req.body 에 이름이 있으면 그이름으로 저장



        // set order
        let order = orders.sort(function(a, b){return b - a}).pop();

        // save user and order to session
        req.session.user ={};
        req.session.user.name = name;
        req.session.user.order = order;

        let userModel = {
            name: name,
            bandwidth: data.bandwidth,
            timestamp: time,
            timestampKR: timeKR,
        };

        // todo: save and then redirect test space
        let user = new UserModel(userModel);

        user.save()
            .then(result => {
                console.log({success: true, result: userModel});
                // global.me = userModel;
                res.redirect('/test/speed');
            })
            .catch( err => {
                res.json({ success: false, result: err, userModel});
            });
    },

    // todo
    update: (req, res) => {

        // todo: username 으로 찾아서 find
        let isp = {};
        isp.ip = req.body.isp.ip;
        if(!req.body.isp.bogon){
            let loc = req.body.isp.loc.split(',');
            isp.loc = {};
            isp.loc.lat = parseFloat(loc[0]);
            isp.loc.long = parseFloat(loc[1]);
        }
        let user = {
            name: req.session.user.name,
            userAgent: req.header('user-agent'),
            isp: isp,
            speed: {
                dl: parseFloat(req.body.speed.dl),
                ul: parseFloat(req.body.speed.ul),
                ping: parseFloat(req.body.speed.ping),
                jitter: parseFloat(req.body.speed.jitter),
            }
        };
        console.log(user);

        UserModel.updateOne({name: user.name}, user)
            .then(user => {
                // if(!user) res.json({success: false, result: "No user found."});
                res.json({success: true, user: user});
            }).catch(err=>{
            console.log('user update fail');
            res.json({success: false, result: err})
            });
    },

    out: (req, res) => {
        // test 페이지만 나왔을때..
        // pid 만 끝나는거고
        // order 만 제거
        // 세션은 유지 -> 설문조사 해야하잖아

        if (req.session.user === undefined){
            console.log('there is no user in session.');
            return;
        }
       let user = req.session.user;

        // order
        orders.push(user.order);
        req.session.order = -1;
        // 오더 할당할때 -1 인지 체크해야해

        // todo: redirect somewhere such as survey
        res.redirect('/test/survey')

    },

    // 어디서 부르는거지?
    getUser: (req, res) => {

        let name = req.body.name;

        let getUserItem = function (err, user){

            if(err){
                console.log('[getUser] err: ' + err);
                console.log('[getUser] user: ' + user);
                return;
            }
            res.json({success: true, user: user});
        }

        // byName dosen't work. ==> findOne( condition )
        // UserModel.findOne().byName( name ).exec( getUser );
        UserModel.findOne({name: name}).exec( getUserItem );

    },

    getMe: (req, res) => {
        console.log('getme!!!!!!!!!!')

        if (req.session.user === undefined){
            console.log('there is no user in session.');
            return;
        }
        let user = req.session.user;

        res.json({success: true, user: user});
    }




};
