import { useEffect, useState } from 'react'

const Blog = ({ blog, addLike, removeBlog }) => {
    const [showDetails, setShowDetails] = useState(false)

    const storedUser = JSON.parse(window.localStorage.getItem('loggedBloglistUser'))
    const username = storedUser ? storedUser.username : ''

    const showDeleteButton = blog.user.username === username ? true : false

    const hideWhenVisible = { display: showDetails ? 'none' : '' }
    const shownWhenVisible = { display: showDetails ? '' : 'none' }

    return (
        <tr>
            <td className='blogName'>{blog.title}</td>
            <td className='blogAuthor'>{blog.author}</td>
            <td>
                <div style={hideWhenVisible}>
                    <button className='btn btn-outline-secondary btn-block' id="view-button" onClick={() => setShowDetails(true)}>view</button>
                </div>
                <div style={shownWhenVisible} className="card blogDetails">
                    <div className="card-body">
                        <h5 className="card-title">{blog.title}</h5>
                        <p className="card-text">Author: {blog.author}</p>
                        <p className="card-text">URL: <a href={blog.url}>{blog.url}</a></p>
                        <p className="card-text" id="likes-count">Likes: {blog.likes}</p>
                        <p className="card-text">created by: {blog.user.name}</p>
                        <div className='d-flex justify-content-center text-center gap-2'>
                            <button className='btn btn-outline-secondary' onClick={() => setShowDetails(false)}>hide</button>
                            <button className='btn btn-outline-secondary' id="like-button" onClick={addLike}>like</button>
                            {showDeleteButton && <button className='btn btn-outline-secondary' id="delete-button" onClick={removeBlog}>remove</button>}
                        </div>
                    </div>
                </div>
            </td>
        </tr>
    )
}



export default Blog