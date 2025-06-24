"use client"

import { useConnection, useWallet } from "@solana/wallet-adapter-react"
import { ed25519 } from "@noble/curves/ed25519"

const SignMessage = () => {
  const wallet = useWallet()
  const connection = useConnection()

  if (!wallet.publicKey || !connection) {
    return (
      <div className="text-center py-8">
        <div className="text-gray-400 mb-4">
          <svg className="w-16 h-16 mx-auto mb-4 opacity-50" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z"
            />
          </svg>
        </div>
        <p className="text-gray-400">Connect your wallet to sign messages</p>
      </div>
    )
  }

  async function singMessage() {
    const message = document.getElementById("message").value
    console.log("message is: ", message)
    const encodedMessage = new TextEncoder().encode(message)
    console.log("encoded message is: ", encodedMessage)
    const signature = await wallet.signMessage(encodedMessage)
    if (!ed25519.verify(signature, encodedMessage, wallet.publicKey.toBytes())) {
      alert("invalid signature")
      return
    }
    console.log("successfully signed the message: ", signature)
  }

  return (
    <div>
      <div className="text-center mb-6">
        <h3 className="text-xl font-bold text-white mb-2">Sign Message</h3>
        <p className="text-gray-300 text-sm">Cryptographically sign a message</p>
      </div>

      <div className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-300 mb-2">Message to Sign</label>
          <textarea
            id="message"
            placeholder="Enter your message here..."
            rows="4"
            className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-200 resize-none"
          />
        </div>

        <button
          onClick={singMessage}
          className="w-full bg-gradient-to-r from-orange-500 to-red-500 hover:from-orange-600 hover:to-red-600 text-white font-semibold py-3 px-6 rounded-xl transition-all duration-200 transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-orange-500 focus:ring-offset-2 focus:ring-offset-transparent"
        >
          Sign Message
        </button>
      </div>
    </div>
  )
}

export default SignMessage
