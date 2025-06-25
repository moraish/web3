import { useMemo, useRef } from 'react';
import { ConnectionProvider, WalletProvider, useWallet } from '@solana/wallet-adapter-react';
import { WalletAdapterNetwork } from '@solana/wallet-adapter-base';
import {
  WalletModalProvider,
  WalletMultiButton
} from '@solana/wallet-adapter-react-ui';
import { clusterApiUrl, LAMPORTS_PER_SOL } from '@solana/web3.js';
import { useConnection } from '@solana/wallet-adapter-react';
import { useState, useEffect, useCallback } from 'react';

import Airdrop from './Airdrop';

// Default styles that can be overridden by your app
import '@solana/wallet-adapter-react-ui/styles.css';

function WalletInfo() {
  const { publicKey } = useWallet();
  const { connection } = useConnection();
  const [balance, setBalance] = useState<number | null>(null);
  const network = WalletAdapterNetwork.Devnet;

  const getBalance = useCallback(async () => {
    if (!publicKey) {
      setBalance(null);
      return;
    }

    try {
      const balance = await connection.getBalance(publicKey);
      setBalance(balance / LAMPORTS_PER_SOL);
    } catch (error) {
      console.error('Error fetching balance:', error);
      setBalance(null);
    }
  }, [publicKey, connection]);

  useEffect(() => {
    getBalance();
    const interval = setInterval(getBalance, 10000); // Update every 10 seconds

    return () => clearInterval(interval);
  }, [getBalance]);

  // Expose getBalance function globally for the airdrop component
  (window as any).refreshBalance = getBalance;

  return (
    <div className="flex items-center space-x-4">
      {/* Network Pill */}
      <div className="px-3 py-1 bg-purple-500/20 border border-purple-500/30 rounded-full">
        <span className="text-xs font-medium text-purple-300">
          {network === WalletAdapterNetwork.Devnet && 'Devnet'}
        </span>
      </div>

      {/* Balance Display */}
      {publicKey && balance !== null && (
        <div className="px-3 py-1 bg-green-500/20 border border-green-500/30 rounded-full">
          <span className="text-xs font-medium text-green-300">
            {balance.toFixed(4)} SOL
          </span>
        </div>
      )}

      {/* Wallet Connect Button */}
      <WalletMultiButton className="!bg-gradient-to-r !from-purple-600 !to-pink-600 hover:!from-purple-700 hover:!to-pink-700 !border-0 !rounded-lg !px-4 !py-2 !text-white !font-medium !shadow-lg hover:!shadow-xl !transition-all !duration-200" />
    </div>
  );
}

function App() {
  // You can use 'devnet', 'testnet', or 'mainnet-beta'
  const network = WalletAdapterNetwork.Devnet;
  const endpoint = useMemo(() => clusterApiUrl(network), [network]);

  return (
    <ConnectionProvider endpoint={endpoint}>
      <WalletProvider wallets={[]} autoConnect>
        <WalletModalProvider>
          <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 flex flex-col">
            {/* Header/Toolbar */}
            <header className="bg-black/20 backdrop-blur-md border-b border-purple-500/20">
              <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex justify-between items-center h-16">
                  {/* Logo and Title */}
                  <div className="flex items-center space-x-3">
                    <div className="w-10 h-10 bg-gradient-to-r from-purple-500 to-pink-500 rounded-xl flex items-center justify-center shadow-lg">
                      <span className="text-white text-xl font-bold">⚡</span>
                    </div>
                    <div>
                      <h1 className="text-xl font-bold bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
                        AeroDrop
                      </h1>
                      <p className="text-xs text-gray-400">Decentralized Token Distribution</p>
                    </div>
                  </div>

                  {/* Wallet Info */}
                  <WalletInfo />
                </div>
              </div>
            </header>

            {/* Main Content */}
            <main className="flex-1 flex items-center justify-center p-4">
              <div className="w-full max-w-2xl">
                <Airdrop onAirdropComplete={() => {
                  // Trigger balance refresh after airdrop
                  setTimeout(() => {
                    if ((window as any).refreshBalance) {
                      (window as any).refreshBalance();
                    }
                  }, 1000); // Small delay to ensure transaction is confirmed
                }} />
              </div>
            </main>

            {/* Footer */}
            <footer className="bg-black/20 backdrop-blur-md border-t border-purple-500/20">
              <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
                <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
                  <div className="flex items-center space-x-2">
                    <div className="w-6 h-6 bg-gradient-to-r from-purple-500 to-pink-500 rounded-lg flex items-center justify-center">
                      <span className="text-white text-xs font-bold">⚡</span>
                    </div>
                    <span className="text-gray-400 text-sm">Powered by Solana</span>
                  </div>

                  <div className="flex items-center space-x-2">
                    <span className="text-gray-400 text-sm">Built by</span>
                    <a
                      href="https://github.com/moraish"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-purple-400 hover:text-pink-400 transition-colors duration-200 font-medium"
                    >
                      @moraish
                    </a>
                  </div>

                  <div className="text-xs text-gray-500">
                    © {new Date().getFullYear()} AeroDrop. Built with ❤️ for the Solana ecosystem
                  </div>
                </div>
              </div>
            </footer>
          </div>
        </WalletModalProvider>
      </WalletProvider>
    </ConnectionProvider>
  )
}

export default App
