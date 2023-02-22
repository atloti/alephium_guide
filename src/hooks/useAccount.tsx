import { connect } from '@alephium/get-extension-wallet'
import { useEffect } from 'react'
import { useContext } from '../components/AlephiumConnect';

export function useAccount(
  networkId: string,
  onDisconnected: () => Promise<void> = () => Promise.resolve()
) {
  const context = useContext()

  useEffect(() => {
    const handler = async () => {
      const windowAlephium = await connect({ showList: false })
      const enabledAccount = await windowAlephium?.enable({ onDisconnected, networkId: networkId })

      if (windowAlephium) {
        context.setSignerProvider(windowAlephium)
        if (windowAlephium.connectedNetworkId) {
          context.setNetwork(windowAlephium.connectedNetworkId)
        }
      }

      enabledAccount && context.setAccount(enabledAccount)
    }

    handler()
  }, [])

  return { account: context.account, isConnected: !!context.account }
}
