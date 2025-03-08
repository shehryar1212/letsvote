
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { ChevronUp, Loader2 } from "lucide-react";
import { toast } from "sonner";

interface VoteButtonProps {
  isConnected: boolean;
  networkValid: boolean;
  onVote: () => void;
}

const VoteButton = ({ isConnected, networkValid, onVote }: VoteButtonProps) => {
  const [isVoting, setIsVoting] = useState(false);

  const handleVote = async () => {
    if (!isConnected) {
      toast.error("Wallet not connected", {
        description: "Please connect your wallet to vote."
      });
      return;
    }

    if (!networkValid) {
      toast.error("Wrong network", {
        description: "Please switch to Monad Testnet to vote."
      });
      return;
    }

    setIsVoting(true);
    try {
      // Simulate a transaction delay
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      // Execute the vote
      onVote();
      
      toast.success("Vote successful!", {
        description: "Your vote has been recorded."
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

  return (
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
  );
};

export default VoteButton;
