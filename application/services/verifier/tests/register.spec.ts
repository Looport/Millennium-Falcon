import {test, expect} from '@playwright/test'

import {generateAuthCredentials} from '../modules/auth/credentials'
import {WEB_URL} from '../modules/common/envs'

test('should open join modal', async ({page}) => {
  await page.goto(WEB_URL)

  await page.getByText(/join in/iu).click()
  await expect(page.getByRole('dialog')).toBeVisible()
})

test('page should show on visit', async ({page}) => {
  await page.goto('http://localhost:3000/join')

  await expect(page.getByRole('dialog')).toBeHidden()

  await expect(page.getByPlaceholder(/username/iu)).toBeVisible()
  await expect(page.getByPlaceholder(/password/iu)).toBeVisible()
  await expect(page.getByPlaceholder(/email/iu)).toBeVisible()
  await expect(page.getByText(/sign up/iu)).toBeVisible()
})

test('should register user and redirect on "/"', async ({page}) => {
  const {email, password} = generateAuthCredentials()

  await page.goto(`${WEB_URL}/join`)

  await page.getByPlaceholder(/email/iu).fill(email)
  await page.getByPlaceholder(/password/iu).fill(password)

  await page.getByText(/sign up/iu).click()

  await page.waitForURL(/\/$/u)

  await expect(page.getByLabel(email)).toBeVisible()
  await expect(page.getByRole('img', {name: email})).toBeVisible()
})

test('should register user from modal and redirect on "/"', async ({page}) => {
  const {email, password} = generateAuthCredentials()

  await page.goto(WEB_URL)
  await page.getByText(/join in/iu).click()

  await page.getByPlaceholder(/email/iu).fill(email)
  await page.getByPlaceholder(/password/iu).fill(password)

  await page.getByText(/sign up/iu).click()

  await page.waitForURL(/\/$/u)

  await expect(page.getByRole('dialog')).toBeHidden()

  await expect(page.getByLabel(email)).toBeVisible()
  await expect(page.getByRole('img', {name: email})).toBeVisible()
})
