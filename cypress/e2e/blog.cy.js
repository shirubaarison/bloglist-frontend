describe('Blog app', () => {
    beforeEach(function() {
        cy.request('POST', `${Cypress.env('BACKEND')}/api/testing/reset`)
        cy.createUser({
            name: 'barack obama',
            username: 'barackObamaOfc',
            password: '1234'
        })

        cy.createUser({
            name: 'donald trump',
            username: 'donaldtrumpofc',
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
            cy.get('.blogName').should('contain', 'a blog written by cypress')
            cy.get('.blogAuthor').should('contain', 'cypress')
        })

        it('created blog can be liked', function () {
            cy.createBlog({ title: 'test1', author: 'tester', url: 'http://localhost:5173' })
            cy.get('#view-button').click()
            cy.get('#likes-count').should('contain', '0')
            cy.get('#like-button').click()

            cy.get('.notification').should('contain', 'you liked test1')
            cy.get('#likes-count').should('contain', '1')

            cy.get('#like-button').click()

            cy.get('.notification').should('contain', 'you liked test1')
            cy.get('#likes-count').should('contain', '2')

            cy.get('#like-button').click()

            cy.get('.notification').should('contain', 'you liked test1')
            cy.get('#likes-count').should('contain', '3')
        })

        it('created blog can be deleted', function () {
            cy.createBlog({ title: 'test1', author: 'tester', url: 'http://localhost:5173' })
            cy.get('#view-button').click()
            cy.get('#delete-button').click()
            cy.get('.notification').should('contain', 'you removed test1')
        })

        it('cannot see a delete button for a blog that isnt yours', function () {
            cy.createBlog({ title: 'test1', author: 'tester', url: 'http://localhost:5173' })
            cy.login({
                username: 'donaldtrumpofc',
                password: '1234'
            })

            cy.get('#view-button').click()
            cy.get('#delete-button').should('not.exist')
        })

        describe('when several blogs are created', function () {
            beforeEach(function () {
                cy.createBlog({ title: 'test1', author: 'tester', url: 'http://localhost:5173', likes: 10 })
                cy.createBlog({ title: 'test2', author: 'tester', url: 'http://localhost:5173', likes: 5 })
                cy.createBlog({ title: 'second most liked blog', author: 'tester', url: 'http://localhost:5173', likes: 200 })
                cy.createBlog({ title: 'test4', author: 'tester', url: 'http://localhost:5173', likes: 150 })
                cy.createBlog({ title: 'most liked blog', author: 'tester', url: 'http://localhost:5173', likes: 43059 })
                cy.createBlog({ title: 'least liked blog', author: 'tester', url: 'http://localhost:5173', likes: 1 })
            })

            it('it is in order', function() {
                cy.get('.blogName').eq(0).should('contain', 'most liked blog')
                cy.get('.blogName').eq(1).should('contain', 'second most liked blog')
                cy.get('.blogName').eq(5).should('contain', 'least liked blog')
            })
        })
    })
})