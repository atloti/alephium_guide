import { getDefaultAlephiumWallet } from '@alephium/get-extension-wallet'
import { useEffect } from 'react'
import { useContext } from '../components/AlephiumConnect';

export function useAccount(
  onDisconnected: () => Promise<void> = () => Promise.resolve()
) {
  const context = useContext()

  useEffect(() => {
    const handler = async () => {
      const windowAlephium = getDefaultAlephiumWallet()
      const enabledAccount = await windowAlephium?.enableIfConnected({ onDisconnected, networkId: context.network })

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
