export default function MintPage() {
    return (
        <div className="min-h-screen bg-slate-900 flex items-center justify-center p-6">
            <div className="w-full max-w-2xl">
                <div className="bg-slate-800/50 border border-slate-700 rounded-xl p-8">
                    <div className="text-center mb-8">
                        <div className="w-12 h-12 bg-gradient-to-br from-orange-500 to-red-600 rounded-xl flex items-center justify-center mx-auto mb-4">
                            <span className="text-white text-xl">🏭</span>
                        </div>
                        <h2 className="text-2xl font-semibold text-slate-100 mb-2">
                            Mint Token
                        </h2>
                        <p className="text-slate-400 text-sm">Mint tokens to your wallet or other addresses</p>
                    </div>

                    <div className="text-center">
                        <div className="bg-slate-700/30 border border-slate-600 rounded-lg p-6">
                            <p className="text-slate-300 mb-4">Token minting feature coming soon!</p>
                            <p className="text-slate-400 text-sm">
                                This feature will allow you to mint tokens to any wallet address.
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
} 