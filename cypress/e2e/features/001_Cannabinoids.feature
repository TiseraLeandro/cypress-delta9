@Cannabinoids @SANITY
Feature: Cannabinoids - Profile

    E2E test for Cannabinoids profile

    Background:
        Given A web browser is at the Delta runtime page
    
    Scenario: Order Creation For Test Customer
        When Navigate to "Orders" in main menu
        And Click on "Set up order" button in the header
        And Complete set up order modal for "Test Customer"
        And Click on "Set up order" button in action modal
        Then An order for "Test Customer" is created
        And Order status is "To Be Received"
    
    Scenario: Sample Creation For Cannabinoids Profile
        When Navigate to "Orders" in main menu
        And Click on the order in the grid view
        And Click on "Create" button in Sample section
        And User enter the sample data for "cannabinoids" profile
        And Click on "Create" button in Sample section
        And Click on the first sample for "cannabinoids" profile in Sample section
        Then A sample for "cannabinoids" profile is created
        And Sample status is "Collected" in Sample section
    
    Scenario: Receive Sample Partitions For Cannabinoids Profile
        When Navigate to "Orders" in main menu
        And Click on the order in the grid view
        And Click on the sample in Sample section
        And a user receives the sample
        And Click on "Refresh" button in Sample section
        And Sample status is "Received" in Sample section
    
    Scenario: Accession Sample Partitions For Cannabinoids Profile
        When Navigate to "Orders" in main menu
        And Click on the order in the grid view
        And Click on the sample in Sample section
        And a user accessions the sample
        And Click on "Refresh" button in Sample section
        And Sample status is "Accessioned" in Sample section
    
    Scenario: Set Up Worksheet For Cannabinoids Sample
        When Navigate to "Worksheets" in main menu
        And Click on "Set up worksheet" button in the header
        And Complete set up worksheet modal for "Cannabinoids" order
        And Click on "Set up worksheet" button in action modal
        Then A worksheet for "Cannabinoids" is created
        And Worksheet status is "In Progress"
       
    Scenario: Set up materials for Cannabinoids worksheet
        When Navigate to "Worksheets" in main menu
        And Click on the worksheet in the grid view
        And Click on "Add materials" button
        And Add "Pipet" as material to the order
        Then Click on "Add materials" button in action modal
        And Materials table is completed
    
    Scenario: Set up instruments for Cannabinoids worksheet
        When Navigate to "Worksheets" in main menu
        And Click on the worksheet in the grid view
        And Click on "Add instruments" button
        And Add "Mass Spectrometer" "ABSciex API4000 - MAESTRO" as an instrument to the order
        Then Click on "Add instruments" button in action modal
        And Instrument "Mass Spectrometer" "ABSciex API4000 - MAESTRO" shows in the table
    
    Scenario: Start Preparation for Cannabinoids worksheet
        When Navigate to "Worksheets" in main menu
        And Click on the worksheet in the grid view
        And Click on "Start Preparation" button
        Then Click on "Start Preparation" button in action modal
        And Start Preparation table is completed
        And Worksheet status is "Results Pending"
    
    Scenario: Import Results for Cannabinoids worksheet
        When Navigate to "Worksheets" in main menu
        And Click on the worksheet in the grid view
        And Click on "Import results" button
        And Load the file "Cannabinoids.csv" to the worksheet
        Then Click on "Import results" button in action modal
        And the worksheet status should be "To Be Verified"
    
    Scenario: Verify Results in Cannabinoids worksheet
        When Navigate to "Worksheets" in main menu
        And Click on the worksheet in the grid view
        And Click on "Verify" button
        And Complete verify modal
        Then Click on "Verify" button in action modal
        And Worksheet status is "Verified"
    
    Scenario: Publish Cannabinoids results
        When Navigate to "Orders" in main menu
        And Click on the order in the grid view
        And Click on the sample in Sample section
        And Click on "Publish" button in Sample section
        Then Click on "Publish results" button in action modal
        And Click on the sample in Sample section
        And A report for the sample was generated
    