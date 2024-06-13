import { render, screen } from '@testing-library/react'
import { test, expect } from 'vitest'
import Blog from './Blog'

test('renders content', () => {
  const blog = {
    title: 'Component testing is done with react-testing-library',
    author: 'Test Author',
    url: 'www.test.fi',
    likes: 1,

  }

  render(<Blog blog={blog} />)

  const element = screen.getByText((content) => {
    return content.includes(blog.title && blog.author) && !content.includes(blog.url && blog.likes)
  })

  expect(element).toBeDefined()
})