import { useState } from "react";
import {
    SeedPhraseGenerator,
    SeedPhraseDisplay,
    WalletCountSelector,
    DerivedWalletsDisplay,
    SecurityWarning,
    WalletService,
    type WalletInfo
} from "./index";

export default function CreateWallet() {
    const [seedPhrase, setSeedPhrase] = useState<string>("");
    const [derivedWallets, setDerivedWallets] = useState<WalletInfo[]>([]);
    const [walletCount, setWalletCount] = useState<number>(5);

    // Handle seed phrase generation - only generate seed phrase, not wallets
    const handleSeedPhraseGenerated = (newSeedPhrase: string) => {
        setSeedPhrase(newSeedPhrase);
        // Clear any existing derived wallets when generating new seed phrase
        setDerivedWallets([]);
    };

    // Derive wallets from seed phrase
    const deriveWalletsFromSeed = (mnemonic: string, count: number) => {
        try {
            const wallets = WalletService.deriveWalletsFromSeed(mnemonic, count);
            setDerivedWallets(wallets);
        } catch (error) {
            console.error('Error deriving wallets:', error);
            alert('Error deriving wallets from seed phrase. Please try again.');
        }
    };

    // Handle wallet count change
    const handleWalletCountChange = (count: number) => {
        setWalletCount(count);
    };

    // Handle generate wallets button click
    const handleGenerateWallets = () => {
        if (seedPhrase) {
            deriveWalletsFromSeed(seedPhrase, walletCount);
        }
    };

    return (
        <div className="min-h-screen bg-slate-900 p-6">
            <div className="max-w-5xl mx-auto">
                {/* Header Section */}
                <div className="text-center mb-8">
                    <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-purple-600 rounded-2xl flex items-center justify-center mx-auto mb-6">
                        <span className="text-white text-2xl">🔐</span>
                    </div>
                    <h1 className="text-4xl font-bold text-slate-100 mb-3">
                        Solana Wallet Creator
                    </h1>
                    <p className="text-lg text-slate-400 max-w-2xl mx-auto">
                        Generate secure Solana wallets with seed phrases and derived accounts.
                        Your keys are generated locally and never leave your device.
                    </p>
                </div>

                {/* Security Warning */}
                <SecurityWarning />

                <div className="grid lg:grid-cols-2 gap-8">
                    {/* Left Column - Seed Phrase Generation */}
                    <div className="space-y-6">
                        <SeedPhraseGenerator onSeedPhraseGenerated={handleSeedPhraseGenerated} />

                        {seedPhrase && (
                            <SeedPhraseDisplay seedPhrase={seedPhrase} />
                        )}
                    </div>

                    {/* Right Column - Wallet Management */}
                    <div className="space-y-6">
                        {seedPhrase && (
                            <WalletCountSelector
                                walletCount={walletCount}
                                onWalletCountChange={handleWalletCountChange}
                                onGenerateWallets={handleGenerateWallets}
                                hasWallets={derivedWallets.length > 0}
                            />
                        )}

                        {derivedWallets.length > 0 && (
                            <DerivedWalletsDisplay derivedWallets={derivedWallets} />
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
} 