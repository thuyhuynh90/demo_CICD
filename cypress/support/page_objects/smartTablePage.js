import exp from "constants"

export class SmartTable{
    updateAgeByFirstName(name,age){
        cy.get('tbody').contains('tr',name).then(tableRow => {
            cy.wrap(tableRow).click()
            cy.wrap(tableRow).find('.nb-edit').click()
            cy.wrap(tableRow).find('[placeholder="Age"]').clear().type(age)
            cy.wrap(tableRow).find('[class="nb-checkmark"]').click()
            cy.wrap(tableRow).find('td').eq(6).should('contain',age)
        })
    }

    addNewRecordWithFirstAndLastName(firstName, lastName){
        cy.get('thead').find('.nb-plus').click()
        cy.get('thead').find('tr[ng2-st-thead-form-row]').within(()=>{
            cy.get('[placeholder="First Name"]').type(firstName)
            cy.get('[placeholder="Last Name"]').type(lastName)
            cy.get('.ng2-smart-action-add-create').click()
        })
    }
    
    deleteRowByIndex(index){
        const stub = cy.stub()
        cy.on('window:confirm',stub)
        cy.get('tbody tr').eq(index).find('.nb-trash').click().then( () => {
            expect(stub.getCall(0)).to.be.calledWith('Are you sure you want to delete?')
        })
    }

}

export const onSmartTablePage = new SmartTable()