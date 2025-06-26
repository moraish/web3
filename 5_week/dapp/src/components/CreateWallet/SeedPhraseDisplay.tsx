import { useState } from "react";

interface SeedPhraseDisplayProps {
    seedPhrase: string;
}

export default function SeedPhraseDisplay({ seedPhrase }: SeedPhraseDisplayProps) {
    const [showSeedPhrase, setShowSeedPhrase] = useState<boolean>(false);

    // Copy to clipboard
    const copyToClipboard = (text: string) => {
        navigator.clipboard.writeText(text);
        // You could add a toast notification here
    };

    // Split seed phrase into words
    const seedPhraseWords = seedPhrase ? seedPhrase.split(' ') : [];
    const wordCount = seedPhraseWords.length;

    return (
        <div className="bg-slate-800/50 border border-slate-700 rounded-xl p-6">
            <div className="flex justify-between items-center mb-4">
                <h2 className="text-xl font-semibold text-slate-100 flex items-center gap-2">
                    <span>🌱</span>
                    Seed Phrase ({wordCount} words)
                </h2>
                <div className="flex items-center gap-2">
                    <button
                        onClick={() => setShowSeedPhrase(!showSeedPhrase)}
                        className="bg-slate-700 hover:bg-slate-600 text-slate-200 p-2 rounded-lg transition-colors duration-200"
                        title={showSeedPhrase ? "Hide seed phrase" : "Show seed phrase"}
                    >
                        {showSeedPhrase ? (
                            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.878 9.878L3 3m6.878 6.878L21 21" />
                            </svg>
                        ) : (
                            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                            </svg>
                        )}
                    </button>
                    <button
                        onClick={() => copyToClipboard(seedPhrase)}
                        className="bg-emerald-600 hover:bg-emerald-700 text-white px-3 py-2 rounded-lg transition-colors duration-200 text-sm font-medium"
                    >
                        Copy All
                    </button>
                </div>
            </div>

            {showSeedPhrase ? (
                <div className="bg-slate-900/50 border border-slate-600 rounded-lg p-4 mb-4">
                    <div className={`grid ${wordCount === 12 ? 'grid-cols-3' : 'grid-cols-4'} gap-2`}>
                        {seedPhraseWords.map((word, index) => (
                            <div
                                key={index}
                                className="bg-slate-800 border border-slate-600 rounded-lg px-3 py-2 text-center"
                            >
                                <span className="text-slate-400 text-xs font-mono mr-1">
                                    {String(index + 1).padStart(2, '0')}
                                </span>
                                <span className="text-emerald-300 font-medium text-sm">
                                    {word}
                                </span>
                            </div>
                        ))}
                    </div>
                </div>
            ) : (
                <div className="bg-slate-900/50 border border-slate-600 rounded-lg p-4 mb-4">
                    <div className={`grid ${wordCount === 12 ? 'grid-cols-3' : 'grid-cols-4'} gap-2`}>
                        {Array.from({ length: wordCount }, (_, index) => (
                            <div
                                key={index}
                                className="bg-slate-800 border border-slate-600 rounded-lg px-3 py-2 text-center"
                            >
                                <span className="text-slate-400 text-xs font-mono mr-1">
                                    {String(index + 1).padStart(2, '0')}
                                </span>
                                <span className="text-slate-600 font-medium text-sm">
                                    ••••••••
                                </span>
                            </div>
                        ))}
                    </div>
                </div>
            )}

            <div className="bg-amber-500/10 border border-amber-500/30 rounded-lg p-3">
                <p className="text-amber-200 text-sm">
                    <strong>Important:</strong> Write down these {wordCount} words in order and store them securely.
                    Anyone with access to this phrase can control your wallet.
                </p>
            </div>
        </div>
    );
} 