"use strict"

const TTGoogleHome = require('./text-to-googlehome');


const textEng = 'Hello World'
const urlEng =  TTGoogleHome.getUrlfromText(textEng, null);
console.log(textEng, urlEng);

const textJp = 'こんにちは'
const urlJp =  TTGoogleHome.getUrlfromText(textJp, 'ja');
console.log(textJp, urlJp);