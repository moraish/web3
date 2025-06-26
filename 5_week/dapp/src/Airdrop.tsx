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
        <div className="w-full bg-slate-800/50 border border-slate-700 rounded-xl p-8">
            <div className="text-center mb-8">
                <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-purple-600 rounded-xl flex items-center justify-center mx-auto mb-4">
                    <span className="text-white text-xl">🪂</span>
                </div>
                <h2 className="text-2xl font-semibold text-slate-100 mb-2">
                    Token Airdrop
                </h2>
                <p className="text-slate-400 text-sm">Get SOL tokens on Solana Devnet</p>
            </div>

            <div className="space-y-6">
                <div>
                    <label htmlFor="amount" className="block text-sm font-medium text-slate-200 mb-2">
                        Amount (SOL)
                    </label>
                    <input
                        type="number"
                        id="amount"
                        value={amount}
                        onChange={(e) => setAmount(e.target.value)}
                        onKeyPress={handleKeyPress}
                        placeholder="Enter amount (max 2 SOL)"
                        className="w-full px-4 py-3 bg-slate-900/50 border border-slate-600 rounded-lg focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500 transition-all duration-200 outline-none text-slate-100 placeholder-slate-500"
                        disabled={isLoading}
                        step="0.1"
                        min="0"
                        max="2"
                    />
                </div>

                <button
                    onClick={handleAirdrop}
                    disabled={isLoading || !publicKey}
                    className="w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 disabled:from-slate-600 disabled:to-slate-700 text-white font-medium py-3 px-4 rounded-lg transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:ring-offset-2 focus:ring-offset-slate-800"
                >
                    <span className="flex items-center justify-center gap-2">
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
                    <div className={`p-4 rounded-lg border ${messageType === 'success'
                            ? 'bg-emerald-500/10 border-emerald-500/30 text-emerald-300'
                            : 'bg-red-500/10 border-red-500/30 text-red-300'
                        }`}>
                        <div className="flex items-start gap-3">
                            <div className={`w-5 h-5 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5 ${messageType === 'success'
                                    ? 'bg-emerald-500/20'
                                    : 'bg-red-500/20'
                                }`}>
                                <span className="text-xs">
                                    {messageType === 'success' ? '✓' : '✕'}
                                </span>
                            </div>
                            <div className="text-sm">
                                {message}
                            </div>
                        </div>
                    </div>
                )}
            </div>

            <div className="mt-6 p-4 bg-slate-700/30 rounded-lg border border-slate-600">
                <div className="flex items-start gap-3">
                    <div className="w-5 h-5 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                        <span className="text-white text-xs">ℹ</span>
                    </div>
                    <div className="text-xs text-slate-300">
                        <p className="font-medium text-slate-200 mb-1">Devnet Airdrop:</p>
                        <ul className="space-y-1 text-slate-400">
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