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
    // metaMask({ chains }),
    //    coinbaseWallet({ chains }),
    //    rainbow({ chains }),
    //    argent({ chains }),
    //    trust({ chains }),
    //    ledger({ chains }),
    //    imToken({ chains }),
    //    brave({ chains }),
    //    gnosisSafe({ chains }),
    //    unstoppable({ chains }),
    //    steak({ chains }),
    //    //slope({ chains }),
    //    onto({ chains }),
    //    frontier({ chains }),
    //    zerion({ chains }),
  ];
};
