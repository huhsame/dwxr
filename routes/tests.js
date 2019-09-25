var express = require('express');
var router = express.Router();
let strings = require('../strings');

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
let digit3Random = function (){
  return Math.floor(Math.random()*(999-100+1)+100);
}

let  createName = function (){
  return pickRandom(animals) + digit3Random();
}

let currentUsers = [];
let rails = [0,1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20];
let getRail = function(){
  rails.sort(function(a, b){return b - a});
  console.log('rails : ' + rails);
  let rail = rails.pop();
  if(rail === undefined){
    rail = rails.pop();
  }
  console.log('pop : ' + rail );
  console.log('rails : ' + rails)
  return rail
};
let addUser = function(name){
  let i = currentUsers.indexOf(name);
  if(i === -1){
    currentUsers.push(name);
  }
  let order = getRail();
  console.log(order);
  return order;
};
let removeUser = function(user){
  let i = currentUsers.indexOf(user.name);
  if(i !== -1){
    currentUsers.splice(i, 1);
  }
  rails.push(user.order)

};
let resetUsers = function(){
  currentUsers = [];
  rails = [0,1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20];
}

let createUser = function(){
  let user = {
    name: createName(),
    auto: false,
    local: false
  };
  user.order = addUser(user.name);
  console.log(user);

  return user;
}

router.get('/', function(req, res, next) {
  let user = createUser();

  if(strings.localMode){
    user.local = strings.localMode;
    req.session.user = user;
    res.redirect( '/test/space' );
    return;
  }
  req.session.user = user;
  res.redirect( '/test/speed' );
});

router.get('/auto', function(req, res, next) {
  let user = createUser();
  // local 인지도 체크 할 것
  user.auto = true;
  req.session.user = user;
  res.redirect('/test/speed' );
});

router.get('/speed', function(req, res, next) {
  res.render('test-speed', { name: req.session.user.name });
});

router.get('/space', function(req, res, next) {
  let user = req.session.user;
  console.log(req.session);

  if(user){
    if(user.auto){
      // res.render('test-auto-space', { user: user});
      res.render('test-space', {  user: user});

      return;

    }else{

      res.render('test-space', {  user: user});
      ////////// todo: auto 구분할것

      return;
    }
  }else{
    res.redirect('/test' );
    return;
  }
});

router.get('/survey', function(req, res, next) {
  let user = req.session.user;
  console.log(user);
  if(user){
    if(user.auto){
      res.redirect('/test/space' );
      return;
    }
    res.render('test-survey', { name: user.name});
  }
  else{
    res.redirect('/test' );
  }
});

router.get('/random', function(req, res, next) {
  let user = req.session.user;
  if(user){

  }else{
    let user = {
      name: createName(),
      auto: false,
      local: false
    };
    req.session.user = user;
  }

  res.render('test-space-random', {  name: user.name});

});



router.post('/resetUsers', function(req, res){
  resetUsers();
  res.json({ success: true, currentUsers: currentUsers});
});

router.post('/removeUser', function(req, res){

  let user =req.session.user;
  removeUser(user);
  req.session.destroy(function(err){
    if(err) console.log(err)
    else console.log(user.name +' is removed successfully.');
  });
  res.json({ success: true, currentUsers: currentUsers});
});



module.exports = router;
