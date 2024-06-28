/// <reference types="cypress" />
import { onDatePickerPage } from '../support/page_objects/datePickerPage.js';

describe('Test Date Picker page', () => {
    it('Date picker', () => {
        // function selectDayFromCurrent(day) {
        //     let date = new Date()
        //     date.setDate(date.getDate() + day)
        //     let futureDay = date.getDate()
        //     let futureMonth = date.toLocaleDateString('en-US', { month: 'short' })
        //     let futureYear = date.getFullYear()
        //     let assertDate = `${futureMonth} ${futureDay}, ${futureYear}`

        //     cy.get('nb-calendar-navigation').invoke('attr', 'ng-reflect-date').then(dateAttribute => {
        //         if (!dateAttribute.includes(futureMonth) || !dateAttribute.includes(futureYear)) {
        //             cy.get('[data-name="chevron-right"]').click()
        //             selectDayFromCurrent(day)
        //         } else {
        //             cy.get('.day-cell').not('.bounding-month').contains(futureDay).click()
        //         }
        //     })
        //     return assertDate
        // }

        // onDatePickerPage.visit()
        cy.visit('/')
        cy.contains('Forms').click()
        cy.contains('Datepicker').click()
        
        // // Pick a flexible date
        // cy.contains('nb-card', 'Common Datepicker').find('input').then(input => {
        //     cy.wrap(input).click()
        //     const assertDate = onDatePickerPage.selectDayFromCurrent(10)
        //     cy.wrap(input).invoke('prop', 'value').should('contain', assertDate)
        //     cy.wrap(input).should('have.value', assertDate)//the same with above script
        // })

        // //Pick a fixed date
        // cy.contains('nb-card','Common Datepicker').find('input').then( input => {
        //     cy.wrap(input).click()
        //     cy.get('.day-cell').not('.bounding-month').contains('29').click()
        //     cy.wrap(input).invoke('prop','value').should('contain','May 29, 2024')
        //     cy.wrap(input).should('have.value','May 29, 2024')//the same with above script
        // })
    })

})