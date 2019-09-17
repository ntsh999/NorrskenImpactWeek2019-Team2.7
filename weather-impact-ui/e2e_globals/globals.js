var HtmlReporter = require('nightwatch-html-reporter');
var reporter = new HtmlReporter({
  openBrowser: true,
  reportsDirectory: '../e2e_reports'
});
var parseArgumentsAndGetEnv = function(arg) {
  console.log(arg.slice(2)[0].split('=')[1]);
  return arg.slice(2)[0].split('=')[1];
};
//var envIp = parseArgumentsAndGetEnv(process.argv);
var credentials = {
  admin: {
    role: 'admin',
    username: 'admin',
    password: '$ProjectAdmin123',
    displayname: 'PROJECT ADMIN',
    domain: 'Ericsson',
    group: 'Project Group',
    message: 'OK',
    role: 'group admin'
  },
  'platform-admin': {
    role: 'platform-admin',
    username: 'platform-admin',
    password: '$NSCAdmin123'
  },
  user: {
    role: 'user',
    username: 'user',
    password: '$ProjectUser123',
    domain: 'Ericsson',
    group: 'Project Group',
    role: 'user',
    displayname: 'PROJECT USER',
    username: 'user'
  }
};
var navigationLinks = {
  admin: [
    'Home',
    'Dashboard',
    'Deployments',
    'Service Catalogue',
    'Users',
    'Monitoring',
    'Volumes'
  ],
  user: [
    'Home',
    'Dashboard',
    'Deployments',
    'Service Catalogue',
    'Monitoring',
    'Volumes'
  ],
  'platform-admin': [
    'Home',
    'Dashboard',
    'Nodes',
    'Deployments',
    'Service Catalogue',
    'Users',
    'Groups',
    'Monitoring',
    'Volumes'
  ]
};
var currentRole = {
  role: 'admin'
};
var deploymentHeaderList = [
  'Name',
  'Type',
  'Flavor Details',
  'Details',
  'Nodes',
  'Namespace',
  'Status',
  'Username',
  'Action'
];

var self = (module.exports = {
  reporter: reporter.fn,
  credentials: credentials,
  currentRole: currentRole,
  navigationLinks: navigationLinks,
  deploymentHeaderList: deploymentHeaderList,
  env: parseArgumentsAndGetEnv(process.argv) || 'http://localhost:8080'
});
/*
{
    beforeEach : function(browser) {
        console.log('Setting up...');
  },
    afterEach : function(browser) {
        console.log('Closing down...');
  },
}
*/
