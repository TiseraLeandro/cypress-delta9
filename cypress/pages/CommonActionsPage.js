
class CommonActions {

    elements = {
        tabSections: () => cy.get(".tabs__container").first(),
        button: () => cy.get('button.slingr__button')
    }

    clickOnGridViewRocord(record) {
        cy.log(record)
        cy.contains("tr", record).click()
        cy.waitForNetworkIdle('POST, GET', 3000, { log: false })
    }

    selectSwitcherOption(option, item) {
        cy.contains('.form-field-state', item).then(switcher => {
            cy.wrap(switcher).contains('.slingr-switcher button', option).click()
        })
        cy.waitForNetworkIdle('POST, GET', 3000, { log: false })
    }

    clickOnButton(button) {
        this.elements.button().contains(button).click()
        cy.waitForNetworkIdle('POST, GET', 2000, { log: false })
    }

    //Nested views
    clickOnGridViewRocordNestedView(record) {
        this.elements.tabSections().within(() => {
            cy.contains("tr", record).click()
            cy.waitForNetworkIdle('POST, GET', 2000, { log: false })
        })
    }

    checkGridViewRocordNestedView(record) {
        this.elements.tabSections().within(() => {
            cy.checkRow(record)
            cy.waitForNetworkIdle('POST, GET', 500, { log: false })
        })
    }

    clickTabNestedView(value) {
        this.elements.tabSections().within(() => {
            cy.contains('button[role="tab"]', value).click()
            cy.waitForNetworkIdle('POST, GET', 1000, { log: false })
        })
    }
}
export const commonActions = new CommonActions();