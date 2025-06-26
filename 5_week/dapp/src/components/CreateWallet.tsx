import { Keypair } from "@solana/web3.js";
import { useState } from "react";
import * as bip39 from "bip39";
import { derivePath } from "ed25519-hd-key";
import bs58 from "bs58";

interface WalletInfo {
    index: number;
    publicKey: string;
    privateKey: string;
}

export default function CreateWallet() {
    const [seedPhrase, setSeedPhrase] = useState<string>("");
    const [derivedWallets, setDerivedWallets] = useState<WalletInfo[]>([]);
    const [walletCount, setWalletCount] = useState<number>(5);
    const [showPrivateKeys, setShowPrivateKeys] = useState<boolean>(false);

    // Generate a new seed phrase
    const generateSeedPhrase = () => {
        const mnemonic = bip39.generateMnemonic(256); // 24 words for extra security
        setSeedPhrase(mnemonic);
        deriveWalletsFromSeed(mnemonic, walletCount);
    };

    // Derive wallets from seed phrase
    const deriveWalletsFromSeed = (mnemonic: string, count: number) => {
        const seed = bip39.mnemonicToSeedSync(mnemonic);
        const wallets: WalletInfo[] = [];

        for (let i = 0; i < count; i++) {
            const path = `m/44'/501'/${i}'/0'`; // Solana derivation path
            const derivedSeed = derivePath(path, seed.toString('hex')).key;
            const keypair = Keypair.fromSeed(derivedSeed);

            wallets.push({
                index: i,
                publicKey: keypair.publicKey.toString(),
                privateKey: bs58.encode(keypair.secretKey)
            });
        }

        setDerivedWallets(wallets);
    };

    // Handle wallet count change
    const handleWalletCountChange = (count: number) => {
        setWalletCount(count);
        if (seedPhrase) {
            deriveWalletsFromSeed(seedPhrase, count);
        }
    };

    // Copy to clipboard
    const copyToClipboard = (text: string) => {
        navigator.clipboard.writeText(text);
        // You could add a toast notification here
    };

    return (
        <div className="min-h-screen bg-slate-900 p-6">
            <div className="max-w-4xl mx-auto">
                <div className="bg-slate-800/50 border border-slate-700 rounded-xl p-8">
                    <div className="text-center mb-8">
                        <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-purple-600 rounded-xl flex items-center justify-center mx-auto mb-4">
                            <span className="text-white text-xl">🚀</span>
                        </div>
                        <h1 className="text-3xl font-semibold text-slate-100 mb-2">
                            Solana Wallet Creator
                        </h1>
                        <p className="text-slate-400 text-sm">Generate and manage Solana wallets securely</p>
                    </div>

                    {/* Generate New Wallet Section */}
                    <div className="mb-8">
                        <div className="bg-slate-700/30 border border-slate-600 rounded-lg p-6">
                            <h2 className="text-xl font-semibold text-slate-100 mb-4">
                                Generate New Wallet
                            </h2>
                            <button
                                onClick={generateSeedPhrase}
                                className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white font-medium py-3 px-6 rounded-lg transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:ring-offset-2 focus:ring-offset-slate-800"
                            >
                                Generate New Seed Phrase
                            </button>
                        </div>
                    </div>

                    {/* Seed Phrase Display */}
                    {seedPhrase && (
                        <div className="mb-8">
                            <div className="bg-slate-700/30 border border-slate-600 rounded-lg p-6">
                                <h2 className="text-xl font-semibold text-slate-100 mb-4">
                                    Seed Phrase (Keep This Safe!)
                                </h2>
                                <div className="bg-slate-900/50 border border-slate-600 rounded-lg p-4 mb-4">
                                    <p className="text-emerald-300 font-mono text-sm leading-relaxed">
                                        {seedPhrase}
                                    </p>
                                </div>
                                <button
                                    onClick={() => copyToClipboard(seedPhrase)}
                                    className="bg-emerald-600 hover:bg-emerald-700 text-white font-medium py-2 px-4 rounded-lg transition-colors duration-200"
                                >
                                    Copy Seed Phrase
                                </button>
                            </div>
                        </div>
                    )}

                    {/* Wallet Count Selector */}
                    {seedPhrase && (
                        <div className="mb-8">
                            <div className="bg-slate-700/30 border border-slate-600 rounded-lg p-6">
                                <h2 className="text-xl font-semibold text-slate-100 mb-4">
                                    Number of Wallets to Derive
                                </h2>
                                <div className="flex items-center gap-4">
                                    <input
                                        type="range"
                                        min="1"
                                        max="20"
                                        value={walletCount}
                                        onChange={(e) => handleWalletCountChange(parseInt(e.target.value))}
                                        className="flex-1 h-2 bg-slate-600 rounded-lg appearance-none cursor-pointer"
                                    />
                                    <span className="text-slate-100 font-semibold text-lg min-w-[3rem]">
                                        {walletCount}
                                    </span>
                                </div>
                            </div>
                        </div>
                    )}

                    {/* Derived Wallets Display */}
                    {derivedWallets.length > 0 && (
                        <div className="mb-8">
                            <div className="bg-slate-700/30 border border-slate-600 rounded-lg p-6">
                                <div className="flex justify-between items-center mb-4">
                                    <h2 className="text-xl font-semibold text-slate-100">
                                        Derived Wallets
                                    </h2>
                                    <button
                                        onClick={() => setShowPrivateKeys(!showPrivateKeys)}
                                        className="bg-amber-600 hover:bg-amber-700 text-white font-medium py-2 px-4 rounded-lg transition-colors duration-200"
                                    >
                                        {showPrivateKeys ? "Hide" : "Show"} Private Keys
                                    </button>
                                </div>

                                <div className="grid gap-4">
                                    {derivedWallets.map((wallet) => (
                                        <div key={wallet.index} className="bg-slate-900/50 border border-slate-600 rounded-lg p-4">
                                            <div className="flex justify-between items-start mb-3">
                                                <h3 className="text-lg font-semibold text-slate-100">
                                                    Wallet #{wallet.index + 1}
                                                </h3>
                                                <span className="text-slate-400 text-sm">
                                                    Index: {wallet.index}
                                                </span>
                                            </div>

                                            <div className="space-y-3">
                                                <div>
                                                    <label className="text-slate-300 text-sm font-medium">Public Key:</label>
                                                    <div className="flex items-center gap-2 mt-1">
                                                        <p className="text-emerald-300 font-mono text-sm break-all">
                                                            {wallet.publicKey}
                                                        </p>
                                                        <button
                                                            onClick={() => copyToClipboard(wallet.publicKey)}
                                                            className="bg-blue-600 hover:bg-blue-700 text-white text-xs px-2 py-1 rounded transition-colors duration-200"
                                                        >
                                                            Copy
                                                        </button>
                                                    </div>
                                                </div>

                                                {showPrivateKeys && (
                                                    <div>
                                                        <label className="text-slate-300 text-sm font-medium">Private Key:</label>
                                                        <div className="flex items-center gap-2 mt-1">
                                                            <p className="text-red-300 font-mono text-sm break-all">
                                                                {wallet.privateKey}
                                                            </p>
                                                            <button
                                                                onClick={() => copyToClipboard(wallet.privateKey)}
                                                                className="bg-red-600 hover:bg-red-700 text-white text-xs px-2 py-1 rounded transition-colors duration-200"
                                                            >
                                                                Copy
                                                            </button>
                                                        </div>
                                                    </div>
                                                )}
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>
                    )}

                    {/* Security Warning */}
                    <div className="bg-red-500/10 border border-red-500/30 rounded-lg p-6">
                        <h3 className="text-lg font-semibold text-red-300 mb-3">
                            Security Warning
                        </h3>
                        <ul className="text-red-200 space-y-1 text-sm">
                            <li>• Never share your seed phrase or private keys with anyone</li>
                            <li>• Store your seed phrase securely offline (paper wallet, hardware wallet)</li>
                            <li>• This is for educational purposes - use at your own risk</li>
                            <li>• Consider using a hardware wallet for large amounts</li>
                        </ul>
                    </div>
                </div>
            </div>
        </div>
    );
}