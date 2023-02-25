import { useContext } from '../components/AlephiumConnect';

export function useAccount() {
  const context = useContext()

  return { account: context.account, isConnected: !!context.account }
}
