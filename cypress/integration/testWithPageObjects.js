import { onDatePickerPage } from '../support/page_objects/datePickerPage'
import { onFormLayoutsPage } from '../support/page_objects/formLayoutsPage'
import {navigateTo} from '../support/page_objects/navigationPage'
import { onSmartTablePage } from '../support/page_objects/smartTablePage'

describe('Test with page objects', () => {
    beforeEach('Open application', () => {
        cy.openHomePage()
    })

    it('Verify navigations across the pages', () => {
        navigateTo.formLayoutsPage()
        navigateTo.datePickerPage()
    })

    it('Should submit inline form and Basic Form and select tomorrow in the calendar', () => {
        navigateTo.formLayoutsPage()
        onFormLayoutsPage.submitInlineFormWithNameAndEmail('Thuy','thuy.huynh@gmail.com')
        onFormLayoutsPage.submitBasicFormWithEmailAndPassword('thuy@gmail.com','12345')
        navigateTo.datePickerPage()
        onDatePickerPage.selectCommonDatePickerFromToday(2)
        onDatePickerPage.selectDatePickerWithRangeFromToday(7,14)
        navigateTo.smartTablePage()
        onSmartTablePage.addNewRecordWithFirstAndLastName('TTTT', 'HHHH')
        onSmartTablePage.updateAgeByFirstName('Thuy',35)
        onSmartTablePage.deleteRowByIndex(1)
    })
})