// ***********************************************
// This example commands.js shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************
//
//
// -- This is a parent command --
// Cypress.Commands.add('login', (email, password) => { ... })
//
//
// -- This is a child command --
// Cypress.Commands.add('drag', { prevSubject: 'element'}, (subject, options) => { ... })
//
//
// -- This is a dual command --
// Cypress.Commands.add('dismiss', { prevSubject: 'optional'}, (subject, options) => { ... })
//
//
// -- This will overwrite an existing command --
// Cypress.Commands.overwrite('visit', (originalFn, url, options) => { ... })

Cypress.Commands.add('login', ({ username, password }) => {
    cy.request('POST', `${Cypress.env('BACKEND')}/api/login`, {
        username, password
    }).then(({ body }) => {
        localStorage.setItem('loggedBloglistUser', JSON.stringify(body))
        cy.visit('')
    })
})

Cypress.Commands.add('createUser', ({ name, username, password }) => {
    cy.request('POST', `${Cypress.env('BACKEND')}/api/users`, {
        name, username, password
    }).then(({ body }) => {
        cy.visit('')
    })
})

Cypress.Commands.add('createBlog', ({ title, author, url }) => {
    cy.request({
        url: `${Cypress.env('BACKEND')}/api/blogs`,
        method: 'POST',
        body: { title, author, url },
        headers: {
            'Authorization': `Bearer ${JSON.parse(localStorage.getItem('loggedBloglistUser')).token}`
        }
    })

    cy.visit('')
})

Cypress.Commands.add('createBlog', ({ title, author, url, likes }) => {
    cy.request({
        url: `${Cypress.env('BACKEND')}/api/blogs`,
        method: 'POST',
        body: { title, author, url, likes },
        headers: {
            'Authorization': `Bearer ${JSON.parse(localStorage.getItem('loggedBloglistUser')).token}`
        }
    })

    cy.visit('')
})