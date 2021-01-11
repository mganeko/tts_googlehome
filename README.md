# tts-googlehome

Text-to-Speech with GoogleHome, for Node.js

- Node.js v12.9 or later, bacause using Promise.allSettled()
- Alternative for google-home-notifier


## Installation

```
$ npm install --save tts-googlehome
```

## Direct Dependency

- [google-tts-api](https://www.npmjs.com/package/google-tts-api)
- [castv2-client](https://www.npmjs.com/package/castv2-client)

## Usage

### 1. `speakToDeviceAsync(host, text, lang)`

- args:
  - host ... Device hostname/IP Address, such as "xxxxxxxx.local" or "192.168.0.xxx"
  - text ... text to speak
  - lang ... ex) 'en-US', 'ja'
- return Promise

example

```js
const TtsGoogleHome = require('tts-googlehome');

TtsGoogleHome.speakToDeviceAsync('xxxxxxx.local', 'Hello', 'en-US')
  .then(e => {
    // -- OK --
    console.log('speak OK');
  })
  .catch(err => {
    // -- error --
    console.error('speak ERROR:', err);
  });
```

### 2. `speakToMultiDeviceAsync(hosts, text, lang)`

- args:
  - hosts ... array of Device hostname/IP Address
    - ex) ["xxxxx1.local", "xxxxx2.local"]
  - text ... text to speak
  - lang ... ex) 'en-US', 'ja'
- return array of Promise status (fulfilled or rejected)

example

```js
const TtsGoogleHome = require('tts-googlehome');

TtsGoogleHome.speakToMultiDeviceAsync(['xxxxxxx.local', '192,168.0.xxx'], 'Hello', 'en-US')
  .then(e => {
    // -- finished --
    console.log('speak multi finished:', e);
  })
```

### 3. `getUrlfromText(text, lang)`

- args:
  - text ... text to speak
  - lang ... ex) 'en-US', 'ja'
- return URL

```js
const TtsGoogleHome = require('tts-googlehome');

const url = TtsGoogleHome.getUrlfromText('Hello', 'en-US');
console.log(url);
```

### 4. `castUrlToDeviceAsync(host, url)`

- args:
  - host ... Device hostname/IP Address, such as "xxxxxxxx.local" or "192.168.0.xxx"
  - url ... url to audio, such as returned by getUrlfromText()
- return Promise

```js
const TtsGoogleHome = require('tts-googlehome');
const url = 'http://xxxxxxx/audio.mp3';

TtsGoogleHome.castUrlToDeviceAsync('xxxxxxxx.local', url)
  .then(e => {
    // -- OK --
    console.log('cast OK');
  })
  .catch(err => {
    // -- error --
    console.error('cast ERROR:', err);
  });
```

## Run test

- copy _conf/test_config.template.js to _conf/test_config.js
- modify _conf/test_config.js
  - TEST_DEVICE1_HOSTNAME ... hostname or IP address of Device 1
  - TEST_DEVICE2_HOSTNAME ... hostname or IP address of Device 2
- execute all test
  - npm test
  - (or) npx jest
- execute single test (example)
  - npx jest test_geturl.js
  - (or) npx jest -t "NOT exist device"

## License

MIT
