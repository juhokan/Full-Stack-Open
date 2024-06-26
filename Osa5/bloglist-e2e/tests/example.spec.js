const { test, expect, beforeEach, describe } = require('@playwright/test')

describe('Blog app', () => {
  beforeEach(async ({ page, request }) => {
    await request.post('http:localhost:3003/api/testing/reset')
    await request.post('http://localhost:3003/api/users', {
      data: {
        name: 'Testi Käyttäjä',
        username: 'testi',
        password: 'salasana'
      }
    })
    await request.post('http://localhost:3003/api/users', {
      data: {
        name: 'Testi Käyttäjä 2',
        username: 'testi2',
        password: 'salasana'
      }
    });

    await page.goto('http://localhost:5173')
  })

  test('Login form is shown', async ({ page }) => {
    await page.goto('http://localhost:5173')

    const headingLocator = await page.getByRole('heading', { name: 'Login' });
    await expect(headingLocator).toBeVisible();

    const buttonLocator = await page.getByRole('button', { name: 'login' });
    await expect(buttonLocator).toBeVisible();
  })

  describe('Login', () => {
    test('succeeds with correct credentials', async ({ page }) => {
      await page.getByRole('textbox').first().fill('testi')
      await page.getByRole('textbox').last().fill('salasana')
      await page.getByRole('button', { name: 'login' }).click()

      await expect(page.getByText('Testi Käyttäjä logged in')).toBeVisible()
    })

    test('fails with wrong credentials', async ({ page }) => {
      await page.getByRole('textbox').first().fill('testi')
      await page.getByRole('textbox').last().fill('vääräsalasana')
      await page.getByRole('button', { name: 'login' }).click()

      await expect(page.getByText('Wrong username or password')).toBeVisible()
    })
  })

  describe('When logged in', () => {
    beforeEach(async ({ page }) => {
      await page.getByRole('textbox').first().fill('testi')
      await page.getByRole('textbox').last().fill('salasana')
      await page.getByRole('button', { name: 'login' }).click()
    })

    test('a new blog can be created', async ({ page }) => {
      await page.getByRole('button', { name: 'New blog' }).click()

      const titleInput = page.locator('input[name="title"]');
      const authorInput = page.locator('input[name="author"]');
      const urlInput = page.locator('input[name="url"]');

      await titleInput.fill('Test Title');
      await authorInput.fill('Test Author');
      await urlInput.fill('www.test.com');

      const createButton = page.locator('button[type="submit"]');
      await createButton.click();

      await expect(page.getByText('A new blog Test Title by Test Author created!')).toBeVisible()
    })

    test('a blog can be liked', async ({ page }) => {
      await page.getByRole('button', { name: 'New blog' }).click();
  
      const titleInput = page.locator('input[name="title"]');
      const authorInput = page.locator('input[name="author"]');
      const urlInput = page.locator('input[name="url"]');
  
      await titleInput.fill('Test Title');
      await authorInput.fill('Test Author');
      await urlInput.fill('www.test.com');
  
      const submitButton = page.locator('button[type="submit"]');
      await submitButton.click();
  
      await expect(page.getByText('A new blog Test Title by Test Author created!')).toBeVisible();
  
      const showButton = page.locator('button', { hasText: 'show' });
      await showButton.click();
  
      const likeButton = page.locator('button', { hasText: 'Like' });
      await expect(likeButton).toBeVisible();
      await likeButton.click();
  
      await expect(page.getByText('Likes: 1')).toBeVisible();
    });

    test('a blog can be deleted', async ({ page }) => {
      await page.getByRole('button', { name: 'New blog' }).click();
  
      const titleInput = page.locator('input[name="title"]');
      const authorInput = page.locator('input[name="author"]');
      const urlInput = page.locator('input[name="url"]');

      await titleInput.fill('Test Title');
      await authorInput.fill('Test Author');
      await urlInput.fill('www.test.com');
  
      const submitButton = page.locator('button[type="submit"]');
      await submitButton.click();
  
      await expect(page.getByText('A new blog Test Title by Test Author created!')).toBeVisible();
  
      const showButton = page.locator('button', { hasText: 'show' });
      await showButton.click();
  
      const removeButton = page.locator('button', { hasText: 'remove' });
      await expect(removeButton).toBeVisible();
      
      page.on('dialog', async dialog => {
        expect(dialog.type()).toBe('confirm');
        expect(dialog.message()).toBe('Remove blog Test Title?');
        await dialog.accept();
      });
  
      await removeButton.click();
  
      await expect(page.getByText('Test Title Test Author')).not.toBeVisible();
    });

    test('only the user who created the blog can see the remove button', async ({ page }) => {
      await page.getByRole('button', { name: 'New blog' }).click();
  
      const titleInput = page.locator('input[name="title"]');
      const authorInput = page.locator('input[name="author"]');
      const urlInput = page.locator('input[name="url"]');

      await titleInput.fill('Test Title');
      await authorInput.fill('Test Author');
      await urlInput.fill('www.test.com');
  
      const submitButton = page.locator('button[type="submit"]');
      await submitButton.click();
  
      await expect(page.getByText('A new blog Test Title by Test Author created!')).toBeVisible();
  
      const showButton = page.locator('button', { hasText: 'show' });
      await showButton.click();
  
      const removeButton = page.locator('button', { hasText: 'remove' });
      await expect(removeButton).toBeVisible();
  
      await page.getByRole('button', { name: 'Log Out' }).click();
  
      await page.getByRole('textbox').first().fill('testi2')
      await page.getByRole('textbox').last().fill('salasana')
      const login = page.locator('button[type="submit"]');
      await login.click()

      await expect(page.getByText('Testi Käyttäjä 2 logged in')).toBeVisible()

      await showButton.click();
      
      await expect(removeButton).not.toBeVisible();
    });

    test('blogs are sorted based on the number of likes', async ({ page }) => {
      await page.getByRole('button', { name: 'New blog' }).click();

      const createBlog = async (title, author, url, likes) => {
        const titleInput = page.locator('input[name="title"]');
        const authorInput = page.locator('input[name="author"]');
        const urlInput = page.locator('input[name="url"]');

        await titleInput.fill(title);
        await authorInput.fill(author);
        await urlInput.fill(url);

        const submitButton = page.locator('button[type="submit"]');
        await submitButton.click();

        await expect(page.getByText(`${title} ${author}`)).toBeVisible()

        const showButton = page.locator('.blog').filter({has: page.getByText(`${title} ${author}`)}).getByRole('button', { name: 'show' })
        await showButton.click()

        for (let i = 0; i < likes; i++) {
          const likeButton = page.locator('button', { hasText: 'Like' });
          await expect(likeButton).toBeVisible();
          await likeButton.click({setTimeout:1000});
          await expect(page.getByText(`Likes: ${i+1}`)).toBeVisible();
        }

        const hideButton = page.locator('button', { hasText: 'hide' });
        await hideButton.click();

      };
  
      await createBlog('Blog 1', 'Author 1', 'www.blog1.com', 3);
      await createBlog('Blog 2', 'Author 2', 'www.blog2.com', 5);
      await createBlog('Blog 3', 'Author 3', 'www.blog3.com', 1);
  
      const blogTitles = await page.locator('.blog').allTextContents();
      expect(blogTitles).toEqual([
        'Blog 2 Author 2show',
        'Blog 1 Author 1show',
        'Blog 3 Author 3show',
      ]);
    });
  })
})