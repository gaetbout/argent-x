import { ethers } from "ethers"

import { BaseWalletAccount } from "../../../shared/wallet.model"
import {
  accountsEqual,
  getAccountIdentifier,
} from "../../../shared/wallet.service"
import { startSession } from "../../services/backgroundSessions"
import { Account } from "./Account"

export const deployAccount = async (networkId: string, password?: string) => {
  if (password) {
    await startSession(password)
  }

  return Account.fromDeploy(networkId)
}

const argentColorsArray = [
  "02BBA8",
  "29C5FF",
  "0078A4",
  "FFBF3D",
  "FFA85C",
  "FF875B",
  "FF675C",
  "FF5C72",
]

export const getColor = (name: string) => {
  const hash = ethers.utils.id(name).slice(-2)
  const index = parseInt(hash, 16) % argentColorsArray.length
  return argentColorsArray[index]
}

export const getAccountImageUrl = (
  name: string,
  account: BaseWalletAccount,
) => {
  const color = getColor(getAccountIdentifier(account))
  return `https://eu.ui-avatars.com/api?name=${name}&background=${color}&color=fff`
}

const isAccountDeployed = (account: Account): boolean =>
  !account.deployTransaction

export type AccountStatusCode = "CONNECTED" | "DEFAULT" | "DEPLOYING" | "ERROR"

export interface AccountStatus {
  code: AccountStatusCode
  text: string
}

export const getStatus = (
  account: Account,
  activeAccount?: BaseWalletAccount,
  forceDeployed = false,
): AccountStatus => {
  if (!isAccountDeployed(account) && !forceDeployed) {
    return { code: "DEPLOYING", text: "Deploying..." }
  }
  if (activeAccount && accountsEqual(account, activeAccount)) {
    return { code: "CONNECTED", text: "Active" }
  }
  return { code: "DEFAULT", text: "" }
}