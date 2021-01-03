//
// text-to-speech with GoogleHome
//   use google-tts-api, castv2-client
//
// speakToDeviceAsync(host, text, lang); // cast text as audio to Device
// getUrlfromText(text, lang); // convert text to audio URL
// castUrlToDeviceAsync(host, url); // cast audio url to Device
//

'use strict';

// ===== using modules =====
// --- TTS ---
const googleTTS = require('google-tts-api');

// --- CAST ---
const Client = require('castv2-client').Client;
const DefaultMediaReceiver = require('castv2-client').DefaultMediaReceiver;


// ===== export functions =====

// --- cast text as audio to Device ---
// return Promise
function speakToDeviceAsync(host, text, lang) {
  const url = getUrlfromText(text, lang);
  const promise = castUrlToDeviceAsync(host, url);
  return promise;
}

// --- cast text as audio to multi Device ---
// return Promise
function speakToMultiDeviceAsync(hosts, text, lang) {
  const url = getUrlfromText(text, lang);
  //console.warn('hosts:', hosts);

  const promiseArray = [];
  hosts.forEach(host => {
    const promise = castUrlToDeviceAsync(host, url);
    promiseArray.push(promise);
  });
  console.log('promise array:', promiseArray);

  return Promise.all(promiseArray);
}

// --- cast text as audio to multi Device ---
// return nothing
function speakToMultiDeviceAnyway(hosts, text, lang) {
  const url = getUrlfromText(text, lang);
  //console.warn('hosts:', hosts);

  hosts.forEach(host => {
    castUrlToDeviceAsync(host, url)
      .then(e => console.warn('cast to %s OK', host))
      .catch(err => console.error('cast to %s ERROR', host, err))
  });
}


// --- convert text to audio URL  ---
function getUrlfromText(text, lang) {
  const useLanguage = lang ? lang : 'en-US';
  const SERVICE_URL = 'https://translate.google.com';
  const url = googleTTS.getAudioUrl(text, {
    lang: useLanguage,
    slow: false,
    host: SERVICE_URL,
  });

  return url;
}

// --- cast audio url to Device ---
// return Promise
function castUrlToDeviceAsync(host, url) {
  return new Promise((resolve, reject) => {
    const client = new Client();

    client.connect(host, function () {
      client.launch(DefaultMediaReceiver, function (err, player) {
        const media = {
          contentId: url,
          contentType: 'audio/mp3',
          streamType: 'BUFFERED' // or LIVE
        };
        player.load(media, { autoplay: true }, function (err, status) {
          client.close();
          if (err) {
            reject(err);
          }
          else {
            resolve('Device notified OK');
          }
        });

        // player.on('status', function (status) {
        //   console.log('status broadcast playerState=%s', status.playerState);
        // });
      });
    });

    client.on('error', function (err) {
      console.log('Error: %s', err.message);
      client.close();
      reject(err);
    });
  });
}

// ===== exports =====

exports.speakToDeviceAsync = speakToDeviceAsync; // cast text as audio to Device
exports.speakToMultiDeviceAsync = speakToMultiDeviceAsync; // cast text as audio to Multi Device
exports.speakToMultiDeviceAnyway = speakToMultiDeviceAnyway; // cast text as audio to Multi Device
exports.getUrlfromText = getUrlfromText; // convert text to audio URL
exports.castUrlToDeviceAsync = castUrlToDeviceAsync; // cast audio url to Device