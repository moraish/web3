interface WalletCountSelectorProps {
    walletCount: number;
    onWalletCountChange: (count: number) => void;
    onGenerateWallets: () => void;
    hasWallets: boolean;
}

export default function WalletCountSelector({
    walletCount,
    onWalletCountChange,
    onGenerateWallets,
    hasWallets
}: WalletCountSelectorProps) {
    return (
        <div className="bg-slate-800/50 border border-slate-700 rounded-xl p-6">
            <h2 className="text-xl font-semibold text-slate-100 mb-4 flex items-center gap-2">
                <span>🔢</span>
                Derived Wallets
            </h2>
            <p className="text-slate-400 text-sm mb-4">
                Choose how many additional wallets to derive from your seed phrase.
            </p>
            <div className="space-y-4">
                <div className="flex items-center gap-4">
                    <input
                        type="range"
                        min="1"
                        max="20"
                        value={walletCount}
                        onChange={(e) => onWalletCountChange(parseInt(e.target.value))}
                        className="flex-1 h-2 bg-slate-600 rounded-lg appearance-none cursor-pointer"
                    />
                    <span className="text-slate-100 font-semibold text-lg min-w-[3rem] text-center">
                        {walletCount}
                    </span>
                </div>

                <button
                    onClick={onGenerateWallets}
                    className="w-full bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-700 hover:to-teal-700 text-white font-medium py-3 px-6 rounded-lg transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-emerald-500/50 focus:ring-offset-2 focus:ring-offset-slate-800 flex items-center justify-center gap-2"
                >
                    <span>🔑</span>
                    <span>{hasWallets ? 'Regenerate' : 'Generate'} {walletCount} Derived Wallets</span>
                </button>
            </div>
        </div>
    );
} 