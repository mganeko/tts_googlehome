"use strict"

const TTGoogleHome = require('../text-to-googlehome');

// --- single test ---
// test('ja "こんにちは"', () => {
//   expect(TTGoogleHome.getUrlfromText("こんにちは", 'ja')).toBe("https://translate.google.com/translate_tts?ie=UTF-8&q=%E3%81%93%E3%82%93%E3%81%AB%E3%81%A1%E3%81%AF&tl=ja&total=1&idx=0&textlen=5&client=tw-ob&prev=input&ttsspeed=1");
// });


// --- multi test ---
describe('getUrlfromText', () => {
  test('ja "こんにちは"', () => {
    expect(TTGoogleHome.getUrlfromText("こんにちは", 'ja')).toBe("https://translate.google.com/translate_tts?ie=UTF-8&q=%E3%81%93%E3%82%93%E3%81%AB%E3%81%A1%E3%81%AF&tl=ja&total=1&idx=0&textlen=5&client=tw-ob&prev=input&ttsspeed=1");
  });

  test('en-US "Hello"', () => {
    expect(TTGoogleHome.getUrlfromText("Hello", 'en-US')).toBe("https://translate.google.com/translate_tts?ie=UTF-8&q=Hello&tl=en-US&total=1&idx=0&textlen=5&client=tw-ob&prev=input&ttsspeed=1");
  });
});
