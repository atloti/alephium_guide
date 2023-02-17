import React, { useEffect, useState } from 'react';
import { useContext } from '../../AlephiumConnect';

import {
  PageContent,
  ModalBody,
  ModalContent,
  ModalH1,
} from '../../Common/Modal/styles';
import Button from '../../Common/Button';

import { DisconnectIcon } from '../../../assets/icons';
import CopyToClipboard from '../../Common/CopyToClipboard';
import { useAddress } from '../../../hooks/useAddress';
import { truncatedAddress } from '../../../utils';
import { useBalance } from '../../../hooks/useBalance';
import { AnimatePresence } from 'framer-motion';
import { Balance, BalanceContainer, LoadingBalance } from './styles';
import { convertSetToAlph } from '@alephium/sdk'

const Profile: React.FC<{ closeModal?: () => void }> = ({ closeModal }) => {
  const context = useContext();
  const { address } = useAddress(context.network)
  const { balance } = useBalance(address)
  const [shouldDisconnect, setShouldDisconnect] = useState(false);

  useEffect(() => {
    if (!shouldDisconnect) return;

    if (closeModal) {
      closeModal();
    } else {
      context.setOpen(false);
    }
    return () => {
      // FIXME: disconnect logic
    };
  }, [shouldDisconnect]);

  return (
    <PageContent>
      <ModalContent style={{ paddingBottom: 22, gap: 6 }}>
        <ModalH1>
          <CopyToClipboard string={address}>
            {address && truncatedAddress(address)}
          </CopyToClipboard>
        </ModalH1>
        <ModalBody>
          <BalanceContainer>
            <AnimatePresence exitBeforeEnter initial={false}>
              {balance && (
                <Balance
                  key={`alephium`}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.2 }}
                >
                  {convertSetToAlph(BigInt(balance.balance))} ALPH
                </Balance>
              )}
              {!balance && (
                <LoadingBalance
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.2 }}
                >
                  &nbsp;
                </LoadingBalance>
              )}
            </AnimatePresence>
          </BalanceContainer>
        </ModalBody>
      </ModalContent>
      <Button
        onClick={() => setShouldDisconnect(true)}
        icon={<DisconnectIcon />}
      >
        {"Disconnect"}
      </Button>
    </PageContent>
  );
};

export default Profile;
