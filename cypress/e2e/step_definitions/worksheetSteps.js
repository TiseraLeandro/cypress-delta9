import {
    Given,
    When,
    Then,
} from "@badeball/cypress-cucumber-preprocessor";

import { worksheetPage } from '@pages/WorksheetPage'
import { commonActions } from "@pages/CommonActionsPage";
import { analysesData } from "@data/analysesData";

When("Complete set up worksheet modal for {string} order", (profile) => {
    worksheetPage.completeSetUpWorksheetModal(Cypress.env('orderID'), profile)
});

Then("A worksheet for {string} is created", (profile) => {
        worksheetPage.validateWorksheetCreated(profile)
});

Then("Worksheet status is {string}", (status) => {
    worksheetPage.validateWorksheetStatus(status)
});

When("Click on the worksheet in the grid view", () => {
    commonActions.clickOnGridViewRocord(Cypress.env('worksheetID'))
});

When("Add {string} as material to the order", (type) => {
    worksheetPage.completeMaterialsModal(type)
});

Then("Materials table is completed", () => {
    worksheetPage.validateMaterialsTable()
});

Then("Add {string} {string} as an instrument to the order", (type, instrument) => {
    worksheetPage.completeInstrumentsModal(type, instrument)
});

Then("Instrument {string} {string} shows in the table", (type, instrument) => {
    worksheetPage.validateInstrumentsTable(type, instrument)
});

Then("Start Preparation table is completed", () => {
    worksheetPage.validateStartPreparationTable()
});

When("Set dilution factor from the worksheet table", () => {
    worksheetPage.setDilutionFactorFromTable()
});

When("Dilution Factor is set for all partitions the work worksheet", () => {
    worksheetPage.validateDilutionFactorFromTable()
});

When("Load the file {string} to the worksheet", (profile) => {
    worksheetPage.loadFile(profile);

});

Then("the worksheet status should be {string}", (status) => {
    worksheetPage.validateWorksheetStatus(status);
    
});

Then("Validate analyses specifications and flags for {string} profile", (profile) => {
    let analysesList = analysesData.SERVICES[profile]
    cy.fixture(profile).then($data => {
        worksheetPage.validateAnalysesSpecificationAndFlags(analysesList, $data);
    })
});

When("Complete verify modal", () => {
    worksheetPage.completeVerifyModal();
});