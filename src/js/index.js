// src/js/main.js
import "@babel/polyfill";
import { pi, power, Foo } from './lib';
import {MDCRipple} from '@material/ripple';
import {MDCTopAppBar} from '@material/top-app-bar';
// Instantiation
const topAppBarElement = document.querySelector('.mdc-top-app-bar');
const topAppBar = new MDCTopAppBar(topAppBarElement);


console.log(pi);
console.log(power(pi, pi));

const f = new Foo();
console.log(f.foo());
console.log(f.bar());


