import { Balance } from '@alephium/web3/dist/src/api/api-alephium';
import { useEffect, useState } from 'react';
import { useContext } from '../components/AlephiumConnect';

export function useBalance(address: string) {
  const context = useContext()
  const [balance, setBalance] = useState<Balance>()

  useEffect(() => {
    const handler = async () => {
      const nodeProvider = context.signerProvider?.nodeProvider
      if (nodeProvider) {
        const result = await nodeProvider.addresses.getAddressesAddressBalance(address)
        setBalance(result)
      }
    }

    handler()
  }, [])

  return { balance }
}