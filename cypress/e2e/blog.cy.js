describe('Blog app', () => {
    beforeEach(function() {
        cy.request('POST', `${Cypress.env('BACKEND')}/api/testing/reset`)
        cy.createUser({
            name: 'barack obama',
            username: 'barackObamaOfc',
            password: '1234'
        })
    })

    it('Login form is shown', function () {
        cy.contains('Login')
    })

    describe('Login', function() {
        it('suceeds with correct credentials', function () {
            cy.contains('Login').click()
            cy.get('#username').type('barackObamaOfc')
            cy.get('#password').type('1234')
            cy.get('#login-button').click()

            cy.contains('sucess log in')
        })

        it('fails with wrong credentials', function () {
            cy.contains('Login').click()
            cy.get('#username').type('barackObamaOfc')
            cy.get('#password').type('wrong')
            cy.get('#login-button').click()

            cy.get('.error').should('contain', 'wrong username or password')
            cy.get('.error').should('have.css', 'border-style', 'solid')
            cy.get('.error').should('have.css', 'color', 'rgb(255, 0, 0)')
        })
    })

    describe('when logged in', function () {
        beforeEach(function () {
            cy.login({
                username: 'barackObamaOfc',
                password: '1234'
            })
        })

        it('a blog can be created', function () {
            cy.get('#togglable').should('contain', 'new blog').click()
            cy.get('#title').type('a blog written by cypress')
            cy.get('#author').type('cypress')
            cy.get('#url').type('https://localhost:5173')

            cy.get('#create-blog').click()

            cy.get('.notification').should('contain', 'a new blog a blog written by cypress by cypress added')
        })

        describe('when several blogs are created', function () {
            beforeEach(function () {
                // ...
            })
        })
    })
})