import { getDefaultAlephiumWallet } from '@alephium/get-extension-wallet'
import { useEffect } from 'react'
import { useContext } from '../components/AlephiumConnect';

export function useAccount(
  onDisconnected: () => Promise<void> = () => Promise.resolve()
) {
  const context = useContext()

  useEffect(() => {
    const handler = async () => {
      const windowAlephium = await getDefaultAlephiumWallet()
      const enabledAccount = await windowAlephium?.enableIfConnected({
        onDisconnected,
        networkId: context.network,
        chainGroup: context.chainGroup,
        keyType: context.keyType
      })

      windowAlephium && context.setSignerProvider(windowAlephium)
      enabledAccount && context.setAccount(enabledAccount)
    }

    handler()
  }, [])

  return { account: context.account, isConnected: !!context.account }
}
