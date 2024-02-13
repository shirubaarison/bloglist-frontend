import Togglable from './Togglable'

const Blog = ({ blog, addLike }) => (
    <tr>
      <td>{blog.title}</td>
      <td>{blog.author}</td>
      <td>
        <Togglable buttonLabel='view' secondButtonLabel='hide'>
        <div className="card">
          <div className="card-body">
            <h5 className="card-title">{blog.title}</h5>
            <p className="card-text">Author: {blog.author}</p>
            <p className="card-text">URL: <a href={blog.url}>{blog.url}</a></p>
            <p className="card-text">Likes: {blog.likes} <button className='btn btn-outline-secondary' onClick={addLike}>like</button></p>
          </div>
        </div>
        </Togglable>
      </td>
    </tr>
)

export default Blog