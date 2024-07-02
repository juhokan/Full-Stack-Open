const { ApolloServer } = require('@apollo/server')
const { startStandaloneServer } = require('@apollo/server/standalone')
const { GraphQLError } = require('graphql')

const mongoose = require('mongoose')
mongoose.set('strictQuery', false)
const Author = require('./models/author')
const Book = require('./models/book')
require('dotenv').config()

const MONGODB_URI = process.env.MONGODB_URI

mongoose.connect(MONGODB_URI)
  .then(() => {
    console.log('connected to MongoDB')
  })
  .catch((error) => {
    console.log('error connection to MongoDB:', error.message)
  })

const typeDefs = `
  type Author {
    _id: ID!
    name: String!
    born: Int
    books: [Book!]!
  }

  type Book {
    _id: ID!
    title: String!
    published: Int!
    author: Author!
    genres: [String!]!
  }

  type Query {
    bookCount: Int!
    authorCount: Int!
    allBooks(author: String, genre: String): [Book!]!
    allAuthors: [Author!]!
  }

  type Mutation {
    addBook(
      title: String!
      published: Int!
      author: String!
      genres: [String!]!
    ): Book!
    editAuthor(
      name: String!
      setBornTo: Int!
    ): Author
  }
`;

const resolvers = {
  Query: {
    bookCount: async () => await Book.countDocuments(),
    authorCount: async () => await Author.countDocuments(),
    allBooks: async (root, args) => {
      let query = {};
      if (args.author) {
        const author = await Author.findOne({ name: args.author });
        if (author) {
          query.author = author._id;
        }
      }
      if (args.genre) {
        query.genres = args.genre;
      }
      return await Book.find(query).populate('author');
    },
    allAuthors: async () => await Author.find({})
  },
  Author: {
    books: async (parent) => await Book.find({ author: parent._id })
  },
  Mutation: {
    addBook: async (root, args) => {
      let author = await Author.findOne({ name: args.author });

      if (!author) {
        author = new Author({ name: args.author });
        await author.save();
      }

      const book = new Book({ ...args, author: author._id });
      await book.save();
      return book.populate('author');
    },
    editAuthor: async (root, args) => {
      const author = await Author.findOneAndUpdate({ name: args.name }, { born: args.setBornTo }, { new: true });
      return author;
    }
  }
};

const server = new ApolloServer({
  typeDefs,
  resolvers,
})

startStandaloneServer(server, {
  listen: { port: 4000 },
}).then(({ url }) => {
  console.log(`Server ready at ${url}`)
})