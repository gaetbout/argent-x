import { Call } from "starknet"

import { ARGENT_MULTISIG_URL } from "../api/constants"
import { Fetcher, fetcher } from "../api/fetcher"
import { Network } from "../network"
import { networkToStarknetNetwork } from "../utils/starknetNetwork"
import { urlWithQuery } from "../utils/url"
import {
  ApiMultisigDataForSigner,
  ApiMultisigDataForSignerSchema,
} from "./multisig.model"

const multisigTransactionTypes = {
  addSigners: "addSigners",
  changeThreshold: "changeThreshold",
  removeSigners: "removeSigners",
  replaceSigner: "replaceSigner",
} as const
export interface IFetchMultisigDataForSigner {
  signer: string
  network: Network
  fetcher?: Fetcher
}

export async function fetchMultisigDataForSigner({
  signer,
  network,
  fetcher: fetcherImpl = fetcher,
}: IFetchMultisigDataForSigner): Promise<ApiMultisigDataForSigner> {
  if (!ARGENT_MULTISIG_URL) {
    throw "Argent Multisig endpoint is not defined"
  }

  const starknetNetwork = networkToStarknetNetwork(network)

  const url = urlWithQuery([ARGENT_MULTISIG_URL, starknetNetwork], {
    signer,
  })

  const data = await fetcherImpl(url, {
    method: "GET",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
  })

  return ApiMultisigDataForSignerSchema.parse(data)
}

export const getMultisigTransactionType = (transactions: Call[]) => {
  const entryPoints = transactions.map((tx) => tx.entrypoint)
  switch (true) {
    case entryPoints.includes("addSigners"): {
      return multisigTransactionTypes.addSigners
    }
    case entryPoints.includes("changeThreshold"): {
      return multisigTransactionTypes.changeThreshold
    }
    default: {
      return undefined
    }
  }
}
