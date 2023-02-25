import { connect } from '@alephium/get-extension-wallet'
import type { EnableOptionsBase } from '@alephium/web3';
import { useContext } from '../components/AlephiumConnect';
import { getAlephium } from '@alephium/get-extension-wallet';
import { useCallback } from 'react';

export type ConnectOptions = Omit<EnableOptionsBase, 'onDisconnected'>

export function useConnect(
  options: ConnectOptions
) {
  const context = useContext()

  const disconnectAlephium = useCallback(() => {
    const alephium = getAlephium()
    if (alephium) {
      alephium.disconnect()
      context.setAccount(undefined)
      context.setSignerProvider(undefined)
      context.setNetwork('')
    }
  }, [context])

  const connectAlephium = useCallback(async () => {
    const windowAlephium = await connect({
      include: ['alephium']
    })

    const enabledAccount = await windowAlephium?.enable({
      ...options, showModal: false, onDisconnected: disconnectAlephium
    }).catch(() => undefined) // Need to catch the exception here

    if (windowAlephium && enabledAccount) {
      context.setSignerProvider(windowAlephium)
      context.setNetwork(options.networkId)
      context.setAccount(enabledAccount)
    }

    return enabledAccount
  }, [context])

  return { connect: connectAlephium, disconnect: disconnectAlephium }
}
