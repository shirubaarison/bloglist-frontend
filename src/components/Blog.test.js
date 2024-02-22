import React from 'react'
import '@testing-library/jest-dom'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import Blog from './Blog'

describe('blog test', () => {
    let container
    let likeMockHandler = jest.fn()

    const blog = {
        title: 'just for testing',
        author: 'root',
        user: {
            username: 'barack obama'
        },
        url: 'https://somewebsite.com',
        likes: 1
    }

    beforeEach(() => {
        container = render(
            <table>
                <tbody>
                    <Blog blog={blog} addLike={likeMockHandler} />
                </tbody>
            </table>
        ).container
    })

    test('renders title and author but hides url and likes by default', () => {
        const blogNameElement = container.querySelector('.blogName')
        expect(blogNameElement).toHaveTextContent(
            'just for testing'
        )
        const blogNameAuthor = container.querySelector('.blogAuthor')
        expect(blogNameAuthor).toHaveTextContent(
            'root'
        )

        const details = container.querySelector('.blogDetails')
        expect(details).toHaveStyle('display: none')
    })

    test('show url and likes only if user click the button', async () => {
        const user = userEvent.setup()
        const button = screen.getByText('view')
        await user.click(button)

        const div = container.querySelector('.blogDetails')
        expect(div).not.toHaveStyle('display: none')
    })

    test('can hide when click view', async () => {
        const user = userEvent.setup()
        const button = screen.getByText('view')
        await user.click(button)

        const closeButton = screen.getByText('hide')
        await user.click(closeButton)

        const div = container.querySelector('.blogDetails')
        expect(div).toHaveStyle('display: none')
    })

    test('like button works as intended (2 likes)', async () => {
        const user = userEvent.setup()

        const button = screen.getByText('like')
        await user.click(button)
        await user.click(button)

        expect(likeMockHandler.mock.calls).toHaveLength(2)
    })
})