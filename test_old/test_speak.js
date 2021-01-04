//
// node test/test_speak.js deviceHost [text [lang]]
//

"use strict"

const TTGoogleHome = require('..');

let host = null;
let text = 'テストです';
let lang = 'ja'

// --- get args ---
if (process.argv.length > 2) {
  host = process.argv[2];
}
else {
  console.error('ERROR: need deviceHost');
  process.exit(1);
}

if (process.argv.length > 3) {
  text = process.argv[3];
}
if (process.argv.length > 4) {
  lang = process.argv[4];
}

console.warn(host, text, lang);

// --- speak ---
TTGoogleHome.speakToDeviceAsync(host, text, lang)
  .then(e => {
    // -- OK --
    console.warn('speak [%s] to %s --> ', text, host, e);
    process.exit(0);
  })
  .catch(err => {
    // -- error --
    console.error('speak ERROR:', err);
    process.exit(1);
  });

