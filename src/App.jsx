import { useState, useEffect, useRef } from 'react'
import Blog from './components/Blog'
import BlogForm from './components/BlogForm'
import Notification from './components/Notification'
import Error from './components/Error'
import Togglable from './components/Togglable'
import LoginForm from './components/LoginForm'
import blogService from './services/blogs'
import loginService from './services/login'

import './index.css'

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [user, setUser] = useState(null)

  const [error, setError] = useState(null)
  const [notification, setNotification] = useState(null)

  const blogFormRef = useRef()

  useEffect(() => {
    blogService.getAll().then(blogs =>
      setBlogs( blogs )
    )  
  }, [])

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedBloglistUser')
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      setUser(user)
      blogService.setToken(user.token)
    }
  }, [])
  

  const handleLogin = async (loginObj) => {
    try {
      const user = await loginService.login(loginObj)

      window.localStorage.setItem(
        'loggedBloglistUser', JSON.stringify(user)
      )
      
      blogService.setToken(user.token)
      setUser(user)
      setNotification('sucess log in')
      
      setTimeout(() => {
        setNotification(null)
      }, 5000)
    } catch (exception) {
      setError('wrong username or password')
      
      setTimeout(() => {
        setError(null)
      }, 5000)
    }
  }

  const handleLogout = () => {
    window.localStorage.removeItem('loggedBloglistUser')    
    setUser(null)
    setNotification('logged out')
    
    setTimeout(() => {
      setNotification(null)
    }, 5000)
  }

  const addBlog = async (blogObj) => {  
    try {  
      const response = await blogService.createBlog(blogObj)
      setBlogs(blogs.concat(response))
      setNotification(`a new blog ${blogObj.title} by ${blogObj.author} added`)
      
      blogFormRef.current.toggleVisibility()

      setTimeout(() => {
        setNotification(null)
      }, 5000)
    } catch (err) {
      setError('something went wrong')
      
      setTimeout(() => {
        setError(null)
      }, 5000)
    }
}
  
  if (user) {
    return (
      <div>
        <div className='p-5 mb-3 bg-primary text-white'><h2>Blogs</h2></div>
      <div className='p-5'>
        <Notification notification={notification} />
        <Error error={error} />
        <div className='container'>
          <div className="row justify-content-end">
            <div className='col-auto'>
              <p>{user.name} logged in <button className='btn btn-primary 'onClick={handleLogout}>logout</button></p> 
            </div>
          </div>
        </div>
        <Togglable buttonLabel="new blog" ref={blogFormRef}>
          <BlogForm createBlog={addBlog} />
        </Togglable>
        <div className='container mt-5'>
          <table className='table'>
          <thead>
            <tr>
              <th>Title</th>
              <th>Author</th>
            </tr>
          </thead>
          <tbody>
          {blogs.map(blog =>
            <Blog key={blog.id} blog={blog} />
          )}
          </tbody>
          </table>
        </div>
      </div>
    </div>
    )
  }
  else{
    return (
      <div>
        <Notification notification={notification} />
        <Error error={error} />
        <LoginForm handleLogin={handleLogin} />
      </div>
    )
  }
}

export default App