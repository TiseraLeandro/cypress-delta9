
const timeout = 5000;

//overwrite visit command to use cypress-network-idle
Cypress.Commands.overwrite('visit', (visit, ...args) => {
    cy.waitForNetworkIdlePrepare({
        method: 'POST',
        alias: 'visit',
        pattern: Cypress.env('baseUrl'),
        log: false,
    })
    visit(...args)
    cy.waitForNetworkIdle('@visit', timeout)
})