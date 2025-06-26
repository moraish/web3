import { Link } from 'react-router-dom';
import SolanaLogo from '../assets/solana.svg';

const features = [
    {
        title: 'Create Wallet',
        description: 'Generate secure Solana wallets with seed phrases and derived accounts',
        icon: '🔐',
        path: '/wallet',
        color: 'from-blue-500 to-cyan-500'
    },
    {
        title: 'Token Airdrop',
        description: 'Get SOL tokens on Solana Devnet for testing and development',
        icon: '🪂',
        path: '/airdrop',
        color: 'from-purple-500 to-pink-500'
    },
    {
        title: 'Create Token',
        description: 'Deploy your own SPL tokens on the Solana blockchain',
        icon: '🪙',
        path: '/token',
        color: 'from-emerald-500 to-teal-500'
    },
    {
        title: 'Mint Token',
        description: 'Mint tokens to your wallet or other addresses',
        icon: '🏭',
        path: '/mint',
        color: 'from-orange-500 to-red-500'
    },
    {
        title: 'Send Transaction',
        description: 'Send SOL and tokens to other wallets securely',
        icon: '📤',
        path: '/send',
        color: 'from-indigo-500 to-purple-500'
    },
    {
        title: 'Sign Message',
        description: 'Sign messages with your wallet for authentication',
        icon: '✍️',
        path: '/sign',
        color: 'from-green-500 to-emerald-500'
    }
];

export default function LandingPage() {
    return (
        <div className="min-h-screen bg-slate-900">
            {/* Hero Section */}
            <section className="relative overflow-hidden">
                <div className="max-w-7xl mx-auto px-6 py-24">
                    <div className="text-center">
                        <div className="flex justify-center mb-8">
                            <div className="w-20 h-20 bg-gradient-to-br from-blue-500 to-purple-600 rounded-2xl flex items-center justify-center">
                                <img src={SolanaLogo} alt="Solana" className="w-12 h-12" />
                            </div>
                        </div>

                        <h1 className="text-5xl md:text-6xl font-bold text-slate-100 mb-6">
                            Welcome to{' '}
                            <span className="bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
                                CryptoSage
                            </span>
                        </h1>

                        <p className="text-xl text-slate-400 mb-8 max-w-3xl mx-auto">
                            Your comprehensive Solana development suite. Create wallets, deploy tokens,
                            send transactions, and build the future of decentralized applications.
                        </p>

                        <div className="flex flex-col sm:flex-row gap-4 justify-center">
                            <Link
                                to="/airdrop"
                                className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white font-semibold py-3 px-8 rounded-lg transition-all duration-200 transform hover:scale-105"
                            >
                                Get Started
                            </Link>
                            <Link
                                to="/wallet"
                                className="bg-slate-800 hover:bg-slate-700 text-slate-200 font-semibold py-3 px-8 rounded-lg transition-colors duration-200"
                            >
                                Create Wallet
                            </Link>
                        </div>
                    </div>
                </div>
            </section>

            {/* Features Section */}
            <section className="py-24 bg-slate-800/30">
                <div className="max-w-7xl mx-auto px-6">
                    <div className="text-center mb-16">
                        <h2 className="text-3xl md:text-4xl font-bold text-slate-100 mb-4">
                            Everything You Need
                        </h2>
                        <p className="text-lg text-slate-400 max-w-2xl mx-auto">
                            Complete toolkit for Solana development and blockchain interactions
                        </p>
                    </div>

                    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {features.map((feature, index) => (
                            <Link
                                key={index}
                                to={feature.path}
                                className="group bg-slate-800/50 border border-slate-700 rounded-xl p-6 hover:border-slate-600 transition-all duration-200 hover:transform hover:scale-105"
                            >
                                <div className={`w-12 h-12 bg-gradient-to-r ${feature.color} rounded-lg flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-200`}>
                                    <span className="text-2xl">{feature.icon}</span>
                                </div>
                                <h3 className="text-xl font-semibold text-slate-100 mb-2">
                                    {feature.title}
                                </h3>
                                <p className="text-slate-400 text-sm leading-relaxed">
                                    {feature.description}
                                </p>
                            </Link>
                        ))}
                    </div>
                </div>
            </section>

            {/* Stats Section */}
            <section className="py-24">
                <div className="max-w-7xl mx-auto px-6">
                    <div className="grid md:grid-cols-3 gap-8 text-center">
                        <div>
                            <div className="text-4xl font-bold text-slate-100 mb-2">6</div>
                            <div className="text-slate-400">Core Features</div>
                        </div>
                        <div>
                            <div className="text-4xl font-bold text-slate-100 mb-2">100%</div>
                            <div className="text-slate-400">Open Source</div>
                        </div>
                        <div>
                            <div className="text-4xl font-bold text-slate-100 mb-2">∞</div>
                            <div className="text-slate-400">Possibilities</div>
                        </div>
                    </div>
                </div>
            </section>

            {/* CTA Section */}
            <section className="py-24 bg-slate-800/30">
                <div className="max-w-4xl mx-auto px-6 text-center">
                    <h2 className="text-3xl md:text-4xl font-bold text-slate-100 mb-4">
                        Ready to Build?
                    </h2>
                    <p className="text-lg text-slate-400 mb-8">
                        Start your Solana development journey today with CryptoSage
                    </p>
                    <Link
                        to="/airdrop"
                        className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white font-semibold py-4 px-8 rounded-lg transition-all duration-200 transform hover:scale-105 inline-block"
                    >
                        Start Building Now
                    </Link>
                </div>
            </section>
        </div>
    );
} 