"use client"

import { ConnectionProvider, WalletProvider } from "@solana/wallet-adapter-react"
import { useMemo } from "react"
import "./App.css"
import { WalletModalProvider } from "@solana/wallet-adapter-react-ui"
import { clusterApiUrl } from "@solana/web3.js"
import "@solana/wallet-adapter-react-ui/styles.css"
import { ConnectWallet } from "./ConnectWallet"
import RequestAirdrop from "./RequestAirdrop"
import ShowSolBalance from "./ShowSolBalance"
import SendToken from "./SendToken"
import SignMessage from "./SignMessage"

function App() {
  const endpoint = clusterApiUrl("devnet")
  const wallets = useMemo(() => [], [])

  return (
    <ConnectionProvider endpoint={endpoint}>
      <WalletProvider wallets={wallets}>
        <WalletModalProvider>
          <div className="min-h-screen bg-gradient-to-br from-purple-900 via-blue-900 to-indigo-900">
            <div className="container mx-auto px-4 py-8">
              <div className="text-center mb-12">
                <h1 className="text-4xl md:text-6xl font-bold text-white mb-4 bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
                  Solana Wallet
                </h1>
                <p className="text-xl text-gray-300 max-w-2xl mx-auto">
                  Connect your wallet and interact with the Solana blockchain
                </p>
              </div>

              <div className="max-w-4xl mx-auto space-y-8">
                <div className="bg-white/10 backdrop-blur-lg rounded-2xl p-6 border border-white/20">
                  <ConnectWallet />
                </div>

                <div className="grid md:grid-cols-2 gap-8">
                  <div className="bg-white/10 backdrop-blur-lg rounded-2xl p-6 border border-white/20">
                    <ShowSolBalance />
                  </div>

                  <div className="bg-white/10 backdrop-blur-lg rounded-2xl p-6 border border-white/20">
                    <RequestAirdrop />
                  </div>
                </div>

                <div className="grid md:grid-cols-2 gap-8">
                  <div className="bg-white/10 backdrop-blur-lg rounded-2xl p-6 border border-white/20">
                    <SendToken />
                  </div>

                  <div className="bg-white/10 backdrop-blur-lg rounded-2xl p-6 border border-white/20">
                    <SignMessage />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </WalletModalProvider>
      </WalletProvider>
    </ConnectionProvider>
  )
}

export default App
