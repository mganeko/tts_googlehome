"use strict"

// ---- config ---
const deviceConfig = require('../_conf/test_config').deviceConfig;
const hosts = [deviceConfig.TEST_DEVICE1_HOSTNAME, deviceConfig.TEST_DEVICE2_HOSTNAME];
const hostsNG = [deviceConfig.TEST_DEVICE_NG_HOSTNAME, deviceConfig.TEST_DEVICE_NG_HOSTNAME];
jest.setTimeout(60 * 1000);

const TTGoogleHome = require('..');

// --- single and multi test ---
describe('speak multi device', () => {
  test('ja "こんにちは"', () => {
    return expect(TTGoogleHome.speakToDeviceAsync(deviceConfig.TEST_DEVICE1_HOSTNAME, "こんにちは", "ja")).resolves.toBe("Device notified OK");
  });

  test('en "Hello"', () => {
    return expect(TTGoogleHome.speakToDeviceAsync(deviceConfig.TEST_DEVICE1_HOSTNAME, "Hello", "en-US")).resolves.toBe("Device notified OK");
  });

  test('ja "こんにちは" NOT exist device', () => {
    return expect(TTGoogleHome.speakToDeviceAsync(deviceConfig.TEST_DEVICE_NG_HOSTNAME, "こんにちは", "ja")).rejects.toThrow("ENOTFOUND");
  });

  test('ja "複数に話すテスト" multi', () => {
    const expectResult = { "status": "fulfilled", "value": "Device notified OK" };
    return expect(TTGoogleHome.speakToMultiDeviceAsync(hosts, "複数に話すテスト", "ja")).resolves.toStrictEqual([expectResult, expectResult]);
  });

  test('ja "複数に話すNGテスト" multi', () => {
    const expectResult = expect.objectContaining({ status: "rejected", reason: expect.any(Object) });
    // OK: return expect(TTGoogleHome.speakToMultiDeviceAsync(hostsNG, "複数に話すテスト", "ja")).resolves.toEqual([expect.anything(), expect.anything()]);
    // OK: return expect(TTGoogleHome.speakToMultiDeviceAsync(hostsNG, "複数に話すテスト", "ja")).resolves.toEqual([expect.any(Object), expect.any(Object)]);
    // OK return expect(TTGoogleHome.speakToMultiDeviceAsync(hostsNG, "複数に話すテスト", "ja")).resolves.toEqual([expect.objectContaining({ status: "rejected", reason: expect.any(Object) }), expect.objectContaining({ status: "rejected" })]);
    return expect(TTGoogleHome.speakToMultiDeviceAsync(hostsNG, "複数に話すテスト", "ja")).resolves.toEqual([expectResult, expectResult]);
  });
});
