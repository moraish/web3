import { useWallet } from '@solana/wallet-adapter-react';
import { useConnection } from '@solana/wallet-adapter-react';
import { WalletModalProvider, WalletMultiButton } from '@solana/wallet-adapter-react-ui';
import { LAMPORTS_PER_SOL } from '@solana/web3.js';
import { useState, useEffect, useCallback, useRef } from 'react';
import { Link, useLocation } from 'react-router-dom';
import SolanaLogo from '../assets/solana.svg';

function WalletInfo() {
    const { publicKey } = useWallet();
    const { connection } = useConnection();
    const [balance, setBalance] = useState<number | null>(null);

    const getBalance = useCallback(async () => {
        if (!publicKey) {
            setBalance(null);
            return;
        }

        try {
            const balance = await connection.getBalance(publicKey);
            setBalance(balance / LAMPORTS_PER_SOL);
        } catch (error) {
            console.error('Error fetching balance:', error);
            setBalance(null);
        }
    }, [publicKey, connection]);

    useEffect(() => {
        getBalance();
        const interval = setInterval(getBalance, 10000); // Update every 10 seconds

        return () => clearInterval(interval);
    }, [getBalance]);

    // Expose getBalance function globally for the airdrop component
    (window as any).refreshBalance = getBalance;

    return (
        <div className="flex items-center gap-4">
            {/* Network Badge */}
            <div className="inline-flex items-center px-3 py-1.5 bg-slate-800/60 border border-slate-700 rounded-lg">
                <div className="w-2 h-2 bg-emerald-400 rounded-full mr-2"></div>
                <span className="text-sm font-medium text-slate-200">
                    Devnet
                </span>
            </div>

            {/* Balance Display */}
            {publicKey && balance !== null && (
                <div className="inline-flex items-center px-3 py-1.5 bg-slate-800/60 border border-slate-700 rounded-lg">
                    <span className="text-sm font-medium text-slate-200">
                        {balance.toFixed(4)} SOL
                    </span>
                </div>
            )}

            {/* Wallet Connect Button */}
            <WalletMultiButton className="!bg-slate-800 !border !border-slate-700 !rounded-lg !px-4 !py-2 !text-slate-200 !font-medium hover:!bg-slate-700 !transition-colors !duration-200" />
        </div>
    );
}

function ToolsDropdown() {
    const [isOpen, setIsOpen] = useState(false);
    const location = useLocation();
    const dropdownRef = useRef<HTMLDivElement>(null);

    const tools = [
        { path: '/airdrop', label: 'Token Airdrop', icon: '🪂' },
        { path: '/wallet', label: 'Create Wallet', icon: '🔐' },
        { path: '/token', label: 'Create Token', icon: '🪙' },
        { path: '/mint', label: 'Mint Token', icon: '🏭' },
        { path: '/send', label: 'Send Transaction', icon: '📤' },
        { path: '/sign', label: 'Sign Message', icon: '✍️' },
    ];

    // Close dropdown when clicking outside
    useEffect(() => {
        function handleClickOutside(event: MouseEvent) {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
                setIsOpen(false);
            }
        }

        document.addEventListener('mousedown', handleClickOutside);
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, []);

    return (
        <div className="relative" ref={dropdownRef}>
            <button
                onClick={() => setIsOpen(!isOpen)}
                className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors duration-200 flex items-center gap-2 ${tools.some(tool => location.pathname === tool.path)
                    ? 'bg-slate-800 text-slate-100'
                    : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/50'
                    }`}
            >
                <span>🛠️</span>
                <span>Tools</span>
                <svg
                    className={`w-4 h-4 transition-transform duration-200 ${isOpen ? 'rotate-180' : ''}`}
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
            </button>

            {/* Dropdown Menu */}
            {isOpen && (
                <div className="absolute top-full left-0 mt-2 w-64 bg-slate-800 border border-slate-700 rounded-lg shadow-xl z-50">
                    <div className="py-2">
                        {tools.map((tool) => (
                            <Link
                                key={tool.path}
                                to={tool.path}
                                onClick={() => setIsOpen(false)}
                                className={`flex items-center gap-3 px-4 py-3 text-sm transition-colors duration-200 ${location.pathname === tool.path
                                    ? 'bg-slate-700 text-slate-100'
                                    : 'text-slate-300 hover:bg-slate-700/50 hover:text-slate-100'
                                    }`}
                            >
                                <span className="text-lg">{tool.icon}</span>
                                <span>{tool.label}</span>
                            </Link>
                        ))}
                    </div>
                </div>
            )}
        </div>
    );
}

function MobileMenu() {
    const [isOpen, setIsOpen] = useState(false);
    const location = useLocation();
    const mobileMenuRef = useRef<HTMLDivElement>(null);

    const tools = [
        { path: '/airdrop', label: 'Token Airdrop', icon: '🪂' },
        { path: '/wallet', label: 'Create Wallet', icon: '🔐' },
        { path: '/token', label: 'Create Token', icon: '🪙' },
        { path: '/mint', label: 'Mint Token', icon: '🏭' },
        { path: '/send', label: 'Send Transaction', icon: '📤' },
        { path: '/sign', label: 'Sign Message', icon: '✍️' },
    ];

    // Close mobile menu when clicking outside
    useEffect(() => {
        function handleClickOutside(event: MouseEvent) {
            if (mobileMenuRef.current && !mobileMenuRef.current.contains(event.target as Node)) {
                setIsOpen(false);
            }
        }

        if (isOpen) {
            document.addEventListener('mousedown', handleClickOutside);
        }
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, [isOpen]);

    return (
        <div className="md:hidden relative" ref={mobileMenuRef}>
            <button
                onClick={() => setIsOpen(!isOpen)}
                className="p-2 text-slate-400 hover:text-slate-200 hover:bg-slate-800/50 rounded-lg transition-colors duration-200"
            >
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                </svg>
            </button>

            {/* Mobile Menu Overlay */}
            {isOpen && (
                <div className="absolute top-full left-0 right-0 bg-slate-800 border-b border-slate-700 shadow-xl z-50">
                    <div className="px-4 py-2 space-y-1">
                        <Link
                            to="/"
                            onClick={() => setIsOpen(false)}
                            className={`flex items-center gap-3 px-3 py-2 rounded-lg text-sm font-medium transition-colors duration-200 ${location.pathname === '/'
                                ? 'bg-slate-700 text-slate-100'
                                : 'text-slate-300 hover:bg-slate-700/50 hover:text-slate-100'
                                }`}
                        >
                            <span className="text-lg">🏠</span>
                            <span>Home</span>
                        </Link>
                        {tools.map((tool) => (
                            <Link
                                key={tool.path}
                                to={tool.path}
                                onClick={() => setIsOpen(false)}
                                className={`flex items-center gap-3 px-3 py-2 rounded-lg text-sm font-medium transition-colors duration-200 ${location.pathname === tool.path
                                    ? 'bg-slate-700 text-slate-100'
                                    : 'text-slate-300 hover:bg-slate-700/50 hover:text-slate-100'
                                    }`}
                            >
                                <span className="text-lg">{tool.icon}</span>
                                <span>{tool.label}</span>
                            </Link>
                        ))}
                    </div>
                </div>
            )}
        </div>
    );
}

export default function AppBar() {
    const location = useLocation();

    return (
        <header className="border-b border-slate-800 bg-slate-900/95 backdrop-blur-sm sticky top-0 z-50">
            <div className="max-w-7xl mx-auto px-6">
                <div className="flex justify-between items-center h-16">
                    {/* Logo and Title */}
                    <Link to="/" className="flex items-center gap-3 hover:opacity-80 transition-opacity">
                        <div className="w-8 h-8 bg-gradient-to-br from-blue-500 to-purple-600 rounded-lg flex items-center justify-center">
                            <img src={SolanaLogo} alt="Solana" className="w-5 h-5" />
                        </div>
                        <div>
                            <h1 className="text-lg font-semibold text-slate-100">
                                CryptoSage
                            </h1>
                        </div>
                    </Link>

                    {/* Desktop Navigation */}
                    <nav className="hidden md:flex items-center gap-1">
                        <Link
                            to="/"
                            className={`px-3 py-2 rounded-lg text-sm font-medium transition-colors duration-200 ${location.pathname === '/'
                                ? 'bg-slate-800 text-slate-100'
                                : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/50'
                                }`}
                        >
                            Home
                        </Link>
                        <ToolsDropdown />
                    </nav>

                    {/* Mobile Menu */}
                    <MobileMenu />

                    {/* Wallet Info */}
                    <WalletInfo />
                </div>
            </div>
        </header>
    );
} 