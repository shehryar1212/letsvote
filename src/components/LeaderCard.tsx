
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
  
  // Fallback image if the provided one fails to load
  const [imageSrc, setImageSrc] = useState(leader.image);

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

  const handleImageError = () => {
    // If the image fails to load, use a fallback
    setImageSrc(`https://ui-avatars.com/api/?name=${encodeURIComponent(leader.name)}&background=random&size=256`);
    setImageLoaded(true);
  };

  return (
    <div 
      className={cn(
        "relative rounded-xl overflow-hidden card-hover border",
        "transform transition-all duration-500 ease-out flex flex-col h-full",
        "dark:bg-gray-800/50 bg-gray-900 border-gray-700",
        rank <= 3 ? "shadow-md" : "shadow-sm"
      )}
    >
      {/* Country flag badge */}
      <div className="absolute top-2 right-2 z-10">
        <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-gray-800/90 backdrop-blur-sm text-gray-100 border border-gray-700">
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
      <div className="relative aspect-[3/4] overflow-hidden bg-gray-800">
        {!imageLoaded && (
          <div className="absolute inset-0 shimmer" />
        )}
        <img 
          src={imageSrc}
          alt={leader.name}
          className={cn(
            "w-full h-full object-cover lazy-image",
            imageLoaded ? "loaded" : ""
          )}
          onLoad={handleImageLoad}
          onError={handleImageError}
        />
      </div>

      <div className="p-4 flex flex-col flex-grow">
        <div className="flex items-center justify-between mb-2">
          <h3 className="text-lg font-semibold text-white">{leader.name}</h3>
        </div>
        
        <div className="flex items-center text-sm text-gray-300 mb-3">
          <img 
            src={`https://flagcdn.com/w20/${leader.countryCode.toLowerCase()}.png`} 
            alt={leader.country} 
            className="w-4 h-auto mr-1.5" 
          />
          <span>{leader.country}</span>
        </div>
        
        <div className="flex items-center mt-auto pt-2 border-t border-gray-700">
          <div className="text-sm font-medium flex items-center">
            <span className="text-gray-400 mr-1">Votes:</span>
            <span className="font-bold text-white">{leader.votes.toLocaleString()}</span>
          </div>
          
          <Button 
            size="sm" 
            className="ml-auto bg-blue-600 hover:bg-blue-700"
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
