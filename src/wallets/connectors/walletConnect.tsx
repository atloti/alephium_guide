import {
  WalletProps,
  WalletOptions,
  getProviderUri,
} from './../wallet';

import Logos from './../../assets/logos';

export const walletConnect = ({ chains }: WalletOptions): WalletProps => {
  return {
    id: 'walletConnect',
    name: 'Other Wallets',
    logos: {
      default: <Logos.WalletConnect />,
      mobile: <Logos.WalletConnect />,
      transparent: <Logos.WalletConnect background={false} />,
      connectorButton: <Logos.WalletConnect />,
      qrCode: <Logos.WalletConnect background={true} />,
    },
    logoBackground: 'var(--ck-brand-walletConnect)',
    scannable: true,
    createConnector: () => {
      //      const connector = getDefaultWalletConnectConnector(chains);
      //
      //      return {
      //        connector,
      //        qrCode: {
      //          getUri: async () => await getProviderUri(connector),
      //        },
      //      };
    },
  };
};
