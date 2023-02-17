import React, {
  createContext,
  createElement,
  useEffect,
  useState,
} from 'react';

import AlephiumConnectModal from '../components/ConnectModal';
import { ThemeProvider } from 'styled-components';
import { SignerProvider } from '@alephium/web3';

export const routes = {
  CONNECTORS: 'connectors',
  PROFILE: 'profile',
  CONNECT: 'connect',
};

type Connector = any;
type Error = string | React.ReactNode | null;

type ContextValue = {
  open: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
  route: string;
  setRoute: React.Dispatch<React.SetStateAction<string>>;
  errorMessage: Error;
  connector: string;
  setConnector: React.Dispatch<React.SetStateAction<Connector>>;
  address: string;
  setAddress: React.Dispatch<React.SetStateAction<string>>;
  signerProvider?: SignerProvider;
  setSignerProvider: React.Dispatch<React.SetStateAction<SignerProvider | undefined>>;
  network: string;
  setNetwork: React.Dispatch<React.SetStateAction<string>>;
};

const Context = createContext<ContextValue | null>(null);

export const useContext = () => {
  const context = React.useContext(Context);
  if (!context) throw Error('AlephiumConnect Hook must be inside a Provider.');
  return context;
};

type AlephiumConnectProviderProps = {
  children?: React.ReactNode;
};

export const AlephiumConnectProvider: React.FC<AlephiumConnectProviderProps> = ({
  children,
}) => {
  // Only allow for mounting AlephiumConnectProvider once, so we avoid weird global
  // state collisions.
  if (React.useContext(Context)) {
    throw new Error(
      'Multiple, nested usages of AlephiumConnectProvider detected. Please use only one.'
    );
  }

  const [open, setOpen] = useState<boolean>(false);
  const [connector, setConnector] = useState<string>('');
  const [route, setRoute] = useState<string>(routes.CONNECTORS);
  const [address, setAddress] = useState<string>('');
  const [errorMessage, setErrorMessage] = useState<Error>('');
  const [signerProvider, setSignerProvider] = useState<SignerProvider | undefined>()
  const [network, setNetwork] = useState<string>('');

  useEffect(() => setErrorMessage(null), [route, open]);

  // Check if chain is supported, elsewise redirect to switches page
  const value = {
    open,
    setOpen,
    route,
    setRoute,
    connector,
    setConnector,
    address,
    setAddress,
    signerProvider,
    setSignerProvider,
    network,
    setNetwork,

    // Other configuration
    errorMessage,
  };

  return createElement(
    Context.Provider,
    { value },
    <>
      <ThemeProvider theme={{
        main: "mediumseagreen"
      }}>
        {children}
        <AlephiumConnectModal />
      </ThemeProvider>
    </>
  );
};
