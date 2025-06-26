import { Keypair } from "@solana/web3.js";
import * as bip39 from "bip39";
import { derivePath } from "ed25519-hd-key";
import bs58 from "bs58";

export interface WalletInfo {
    index: number;
    publicKey: string;
    privateKey: string;
}

export class WalletService {
    // Derive wallets from seed phrase
    static deriveWalletsFromSeed(mnemonic: string, count: number): WalletInfo[] {
        try {
            // Use mnemonicToSeed instead of mnemonicToSeedSync for better browser compatibility
            const seed = bip39.mnemonicToSeed(mnemonic);
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

            return wallets;
        } catch (error) {
            console.error('Error deriving wallets:', error);
            throw new Error('Error deriving wallets from seed phrase. Please try again.');
        }
    }

    // Generate a new seed phrase
    static generateSeedPhrase(): string {
        try {
            let mnemonic: string;
            try {
                // Try 256-bit first (24 words)
                mnemonic = bip39.generateMnemonic(256);
            } catch (error) {
                console.warn('256-bit generation failed, trying 128-bit:', error);
                // Fallback to 128-bit (12 words)
                mnemonic = bip39.generateMnemonic(128);
            }

            if (!mnemonic || mnemonic.split(' ').length < 12) {
                throw new Error('Failed to generate valid mnemonic');
            }

            return mnemonic;
        } catch (error) {
            console.error('Error generating seed phrase:', error);
            throw error;
        }
    }
} 