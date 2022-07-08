import { expect } from "@playwright/test"
import type { Page } from "@playwright/test"

import { formatTruncatedAddressOriginal } from "../utils"

export async function selectAccountFromAccountList(
  page: Page,
  address: string,
) {
  await expect(page.locator("h1:has-text('Accounts')")).toBeVisible()
  await page.click(`text=${formatTruncatedAddressOriginal(address)}`)
}
