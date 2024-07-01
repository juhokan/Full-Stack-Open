import { render, screen, cleanup } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import Blog from './Blog'

afterEach(() => {
  cleanup()
})

const blog = {
  title: 'Component testing is done with react-testing-library',
  author: 'Test Author',
  url: 'www.test.fi',
  likes: 1,
  user: {
    username: 'test',
    name: 'Test User',
  },
}

test('renders content', () => {
  render(<Blog blog={blog} />)

  const element = screen.getByText(content => {
    return content.includes(blog.title && blog.author) && !content.includes(blog.url && blog.likes)
  })

  expect(element).toBeDefined()
})

test('clicking the button shows likes, url and name', async () => {
  render(<Blog blog={blog} />)

  const testUser = userEvent.setup()
  const button = screen.getByText('show')
  await testUser.click(button)

  const element = screen.getByText(content => {
    return content.includes(blog.title && blog.author && blog.url && blog.likes && blog.user.name)
  })

  expect(element).toBeDefined()
})
