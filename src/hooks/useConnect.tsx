import { getDefaultAlephiumWallet } from '@alephium/get-extension-wallet'
import type { EnableOptionsBase } from '@alephium/web3';
import { useContext } from '../components/AlephiumConnect';
import { useCallback } from 'react';

export type ConnectOptions = Omit<EnableOptionsBase, 'onDisconnected'>

export function useConnect(
  options: ConnectOptions
) {
  const context = useContext()

  const disconnectAlephium = useCallback(() => {
    const alephium = getDefaultAlephiumWallet()
    if (alephium) {
      alephium.disconnect()
      context.setAccount(undefined)
      context.setSignerProvider(undefined)
      context.setNetwork(undefined)
    }
  }, [context])

  const connectAlephium = useCallback(async () => {
    const windowAlephium = getDefaultAlephiumWallet()

    if (windowAlephium === undefined) {
      return undefined
    }

    const enabledAccount = await windowAlephium?.enable({
      ...options, onDisconnected: disconnectAlephium
    }).catch(() => undefined) // Need to catch the exception here

    if (windowAlephium && enabledAccount) {
      context.setSignerProvider(windowAlephium)
      if (windowAlephium.connectedNetworkId) {
        context.setNetwork(windowAlephium.connectedNetworkId)
      }
      context.setAccount(enabledAccount)
    }

    return enabledAccount
  }, [context])

  return { connect: connectAlephium, disconnect: disconnectAlephium }
}
