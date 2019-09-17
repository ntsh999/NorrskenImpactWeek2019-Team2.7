var _ = require('lodash');
var deploymentCommands = {
  login: function(_browser) {
    var login = _browser.page['login.po']();
    var bG = _browser.globals;
    _browser.url(bG.env + '/login');
    login
      .fillInForm(
        bG.credentials[bG.currentRole.role].username,
        bG.credentials[bG.currentRole.role].password
      )
      .submit()
      .validateNoError();
  },
  fillInForm: function(username, password) {
    return this.waitForElementVisible('body', 10000)
      .setValue('@username', username)
      .setValue('@password', password);
  },
  navigateToDeployments: function() {
    this.isLinkPresent('Deployments');
    this.api.click(`a[href^="/deployment"]`);
    this.api.pause(20000);
    this.verify.containsText(
      '@activeClass',
      'Deployments',
      'Testing if Deployments link is active'
    );
    return this.verify.containsText(
      '@moduleName',
      'Deployments',
      'Testing  if header name is Deployments'
    );
  },
  isLinkPresent: function(linkName) {
    this.api.elements('css selector', '.nsc-sidenav ul li', elems => {
      elems.value.forEach(element => {
        //elementIdText will return the visible text of an element in callback
        this.api.elementIdText(element.ELEMENT, result => {
          if (result.value === linkName) {
            this.verify.ok(true, `${linkName} link is present`);
          }
        });
      });
    });
  },
  validateHeaderItems: function() {
    var columnHeadings = this.api.globals.deploymentHeaderList;
    var columns = [];
    this.api.elements('css selector', '.ui-table-thead tr th',
      elems => {
        elems.value.forEach(element => {
          //elementIdText will return the visible text of an element in callback
          this.api.elementIdText(element.ELEMENT, result => {
            columns.push(result.value);
          });
        });
    });
    return this.api.perform(() => {
      console.log(columnHeadings, columns);
      this.verify
      .equal(_.difference(_.compact(columnHeadings), columns).length, 0, `All columns are present.`);
    });
  }
};

module.exports = {
  commands: [deploymentCommands],
  elements: {
    activeClass: {
      selector: '.ng-star-inserted.active'
    },
    moduleName: {
      selector: '.nsc-wrapper h2'
    },
    error: {
      selector: '.form-error'
    }
  }
};
