import {test, expect} from '@playwright/test'

import {generateAuthCredentials} from '../modules/auth/credentials'
import {getPassportApiUrl} from '../modules/auth/envs'
import {WEB_URL} from '../modules/common/envs'

test('should open join modal and switch to login form', async ({page}) => {
  await page.goto(WEB_URL)

  await page.getByText(/join in/iu).click()

  await expect(page.getByRole('dialog')).toBeVisible()

  await page.getByRole('button', {name: /click here/iu}).click()
  await expect(page.getByText(/login to your account/iu)).toBeVisible()
  await expect(
    page.getByRole('button', {
      name: /login/iu,
    })
  ).toBeVisible()
})

test('should login user and redirect on "/"', async ({page, request}) => {
  const credentials = generateAuthCredentials()
  await request.fetch(`${getPassportApiUrl()}/authentication/register`, {
    data: JSON.stringify(credentials),
    headers: {
      'Content-Type': 'application/json',
    },
    method: 'POST',
  })

  await page.goto(WEB_URL)
  await page.getByText(/join in/iu).click()
  await page.getByRole('button', {name: /click here/iu}).click()

  await page.getByPlaceholder(/email/iu).fill(credentials.email)
  await page.getByPlaceholder(/password/iu).fill(credentials.password)

  await page.getByRole('button', {name: /login/iu}).click()

  await page.waitForURL(/\/$/u)

  await expect(page.getByLabel(credentials.email)).toBeVisible()
  await expect(page.getByRole('img', {name: credentials.email})).toBeVisible()
})

test('should login user from modal and redirect on "/"', async ({
  page,
  request,
}) => {
  const credentials = generateAuthCredentials()
  await request.fetch(`${getPassportApiUrl()}/authentication/register`, {
    data: JSON.stringify(credentials),
    headers: {
      'Content-Type': 'application/json',
    },
    method: 'POST',
  })

  await page.goto(WEB_URL)
  await page.getByText(/join in/iu).click()
  await page.getByRole('button', {name: /click here/iu}).click()

  await page.getByPlaceholder(/email/iu).fill(credentials.email)
  await page.getByPlaceholder(/password/iu).fill(credentials.password)

  await page.getByRole('button', {name: /login/iu}).click()

  await page.waitForURL(/\/$/u)

  await expect(page.getByLabel(credentials.email)).toBeVisible()
  await expect(page.getByRole('img', {name: credentials.email})).toBeVisible()
})
