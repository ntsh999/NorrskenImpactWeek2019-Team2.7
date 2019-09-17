var _ = require('lodash');
var serviceCommands = {
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
  fillInForm: function(name, namespace, deploymentParams) {
    // storage type
    // if (name && namespace && deploymentParams) {
    //   this.click('@selectDropDown');
    //   this.click('@storageType');
    // }
    return this.setValue('@formControlName', name)
      .setValue('@formControlNameSpace', namespace)
      .setValue('@formControlDeploymentParams', deploymentParams);
  },
  fillInGenericForm: function(
    name,
    namespace,
    deploymentParams,
    node = 1,
    cpu = 1,
    ram = 1
  ) {
    // storage type
    // if (name && namespace && deploymentParams) {
    //   this.click('@selectDropDown');
    //   this.click('@storageType');
    // }
    return this.setValue('@formControlName', name)
      .setValue('@formControlNameSpace', namespace)
      .setValue('@formControlDeploymentParams', deploymentParams)
      .setValue('@formControlNode', node)
      .setValue('@formControlCPU', cpu)
      .setValue('@formControlRAM', ram);
  },
  isSubmitBtnDisabled: function() {
    return this.verify
      .value('@submitBtn', 'Submit')
      .verify.attributeContains(
        '@submitBtn',
        'disabled',
        'true',
        'Testing if submit button is disabled'
      );
  },
  submit: function() {
    this.getAttribute('@submitBtn', 'disabled', result => {
      if (!result.value) {
        this.verify.ok(true, 'Testing if Submit button is enabled');
        this.verify.value('@submitBtn', 'Submit').click('@submitBtn');
        this.api.pause(20000);
        this.verify.visible(
          '@successMsg',
          'Testing if success message is visible'
        );
        this.verify.containsText(
          '@successMsg',
          'Launched Deployment',
          'Testing if deployment is launched'
        );
        //this.validateSuccessMsg();
      }
    });
  },
  validateSuccessMsg: function() {
    this.api.element('css selector', '.ui-growl-message', ele => {
      this.api.elementIdText(ele.ELEMENT, res => {
        this.verify.ok(
          res.value.indexOf('Launched Deployment') !== -1,
          'Testing if deployment is launched'
        );
      });
    });
  },
  validateFormError: function(errMsg) {
    return this.waitForElementVisible(
      '@formError',
      40000,
      false
    ).verify.containsText('@formError', errMsg);
  },
  navigateToServiceCatalogue: function() {
    this.isLinkPresent('Service Catalogue');
    this.api.click(`a[href^="/serviceCatalogue"]`);
    this.api.pause(20000);
    this.verify.containsText(
      '@activeClass',
      'Service Catalogue',
      'Testing if Service Catalogue link is active'
    );
    return this.verify.containsText(
      '@moduleName',
      'Services',
      'Testing  if header name is Services'
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
  validateNavigationLinks: function(links, role) {
    var navigationLinks = [];
    this.api.elements('css selector', '.nsc-sidenav ul li', elems => {
      elems.value.forEach(element => {
        //elementIdText will return the visible text of an element in callback
        this.api.elementIdText(element.ELEMENT, result => {
          navigationLinks.push(result.value);
        });
      });
    });
    return this.api.perform(() => {
      this.verify.equal(
        _.difference(_.compact(navigationLinks), links).length,
        0,
        `All navigation links for ${role} are present.`
      );
    });
  },
  validateServicePg: function(type) {
    var serviceTypeSelector = type.toLowerCase().replace(/\s/g, '');
    this.click(`@${serviceTypeSelector}Tab`);
    this.verify.containsText(
      '@selectedTab',
      type,
      `Testing if selected tab is ${type}`
    );
    this.api.elements('css selector', '.catalogue-item', elems => {
      if (elems.value.length > 0) {
        this.verify.ok(true, `Testing if ${type} services are present`);
      }
    });
    this.moveToElement(`@${serviceTypeSelector}itemDescription`, 0, 0, () => {
      this.verify.ok(true, 'Testing if Deploy button is visible on mouseover');
      this.click(`@${serviceTypeSelector}deployBtn`);
      this.verify.visible(
        '@deploymentFormTitle',
        'Testing if on click of deploy button, deployment form is visible'
      );
    });
  },
  isAddServiceButtonVisible: function() {
    return this.verify
      .visible('@addBtn', 'Add Button is visible')
      .verify.containsText('@addBtn', 'Add')
      .click('@addBtn');
  },
  isAddServiceButtonNotVisible: function() {
    return this.verify
      .elementNotPresent('@addBtn', 'Testing if Add Button is not visible')
  },
  isAddSubmitBtnDisabled: function() {
    return this.verify
    .containsText('@sideBarHeading', 'Add Service')
    .verify.value('@submitAddBtn', 'Submit Form')
    .verify.attributeContains(
      '@submitAddBtn',
      'disabled',
      'true',
      'Testing if add service form`s submit button is disabled'
    );
  },
  fillInAddServiceForm: function(serviceName, exposedserviceName, serviceDescription, type) {
    if(serviceName && exposedserviceName && serviceDescription) {
      this.setValue('@exposedserviceName', exposedserviceName)
      .setValue('@serviceDescription', serviceDescription);
      this.click('@selectAddStorageDropDown')
      .click('@storageTypeAddService')
      .click('@selectAddProjectDropDown')
      .selectWorkLoad();
      if (this.api.globals.currentRole.role === 'admin') {
        this.click('@projects');
      }
      if(type === 'upload') {
        this.uploadFile();
        this.verify.attributeContains(
          '@helmchart',
          'disabled',
          'true',
          'Testing if helmchart field is disabled'
        );
      } else {
        this.setValue('@helmchart', 'testHelm');
        this.verify.attributeContains(
          '.ui-fileupload-choose input',
          'disabled',
          'true',
          'Testing if Upload Manifest file is disabled'
        );
      } 
    }
    return this.setValue('@serviceName', serviceName);
  },
  selectWorkLoad: function() {
    return this.click('p-radiobutton');
  },
  uploadFile: function () {
    return this.setValue('.ui-fileupload-choose input', require('path').resolve('bin/resources/storage2_spark.yml')) // Works
  },
  submitAddService: function(){
    return this.getAttribute('@submitAddBtn', 'disabled', result => {
      if (!result.value) {
        this.verify.ok(true, 'Testing if Submit button is enabled');
        this.verify.value('@submitAddBtn', 'Submit Form').click('@submitAddBtn');
        this.api.pause(10000);
        this.verify.visible(
          '@successMsg',
          'Testing if success message is visible'
        );
        this.verify.containsText(
          '@successMsg',
          'Service has been Added Successfully',
          'Testing if success message text equals: "Service has been Added Successfully"'
        );
      }
    });
  },
  closeSideBar: function() {
    return this.click('@closeIconSideBar');
  }
};
module.exports = {
  commands: [serviceCommands],
  elements: {
    activeClass: {
      selector: '.ng-star-inserted.active'
    },
    moduleName: {
      selector: '.nsc-wrapper h2'
    },
    selectedTab: {
      selector: 'li.ui-state-active'
    },
    genericTab: {
      selector: '.ui-tabview-nav li:first-child'
    },
    groupspecificTab: {
      selector: '.ui-tabview-nav li:last-child'
    },
    genericitemDescription: {
      selector: 'p-tabpanel[header="Generic"] .catalogue-item .description '
    },
    genericdeployBtn: {
      selector:
        'p-tabpanel[header="Generic"] .catalogue-item .default-small-btn'
    },
    groupspecificitemDescription: {
      selector:
        'p-tabpanel[header="Group Specific"] .catalogue-item .description '
    },
    groupspecificdeployBtn: {
      selector:
        'p-tabpanel[header="Group Specific"] .catalogue-item .default-small-btn'
    },
    deploymentFormTitle: {
      selector: '.nsc-modal-title'
    },
    formControlName: {
      selector: 'input[formcontrolname="name"]'
    },
    formControlNameSpace: {
      selector: 'input[formcontrolname="namespace"]'
    },
    formControlDeploymentParams: {
      selector: 'textarea[formcontrolname="deploymentParams"]'
    },
    formControlNode: {
      selector: 'input[formcontrolname="nodeCount"]'
    },
    formControlCPU: {
      selector: 'input[formcontrolname="cpuCount"]'
    },
    formControlRAM: {
      selector: 'input[formcontrolname="ramSize"]'
    },
    submitBtn: {
      selector: '#deployServiceForm input[type="submit"]'
    },
    formError: {
      selector: '.validation-error'
    },
    selectDropDown: {
      selector: '#deployServiceForm p-dropdown .ui-dropdown-label'
    },
    storageType: {
      selector: '#deployServiceForm p-dropdown .ui-dropdown ul li:nth-child(1)'
    },
    successMsg: {
      selector: '.ui-growl-message'
    },
    addBtn: {
      selector: '#addServiceBtn'
    },
    submitAddBtn: {
      selector: '#serviceAddForm input[type="submit"]'
    },
    serviceName: {
      selector: 'input[formcontrolname="serviceName"]'
    },
    helmchart: {
      selector: 'input[formcontrolname="helmchart"]'
    },
    work_load: {
      selector: 'input[formcontrolname="work_load"]'
    },
    exposedserviceName: {
      selector: 'input[formcontrolname="exposedserviceName"]'
    },
    selectAddStorageDropDown: {
      selector: '#serviceAddForm p-dropdown[formcontrolname="storageType"] .ui-dropdown-label'
    },
    storageTypeAddService: {
      selector: '#serviceAddForm p-dropdown[formcontrolname="storageType"] .ui-dropdown ul li:nth-child(1)'
    },
    serviceDescription: {
      selector: 'input[formcontrolname="serviceDescription"]'
    },
    selectAddProjectDropDown: {
      selector: '#serviceAddForm p-dropdown[formcontrolname="projects"] .ui-dropdown-label'
    },
    projects: {
     selector: '#serviceAddForm p-dropdown[formcontrolname="projects"] .ui-dropdown ul li:nth-child(1)'
    },
    sideBarHeading: {
      selector: '.ui-sidebar-active h2'
    },
    closeIconSideBar: {
      selector: '.ui-sidebar-active .ui-sidebar-close'
    }
  }
};
