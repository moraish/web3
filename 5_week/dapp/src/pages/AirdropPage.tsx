import Airdrop from '../Airdrop';

export default function AirdropPage() {
    return (
        <div className="min-h-screen bg-slate-900 flex items-center justify-center p-6">
            <div className="w-full max-w-lg">
                <Airdrop onAirdropComplete={() => {
                    // Trigger balance refresh after airdrop
                    setTimeout(() => {
                        if ((window as any).refreshBalance) {
                            (window as any).refreshBalance();
                        }
                    }, 1000); // Small delay to ensure transaction is confirmed
                }} />
            </div>
        </div>
    );
} 