import { useMemo } from 'react';
import { ConnectionProvider, WalletProvider } from '@solana/wallet-adapter-react';
import { WalletAdapterNetwork } from '@solana/wallet-adapter-base';
import { WalletModalProvider } from '@solana/wallet-adapter-react-ui';
import { clusterApiUrl } from '@solana/web3.js';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

// Components
import AppBar from './components/AppBar';
import Footer from './components/Footer';

// Pages
import LandingPage from './pages/LandingPage';
import AirdropPage from './pages/AirdropPage';
import WalletPage from './pages/WalletPage';
import TokenPage from './pages/TokenPage';
import MintPage from './pages/MintPage';
import SendPage from './pages/SendPage';
import SignPage from './pages/SignPage';

// Default styles that can be overridden by your app
import '@solana/wallet-adapter-react-ui/styles.css';

function App() {
	// You can use 'devnet', 'testnet', or 'mainnet-beta'
	const network = WalletAdapterNetwork.Devnet;
	const endpoint = useMemo(() => clusterApiUrl(network), [network]);

	return (
		<ConnectionProvider endpoint={endpoint}>
			<WalletProvider wallets={[]} autoConnect>
				<WalletModalProvider>
					<Router>
						<div className="min-h-screen bg-slate-900 flex flex-col">
							<AppBar />

							<main className="flex-1">
								<Routes>
									<Route path="/" element={<LandingPage />} />
									<Route path="/airdrop" element={<AirdropPage />} />
									<Route path="/wallet" element={<WalletPage />} />
									<Route path="/token" element={<TokenPage />} />
									<Route path="/mint" element={<MintPage />} />
									<Route path="/send" element={<SendPage />} />
									<Route path="/sign" element={<SignPage />} />
								</Routes>
							</main>

							<Footer />
						</div>
					</Router>
				</WalletModalProvider>
			</WalletProvider>
		</ConnectionProvider>
	)
}

export default App