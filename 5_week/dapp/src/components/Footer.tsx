import SolanaLogo from '../assets/solana.svg';

export default function Footer() {
    return (
        <footer className="border-t border-slate-800 bg-slate-900/95">
            <div className="max-w-7xl mx-auto px-6 py-4">
                <div className="flex flex-col sm:flex-row justify-between items-center gap-4">
                    <div className="flex items-center gap-2">
                        <div className="w-5 h-5 bg-gradient-to-br from-blue-500 to-purple-600 rounded flex items-center justify-center">
                            <img src={SolanaLogo} alt="Solana" className="w-3 h-3" />
                        </div>
                        <span className="text-sm text-slate-400">Powered by Solana</span>
                    </div>

                    <div className="flex items-center gap-2">
                        <span className="text-sm text-slate-400">Built by</span>
                        <a
                            href="https://github.com/moraish"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-sm text-slate-300 hover:text-white transition-colors duration-200 font-medium"
                        >
                            @moraish
                        </a>
                    </div>

                    <div className="text-xs text-slate-500">
                        © {new Date().getFullYear()} CryptoSage
                    </div>
                </div>
            </div>
        </footer>
    );
} 