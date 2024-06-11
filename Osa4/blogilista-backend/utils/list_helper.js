const dummy = (blogs) => {
  return 1;
}

const totalLikes = (blogs) => {
  return blogs.reduce((total, blog) => total + blog.likes, 0)
}

const favoriteBlog = (blogs) => {
  return blogs.reduce((blogA, blogB) => (blogA.likes > blogB.likes ? blogA : blogB))
}

module.exports = {
  dummy,
  totalLikes,
  favoriteBlog
}