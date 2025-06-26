import { useState } from "react";

interface WalletInfo {
    index: number;
    publicKey: string;
    privateKey: string;
}

interface DerivedWalletsDisplayProps {
    derivedWallets: WalletInfo[];
}

export default function DerivedWalletsDisplay({ derivedWallets }: DerivedWalletsDisplayProps) {
    const [showPrivateKeys, setShowPrivateKeys] = useState<boolean>(false);

    // Copy to clipboard
    const copyToClipboard = (text: string) => {
        navigator.clipboard.writeText(text);
        // You could add a toast notification here
    };

    return (
        <div className="bg-slate-800/50 border border-slate-700 rounded-xl p-6">
            <div className="flex justify-between items-center mb-4">
                <h2 className="text-xl font-semibold text-slate-100 flex items-center gap-2">
                    <span>💰</span>
                    Derived Wallets
                </h2>
                <button
                    onClick={() => setShowPrivateKeys(!showPrivateKeys)}
                    className="bg-amber-600 hover:bg-amber-700 text-white font-medium py-2 px-4 rounded-lg transition-colors duration-200 text-sm"
                >
                    {showPrivateKeys ? "🔒 Hide" : "🔓 Show"} Private Keys
                </button>
            </div>

            <div className="space-y-4 max-h-96 overflow-y-auto">
                {derivedWallets.map((wallet) => (
                    <div key={wallet.index} className="bg-slate-900/50 border border-slate-600 rounded-lg p-4">
                        <div className="flex justify-between items-start mb-3">
                            <h3 className="text-lg font-semibold text-slate-100">
                                Wallet #{wallet.index + 1}
                            </h3>
                            <span className="text-slate-400 text-sm bg-slate-800 px-2 py-1 rounded">
                                Index: {wallet.index}
                            </span>
                        </div>

                        <div className="space-y-3">
                            <div>
                                <label className="text-slate-300 text-sm font-medium">Public Key:</label>
                                <div className="flex items-center gap-2 mt-1">
                                    <p className="text-emerald-300 font-mono text-sm break-all bg-slate-800 px-2 py-1 rounded flex-1">
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
                                        <p className="text-red-300 font-mono text-sm break-all bg-slate-800 px-2 py-1 rounded flex-1">
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
    );
} 