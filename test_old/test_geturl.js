//
// node test/test_geturl.js [text [lang]]
//

"use strict"

const TTGoogleHome = require('../text-to-googlehome');

let text = 'こんにちは';
let lang = 'ja'

// --- get args ---
if (process.argv.length > 2) {
  text = process.argv[2];
}
if (process.argv.length > 3) {
  lang = process.argv[3];
}

// get URL
try {
  const url = TTGoogleHome.getUrlfromText(text, lang);
  console.warn(text, url);
  if ((!url) || (url === '')) {
    console.error('ERROR: empty URL');
    process.exit(1);
  }
}
catch (err) {
  console.error('text to URL ERROR:', err);
  process.exit(1);
}

process.exit(0);