export default function SecurityWarning() {
    return (
        <div className="bg-red-500/10 border border-red-500/30 rounded-xl p-6 mb-8">
            <div className="flex items-start gap-4">
                <div className="w-8 h-8 bg-red-500/20 rounded-lg flex items-center justify-center flex-shrink-0 mt-1">
                    <span className="text-red-400 text-lg">⚠️</span>
                </div>
                <div>
                    <h3 className="text-lg font-semibold text-red-300 mb-2">
                        Critical Security Notice
                    </h3>
                    <ul className="text-red-200 space-y-2 text-sm">
                        <li>• <strong>We do NOT save your seed phrase</strong> - it's generated locally and you must save it yourself</li>
                        <li>• Never share your seed phrase or private keys with anyone</li>
                        <li>• Store your seed phrase securely offline (paper wallet, hardware wallet)</li>
                        <li>• This is for educational purposes - use at your own risk</li>
                        <li>• Consider using a hardware wallet for large amounts</li>
                    </ul>
                </div>
            </div>
        </div>
    );
} 