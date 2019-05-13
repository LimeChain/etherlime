var karma_chrome_launcher = require('karma-chrome-launcher'),
    karma_firefox_launcher = require('karma-firefox-launcher'),
    karma_safari_launcher = require('karma-safari-launcher'),
    karma_tap = require('karma-tap'),
    karma_tap_reporter = require('karma-tap-reporter');

module.exports = function(config) {
  config.set({
    browsers: [ 'Chrome', 'Firefox', 'Safari' ],
    plugins: [
      karma_chrome_launcher,
      karma_firefox_launcher,
      karma_safari_launcher,
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
      'tap'
    ],
    colors: true,
    singleRun: true,
    browserDisconnectTimeout: 10 * 1000,
    browserDisconnectTolerance: 3,
    browserNoActivityTimeout: 20 * 1000,
    captureTimeout: 300 * 1000
  });
};
