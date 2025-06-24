import { WalletMultiButton } from "@solana/wallet-adapter-react-ui"

export const ConnectWallet = () => {
  return (
    <div className="text-center">
      <h2 className="text-2xl font-bold text-white mb-4">Connect Your Wallet</h2>
      <p className="text-gray-300 mb-6">Connect your Solana wallet to get started</p>
      <div className="flex justify-center">
        <WalletMultiButton className="!bg-gradient-to-r !from-purple-500 !to-pink-500 hover:!from-purple-600 hover:!to-pink-600 !rounded-xl !font-semibold !px-8 !py-3 !text-white !border-0 !transition-all !duration-200 !transform hover:!scale-105" />
      </div>
    </div>
  )
}
