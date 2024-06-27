/// <reference types="cypress" />
import {navigateTo} from '../support/pageObjects/navigationPage'

describe('First test suite', () => {

    beforeEach('Open application', () => {
        cy.visit('/')
    })

    it('first test', () => {
        //put the code of the test
        navigateTo.formLayoutsPage()

        //Find web element by tag name
        cy.get('input')
        //by ID value
        cy.get('#inputEmail1')
        //by class value
        cy.get('.input-full-width')
        //by Attribute name
        cy.get('[fullwidth]')
        //by Attribute and value
        cy.get('[placeholder="Email"]')
        //by entire class (mandatory that it include all value of class)
        cy.get('[class="input-full-width size-medium shape-rectangle"]')
        //by 2 attributes
        cy.get('[placeholder="Email"][fullwidth]')
        //by class, id, attribute
        cy.get('.input-full-width#inputEmail1[placeholder="Email"]')
    })

    it('second test', () => {
        navigateTo.formLayoutsPage()

        //get()
        //find()
        //contains()
        cy.contains('Sign in')
        cy.contains('nb-card', 'Horizontal form').find('button')
        cy.contains('nb-card', 'Horizontal form').contains('Sign in')
        //get() will be found all button instead of element belong to the parent element
        cy.contains('nb-card', 'Horizontal form').get('button') //all button will be found instead of element in the parent element

        //cypress chains and DOM
        cy.get('#inputEmail3')
            .parents('form')
            .find('button')
            .should('contain', 'Sign in')
            .parents('form')
            .find('nb-checkbox')
            .click()
    })

    it('save subject of the command', () => {
        navigateTo.formLayoutsPage()

        cy.contains('nb-card', 'Using the Grid').find('[for="inputEmail1"]').should('contain', 'Email')
        cy.contains('nb-card', 'Using the Grid').find('[for="inputPassword2"]').should('contain', 'Password')

        //CANNOT DO THING IN CYPRESS
        // const usingTheGrid = cy.contains('nb-card','Using the Grid')
        // usingTheGrid.find('[for="inputEmail1"]').should('contain','Email')
        // usingTheGrid.find('[for="inputPassword2"]').should('contain','Password')

        //(1)Using Cypress alias
        cy.contains('nb-card', 'Using the Grid').as('usingTheGrid')
        cy.get('@usingTheGrid').find('[for="inputEmail1"]').should('contain', 'Email')
        cy.get('@usingTheGrid').find('[for="inputPassword2"]').should('contain', 'Password')

        //(2)Using then() method
        cy.contains('nb-card', 'Using the Grid').then(usingTheGrid => {
            cy.wrap(usingTheGrid).find('[for="inputEmail1"]').should('contain', 'Email')
            cy.wrap(usingTheGrid).find('[for="inputPassword2"]').should('contain', 'Password')
        })
    })

    it('extract text values', () => {
        navigateTo.formLayoutsPage()

        cy.get('[for="exampleInputEmail1"]').should('contain', 'Email address')

        //get the exact value of Email address and save it in variable and use it later
        cy.get('[for="exampleInputEmail1"]').then(label => {
            const labelText = label.text()
            expect(labelText).to.eql('Email address')
            //can use wrap() to write cypress code
            cy.wrap(labelText).should('contain', 'Email address')
        })
        //invoke() will get pure text
        cy.get('[for="exampleInputEmail1"]').invoke('text').then(text => {
            expect(text).to.eql('Email address')
        })
        cy.get('[for="exampleInputEmail1"]').invoke('text').as('labelText').should('contain', 'Email address')

        cy.get('[for="exampleInputEmail1"]').invoke('attr', 'class').then(classValue => {
            expect(classValue).to.eql('label');
        })
        cy.get('#exampleInputEmail1').type('test@test.com')
        cy.get('#exampleInputEmail1').invoke('prop', 'value').should('contain', 'test@test.com')
    })

    it('radio button', () => {
        navigateTo.formLayoutsPage()

        cy.contains('nb-card', 'Using the Grid').find('[type="radio"]').then(radioButton => {
            cy.wrap(radioButton).eq(0).check({ force: true }).should('be.checked')
            cy.wrap(radioButton).eq(1).check({ force: true }).should('be.checked')
            cy.wrap(radioButton).eq(0).should('not.be.checked')
            cy.wrap(radioButton).eq(2).should('be.disabled')
        })
    })

    it('checkboxes', () => {
        navigateTo.toasterPage()

        cy.get('[type="checkbox"]').uncheck({ force: true })

    })

    it('Date picker', () => {
        function selectDayFromCurrent(day) {
            let date = new Date()
            date.setDate(date.getDate() + day)
            let futureDay = date.getDate()
            let futureMonth = date.toLocaleDateString('en-US', { month: 'short' })
            let futureYear = date.getFullYear()
            let assertDate = `${futureMonth} ${futureDay}, ${futureYear}`

            cy.get('nb-calendar-navigation').invoke('attr', 'ng-reflect-date').then(dateAttribute => {
                if (!dateAttribute.includes(futureMonth) || !dateAttribute.includes(futureYear)) {
                    cy.get('[data-name="chevron-right"]').click()
                    selectDayFromCurrent(day)
                } else {
                    cy.get('.day-cell').not('.bounding-month').contains(futureDay).click()
                }
            })
            return assertDate
        }

        navigateTo.datePickerPage()
        // cy.visit('/')
        // cy.contains('Forms').click()
        // cy.contains('Datepicker').click()
        //Pick a flexible date
        cy.contains('nb-card', 'Common Datepicker').find('input').then(input => {
            cy.wrap(input).click()
            const assertDate = selectDayFromCurrent(10)
            cy.wrap(input).invoke('prop', 'value').should('contain', assertDate)
            cy.wrap(input).should('have.value', assertDate)//the same with above script
        })

        // //Pick a fixed date
        // cy.contains('nb-card','Common Datepicker').find('input').then( input => {
        //     cy.wrap(input).click()
        //     cy.get('.day-cell').not('.bounding-month').contains('29').click()
        //     cy.wrap(input).invoke('prop','value').should('contain','May 29, 2024')
        //     cy.wrap(input).should('have.value','May 29, 2024')//the same with above script
        // })
    })

    it('Lists and Dropdowns', () => {
        // FormPage.visit()
        // cy.get('nav').find('nb-select').click()
        cy.get('nav nb-select').click() //the same result with above code
        cy.get('.options-list').contains('Dark').click()
        cy.get('nav nb-select').should('contain', 'Dark')

        //select all option in the list with loop
        cy.get('nav nb-select').then(dropDown => {
            cy.wrap(dropDown).click()
            cy.get('.options-list nb-option').each((listItem, index) => {
                const itemText = listItem.text().trim()
                cy.wrap(listItem).click()
                cy.wrap(dropDown).should('contain', itemText)
                if (index < 3) {
                    cy.wrap(dropDown).click()
                }
            })
        })
    })

    it('Web table', () => {
        navigateTo.smartTablePage()
        cy.get('tbody').contains('tr','Larry').then(tableRow => {
            cy.wrap(tableRow).click()
            cy.wrap(tableRow).find('.nb-edit').click()
            cy.wrap(tableRow).find('[placeholder="Age"]').clear().type('35')
            cy.wrap(tableRow).find('[class="nb-checkmark"]').click()
            cy.wrap(tableRow).find('td').eq(6).should('contain','35')
        })

        //add new row
        cy.get('thead').find('.nb-plus').click()
        cy.get('thead').find('tr[ng2-st-thead-form-row]').within(()=>{
            cy.get('[placeholder="First Name"]').type('Thuy')
            cy.get('[placeholder="Last Name"]').type('Huynh')
            cy.get('.ng2-smart-action-add-create').click()
        })
        
        //get each row validation e.g input '20' into Age column -> expect all rows show with age = 20

        const age = [20, 40, 200]
        cy.wrap(age).each(age => {
            cy.get('thead [placeholder="Age"]').clear().type(age)
            cy.wait(500)
            cy.get('tbody tr').each(tableRow => {
                if (age == 200 ) {
                    cy.wrap(tableRow).should('contain','No data found')
                } else {
                    cy.wrap(tableRow).find('td').eq(6).should('contain',age)
                }
                
            })
        })
        
    })

    it('Popups and Tooltips', () => {
        navigateTo.tooltipPage()
        cy.contains('nb-card','Colored Tooltips')
            .contains('Default').click()
        cy.get('nb-tooltip').should('contain','This is a tooltip')
    })

    it('Dialog box', () => {
        navigateTo.smartTablePage()
        cy.get('tbody tr').first().find('.nb-trash').click()
        // cy.get('nb-tooltip').should('contain','This is a tooltip')
    })
})