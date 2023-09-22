import {test, expect} from '@playwright/test'

test('should open join modal', async ({page}) => {
  await page.goto('http://localhost:3000')

  await page.getByText(/join in/i, ).click()
  await expect( page.getByRole('dialog')).toBeVisible()
})

test('modal should has controls', async ({page}) => {
  await page.goto('http://localhost:3000')

  await page.getByText(/join in/i, ).click()
  await expect(page.getByRole('dialog').getByPlaceholder(/username/i)).toBeVisible()
  await expect(page.getByRole('dialog').getByPlaceholder(/password/i)).toBeVisible()
  await expect(page.getByRole('dialog').getByPlaceholder(/email/i)).toBeVisible()
  await expect(page.getByRole('dialog').getByText(/sign up/i)).toBeVisible()
})

test('page should show on visit', async ({page}) => {
  await page.goto('http://localhost:3000/join')

  await expect( page.getByRole('dialog')).not.toBeVisible()
  await expect(page.getByPlaceholder(/username/i)).toBeVisible()
  await expect(page.getByPlaceholder(/password/i)).toBeVisible()
  await expect(page.getByPlaceholder(/email/i)).toBeVisible()
  await expect(page.getByText(/sign up/i)).toBeVisible()
})

test('should register user and redirect on "/"', async ({page}) => {
  const email = `eliot@e-corp-${Math.random()}.com`

  await page.goto('http://localhost:3000/join')

  await page.getByPlaceholder(/email/i).fill(email)
  await page.getByPlaceholder(/password/i).fill('fake_password')

  await page.getByText(/sign up/i).click()

  await page.waitForURL(/\/$/)
  await expect(page.getByText(email)).toBeVisible()
})

test('should register user from modal and redirect on "/"', async ({page}) => {
  const email = `eliot@e-corp-${Math.random()}.com`

  await page.goto('http://localhost:3000')
  await page.getByText(/join in/i, ).click()

  await page.getByPlaceholder(/email/i).fill(email)
  await page.getByPlaceholder(/password/i).fill('fake_password')

  await page.getByText(/sign up/i).click()

  await page.waitForURL(/\/$/)
  await expect(page.getByText(email)).toBeVisible()
})
