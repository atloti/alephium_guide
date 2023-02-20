import { injected } from './connectors/injected';
import { walletConnect } from './connectors/walletConnect';

export const getWallets = ({
  chains,
}: {
  chains: string[];
  appName?: string;
  shimDisconnect?: boolean;
}) => {
  return [
    injected({ chains }),
    walletConnect({ chains }),
  ];
};
