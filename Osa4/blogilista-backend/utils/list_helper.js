const dummy = (blogs) => {
  return 1;
}

const totalLikes = (blogs) => {
  return blogs.reduce((total, blog) => total + blog.likes, 0)
}

const favoriteBlog = (blogs) => {
  return blogs.reduce((blogA, blogB) => (blogA.likes > blogB.likes ? blogA : blogB))
}

const mostBlogs = (blogs) => {
  const result = blogs.reduce((blogA, blogB) => {
    let knownAuthor = blogA.find(f => {
      return f.author === blogB.author
    })
    if (!knownAuthor) {
      return blogA.concat({ author: blogB.author, blogs: 1 })
    }
    knownAuthor.blogs++

    return blogA
  }, [])

  return result.reduce((blogA, blogB) => (blogA.blogs > blogB.blogs ? blogA : blogB))
}

module.exports = {
  dummy,
  totalLikes,
  favoriteBlog,
  mostBlogs
}