// src/js/main.js
import "@babel/polyfill";
import { pi, power, Foo } from './lib';
import {MDCRipple} from '@material/ripple';
import {MDCTopAppBar} from '@material/top-app-bar';

import Gun from 'gun';
import radix from 'gun/lib/radix';
import radisk from 'gun/lib/radisk';
import store from 'gun/lib/store';
import rindexed from 'gun/lib/rindexed'



var opt = {};
opt.store = RindexedDB(opt);
opt.localStorage = false; // Pass Gun({localStorage: false}) to disable localStorage.
let gun = Gun(opt);

// gun.get('root').get('where').put('here');

// Instantiation
const topAppBarElement = document.querySelector('.mdc-top-app-bar');
const topAppBar = new MDCTopAppBar(topAppBarElement);


console.log(pi);
console.log(power(pi, pi));

const f = new Foo();
console.log(f.foo());
console.log(f.bar());


