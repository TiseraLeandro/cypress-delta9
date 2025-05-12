// ***********************************************
// This example commands.js shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************
//
//
// -- This is a parent command --
// Cypress.Commands.add('login', (email, password) => { ... })
//
//
// -- This is a child command --
// Cypress.Commands.add('drag', { prevSubject: 'element'}, (subject, options) => { ... })
//
//
// -- This is a dual command --
// Cypress.Commands.add('dismiss', { prevSubject: 'optional'}, (subject, options) => { ... })
//
//
// -- This will overwrite an existing command --
// Cypress.Commands.overwrite('visit', (originalFn, url, options) => { ... })

import dayjs from 'dayjs'

/**
 * Save orderID in the temporal file runData.json
 * This method overwrite previous order ID saved
 * @param {string} orderID - Order ID to be saved
 */
Cypress.Commands.add('saveOrderID', (orderID, method) => {
    const log = Cypress.log({
        name: 'saveOrderID',
        displayName: 'Save Order ID:',
        message: `${method}, ${orderID}`,
    })

    const filename = 'cypress/fixtures/' + Cypress.env('ENVIRONMENT') + '/runData.json'
    cy.readFile(filename).then((obj) => {
        if (obj.orders == null) {
            obj.orders = [{ method: method, orderID: orderID }]
        } else {
            obj.orders.push({ method: method, orderID: orderID })
        }
        // write the merged object
        cy.writeFile(filename, obj)
    })
})

/**
 * Returns the order ID for the profile send by parameter from temporal file runData.json
 * @param {string} profile - the profile for the order
 * @returns {string}
 */
Cypress.Commands.add('getOrderID', (method) => {
    const log = Cypress.log({
        name: 'getOrderID',
        displayName: 'Get Order ID:',
        message: `${method}`,
    })
    const filename = 'cypress/fixtures/' + Cypress.env('ENVIRONMENT') + '/runData.json'
    let id;
    cy.readFile(filename).then((obj) => {
        let list = obj.orders
        list.forEach($element => {
            if ($element.method == method) {
                id = $element.orderID
            }
        })
        return id;
    })
})

/**
 * Save sample ID with the profile set in the sample in the temporal file runData.json
 * @param {string} sampleID - sample ID to be saved
 * @param {string} profile - the profile set in the sample
 */
Cypress.Commands.add('saveSampleID', (sampleID, profile) => {
    const log = Cypress.log({
        name: 'saveSampleID',
        displayName: 'Save Sample ID:',
        message: `${profile}, ${sampleID}`,
    })
    const filename = 'cypress/fixtures/' + Cypress.env('ENVIRONMENT') + '/runData.json'
    cy.readFile(filename).then((obj) => {
        if (obj.samples == null) {
            obj.samples = [{ profile: profile, sampleID: sampleID }]
        } else {
            obj.samples.push({ profile: profile, sampleID: sampleID })
        }
        // write the merged object
        cy.writeFile(filename, obj)
    })
})

/**
 * Returns the sample ID for the profile send by parameter from the temporal file runData.json
 * @param {string} profile - the profile set in the sample
 * @returns {string}
 */
Cypress.Commands.add('getSampleID', (profile) => {
    const log = Cypress.log({
        name: 'getSampleID',
        displayName: 'Get Sample ID:',
        message: `${profile}`,
    })
    const filename = 'cypress/fixtures/' + Cypress.env('ENVIRONMENT') + '/runData.json'
    let id;
    cy.readFile(filename).then((obj) => {
        let list = obj.samples
        list.forEach($element => {
            if ($element.profile == profile) {
                id = $element.sampleID
            }
        })
        return id;
    })
})

/**
 * Return the number in the sample ID
 * @param {string} sampleID 
 * @returns {string} - sampleIDNumber
 */
Cypress.Commands.add('getSampleIDNumber', (sampleID) => {
    let sampleIDNumber = sampleID.split('-')
    if (sampleIDNumber[sampleIDNumber.length - 1].includes("ST")) {
        return sampleIDNumber[sampleIDNumber.length - 2]
    } else {
        return sampleIDNumber[sampleIDNumber.length - 1]
    }
})

/**
 * Save worksheetID in the temporal file runData.json
 * This method overwrite previous worksheet ID saved for that method
 * @param {string} worksheetID - Order ID to be saved
 * @param {string} method - The worksheet method
 */
Cypress.Commands.add('saveWorksheetID', (worksheetID, method) => {
    const filename = 'cypress/fixtures/' + Cypress.env('ENVIRONMENT') + '/runData.json'
    cy.readFile(filename).then((obj) => {
        if (obj.worksheets == null) {
            obj.worksheets = [{ method: method, worksheetID: worksheetID }]
        } else {
            obj.worksheets.push({ method: method, worksheetID: worksheetID })
        }
        // write the merged object
        cy.writeFile(filename, obj)
    })
})

/**
 * Returns the worksheet ID for the profile send by parameter from temporal file runData.json
 * @param {string} method - The worksheet method
 * @returns {string}
 */
Cypress.Commands.add('getWorksheetID', (method) => {
    const filename = 'cypress/fixtures/' + Cypress.env('ENVIRONMENT') + '/runData.json'
    let id;
    cy.readFile(filename).then((obj) => {
        let list = obj.worksheets
        list.forEach($element => {
            if ($element.method == method) {
                id = $element.worksheetID
            }
        })
        return id;
    })
})

/**
 * Returns the value of the record column sent by parameter in an Order (custom view)
 * e.i:
 * | Profile | Status   | Date |
 * ---------------------------
 * | Micro   | New      | 1/12 |
 * ---------------------------
 * | Water   | Verified | 2/09 |
 * -----------------------------
 * cy.getSummaryTableValueByRecord("Status", "Micro") => return "New"
 @param {string} columnName - The column name of the table
 @param {string} record - The record (row)
 @returns {string} - return 1 value of the table
 */
Cypress.Commands.add('getSummaryTableValueByRecord', (columnName, record) => {
    let regex = new RegExp("^" + columnName)
    return cy
        .contains('th b', regex).parent('th')
        .invoke('index')
        .then((index) => {
            cy.get('td').contains(record)
                .and('have.length', 1)
                .siblings()
                .eq(index - 1)
                .invoke('text')
        })
})

/**
 * Returns the list of materials from file <profile>.json
 * @param {string} profile - the profile for the order
 * @returns {Array}
 */
Cypress.Commands.add('getMaterials', (profile) => {
    cy.fixture(profile).then($data => {
        return $data.materials
    })
})

/**
 * Returns the list of materials from file <profile>.json
 * @param {string} profile - the profile for the order
 * @returns {Array}
 */
Cypress.Commands.add('getRegisteredMaterials', (profile) => {
    cy.fixture(profile).then($data => {
        return $data.registeredMaterials
    })
})

/**
 * Returns the list of materials from file <profile>.json
 * @param {string} profile - the profile for the order
 * @returns {Array}
 */
Cypress.Commands.add('getInstruments', (profile) => {
    cy.fixture(profile).then($data => {
        return $data.instruments
    })
})

/**
 * Returns the raw result of the analysis send by parameter from file <profile>.json
 * @param {string} profile - the analyses method
 * @param {string} analysis - the analysis 
 * @returns {Array}
 */
Cypress.Commands.add('getAnalysesRawResult', (profile, analysis, partition = 'none') => {
    let analysis2 = analysis.replace(',', '\,')
    if (partition == 'none') {
        cy.fixture(profile).then($data => {
            return $data.rawResults[analysis2]
        })
    } else {
        cy.fixture(profile).then($data => {
            return $data.rawResults[partition][analysis2]
        })
    }
})

/**
 *  Returns the list of results of the analysis send by parameter from file <profile>.json
 * @param {string} profile - the analyses method
 * @param {string} analysis - the analysis 
 * @returns {Array}
 */
Cypress.Commands.add('getAnalysesResult', (profile, analysis, partition = 'none') => {
    let analysis2 = analysis.replace(',', '\,')
    if (partition == 'none') {
        cy.fixture(profile).then($data => {
            return $data.results[analysis2]
        })
    } else {
        cy.fixture(profile).then($data => {
            return $data.results[partition][analysis2]
        })
    }
})

/**
 * Returns the list of especification result from file <profile>.json
 * @param {string} profile - the profile for the order
 * @returns {Array}
 */
Cypress.Commands.add('getAnalysisSpecification', (profile, analysis, lab, partition = 'none') => {
    let analysis2 = analysis.replace(',', '\,')
    if (partition == 'none') {
        cy.fixture(profile).then($data => {
            return $data.specifications[analysis2]
        })
    } else {
        cy.fixture(profile).then($data => {
            return $data.specifications[partition][analysis2]
        })
    }
})



Cypress.Commands.add("getTableValueByExactMatchRecord2", function getTableValueByExactMatchRecord(columnName, record) {
    cy.log('getTableValueByExactMatchRecord')
    let regex = new RegExp("^" + record + "$")
    cy.contains('th', columnName)
        .invoke('index')
        .then((index) => {
            return cy.contains('td', regex)
                .siblings()
                .eq(index - 1)
                .invoke('text')
        })
});

