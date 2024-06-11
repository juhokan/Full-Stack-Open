const mongoose = require('mongoose')

if (process.argv.length<3) {
  console.log('give password as argument')
  process.exit(1)
}

const password = process.argv[2]

const url = `mongodb+srv://juhokan:${password}@puhelinluettelo-db.mutnh94.mongodb.net/blogApp?retryWrites=true&w=majority&appName=puhelinluettelo-db`

mongoose.set('strictQuery', false)
mongoose.connect(url)

const blogSchema = mongoose.Schema({
    title: String,
    author: String,
    url: String,
    likes: Number
  })

const Blog = mongoose.model('Blog', blogSchema)


if (process.argv.length === 3) {
  console.log('blogs:')
  Blog.find({}).then(result => {
    result.forEach(blog => {
      console.log(`${blog.title} ${blog.author}`)
    })
    mongoose.connection.close()
  })
}

else if (process.argv.length === 7) {
  const blog = new Blog({
    title: process.argv[3],
    author: process.argv[4],
    url: process.argv[5],
    likes: process.argv[6],
  })

  blog.save().then(() => {
    console.log(`added blog ${process.argv[3]} by ${process.argv[4]} to blogs`)
    mongoose.connection.close()
  })
}

else {
  console.log('invalid input')
  mongoose.connection.close()
}
