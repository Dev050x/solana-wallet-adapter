"use client"

import { useConnection, useWallet } from "@solana/wallet-adapter-react"
import { LAMPORTS_PER_SOL } from "@solana/web3.js"
import { useEffect, useState } from "react"

const ShowSolBalance = () => {
  const { connection } = useConnection()
  const { publicKey } = useWallet()
  const [balance, setBalance] = useState(null)
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    if (publicKey) {
      walletBalance()
    }
  }, [publicKey, connection])

  if (!publicKey || !connection) {
    return (
      <div className="text-center py-8">
        <div className="text-gray-400 mb-4">
          <svg className="w-16 h-16 mx-auto mb-4 opacity-50" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M17 9V7a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2m2 4h10a2 2 0 002-2v-6a2 2 0 00-2-2H9a2 2 0 00-2 2v6a2 2 0 002 2zm7-5a2 2 0 11-4 0 2 2 0 014 0z"
            />
          </svg>
        </div>
        <p className="text-gray-400">Connect your wallet to view balance</p>
      </div>
    )
  }

  async function walletBalance() {
    setLoading(true)
    try {
      const balance = await connection.getBalance(publicKey)
      setBalance(balance / LAMPORTS_PER_SOL)
    } catch (error) {
      console.error("Error fetching balance:", error)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div>
      <div className="text-center mb-6">
        <h3 className="text-xl font-bold text-white mb-2">Wallet Balance</h3>
        <p className="text-gray-300 text-sm">Your current SOL balance</p>
      </div>

      <div className="text-center">
        {loading ? (
          <div className="flex items-center justify-center space-x-2">
            <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-purple-500"></div>
            <span className="text-gray-300">Loading...</span>
          </div>
        ) : (
          <div className="bg-gradient-to-r from-purple-500/20 to-pink-500/20 rounded-xl p-6 border border-purple-500/30">
            <div className="text-4xl font-bold text-white mb-2">{balance !== null ? balance.toFixed(4) : "0.0000"}</div>
            <div className="text-purple-300 font-medium">SOL</div>
            <button
              onClick={walletBalance}
              className="mt-4 text-sm text-purple-300 hover:text-purple-200 transition-colors duration-200"
            >
              Refresh Balance
            </button>
          </div>
        )}
      </div>
    </div>
  )
}

export default ShowSolBalance
