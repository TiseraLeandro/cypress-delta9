import {
    Given,
    When,
    Then,
} from "@badeball/cypress-cucumber-preprocessor";
import { commonActions } from "@pages/CommonActionsPage";

Given("A web browser is at the Delta runtime page", () => {
    cy.login(Cypress.env('user'), Cypress.env('pass'));
    cy.selectMainMenuOption("Orders")
});

When("Navigate to {string} in main menu", (menuOption) => {
    cy.login(Cypress.env('user'), Cypress.env('pass'));
    cy.selectMainMenuOption(menuOption)
});

When("Click on {string} button in the header", (button) => {
    cy.clickOnActionMenuButtonAssert(button)
    cy.waitForNetworkIdle('POST, GET', 2000, { log: false })
});

When("Click on {string} button in Sample section", (button) => {
    cy.clickOnActionMenuButtonInNestedView(button)
    cy.waitForNetworkIdle('POST, GET', 3000, { log: false })
});

When("Click on {string} button in action modal", (button) => {
    cy.clickOnActionModalButton(button)
    cy.waitForNetworkIdle('POST, GET', 4000, { log: false })
});

When("Click on {string} tab inside a nested view", (tab) => {
    commonActions.clickTabNestedView(tab)
});

When("Click on {string} button", (button) => {
    commonActions.clickOnButton(button)
});