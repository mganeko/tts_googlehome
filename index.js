"use strict"

const TTGoogleHome = require('./text-to-googlehome');


// --- English ---
const textEng = 'Hello World'
const urlEng = TTGoogleHome.getUrlfromText(textEng, null);
console.log(textEng, urlEng);

// --- Japanese ---
const textJp = 'こんにちは'
const urlJp = TTGoogleHome.getUrlfromText(textJp, 'ja');
console.log(textJp, urlJp);