import {
  ConnectionProvider,
  WalletProvider,
} from "@solana/wallet-adapter-react";
import { useMemo } from 'react';
import "./App.css";
import {
  WalletModalProvider,
  WalletMultiButton,
} from "@solana/wallet-adapter-react-ui";
import {
  clusterApiUrl,
} from "@solana/web3.js";
import "@solana/wallet-adapter-react-ui/styles.css";
import { ConnectWallet } from "./ConnectWallet";
import RequestAirdrop from "./RequestAirdrop";
import ShowSolBalance from "./ShowSolBalance";
import SendToken from "./SendToken";

function App() {
  const endpoint = clusterApiUrl("devnet");
  const wallets = useMemo(() => [], []);

  return (
    <ConnectionProvider endpoint={endpoint}>
      <WalletProvider wallets={wallets}>
        <WalletModalProvider>
          <div>
           <ConnectWallet />  
          </div>
          <div>
            <RequestAirdrop />
          </div>
          <div>
            <ShowSolBalance />
          </div>
          <div>
            <SendToken />
          </div>
        </WalletModalProvider>
      </WalletProvider>
    </ConnectionProvider>
  )
}

export default App
