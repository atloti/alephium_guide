import { ReactNode } from 'react';

export type WalletOptions = {
  chains: string[];
  appName?: string;
  shimDisconnect?: boolean;
};
export type WalletProps = {
  id: string;
  name: string;
  shortName?: string;
  logos: {
    default: ReactNode;
    transparent?: ReactNode;
    connectorButton?: ReactNode;
    qrCode?: ReactNode;
    appIcon?: ReactNode;
    mobile?: ReactNode;
  };
  logoBackground?: string;
  scannable?: boolean;
  installed?: boolean;
  downloadUrls?: { [key: string]: string };
  createConnector: () => any;
};

export const getProviderUri = async (connector: any) => {
  const provider: any = await connector.getProvider();
  return provider.connector.uri;
};
