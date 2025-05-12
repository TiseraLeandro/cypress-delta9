import { commonActions } from "./CommonActionsPage";

class OrderPage {

    setUpOrderModalElements = {
        customer: () => cy.get("[data-element-id='value-customer']"),
        dateRecieved: () => cy.get("[data-element-id='value-orderDateReceived']"),
        cancelButton: () => cy.contains("Cancel"),
        setUpOrderButton: () => cy.contains("Set up order"),
    };

    orderElements = {
        refresh: "Refresh",
        orderID: () => cy.get("[data-element-id='value-orderId'] span"),
        customer: () => cy.get("[data-element-id='value-customer'] .label u"),
        laboratory: () => cy.get("[data-element-id='value-laboratory'] span"),
        createdDate: () => cy.get("[data-element-id='value-createdDate'] span"),
        collectedBy: () => cy.get("[data-element-id='value-collectedBy'] span"),
        collector: () => cy.get("[data-element-id='collector'] .label"),
        dateRecieved: () => cy.get("[data-element-id='value-orderDateCollected'] span"),
        status: () => cy.get("[data-element-id='value-status'] span"),
    }

    sampleFormElements = {
        sampleMatrix: () => cy.get("[data-element-id='value-sampleMatrix']"),
        sampleType: () => cy.get("[data-element-id='value-sampleType']"),
        sampleName: () => cy.get("[data-element-id='value-sampleName'] input"),
        replicas: () => cy.get("[data-element-id='value-replicas'] input"),
        analysesProfiles: () => cy.get("[data-element-id='analysisProfiles']"),
        analysesSpecifications: () => cy.get("[data-element-id='analysisSpecifications']"),
        removeAllItems: () => cy.get("[title='Remove all items']"),
        reportTemplate: () => cy.get("[data-element-id='value-reportTemplate']"),
    }

    sampleElements = {
        tabSections: () => cy.get(".tabs__container").first(),
        sampleID: () => cy.get("[data-element-id='value-sampleId'] span"),
        laboratory: () => cy.get("[data-element-id='value-laboratory'] .label u"),
        orderID: () => cy.get("[data-element-id='value-order'] .label u"),
        customer: () => cy.get("[data-element-id='value-customer'] .label u"),
        sampleMatrix: () => cy.get("[data-element-id='value-sampleMatrix'] span"),
        sampleType: () => cy.get("[data-element-id='value-sampleType'] .label u"),
        sampleName: () => cy.get("[data-element-id='value-sampleName'] span"),
        replicas: () => cy.get("[data-element-id='value-replicas'] span"),
        analysesProfiles: () => cy.get("[data-element-id='analysisProfiles'] .label"),
        reportTemplate: () => cy.get("[data-element-id='value-reportTemplate'] span"),
        collectedBy: () => cy.get("[data-element-id='value-collectedBy'] span"),
        collector: () => cy.get("[data-element-id='collector'] .label"),
        dateCollected: () => cy.get("[data-element-id='value-dateCollected'] span"),
        created: () => cy.get("[data-element-id='value-created'] span"),
        status: () => cy.get(".tabs__container [data-element-id='value-status'] span"),
        reportsButton: () => cy.contains('Reports'),
        finalReportLink: () => cy.get('[data-element-id="value-finalReport"] a'),
        finalReportPreviewButton: () => cy.get('[data-element-id="value-finalReport"] button'),
        receiveButton: () => cy.contains('button', 'Receive'),
        accessionButton: () => cy.contains('button', 'Accession'),
        partitionTab: () => cy.contains('button', 'Partitions'),
        partitionIDField: () => cy.get('[data-element-id="value-partitionId"]'),
        refreshSampleButton: () => cy.contains('button', 'Refresh'),
    }

    receiveSampleElements = {
        receiveSampleButton: () => cy.get('[data-bind*="button: $parent.confirmationButton,visible"]'),
        totalPackageSize: () => cy.get("[data-element-id='value-totalPackageSize'] input"),
        acceptanceCriteriaConfirmation: () => cy.get("[data-element-id='value-acceptanceCriteriaConfirmation']"),
    }
    accessionSampleElements = {
        accessionSampleButton: () => cy.get('[data-bind*="button: $parent.confirmationButton,visible"]'),
        size: () => cy.get("[data-element-id='value-partitions[0].weight'] input"),

    }

    completeSetUpModal(customer, date) {
        this.setUpOrderModalElements.customer().selectValue(customer);
        this.setUpOrderModalElements.dateRecieved().type(date);
    }

    validateOrderCreated(customer,date) {     
        this.orderElements.customer().should('have.text', customer)
        this.orderElements.createdDate().should('contain', date)
        this.orderElements.orderID().invoke('text').then((orderID) => {
            Cypress.env('orderID', orderID);
            cy.log(`Order ID: ${orderID} environment variable created`);
        });
    }

    validateOrderStatus(status) {
        this.orderElements.status().should('have.text', status)
    }

    completeCreateSampleForm(data) {
        if (data.sampleMatrix != null) {
            this.sampleFormElements.sampleMatrix().selectValueMatchBeginning(data.sampleMatrix)
        }
        if (data.sampleType != null) {
            this.sampleFormElements.sampleType().selectValueMatchBeginning(data.sampleType)
        }
        this.sampleFormElements.sampleName().type(data.sampleName)
        this.sampleFormElements.analysesProfiles().selectValueMatchBeginning(data.analysesProfiles)
        if (data.reportTemplate != null) {
            this.sampleFormElements.reportTemplate().selectValueMatchBeginning(data.reportTemplate)
        }

        cy.getFormattedDate("MM/DD/YYYY").then($date => {
            cy.wrap($date).as('createdSampleDate')
        })
    }

    validateSampleCreated(profile, data) {
        this.sampleElements.sampleID().invoke('text').then((sampleID) => {
            Cypress.env('sampleID', sampleID);
            cy.log(`Sample ID: ${sampleID} environment variable created`);
        });
        this.sampleElements.orderID().should('have.text', Cypress.env('orderID'))
        this.sampleElements.customer().should('contain', data.customer)
        this.sampleElements.sampleMatrix().should('have.text', data.sampleMatrix)
        this.sampleElements.sampleType().should('have.text', data.sampleType)
        this.sampleElements.sampleName().should('have.text', data.sampleName)
    }

    validateSampleStatus(status) {
        
        this.sampleElements.status().should('have.text', status)
        let partitionID = Cypress.env('sampleID')+'-1';
        Cypress.env('partitionID', partitionID);
        cy.log('Working with partitionID: '+ Cypress.env('partitionID'));

    }

    receiveSample() {
        this.sampleElements.receiveButton().click();
        this.receiveSampleElements.totalPackageSize().type('23');
        this.receiveSampleElements.receiveSampleButton().click();
        cy.waitForNetworkIdle('POST, GET', 2000, { log: false })
    }

    accessionSample() {
        this.sampleElements.accessionButton().click();
        this.accessionSampleElements.size().type('23');
        this.accessionSampleElements.accessionSampleButton().click();
    }

    validateFinalReportField(sampleID) {
        cy.reload()
        cy.get('body').should('be.visible');
        cy.waitForNetworkIdle('GET', 3000, { log: false });
        commonActions.clickOnGridViewRocordNestedView(Cypress.env('sampleID'))
        this.sampleElements.reportsButton().click()
        let text = sampleID.replaceAll("-", "")
        this.sampleElements.finalReportLink().invoke('text').should("contain", text)
        this.sampleElements.finalReportPreviewButton().should('be.visible')
    }
}

export const orderPage = new OrderPage();