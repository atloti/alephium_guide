import { WalletProps, WalletOptions } from './../wallet';

import { isMobile } from '../../utils';
import Logos from './../../assets/logos';

export const injected = ({ chains }: WalletOptions): WalletProps => {
  const isInstalled = typeof window !== 'undefined'

  const shouldUseWalletConnect = isMobile() && !isInstalled;

  return {
    id: 'injected',
    name: 'Extension Wallet',
    shortName: 'browser',
    scannable: false,
    logos: { default: <Logos.AlephiumIcon /> },
    installed: Boolean(!shouldUseWalletConnect ? isInstalled : false),
    createConnector: () => {
      //      const connector = new InjectedConnector({
      //        chains,
      //        options: { shimDisconnect: true },
      //      });
      //
      //      return {
      //        connector,
      //      };
    },
  };
};
