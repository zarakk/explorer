import { IS_BROWSER } from '@/common/constants';
import { PostConditions } from '@/components/post-conditions';
import { TransactionQueryKeys, transactionQK } from '@/features/transaction/query-keys';
import { useTransactionQueries } from '@/features/transaction/use-transaction-queries';
import * as React from 'react';
import { useQuery } from '@tanstack/react-query';

import {
  Block,
  MempoolSmartContractTransaction,
  SmartContractTransaction,
} from '@stacks/stacks-blockchain-api-types';

import { AddressTxListTabs } from '../../../common/components/tx-lists/tabs/AddressTxListTabs';
import { TxPage } from '../TxPage';
import { ContractTabs } from './ContractTabs';
import { TxDetails } from './TxDetails';

export const SmartContractPage: React.FC<{
  tx: SmartContractTransaction | MempoolSmartContractTransaction;
  block?: Block;
  contractId?: string;
  claritySyntax: Record<string, any>;
}> = ({ tx, block, contractId, claritySyntax }) => {
  const queries = useTransactionQueries();

  const { data: contract } = useQuery(
    transactionQK(TransactionQueryKeys.contract, contractId),
    queries.fetchContract(contractId),
    { enabled: !!contractId, suspense: false }
  );

  const source = contract?.source_code;

  if (!contractId) return null;
  return (
    <TxPage
      tx={tx}
      block={block}
      contractId={contractId}
      txDetails={<TxDetails tx={tx} block={block} />}
    >
      <PostConditions tx={tx} />
      <ContractTabs
        source={source}
        contract={contract}
        contractId={contractId}
        claritySyntax={claritySyntax}
      />
      <AddressTxListTabs address={contractId} />
    </TxPage>
  );
};
