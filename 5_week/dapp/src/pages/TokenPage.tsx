export default function TokenPage() {
    return (
        <div className="min-h-screen bg-slate-900 flex items-center justify-center p-6">
            <div className="w-full max-w-2xl">
                <div className="bg-slate-800/50 border border-slate-700 rounded-xl p-8">
                    <div className="text-center mb-8">
                        <div className="w-12 h-12 bg-gradient-to-br from-emerald-500 to-teal-600 rounded-xl flex items-center justify-center mx-auto mb-4">
                            <span className="text-white text-xl">🪙</span>
                        </div>
                        <h2 className="text-2xl font-semibold text-slate-100 mb-2">
                            Create Token
                        </h2>
                        <p className="text-slate-400 text-sm">Deploy your own SPL tokens on the Solana blockchain</p>
                    </div>

                    <div className="text-center">
                        <div className="bg-slate-700/30 border border-slate-600 rounded-lg p-6">
                            <p className="text-slate-300 mb-4">Token creation feature coming soon!</p>
                            <p className="text-slate-400 text-sm">
                                This feature will allow you to create and deploy custom SPL tokens on Solana.
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
} 