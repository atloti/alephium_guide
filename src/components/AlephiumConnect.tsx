import React, {
  createContext,
  createElement,
  useEffect,
  useState,
} from 'react';

import defaultTheme from '../styles/defaultTheme';

import AlephiumConnectModal from '../components/ConnectModal';
import { ThemeProvider } from 'styled-components';
import { SignerProvider } from '@alephium/web3';
import { Theme, Mode, CustomTheme } from '../types';

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
  theme: Theme;
  setTheme: React.Dispatch<React.SetStateAction<Theme>>;
  mode: Mode;
  setMode: React.Dispatch<React.SetStateAction<Mode>>;
  customTheme: CustomTheme;
  setCustomTheme: React.Dispatch<React.SetStateAction<CustomTheme>>;
};

const Context = createContext<ContextValue | null>(null);

export const useContext = () => {
  const context = React.useContext(Context);
  if (!context) throw Error('AlephiumConnect Hook must be inside a Provider.');
  return context;
};

type AlephiumConnectProviderProps = {
  useTheme?: Theme;
  useMode?: Mode;
  useCustomTheme?: CustomTheme;
  children?: React.ReactNode;
};

export const AlephiumConnectProvider: React.FC<AlephiumConnectProviderProps> = ({
  useTheme = 'auto',
  useMode = 'auto',
  useCustomTheme,
  children,
}) => {
  // Only allow for mounting AlephiumConnectProvider once, so we avoid weird global
  // state collisions.
  if (React.useContext(Context)) {
    throw new Error(
      'Multiple, nested usages of AlephiumConnectProvider detected. Please use only one.'
    );
  }

  const [theme, setTheme] = useState<Theme>(useTheme);
  const [mode, setMode] = useState<Mode>(useMode);
  const [customTheme, setCustomTheme] = useState<CustomTheme>(
    useCustomTheme ?? {}
  );

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
    theme,
    setTheme,
    mode,
    setMode,
    customTheme,
    setCustomTheme,

    // Other configuration
    errorMessage,
  };

  return createElement(
    Context.Provider,
    { value },
    <>
      <ThemeProvider theme={defaultTheme}>
        {children}
        <AlephiumConnectModal
          theme={theme}
          mode={mode}
          customTheme={customTheme}
        />
      </ThemeProvider>
    </>
  );
};