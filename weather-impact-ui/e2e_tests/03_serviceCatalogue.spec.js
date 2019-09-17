module.exports = {
  tags: ['serviceCatalogue'],
  //------------ GROUP SPECIFIC -----------
  //------------ ADMIN ---------------
  'Try to navigate to Service Catalogue with Admin' : function(_browser) {
    var service = _browser.page['service_catalogue.po']();
    var bG = _browser.globals;
    service.login(_browser);
    service.navigateToServiceCatalogue(bG.credentials[bG.currentRole.role]);;
  },
  'Validate Group Specific Services Panel for Admin': function(_browser) {
    var service = _browser.page['service_catalogue.po']();
    service.validateServicePg('Group Specific');
  },
  'Try to deploy Group Specific Service with empty form for Admin': function(_browser){
    var service = _browser.page['service_catalogue.po']();
    service
    .fillInForm('', '', '')
    .validateFormError('Service Name is required')
    .isSubmitBtnDisabled();
  },
  'Try to deploy Group Specific Service with only name field for Admin': function(_browser){
    var service = _browser.page['service_catalogue.po']();
    service
    .fillInForm('test', '', '')
    .isSubmitBtnDisabled();
  },
  'Try to deploy Group Service with all mandatory fields for Admin': function(_browser) {
    var service = _browser.page['service_catalogue.po']();
    var bG = _browser.globals;
    service
    .fillInForm('testNSCService', 'ntest', '{"MAPR_CONTAINER_USER": "nscdev", "MAPR_CONTAINER_PASSWORD": "nscdev123", "MAPR_CONTAINER_UID": 9889}')
    .submit();
     bG.currentRole.role = 'user';
    _browser.end();
  },
  // ----------- USER --------------------
  'Try to navigate to Service Catalogue with User': function(_browser) {
    var service = _browser.page['service_catalogue.po']();
    var bG = _browser.globals;
    service.login(_browser);
    service.navigateToServiceCatalogue(bG.credentials[bG.currentRole.role]);
  },
  'Validate Group Specific Services Panel for User': function(_browser) {
    var service = _browser.page['service_catalogue.po']();
    var bG = _browser.globals;
    service.validateServicePg('Group Specific');
  },
  'Try to deploy Group Specific Service with empty form for User': function(_browser){
    var service = _browser.page['service_catalogue.po']();
    service
    .fillInForm('', '', '')
    .validateFormError('Service Name is required')
    .isSubmitBtnDisabled();
  },
  'Try to deploy Group Specific Service with only name field for User': function(_browser){
    var service = _browser.page['service_catalogue.po']();
    service
    .fillInForm('test', '', '')
    .isSubmitBtnDisabled();
  },
  'Try to deploy Group Service with all mandatory fields for User': function(_browser) {
    var service = _browser.page['service_catalogue.po']();
    var bG = _browser.globals;
    service
    .fillInForm('testNSCService', 'next', '{"MAPR_CONTAINER_USER": "nscdev", "MAPR_CONTAINER_PASSWORD": "nscdev123", "MAPR_CONTAINER_UID": 9889}')
    .submit();
     bG.currentRole.role = 'platform-admin';
     _browser.end();
  },
  // ------------ PLATFORM ADMIN -----------------

  'Try to navigate to Service Catalogue with Platform Admin': function(_browser) {
    var service = _browser.page['service_catalogue.po']();
    var bG = _browser.globals;
    service.login(_browser);
    service.navigateToServiceCatalogue(bG.credentials[bG.currentRole.role]);;
  },
  'Validate Group Specific Services Panel for Platform Admin': function(_browser) {
    var service = _browser.page['service_catalogue.po']();
    service.validateServicePg('Group Specific');
  },
  'Try to deploy Group Specific Service with empty form for Platform Admin': function(_browser){
    var service = _browser.page['service_catalogue.po']();
    service
    .fillInForm('', '', '')
    .validateFormError('Service Name is required')
    .isSubmitBtnDisabled();
  },
  'Try to deploy Group Specific Service with only name field for Platform Admin': function(_browser){
    var service = _browser.page['service_catalogue.po']();
    var bG = _browser.globals;
    service
    .fillInForm('test', '', '')
    .isSubmitBtnDisabled();
    bG.currentRole.role = 'admin';
    _browser.end();
  },
  //----------------------GENERIC SERVICE------------------------------
  'Try to navigate to Generic Service Panel with Admin': function(_browser) {
    var service = _browser.page['service_catalogue.po']();
    var bG = _browser.globals;
    service.login(_browser);
    service.navigateToServiceCatalogue(bG.credentials[bG.currentRole.role]);;
  },
  'Validate Generic Services Panel for Admin': function(_browser) {
    var service = _browser.page['service_catalogue.po']();
    service.validateServicePg('Generic');
  },
  'Try to deploy Generic Service with empty form for Admin': function(_browser){
    var service = _browser.page['service_catalogue.po']();
    service
    .fillInGenericForm('', '', '')
    .validateFormError('Service Name is required')
    .isSubmitBtnDisabled();
  },
  'Try to deploy Generic Service with only name field for Admin': function(_browser){
    var service = _browser.page['service_catalogue.po']();
    service
    .fillInGenericForm('test', '', '')
    .isSubmitBtnDisabled();
  },
  // ----------- USER --------------------
  'Try to navigate to Generic Service Panel with User': function(_browser) {
    var service = _browser.page['service_catalogue.po']();
    var bG = _browser.globals;
    service.login(_browser);
    service.navigateToServiceCatalogue(bG.credentials[bG.currentRole.role]);;
  },
  'Validate Generic Services Panel for User': function(_browser) {
    var service = _browser.page['service_catalogue.po']();
    var bG = _browser.globals;
    service.validateServicePg('Generic');
  },
  'Try to deploy Generic Service with empty form for User': function(_browser){
    var service = _browser.page['service_catalogue.po']();
    service
    .fillInGenericForm('', '', '')
    .validateFormError('Service Name is required')
    .isSubmitBtnDisabled();
  },
  'Try to deploy Generic Service with only name field for User': function(_browser){
    var service = _browser.page['service_catalogue.po']();
    service
    .fillInGenericForm('test', '', '')
    .isSubmitBtnDisabled();
  },
  'Try to deploy Generic Service with all mandatory fields for User': function(_browser) {
    var service = _browser.page['service_catalogue.po']();
    var bG = _browser.globals;
    service
    .fillInGenericForm('testNSCService', 'next', '{"MAPR_CONTAINER_USER": "nscdev", "MAPR_CONTAINER_PASSWORD": "nscdev123", "MAPR_CONTAINER_UID": 9889}')
    .submit();
     bG.currentRole.role = 'platform-admin';
     _browser.end();
  },
  //------------ PLATFORM ADMIN -----------------

  'Try to navigate to Generic Service Panel with Platform Admin': function(_browser) {
    var service = _browser.page['service_catalogue.po']();
    var bG = _browser.globals;
    service.login(_browser);
    service.navigateToServiceCatalogue(bG.credentials[bG.currentRole.role]);;
  },
  'Validate Generic Services Panel for Platform Admin': function(_browser) {
    var service = _browser.page['service_catalogue.po']();
    service.validateServicePg('Generic');
  },
  'Try to deploy Generic Service with empty form for Platform Admin': function(_browser){
    var service = _browser.page['service_catalogue.po']();
    service
    .fillInGenericForm('', '', '')
    .validateFormError('Service Name is required')
    .isSubmitBtnDisabled();
  },
  'Try to deploy Generic Service with only name field for Platform Admin': function(_browser){
    var service = _browser.page['service_catalogue.po']();
    service
    .fillInGenericForm('test', '', '')
    .isSubmitBtnDisabled();
  },
  'Try to deploy Group Service with all mandatory fields for Platform Admin': function(_browser) {
    var service = _browser.page['service_catalogue.po']();
    var bG = _browser.globals;
    service
    .fillInForm('testNSCService', 'ne', '{"MAPR_CONTAINER_USER": "nscdev", "MAPR_CONTAINER_PASSWORD": "nscdev123", "MAPR_CONTAINER_UID": 9889}')
    .submit();
    bG.currentRole.role = 'admin';
    _browser.end();
  },
  'Try to deploy Generic Service with all mandatory fields for Platform Admin': function(_browser) {
    var service = _browser.page['service_catalogue.po']();
    var bG = _browser.globals;
    service
    .fillInGenericForm('testNSCService', 'ne', '{"MAPR_CONTAINER_USER": "nscdev", "MAPR_CONTAINER_PASSWORD": "nscdev123", "MAPR_CONTAINER_UID": 9889}')
    .submit();
    bG.currentRole.role = 'admin';
    _browser.end();
  },
  //---------------- Add Service for Admin -----------------------------
  'Should show Add Service Button for Admin': function(_browser){
    var service = _browser.page['service_catalogue.po']();
    var bG = _browser.globals;
    service.login(_browser)
    service.navigateToServiceCatalogue(bG.credentials[bG.currentRole.role])
    .isAddServiceButtonVisible();
  },
  'Try to add Service with empty form for Admin': function(_browser){
    var service = _browser.page['service_catalogue.po']();
    service
    .isAddSubmitBtnDisabled();
  },
  'Try to add Service with only Service Name field for Admin': function(_browser){
    var service = _browser.page['service_catalogue.po']();
    service
    .fillInAddServiceForm('test')
    .isAddSubmitBtnDisabled();
  },
  'Try to add Service with by uploading yml for Admin': function(_browser){
    var service = _browser.page['service_catalogue.po']();
    var bG = _browser.globals;
    service
    .navigateToServiceCatalogue(bG.credentials[bG.currentRole.role])
    .isAddServiceButtonVisible()
    .fillInAddServiceForm('ServiceNSC','testService','testDesc', 'upload')
    .submitAddService();
  },
  'Try to add Service with by giving helmchart value for Admin': function(_browser){
    var service = _browser.page['service_catalogue.po']();
    var bG = _browser.globals;
    service
    .navigateToServiceCatalogue(bG.credentials[bG.currentRole.role])
    .isAddServiceButtonVisible()
    .fillInAddServiceForm('ServiceNSC','testService','testDesc')
    .submitAddService();
    bG.currentRole.role = 'user';
    _browser.end();
  },
  //---------------- Add Service for User -----------------------------
  'Should not show Add Service Button for User': function(_browser){
    var service = _browser.page['service_catalogue.po']();
    var bG = _browser.globals;
    service.login(_browser)
    service.navigateToServiceCatalogue(bG.credentials[bG.currentRole.role])
    .isAddServiceButtonNotVisible();
    bG.currentRole.role = 'platform-admin';
    _browser.end();
  },
  //------- Add Service for Platform Admin -----------------------
  'Should show Add Service Button for Platform Admin': function(_browser){
    var service = _browser.page['service_catalogue.po']();
    var bG = _browser.globals;
    service.login(_browser)
    service.navigateToServiceCatalogue(bG.credentials[bG.currentRole.role])
    .isAddServiceButtonVisible();
  },
  'Try to add Service with empty form for Platform Admin': function(_browser){
    var service = _browser.page['service_catalogue.po']();
    service
    .isAddSubmitBtnDisabled();
  },
  'Try to add Service with only Service Name field for Platform Admin': function(_browser){
    var service = _browser.page['service_catalogue.po']();
    service
    .fillInAddServiceForm('test')
    .isAddSubmitBtnDisabled();
  },
  'Try to add Service with by uploading yml for Platform Admin': function(_browser){
    var service = _browser.page['service_catalogue.po']();
    var bG = _browser.globals;
    service
    .navigateToServiceCatalogue(bG.credentials[bG.currentRole.role])
    .isAddServiceButtonVisible()
    .fillInAddServiceForm('ServiceNSC','testService','testDesc', 'upload')
    .submitAddService();
  },
  'Try to add Service with by giving helmchart value for Platform Admin': function(_browser){
    var service = _browser.page['service_catalogue.po']();
    var bG = _browser.globals;
    service
    .navigateToServiceCatalogue(bG.credentials[bG.currentRole.role])
    .isAddServiceButtonVisible()
    .fillInAddServiceForm('ServiceNSC','testService','testDesc')
    .submitAddService();
    bG.currentRole.role = 'user';
    _browser.end();
  },
};
