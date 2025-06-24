"use client"

import { useConnection, useWallet } from "@solana/wallet-adapter-react"
import { LAMPORTS_PER_SOL } from "@solana/web3.js"

const RequestAirdrop = () => {
  const { publicKey } = useWallet()
  const { connection } = useConnection()

  if (!publicKey || !connection) {
    return (
      <div className="text-center py-8">
        <div className="text-gray-400 mb-4">
          <svg className="w-16 h-16 mx-auto mb-4 opacity-50" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"
            />
          </svg>
        </div>
        <p className="text-gray-400">Connect your wallet to request airdrop</p>
      </div>
    )
  }

  async function sendAirdrop() {
    try {
      console.log("public key is and Connection is: ", publicKey.toBase58(), connection)
      const sig = await connection.requestAirdrop(publicKey, document.getElementById("amount").value * LAMPORTS_PER_SOL)
      console.log("token sent successfully ", sig)
    } catch (error) {
      alert("error in sending token")
    }
  }

  return (
    <div>
      <div className="text-center mb-6">
        <h3 className="text-xl font-bold text-white mb-2">Request Airdrop</h3>
        <p className="text-gray-300 text-sm">Get free SOL tokens for testing</p>
      </div>

      <div className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-300 mb-2">Amount (SOL)</label>
          <input
            id="amount"
            type="text"
            placeholder="Enter SOL amount (max 2)"
            className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-200"
          />
        </div>

        <button
          onClick={sendAirdrop}
          className="w-full bg-gradient-to-r from-green-500 to-emerald-500 hover:from-green-600 hover:to-emerald-600 text-white font-semibold py-3 px-6 rounded-xl transition-all duration-200 transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2 focus:ring-offset-transparent"
        >
          Request Airdrop
        </button>
      </div>
    </div>
  )
}

export default RequestAirdrop
