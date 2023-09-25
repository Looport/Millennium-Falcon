import {test, expect} from '@playwright/test'

import {generateAuthCredentials} from '../modules/auth/credentials'
import {WEB_URL} from '../modules/common/constants'
import {PASSPORT_API_URL} from "../modules/auth/contants";

test('should register user from modal and redirect on "/"', async ({page, request, context}) => {
  const credentials = await generateAuthCredentials()
  const body = await request.fetch(`${PASSPORT_API_URL}/authentication/register`, {
    data: JSON.stringify(credentials),
    headers: {
      'Content-Type': 'application/json',
    },
    method: 'POST',
  }).then((res) => res.json())

  await context.addCookies([{name: 'accessToken', value: body.accessToken, url: WEB_URL}])

  await page.goto(WEB_URL)

  await page.getByRole('img', {name: credentials.email}).click()
  await page.getByLabel(/logout/iu).click()

  await expect(page.getByRole('img', {name: /avatar/iu})).not.toBeVisible()
})
