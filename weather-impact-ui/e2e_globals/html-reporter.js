var HtmlReporter = require('nightwatch-html-reporter');
/* Same options as when using the built in nightwatch reporter option */
var reporter = new HtmlReporter({
  openBrowser: true,
  reportsDirectory: '../e2e_reports/'
});

module.exports = {
  write : function(results, options, done) {
    console.log(results);
    reporter.fn(results, done);
  }
};