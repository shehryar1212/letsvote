
import { Button } from "@/components/ui/button";
import { useWallet } from "@/hooks/useWallet";
import { Wallet, Loader2 } from "lucide-react";
import { 
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger 
} from "@/components/ui/tooltip";

const WalletConnect = () => {
  const { wallet, connectWallet, disconnectWallet, connecting, isConnected } = useWallet();

  const formatAddress = (address: string) => {
    return `${address.slice(0, 6)}...${address.slice(-4)}`;
  };

  return (
    <div className="flex items-center space-x-2">
      {isConnected && wallet.balance && (
        <div className="hidden md:flex items-center mr-2">
          <div className="text-sm font-medium">
            <span className="text-xs bg-secondary py-1 px-2 rounded-full mr-2">
              {wallet.balance} MON
            </span>
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger asChild>
                  <span className="text-muted-foreground">
                    {formatAddress(wallet.address!)}
                  </span>
                </TooltipTrigger>
                <TooltipContent>
                  <p className="text-xs">{wallet.address}</p>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
          </div>
        </div>
      )}
      
      <Button
        onClick={isConnected ? disconnectWallet : connectWallet}
        variant={isConnected ? "outline" : "default"}
        size="sm"
        className="font-medium transition-all duration-300 hover:shadow-md"
        disabled={connecting}
      >
        {connecting ? (
          <Loader2 className="h-4 w-4 mr-2 animate-spin" />
        ) : (
          <Wallet className="h-4 w-4 mr-2" />
        )}
        {isConnected ? "Disconnect" : "Connect Wallet"}
      </Button>
    </div>
  );
};

export default WalletConnect;
