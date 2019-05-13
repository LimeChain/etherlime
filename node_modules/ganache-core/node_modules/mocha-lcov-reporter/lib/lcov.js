
/**
 * Expose `LCov`.
 */

exports = module.exports = LCov;

/**
 * Initialize a new LCOV reporter.
 * File format of LCOV can be found here: http://ltp.sourceforge.net/coverage/lcov/geninfo.1.php
 * The reporter is built after this parser: https://raw.github.com/SonarCommunity/sonar-javascript/master/sonar-javascript-plugin/src/main/java/org/sonar/plugins/javascript/coverage/LCOVParser.java
 *
 * @param {Runner} runner
 * @api public
 */

function LCov(runner) {
  var self = this;

  runner.on('end', function() {
      self.onEnd();
  });
}

LCov.prototype.onEnd = function() {
  // In a browser context, coverage will be in window.$jscoverage or window._$blanket.
  var g = typeof(global) != 'undefined' ? global : window;
  var cov = g._$jscoverage || g._$blanket;
  if (!cov) {
    console.error('mocha-lcov-reporter: No coverage data found, make sure your code is properly instrumented');
    return;
  }

  for (var filename in cov) {
    var data = cov[filename];
    this.reportFile(filename, data);
  }
}

LCov.prototype.reportFile = function(filename, data) {
  var self = this;

  self.write('SF:' + filename + '\n');

  data.source.forEach(function(line, num) {
    // increase the line number, as JS arrays are zero-based
    num++;

    if (data[num] !== undefined) {
      self.write('DA:' + num + ',' + data[num] + '\n');
    }
  });

  self.write('end_of_record\n');
}

LCov.prototype.write = function(string) {
    process.stdout.write(string);
}
