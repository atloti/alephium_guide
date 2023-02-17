import { connect } from '@alephium/get-extension-wallet'
import type { Address } from '@alephium/web3';
import { useContext } from '../components/AlephiumConnect';
import { getAlephium } from '@alephium/get-extension-wallet';

export function useConnect(
  networkId: string,
  onDisconnected: () => Promise<void> = () => Promise.resolve()
) {
  const context = useContext()
  const connectAlephium: () => Promise<Address | undefined> = async () => {
    const windowAlephium = await connect({
      include: ['alephium']
    })

    const enabledAddress = await windowAlephium?.enable({
      onDisconnected,
      networkId: networkId
    })

    if (windowAlephium) {
      context.setSignerProvider(windowAlephium)
      if (windowAlephium.connectedNetworkId) {
        context.setNetwork(windowAlephium.connectedNetworkId)
      }
    }

    enabledAddress && context.setAddress(enabledAddress)
    return enabledAddress
  }

  function disconnectAlephium(): void {
    const alephium = getAlephium()
    if (alephium) {
      alephium.disconnect()
      context.setAddress('')
      context.setSignerProvider(undefined)
      context.setNetwork('')
    }
  }

  return { connect: connectAlephium, disconnect: disconnectAlephium }
}
