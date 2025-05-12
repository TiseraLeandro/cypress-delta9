import { worksheetData } from "@data/worksheetData";

class WorksheetPage {

    setUpWorksheetModalElements = {
        laboratory: () => cy.get("[data-element-id='value-laboratory']"),
        method: () => cy.get("[data-element-id='value-method']"),
        partitionSelectionUseFilters: () => cy.get("[data-element-id='value-partitionSelection']").contains('button', "Use Filters"),
        filterOrder: () => cy.get("[data-element-id='filters.orders']  .form-field-val"),
        setUpWorksheetButton: () => cy.get('[data-element-id="value-applyFilters"]'),
        positionsSections: () => cy.get("[data-element-id='positions'] .form-horizontal"),
        type: "[data-element-id*='.type'] .relationship",
        spikedWith: "[data-element-id*='.spikedWith'] .relationship",
        duplicateFromPosition: "[data-element-id*='.duplicateFromPosition'] input",
        originalPosition: "[data-element-id*='.originalPosition'] input",
        referenceSample: "[data-element-id*='.referenceSample'] .relationship",
        add: () => cy.get(".slingr__button").contains("Add"),
    };

    worksheetElements = {
        worksheetID: () => cy.get("[data-element-id='value-worksheetId'] span"),
        method: () => cy.get("[data-element-id='value-method'] a u"),
        orderID: () => cy.get("[data-element-id='orders'] .label"),
        status: () => cy.get("[data-element-id='value-status'] span"),
        materialsTable: () => cy.get('[data-element-id*="value-view_materialsSummary"]'),
        instrumentsTable: () => cy.get('[data-element-id*="value-view_instrumentsSummary"]')
    }

    addMaterialsModal = {
        typeField: () => cy.get('[data-element-id*="typeParam1"] .relationship').last(),
        registeredToggle: () => cy.get('[data-element-id*="isMaterialRegisteredParam1"] > div').last(),
        lotID: () => cy.get('input[data-element-id*="lotIdParam1"]').last(),
        add: () => cy.get('.runtime-modal-body button span').contains('Add'),
        conteiner: () => cy.get('.nestedField__editable__container'),
        addMaterials: () => cy.contains('.actionModal__footer button', 'Add materials'),
    };

    addInstrumentsModal = {
        typeField: () => cy.get('[data-element-id*="typeParam"] .relationship').last(),
        instrument: () => cy.get('[data-element-id*="instrumentParam"] .relationship').last(),
        add: () => cy.contains('.runtime-modal-body button span', 'Add'),
        conteiner: () => cy.get('.nestedField__editable__container'),
        addInstrument: () => cy.contains('.actionModal__footer button', 'Add instruments')
    };

    preparationElements = {
        analyst: () => cy.get('[data-element-id="value-preparationAnalyst"] span'),
        timestamp: () => cy.get('[data-element-id="value-preparationTimestamp"] span'),
    }

    dilutionFactorElements = {
        dfTableLink: '[data-element-id="value-view_positions"] tr:nth-child(7) td:nth-child($I%) a',
        dilutionFactorInput: () => cy.get('#dilutionFactor-field'),
        changeFactorButton: () => cy.contains('Change dilution factor'),
        confirmModal: () => cy.get('[data-bind*="confirmationButton"]'),
        moreButton: () => cy.contains('More'),
    }

    importElements = {
        filePath: '/files/',
        tempPath: '/temporal/',
        temporalFilePath: 'cypress/fixtures/$env%/temporal/',
        fileInput: () => cy.get('input[type=file]'),
        tableHeader: '[data-element-id="value-view_positions"] tr:nth-child(1) th a',
        importNotificationCloseButton: () => cy.get('.notify-close-button'),
        loadSpinner: '.qq-upload-spinner-selector',
        importMessage: "Action is being executed in background, feel free to close this popup and continue working."
    }

    verifyModalElements = {
        confirmWarning: () => cy.get('[data-element-id="value-warning.confirmWarning"] input'),
    }

    analysesSection = {
        tabSections: () => cy.get(".tabs__container").first(),
    }

    completeSetUpWorksheetModal(orderID, profile) {
        this.setUpWorksheetModalElements.method().selectValueMatchBeginning(profile);
        this.setUpWorksheetModalElements.partitionSelectionUseFilters().click()
        cy.wait(4000)//more than 1 load
        cy.waitForNetworkIdle('POST, GET', 2000, { log: false })
        //this.setUpWorksheetModalElements.filterOrder().click();
        this.setUpWorksheetModalElements.filterOrder().selectValue(orderID);
        //this.setUpWorksheetModalElements.setUpWorksheetButton().click();
        cy.waitForNetworkIdle('POST, GET', 2000, { log: false })
        
    }

    validateWorksheetCreated(profile) {
        this.worksheetElements.method().should('have.text', profile)
        this.worksheetElements.orderID().should('have.text', Cypress.env('orderID'))
        this.worksheetElements.worksheetID().invoke('text').then((worksheetID) => {
            Cypress.env('worksheetID', worksheetID);
            cy.log(`Worksheet ID: ${worksheetID} environment variable created`);
        });
    }

    validateWorksheetStatus(status) {
        this.worksheetElements.status().should('have.text', status)
    }

    completeMaterialsModal(type) {
        this.addMaterialsModal.typeField().selectValueMatchBeginning(type)
        this.addMaterialsModal.lotID().type("AutomationNumber123ABC")
    }

    validateMaterialsTable() {
        this.worksheetElements.materialsTable().contains("AutomationNumber123ABC").should('exist')
    }

    completeInstrumentsModal(type, instrument) {
        this.addInstrumentsModal.typeField().selectValueMatchBeginning(type)
        this.addInstrumentsModal.instrument().selectValueMatchBeginning(instrument)
    }

    validateInstrumentsTable(type, instrument) {
        this.worksheetElements.instrumentsTable().contains(type).should('exist')
        this.worksheetElements.instrumentsTable().contains(instrument).should('exist')
    }

    validateStartPreparationTable() {
        this.preparationElements.analyst().should('have.text', Cypress.env('fullName'))
        cy.getFormattedDate("MM/DD/YYYY").then($date => {
            this.preparationElements.timestamp().should('contain', $date)
        })
    }

    setDilutionFactorFromTable() {
        this.dilutionFactorElements.moreButton().click()
        this.dilutionFactorElements.changeFactorButton().click()
        this.dilutionFactorElements.dilutionFactorInput().type("22")
        this.dilutionFactorElements.confirmModal().click()
        }

    validateDilutionFactorFromTable() {
        //cy.get(linkPath).should('have.text', positionT[0].dilutionFactor + " / " + data.totalPackageSize + " Grams")   
        cy.log('Cannot find dil factor on the WS to validate the action took place')
        }

    loadFile(fileName) {
        let temp = this.importElements.temporalFilePath.replace("$env%", Cypress.env('ENVIRONMENT'));
        let partitionID = Cypress.env('partitionID');
        cy.log (this.importElements.filePath + fileName)    
        cy.log (partitionID)
        cy.fixture(this.importElements.filePath + fileName).then($data => {
            cy.log("Using partitionID: " + partitionID);
            let modifiedFile = $data.replaceAll("PARTITION_ID", partitionID.replace('kr', '').replace('\xa0', '').trim());
            
            cy.writeFile(temp + fileName, modifiedFile);
                
            this.importElements.fileInput().selectFile(temp + fileName, { force: true });
            cy.waitForNetworkIdle('POST, GET', 2000, { log: false });
            cy.get(this.importElements.loadSpinner).should('not.be.visible');
        });
    }
    validateAnalysesResult(analysesList, data) {
        cy.contains(this.importElements.importMessage).should('not.exist')
        cy.waitForNetworkIdle('POST, GET', 4000, { log: false })
        let positionsR = [];
        for (const positionT of data.positionsTypes) {
            if (positionT[0].include) {
                positionsR.push(positionT[0].results)
            }
        }
        cy.get(this.importElements.tableHeader).each(($el, index, $list) => {
            this.analysesSection.tabSections().within(() => {
                cy.filterBy(worksheetData.ANALYSES_SECTION_TABLE_HEADERS.ID, $el.text())
                cy.waitForNetworkIdle('POST, GET', 700, { log: false })
            })

            analysesList.forEach($element => {
                let analysis = $element
                cy.filterBy(worksheetData.ANALYSES_SECTION_TABLE_HEADERS.ANALYSIS, analysis)
                cy.waitForNetworkIdle('POST, GET', 700, { log: false })
                analysis = analysis.replace('(', "\(").replace(')', "\)").replace(',', "\,").replace(':', "\:").replace('+', "\\+")
                let result = positionsR[index][$element]
                this.analysesSection.tabSections().within(() => {
                    cy.getTableValueByExactMatchRecord(worksheetData.ANALYSES_SECTION_TABLE_HEADERS.RESULT, analysis).should('contain', result)
                })
            })

        })
    }

    validateAnalysesSpecificationAndFlags(analysesList, data) {
        let positionsR = [];
        for (const positionT of data.positionsTypes) {
            if (positionT[0].include) {
                positionsR.push(positionT[0])
            }
        }
        cy.get(this.importElements.tableHeader).each(($el, index, $list) => {
            this.analysesSection.tabSections().within(() => {
                cy.filterBy(worksheetData.ANALYSES_SECTION_TABLE_HEADERS.ID, $el.text())
                cy.waitForNetworkIdle('POST, GET', 700, { log: false })
            })
            analysesList.forEach($element => {
                let analysis = $element.replace('(', "\(").replace(')', "\)").replace(',', "\,").replace(':', "\:").replace('+', "\\+")
                if (positionsR[index].hasOwnProperty('specifications')) {
                    if (positionsR[index].specifications.hasOwnProperty($element)) {
                        let especifications = positionsR[index].specifications[$element]
                        cy.filterBy(worksheetData.ANALYSES_SECTION_TABLE_HEADERS.ANALYSIS, analysis)
                        cy.waitForNetworkIdle('POST, GET', 700, { log: false })

                        this.analysesSection.tabSections().within(() => {
                            cy.getTableValueByExactMatchRecord(worksheetData.ANALYSES_SECTION_TABLE_HEADERS.COMPLIANCE, analysis).should('contain', especifications)
                        })
                    }
                }
                else if (positionsR[index].hasOwnProperty('flags')) {
                    if (positionsR[index].flags.hasOwnProperty($element)) {
                        let flag = positionsR[index].flags[$element]
                        cy.filterBy(worksheetData.ANALYSES_SECTION_TABLE_HEADERS.ANALYSIS, analysis)
                        cy.waitForNetworkIdle('POST, GET', 700, { log: false })

                        this.analysesSection.tabSections().within(() => {
                            cy.getTableValueByExactMatchRecord(worksheetData.ANALYSES_SECTION_TABLE_HEADERS.FLAGS, analysis).should('contain', flag)
                        })
                    }
                }
            })
        })
    }

    completeVerifyModal() {
        this.verifyModalElements.confirmWarning().click()
        cy.waitForNetworkIdle('POST, GET', 500, { log: false })
    }

}
export const worksheetPage = new WorksheetPage();