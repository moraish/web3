import { useState } from "react";
import { WalletService } from "./walletService";

interface SeedPhraseGeneratorProps {
    onSeedPhraseGenerated: (seedPhrase: string) => void;
}

export default function SeedPhraseGenerator({ onSeedPhraseGenerated }: SeedPhraseGeneratorProps) {
    const [isGenerating, setIsGenerating] = useState<boolean>(false);

    // Generate a new seed phrase
    const generateSeedPhrase = () => {
        try {
            setIsGenerating(true);

            const mnemonic = WalletService.generateSeedPhrase();
            onSeedPhraseGenerated(mnemonic);

        } catch (error) {
            console.error('Error generating seed phrase:', error);
            const errorMessage = error instanceof Error ? error.message : 'Unknown error occurred';
            alert(`Error generating seed phrase: ${errorMessage}. Please try again.`);
        } finally {
            setIsGenerating(false);
        }
    };

    return (
        <div className="bg-slate-800/50 border border-slate-700 rounded-xl p-6">
            <h2 className="text-xl font-semibold text-slate-100 mb-4 flex items-center gap-2">
                <span>🎲</span>
                Generate New Wallet
            </h2>
            <p className="text-slate-400 text-sm mb-4">
                Create a new seed phrase to generate your Solana wallet. This will create a 12 or 24-word mnemonic phrase.
            </p>
            <button
                onClick={generateSeedPhrase}
                disabled={isGenerating}
                className="w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 disabled:from-slate-600 disabled:to-slate-700 text-white font-medium py-3 px-6 rounded-lg transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:ring-offset-2 focus:ring-offset-slate-800 flex items-center justify-center gap-2"
            >
                {isGenerating ? (
                    <>
                        <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                        <span>Generating...</span>
                    </>
                ) : (
                    <>
                        <span>🎲</span>
                        <span>Generate New Seed Phrase</span>
                    </>
                )}
            </button>
        </div>
    );
} 