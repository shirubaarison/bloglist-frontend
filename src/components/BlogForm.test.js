import React from 'react'
import '@testing-library/jest-dom'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import BlogForm from './BlogForm'

describe('<blogForm />', () => {
    test('create a new blog', async () => {
        const createBlog = jest.fn()
        const user = userEvent.setup()

        render(<BlogForm createBlog={createBlog} />)

        const inputTitle  = screen.getByPlaceholderText('Type title')
        const inputAuthor  = screen.getByPlaceholderText('Type author')
        const inputURL  = screen.getByPlaceholderText('Type URL')
        const sendButton = screen.getByText('create')

        await user.type(inputTitle, 'testing blogform')
        await user.type(inputAuthor, 'testing author')
        await user.type(inputURL, 'https://example.com')

        await user.click(sendButton)

        expect(createBlog.mock.calls).toHaveLength(1)
        expect(createBlog.mock.calls[0][0].title).toBe('testing blogform')
        expect(createBlog.mock.calls[0][0].author).toBe('testing author')
        expect(createBlog.mock.calls[0][0].url).toBe('https://example.com')
    })
})