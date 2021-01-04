//
// node test/test_speakmulti.js [text [lang]]
//

"use strict"

// ---- config ---
const deviceConfig = require('../_conf/test_config').deviceConfig;
console.warn('read test_config.js');


// --- Text-to-speach ---
const TTGoogleHome = require('..');

const hosts = [deviceConfig.TEST_DEVICE1_HOSTNAME, deviceConfig.TEST_DEVICE2_HOSTNAME];
let text = '複数に話すテスト';
let lang = 'ja'

// --- get args ---
if (process.argv.length > 2) {
  text = process.argv[2];
}
if (process.argv.length > 3) {
  lang = process.argv[3];
}

console.warn('TTS multi:', hosts, text, lang);

// --- speak ---

//TTGoogleHome.speakToMultiDeviceAnyway(hosts, text, lang)

TTGoogleHome.speakToMultiDeviceAsync(hosts, text, lang)
  .then(e => {
    // -- OK --
    console.warn('speak [%s] to %s --> ', text, hosts, e);
    process.exit(0);
  })
  .catch(err => {
    // -- error --
    console.error('speak ERROR:', err);
    process.exit(1);
  });

