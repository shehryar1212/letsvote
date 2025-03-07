
import Navbar from "@/components/Navbar";
import LeaderGrid from "@/components/LeaderGrid";
import { WalletProvider } from "@/hooks/useWallet";

const Index = () => {
  return (
    <WalletProvider>
      <div className="min-h-screen bg-gray-900 text-gray-100">
        <Navbar />
        
        <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-24 pb-16">
          <div className="text-center mb-16 mt-10 animate-fade-in">
            <h1 className="text-4xl md:text-5xl font-bold mb-4">Vote Your OGs</h1>
            <p className="text-xl text-gray-400 max-w-2xl mx-auto">
              Vote for your favorite crypto leaders on the Monad blockchain testnet.
              Each vote costs 0.0001 MON.
            </p>
          </div>
          
          <LeaderGrid />
        </main>
      </div>
    </WalletProvider>
  );
};

export default Index;
