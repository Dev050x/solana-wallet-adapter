"use client"

import { useConnection, useWallet } from "@solana/wallet-adapter-react"
import { LAMPORTS_PER_SOL, PublicKey, SystemProgram, Transaction } from "@solana/web3.js"

const SendToken = () => {
  const wallet = useWallet()
  const { connection } = useConnection()

  if (!wallet.publicKey || !connection) {
    return (
      <div className="text-center py-8">
        <div className="text-gray-400 mb-4">
          <svg className="w-16 h-16 mx-auto mb-4 opacity-50" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
          </svg>
        </div>
        <p className="text-gray-400">Connect your wallet to send tokens</p>
      </div>
    )
  }

  async function sendToken() {
    const to = document.getElementById("toWallet").value
    const amount = document.getElementById("sendAmount").value
    let toPublicKey
    try {
      toPublicKey = new PublicKey(to)
    } catch (error) {
      alert("invalid address of receiver")
      return
    }
    console.log("to address and amount is", to)
    console.log("amount is: ", amount)

    if (isNaN(amount) || amount <= 0) {
      alert("invalid amount")
      return
    }

    const transaction = new Transaction()
    transaction.add(
      SystemProgram.transfer({
        fromPubkey: wallet.publicKey,
        toPubkey: new PublicKey(to),
        lamports: amount * LAMPORTS_PER_SOL,
      }),
    )
    try {
      console.log("sending token.....")
      await wallet.sendTransaction(transaction, connection)
      console.log("token send successfully")
    } catch (error) {
      alert("error while sending")
    }
  }

  return (
    <div>
      <div className="text-center mb-6">
        <h3 className="text-xl font-bold text-white mb-2">Send SOL</h3>
        <p className="text-gray-300 text-sm">Transfer SOL to another wallet</p>
      </div>

      <div className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-300 mb-2">Recipient Address</label>
          <input
            type="text"
            id="toWallet"
            placeholder="Enter wallet address"
            className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-200 text-sm font-mono"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-300 mb-2">Amount (SOL)</label>
          <input
            type="number"
            id="sendAmount"
            placeholder="Enter amount to send"
            step="0.001"
            min="0"
            className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-200"
          />
        </div>

        <button
          onClick={sendToken}
          className="w-full bg-gradient-to-r from-blue-500 to-purple-500 hover:from-blue-600 hover:to-purple-600 text-white font-semibold py-3 px-6 rounded-xl transition-all duration-200 transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 focus:ring-offset-transparent"
        >
          Send SOL
        </button>
      </div>
    </div>
  )
}

export default SendToken
