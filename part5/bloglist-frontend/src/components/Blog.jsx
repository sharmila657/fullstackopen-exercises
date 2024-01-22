import { useState } from "react"

const Blog = ({ blog }) => {
  const [showDetails, setShowDetails] = useState('')
  
  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5
  }

  const togglAble = () => {
  setShowDetails(!showDetails)
}

  return (
    <div style={blogStyle}>
      <div>
        {blog.title}
        <button onClick={togglAble}>
          {showDetails ? 'Hide' : 'View'}
        </button>
      </div>
      {showDetails && (
        <div>
          <div>{blog.url}</div>
          <div>
            Likes: {blog.likes}{' '}
            <button onClick={() => console.log('Like button clicked')}>
              Like
            </button>
          </div>
          <div>{blog.author}</div>
          <div>{blog.user.name}</div>
        </div>
      )}
    </div>
  )
}

export default Blog;