var loginCommands = {
  
  validateForm: function() {
    return this.waitForElementVisible('body', 10000)
      .verify.visible('@username')
      .verify.visible('@password')
      .verify.containsText('@submit', 'Login')
      .verify.elementNotPresent('@error');
  },
  submit: function() {
    return this.verify.containsText('@submit', 'Login').click('@submit');
  },
  fillInForm: function(username, password) {
    return this.waitForElementVisible('body', 10000)
      .setValue('@username', username)
      .setValue('@password', password);
  },
  validateError: function(errMsgUser, errMsgPwd) {
    return this.verify
      .visible('@error')
      .verify.containsText('@usernameError', errMsgUser)
      .verify.containsText('@passwordError', errMsgPwd)
      .verify.valueContains('@username', '')
      .verify.valueContains('@password', '');
  },
  validateUserNameError: function(errMsgUser) {
    return this.verify
      .visible('@error')
      .verify.containsText('@usernameError', errMsgUser)
      .verify.valueContains('@username', '');
  },
  validatePasswordError: function(errMsgPwd) {
    return this.verify
      .visible('@error')
      .verify.containsText('@passwordError', errMsgPwd)
      .verify.valueContains('@password', '');
  },
  validateFormError: function(errMsg) {
    return this.waitForElementVisible('@formError', 20000, false)
      .verify.containsText('@formError', errMsg);
  },
  validateNoError: function() {
    return this.api.pause(10000)
          .verify.urlContains('home');
  },
  url: function(envIp) {
    console.log(envIp);
    return envIp+'/login'
  }
};

module.exports = {
  commands: [loginCommands],
  elements: {
    username: {
      selector: '.user-name'
    },
    password: {
      selector: '.password'
    },
    submit: {
      selector: 'button[type=submit]'
    },
    usernameError: {
      selector: '#username-error'
    },
    passwordError: {
      selector: '#password-error'
    },
    formError: {
      selector: '#common-error'
    },
    error: {
      selector: '.form-error'
    }
  }
};
