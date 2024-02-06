import { useState, useEffect } from 'react'
import Blog from './components/Blog'
import Notification from './components/Notification'
import Error from './components/Error'
import blogService from './services/blogs'
import loginService from './services/login'

import './index.css'

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [username, setUsername] = useState([])
  const [password, setPassword] = useState([])
  const [user, setUser] = useState(null)

  const [title, setTitle] = useState('')
  const [author, setAuthor] = useState('')
  const [url, setUrl] = useState('')

  const [error, setError] = useState(null)
  const [notification, setNotification] = useState(null)

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
  

  const handleLogin = async event => {
    event.preventDefault()
    try {
      const user = await loginService.login({
        username, password
      })

      window.localStorage.setItem(
        'loggedBloglistUser', JSON.stringify(user)
      )
      
      blogService.setToken(user.token)
      setUser(user)
      setUsername('')
      setPassword('')

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
    setUser('')
    setNotification('logged out')
    setTimeout(() => {
      setNotification(null)
    }, 5000)
  }

  const addBlog = async event => {
    event.preventDefault()

    if (!title || !author || !url) {
      setError('didnt you forget something?')
      
      setTimeout(() => {
        setError(null)
      }, 5000)
    }
    else {
      const blogObj = {
        title: title,
        author: author, 
        url: url
      }
  
      try {  
        const response = await blogService.createBlog(blogObj)
        setBlogs(blogs.concat(response))
        setNotification(`a new blog ${title} by ${author} added`)
        
        setAuthor('')
        setTitle('')
        setUrl('')

        
        
        setTimeout(() => {
          setNotification(null)
        }, 5000)
      } catch (err) {
        setError(err)
        
        setTimeout(() => {
          setError(null)
        }, 5000)
      }
    }
  }

  const loginForm = () => (
    <div>
      <h2>Log in</h2>
      <form onSubmit={handleLogin}>
        <div>
          username <input type='text' value={username} name="Username" onChange={({ target }) => setUsername(target.value)} />
        </div>
        <div>
          password <input type='password' value={password} name="Password" onChange={({ target }) => setPassword(target.value)} />
        </div>
        <button type="submit">login</button>
      </form>
    </div>
  )

  const blogForm = () => (
    <div>
      <h2>add a blog</h2>
      <form onSubmit={addBlog}>
        <div>
          title <input type='text' value={title} name="Title" onChange={({ target }) => setTitle(target.value)} />
        </div>
        <div>
          author <input type='text' value={author} name="Author" onChange={({ target }) => setAuthor(target.value)} />
        </div>
        <div>
          url <input type='text' value={url} name="URL" onChange={({ target }) => setUrl(target.value)} />
        </div>
        <button type='submit'>add</button>
      </form>
    </div>
  )
  
  if (user) {
    return (
      <div>
      <h2>blogs</h2>
      <Notification notification={notification} />
      <Error error={error} />
      <div>
        <p>{user.name} logged in <button onClick={handleLogout}>logout</button></p>
      </div>
      {blogForm()}
      {blogs.map(blog =>
        <Blog key={blog.id} blog={blog} />
      )}
    </div>
    )
  }
  else{
    return (
      <div>
        <Notification notification={notification} />
        <Error error={error} />
        {loginForm()}
      </div>
    )
  }
}

export default App