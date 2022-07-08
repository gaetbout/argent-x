import type { Page } from "@playwright/test"

export async function navigateFromAccountToTokenDetails(
  page: Page,
  tokenName: string,
) {
  await page.click(`h3:has-text('${tokenName}')`)
  await page.waitForLoadState("networkidle") // load new token balance
}
