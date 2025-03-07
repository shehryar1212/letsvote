
import { useState, useEffect } from "react";
import { Leader } from "@/lib/leader-data";
import { useWallet } from "@/hooks/useWallet";
import { ChevronUp, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import { cn } from "@/lib/utils";

interface LeaderCardProps {
  leader: Leader;
  onVote?: (leaderId: number) => void;
  rank: number;
}

const LeaderCard = ({ leader, onVote, rank }: LeaderCardProps) => {
  const { isConnected, wallet } = useWallet();
  const [imageLoaded, setImageLoaded] = useState(false);
  const [isVoting, setIsVoting] = useState(false);

  const handleVote = async () => {
    if (!isConnected) {
      toast.error("Wallet not connected", {
        description: "Please connect your wallet to vote."
      });
      return;
    }

    if (wallet.chainId !== '0x1252') {
      toast.error("Wrong network", {
        description: "Please switch to Monad Testnet to vote."
      });
      return;
    }

    setIsVoting(true);
    try {
      // Simulate a transaction delay
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      // In Phase 2, this will be replaced with actual blockchain transaction
      if (onVote) {
        onVote(leader.id);
      }
      
      toast.success("Vote successful!", {
        description: `You voted for ${leader.name}`
      });
    } catch (error) {
      console.error("Voting error:", error);
      toast.error("Vote failed", {
        description: "There was an error processing your vote."
      });
    } finally {
      setIsVoting(false);
    }
  };

  const handleImageLoad = () => {
    setImageLoaded(true);
  };

  return (
    <div 
      className={cn(
        "relative rounded-xl overflow-hidden card-hover border",
        "transform transition-all duration-500 ease-out flex flex-col h-full",
        "dark:bg-gray-800/50 bg-white",
        rank <= 3 ? "shadow-md" : "shadow-sm"
      )}
    >
      {/* Country flag badge */}
      <div className="absolute top-2 right-2 z-10">
        <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-white/90 backdrop-blur-sm text-gray-800 border">
          <img 
            src={`https://flagcdn.com/w20/${leader.countryCode.toLowerCase()}.png`} 
            alt={leader.country} 
            className="w-4 h-auto mr-1" 
          />
          {leader.name}
        </span>
      </div>
      
      {/* Rank badge for top 3 */}
      {rank <= 3 && (
        <div className="absolute top-2 left-2 z-10">
          <span className={cn(
            "flex items-center justify-center w-6 h-6 rounded-full text-xs font-bold text-white",
            rank === 1 ? "bg-yellow-500" : 
            rank === 2 ? "bg-gray-400" : 
            "bg-amber-700"
          )}>
            #{rank}
          </span>
        </div>
      )}

      {/* Image with shimmer effect while loading */}
      <div className="relative aspect-[3/4] overflow-hidden bg-gray-100">
        {!imageLoaded && (
          <div className="absolute inset-0 shimmer" />
        )}
        <img 
          src={`${leader.image}?auto=format&w=500&q=80`}
          alt={leader.name}
          className={cn(
            "w-full h-full object-cover lazy-image",
            imageLoaded ? "loaded" : ""
          )}
          onLoad={handleImageLoad}
        />
      </div>

      <div className="p-4 flex flex-col flex-grow">
        <div className="flex items-center justify-between mb-2">
          <h3 className="text-lg font-semibold">{leader.name}</h3>
        </div>
        
        <div className="flex items-center text-sm text-gray-500 mb-3">
          <img 
            src={`https://flagcdn.com/w20/${leader.countryCode.toLowerCase()}.png`} 
            alt={leader.country} 
            className="w-4 h-auto mr-1.5" 
          />
          <span>{leader.country}</span>
        </div>
        
        <div className="flex items-center mt-auto pt-2 border-t">
          <div className="text-sm font-medium flex items-center">
            <span className="text-gray-600 mr-1">Votes:</span>
            <span className="font-bold">{leader.votes.toLocaleString()}</span>
          </div>
          
          <Button 
            size="sm" 
            className="ml-auto"
            onClick={handleVote}
            disabled={isVoting || !isConnected}
          >
            {isVoting ? (
              <Loader2 className="h-4 w-4 mr-1 animate-spin" />
            ) : (
              <ChevronUp className="h-4 w-4 mr-1" />
            )}
            Vote
          </Button>
        </div>
      </div>
    </div>
  );
};

export default LeaderCard;
