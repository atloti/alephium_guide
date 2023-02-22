import { connect } from '@alephium/get-extension-wallet'
import type { Account, EnableOptionsBase } from '@alephium/web3';
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

    const enabledAccount = await windowAlephium?.enable({...options, showModal: false, onDisconnected: disconnectAlephium})

    if (windowAlephium) {
      context.setSignerProvider(windowAlephium)
      if (windowAlephium.connectedNetworkId) {
        context.setNetwork(windowAlephium.connectedNetworkId)
      }
    }

    enabledAccount && context.setAccount(enabledAccount)
    return enabledAccount
  }, [context])

  return { connect: connectAlephium, disconnect: disconnectAlephium }
}
