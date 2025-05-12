// ***********************************************************
// This example support/e2e.js is processed and
// loaded automatically before your test files.
//
// This is a great place to put global configuration and
// behavior that modifies Cypress.
//
// You can change the location of this file or turn off
// automatically serving support files with the
// 'supportFile' configuration option.
//
// You can read more here:
// https://on.cypress.io/configuration
// ***********************************************************

// Import commands.js using ES2015 syntax:
import './utils'
import './commands'
import 'cypress-network-idle'
import 'dayjs'
import 'slingr-cypress-library'
import 'cypress-wait-until'
import '@mmisty/cypress-allure-adapter/support'
require('@cypress/xpath');

// Hide fetch/XHR requests
const app = window.top;
if (!app.document.head.querySelector('[data-hide-command-log-request]')) {
  const style = app.document.createElement('style');
  style.innerHTML =
    '.command-name-request, .command-name-xhr { display: none }';
  style.setAttribute('data-hide-command-log-request', '');

  app.document.head.appendChild(style);
}

// Alternatively you can use CommonJS syntax:
Cypress.on('uncaught:exception', (err, runnable) => {
  // returning false here prevents Cypress from
  // failing the test
  return false
})

//Allure-Adapter 
const addSuiteLabels = (test, parentSuite) => {
  const title = test.titlePath();
  
  if (title.length >= 1){
    // test, no suite
    Cypress.Allure.parentSuite(parentSuite);
  }
  
  if (title.length >= 2){
    // suite + test
    const parent = title[0];
    Cypress.Allure.suite(parent);
  }
  
  if (title.length === 3 ) {
    // suite + subsuite + test
    const suite = title[1];
    Cypress.Allure.subSuite(suite);
  }
  
  if (title.length >= 4) {
    // suite + subsuite + (...) +  test
    const suite = title[1];
    const subSuite = title[2];
    Cypress.Allure.subSuite(suite + (' -> ' + subSuite));
  }
}

// example adding host and thread to see in timeline
// Cypress.Allure?.on('test:started', (test) => {
//   Cypress.Allure.host('Slingr');
//   Cypress.Allure.thread(Cypress.env('thread') ?? '01');
//   Cypress.Allure.fullName(`ACT LIMS ${test.fullTitle()}`);
//   addSuiteLabels(test, 'ACT LIMS');
// })
