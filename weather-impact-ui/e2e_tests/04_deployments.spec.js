module.exports = {
    tags: ['deployments'],
    //------------ ADMIN ---------------
    'Try to navigate to Deployments with Admin' : function(_browser) {
      var deployments = _browser.page['deployments.po']();
      var bG = _browser.globals;
      deployments.login(_browser);
      deployments.navigateToDeployments(bG.credentials[bG.currentRole.role]);;
    },
    'Validate columns heading of Deployment Table for Admin': function(_browser) {
      var deployments = _browser.page['deployments.po']();
      deployments.validateHeaderItems();
    },
    'Validate columns heading of Deployment Table for Admin': function(_browser) {
        var deployments = _browser.page['deployments.po']();
        deployments.validateHeaderItems();
    },
      
    // 'Try to deploy Group Specific Service with empty form for Admin': function(_browser){
    //   var deployments = _browser.page['deployments_catalogue.po']();
    //   deployments
    //   .fillInForm('', '', '')
    //   .validateFormError('Service Name is required')
    //   .isSubmitBtnDisabled();
    // },
    // 'Try to deploy Group Specific Service with only name field for Admin': function(_browser){
    //   var deployments = _browser.page['deployments_catalogue.po']();
    //   deployments
    //   .fillInForm('test', '', '')
    //   .isSubmitBtnDisabled();
    // }
};