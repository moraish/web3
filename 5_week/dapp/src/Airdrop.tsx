import { useState } from 'react';
import { useWallet } from '@solana/wallet-adapter-react';
import { useConnection } from '@solana/wallet-adapter-react';
import { LAMPORTS_PER_SOL, PublicKey } from '@solana/web3.js';

interface AirdropProps {
    onAirdropComplete?: () => void;
}

export default function Airdrop({ onAirdropComplete }: AirdropProps) {
    const [amount, setAmount] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [message, setMessage] = useState('');
    const [messageType, setMessageType] = useState<'success' | 'error' | ''>('');

    const { publicKey } = useWallet();
    const { connection } = useConnection();

    const handleAirdrop = async () => {
        if (!publicKey) {
            setMessage('Please connect your wallet first');
            setMessageType('error');
            return;
        }

        const solAmount = parseFloat(amount);
        if (isNaN(solAmount) || solAmount <= 0) {
            setMessage('Please enter a valid amount');
            setMessageType('error');
            return;
        }

        if (solAmount > 2) {
            setMessage('Maximum airdrop amount is 2 SOL');
            setMessageType('error');
            return;
        }

        setIsLoading(true);
        setMessage('');
        setMessageType('');

        try {
            const lamports = solAmount * LAMPORTS_PER_SOL;

            const signature = await connection.requestAirdrop(
                publicKey,
                lamports
            );

            // Wait for confirmation
            await connection.confirmTransaction(signature, 'confirmed');

            setMessage(`Successfully airdropped ${solAmount} SOL! Transaction: ${signature.slice(0, 8)}...`);
            setMessageType('success');
            setAmount('');

            // Trigger balance update in parent component
            if (onAirdropComplete) {
                onAirdropComplete();
            }
        } catch (error) {
            console.error('Airdrop error:', error);
            setMessage('Failed to airdrop. Please try again.');
            setMessageType('error');
        } finally {
            setIsLoading(false);
        }
    };

    const handleKeyPress = (e: React.KeyboardEvent) => {
        if (e.key === 'Enter' && !isLoading) {
            handleAirdrop();
        }
    };

    return (
        <div className="w-full max-w-md mx-auto p-8 bg-black/20 backdrop-blur-md rounded-2xl shadow-2xl border border-purple-500/20">
            <div className="text-center mb-8">
                <div className="w-16 h-16 bg-gradient-to-r from-purple-500 to-pink-500 rounded-2xl flex items-center justify-center mx-auto mb-4 shadow-lg">
                    <span className="text-white text-2xl">🪂</span>
                </div>
                <h2 className="text-3xl font-bold bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent mb-2">
                    Token Airdrop
                </h2>
                <p className="text-gray-300 text-sm">Get SOL tokens on Solana Devnet</p>
            </div>

            <div className="space-y-6">
                <div>
                    <label htmlFor="amount" className="block text-sm font-medium text-gray-300 mb-3">
                        Amount to Airdrop (SOL)
                    </label>
                    <input
                        type="number"
                        id="amount"
                        value={amount}
                        onChange={(e) => setAmount(e.target.value)}
                        onKeyPress={handleKeyPress}
                        placeholder="Enter amount (max 2 SOL)..."
                        className="w-full px-4 py-4 bg-black/30 border border-purple-500/30 rounded-xl focus:ring-2 focus:ring-purple-500/50 focus:border-purple-500/50 transition-all duration-200 outline-none text-white placeholder-gray-400 backdrop-blur-sm"
                        disabled={isLoading}
                        step="0.1"
                        min="0"
                        max="2"
                    />
                </div>

                <button
                    onClick={handleAirdrop}
                    disabled={isLoading || !publicKey}
                    className="w-full bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 disabled:from-gray-600 disabled:to-gray-700 text-white font-semibold py-4 px-6 rounded-xl transition-all duration-200 transform hover:scale-105 disabled:transform-none focus:outline-none focus:ring-2 focus:ring-purple-500/50 focus:ring-offset-2 focus:ring-offset-black/20 shadow-lg hover:shadow-xl hover:shadow-purple-500/25 disabled:shadow-none"
                >
                    <span className="flex items-center justify-center space-x-2">
                        {isLoading ? (
                            <>
                                <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                                <span>Processing...</span>
                            </>
                        ) : (
                            <>
                                <span>⚡</span>
                                <span>{publicKey ? 'Execute Airdrop' : 'Connect Wallet First'}</span>
                            </>
                        )}
                    </span>
                </button>

                {/* Message Display */}
                {message && (
                    <div className={`p-4 rounded-xl border ${messageType === 'success'
                        ? 'bg-green-500/10 border-green-500/30 text-green-300'
                        : 'bg-red-500/10 border-red-500/30 text-red-300'
                        }`}>
                        <div className="flex items-start space-x-3">
                            <div className={`w-5 h-5 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5 ${messageType === 'success'
                                ? 'bg-green-500/20'
                                : 'bg-red-500/20'
                                }`}>
                                <span className="text-xs">
                                    {messageType === 'success' ? '✅' : '❌'}
                                </span>
                            </div>
                            <div className="text-sm">
                                {message}
                            </div>
                        </div>
                    </div>
                )}
            </div>

            <div className="mt-6 p-4 bg-purple-500/10 rounded-xl border border-purple-500/20">
                <div className="flex items-start space-x-3">
                    <div className="w-5 h-5 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                        <span className="text-white text-xs">ℹ️</span>
                    </div>
                    <div className="text-xs text-gray-300">
                        <p className="font-medium text-purple-300 mb-1">Devnet Airdrop:</p>
                        <ul className="space-y-1 text-gray-400">
                            <li>• Maximum 2 SOL per request</li>
                            <li>• Only works on Solana Devnet</li>
                            <li>• Requires connected wallet</li>
                            <li>• Free tokens for testing</li>
                        </ul>
                    </div>
                </div>
            </div>
        </div>
    )
}