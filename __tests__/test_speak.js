"use strict"

// ---- config ---
const deviceConfig = require('../_conf/test_config').deviceConfig;
jest.setTimeout(30 * 1000);

const TTGoogleHome = require('../text-to-googlehome');

// --- multi test ---
describe('speak single device', () => {
  test('ja "こんにちは"', () => {
    return expect(TTGoogleHome.speakToDeviceAsync(deviceConfig.TEST_DEVICE1_HOSTNAME, "こんにちは", "ja")).resolves.toBe("Device notified OK");
  });

  test('en "Hello"', () => {
    return expect(TTGoogleHome.speakToDeviceAsync(deviceConfig.TEST_DEVICE1_HOSTNAME, "Hello", "en-US")).resolves.toBe("Device notified OK");
  });

  test('ja "こんにちは" NOT exist device', () => {
    return expect(TTGoogleHome.speakToDeviceAsync(deviceConfig.TEST_DEVICE_NG_HOSTNAME, "こんにちは", "ja")).rejects.toThrow("ENOTFOUND");
  });
});
