import {
    Given,
    When,
    Then,
} from "@badeball/cypress-cucumber-preprocessor";

import { orderPage } from '@pages/OrderPage'
import { commonActions } from "@pages/CommonActionsPage";

When("Complete set up order modal for {string}", (customer) => {
    let date = cy.getFormattedDate("MM/DD/YYYY hh:mm");
    orderPage.completeSetUpModal(customer, date.toString());
});

Then("An order for {string} is created", (customer) => {
    const today = new Date();
    const dateString = `${String(today.getMonth() + 1).padStart(2, '0')}/${String(today.getDate()).padStart(2, '0')}/${today.getFullYear()}`;
    orderPage.validateOrderCreated(customer, dateString);
});

Then("Order status is {string}", (status) => {
    orderPage.validateOrderStatus(status)
});

When("Click on the order in the grid view", () => {
    cy.log (Cypress.env('orderID'))
    commonActions.clickOnGridViewRocord(Cypress.env('orderID'))
    
});

//Sample Section

When("User enter the sample data for {string} profile", (profile) => {
    cy.fixture(profile).then($data => {
        orderPage.completeCreateSampleForm($data)
    })
});

When("Click on the first sample for {string} profile in Sample section", (profile) => {
    cy.fixture(profile).then($data => {
        commonActions.clickOnGridViewRocordNestedView($data.sampleName)
    })
});

Then("A sample for {string} profile is created", (profile) => {
    cy.fixture(profile).then($data => {
        orderPage.validateSampleCreated(profile, $data)
    })
});

Then("Sample status is {string} in Sample section", (status) => {
    orderPage.validateSampleStatus(status)
});

When("Check {string} sample in Sample section", (profile) => {
    cy.getSampleID(profile).then($sampleId => {
        commonActions.checkGridViewRocordNestedView($sampleId)
    })
});

When("Click on the sample in Sample section", () => {
    commonActions.clickOnGridViewRocordNestedView(Cypress.env('sampleID'))
});

When("a user receives the sample", () => {
        orderPage.receiveSample()
});

When("a user accessions the sample", () => {
    orderPage.accessionSample()
});


Then("A report for the sample was generated", () => {
    orderPage.validateFinalReportField(Cypress.env('sampleID'))
});
