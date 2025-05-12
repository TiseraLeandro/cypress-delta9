class WorksheetData {

    MATERIALS_TABLE_HEADERS = {
        MATERIALS: "Material",
        DESCRIPTION: "Description",
        LOT_ID: "Lot ID",
        EXP_DATE: "Exp. Date"
    }
    INSTRUMENTS_TABLE_HEADERS = {
        INSTRUMENT_TYPE: "Instrument Type",
        DESCRIPTION: "Description",
        INSTRUMENT: "Instrument",
        CALIBRATION: "Calibration"
    }
    ANALYSES_SECTION_TABLE_HEADERS = {
        ID: "ID",
        ANALYSIS: "Analysis",
        STATUS: "Status",
        RESULT: "Result",
        FLAGS: "Flags",
        COMPLIANCE: "Compliance"       
    }
}
export const worksheetData = new WorksheetData();