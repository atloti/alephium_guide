import { connect } from '@alephium/get-extension-wallet'
import { useEffect } from 'react'
import { useContext } from '../components/AlephiumConnect';

export function useAddress(
  networkId: string,
  onDisconnected: () => Promise<void> = () => Promise.resolve()
) {
  const context = useContext()

  useEffect(() => {
    const handler = async () => {
      const windowAlephium = await connect({ showList: false })
      const enabledAddress = await windowAlephium?.enable({ onDisconnected, networkId: networkId })

      if (windowAlephium) {
        context.setSignerProvider(windowAlephium)
        if (windowAlephium.connectedNetworkId) {
          context.setNetwork(windowAlephium.connectedNetworkId)
        }
      }

      enabledAddress && context.setAddress(enabledAddress)
    }

    handler()
  }, [])

  return { address: context.address, isConnected: !!context.address }
}
