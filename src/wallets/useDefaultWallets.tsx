import { getWallets } from './';
import { WalletProps } from './wallet';

function useDefaultWallets(): WalletProps[] | any {
  return getWallets({ chains: ["1", "2"] });
}

export default useDefaultWallets;
