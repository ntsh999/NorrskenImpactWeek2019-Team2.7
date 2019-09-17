var _ = require('lodash');
var homeCommands = {
  fillInForm: function(username, password) {
    return this.waitForElementVisible('body', 10000)
      .setValue('@username', username)
      .setValue('@password', password);
  },
  submit: function() {
    return this.verify.containsText('@submit', 'Login').click('@submit');
  },
  validateError: function(errMsgUser, errMsgPwd) {
    return this.verify
      .visible('@error')
      .verify.containsText('@usernameError', errMsgUser)
      .verify.containsText('@passwordError', errMsgPwd)
      .verify.valueContains('@username', '')
      .verify.valueContains('@password', '');
  },
  validateHeader: function(user) {
    var userRole = (user.role === 'admin') ? 'Group Admin' : user.role;
    this.waitForElementVisible('body', 10000)
      .verify.containsText('@userRole', _.startCase(_.toLower(userRole)))
      .verify.containsText('@userName', user.username)
      .verify.containsText('@group', user.group)
      .verify.containsText('@domain', user.domain)
      .verify.containsText('@displayName', user.displayname)
      .verify.containsText('@productHeading', 'Network Scale Compute');
  },
  validateNavigationLinks: function(links, role){
     var navigationLinks = []; 
     this.api.elements('css selector','.nsc-sidenav ul li', (elems) =>{
      elems.value.forEach((element) =>{
        //elementIdText will return the visible text of an element in callback
        this.api.elementIdText(element.ELEMENT, result => {
         navigationLinks.push(result.value);
        });
      });
    });
    return this.api.perform(()=>{
      this.verify
      .equal(_.difference(_.compact(navigationLinks),links).length, 0, `All navigation links for ${role} are present.`);
    });
  },
  downloadUserGuide() {
    this.api.getAttribute('#downloadUG', 'href', (hrefResult) =>{
        this.verify.equal(hrefResult.value, 'https://erilink.ericsson.se/eridoc/erl/objectId/09004cff8d4ea553?docno=&action=current&format=ppt12');
        this.verify.containsText('@download', 'Download User Guide').click('@download');
      });
  }
};

module.exports = {
  commands: [homeCommands],
  url: function() {
    return 'http://172.29.182.243:9100/home';
  },
  elements: {
    userRole: {
      selector: '#userRole'
    },
    displayName: {
      selector: '#displayName'
    },
    domain: {
      selector: '#domain'
    },
    group: {
      selector: '#group'
    },
    userName: {
      selector:'#userName'
    },
    productHeading: {
      selector: '.product'
    },
    download: {
      selector:'#downloadUG'
    }
  }
};
