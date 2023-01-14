var fs = require('fs');

describe('As a customer ' +
    'i want to give my account details ' +
    'So that i can see account balance amount with account details (acct_no, acct_name)', () => {

    it("add processing method to the normal catalog and save", () => {
        cy.exec('node ./specs/balance.spec.js').then((result) => {
            console.log("result", result)
        })
    })
})