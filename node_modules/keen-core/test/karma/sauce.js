var pkg = require('../../package.json'),
    moment = require('moment');

var karma_sauce_launcher = require('karma-sauce-launcher'),
    karma_tap = require('karma-tap'),
    karma_tap_reporter = require('karma-tap-reporter');

module.exports = function(config){

  var browsers = {

    /* Internet Exploder */
    sl_ie_11: {
      base: 'SauceLabs',
      browserName: 'internet explorer',
      platform: 'Windows 8.1',
      version: '11'
    },
    sl_ie_10: {
      base: 'SauceLabs',
      browserName: 'internet explorer',
      platform: 'Windows 8',
      version: '10'
    },
    sl_ie_9: {
      base: 'SauceLabs',
      browserName: 'internet explorer',
      platform: 'Windows 7',
      version: '9'
    },

    /* iOS/iPhone */
    sl_ios: {
      base: 'SauceLabs',
      browserName: 'iPhone',
      platform: 'OS X 10.10',
      version: '8.1'
    },

    /* Android */
    sl_android_51: {
      base: 'SauceLabs',
      browserName: 'android',
      platform: 'Linux',
      version: '5.1'
    }
    // sl_android_50: {
    //   base: 'SauceLabs',
    //   browserName: 'android',
    //   platform: 'Linux',
    //   version: '5.0'
    // },
    // sl_android_44: {
    //   base: 'SauceLabs',
    //   browserName: 'android',
    //   platform: 'Linux',
    //   version: '4.4'
    // }

  };

  config.set({
    plugins: [
      karma_sauce_launcher,
      karma_tap,
      karma_tap_reporter
    ],
    frameworks: [
      'tap'
    ],
    files: [
      '../bundle.js'
    ],
    reporters: [
      'tap', 'saucelabs'
    ],
    sauceLabs: {
      // username:  process.env.SAUCE_USERNAME,
      // accessKey: process.env.SAUCE_ACCESS_KEY,
      testName: pkg.name + '.js: ' + moment().format(' ddd, MMM Do, h:mm:ss a'),
      recordVideo: false,
      recordScreenshots: false,
      public: 'private'
    },
    action: 'run',
    // browserDisconnectTimeout: 10 * 1000,
    // browserDisconnectTolerance: 0,
    browserNoActivityTimeout: 60 * 1000,
    browsers: Object.keys(browsers),
    colors: true,
    customLaunchers: browsers,
    singleRun: true
  });

};
