
import { useState } from "react";
import { Leader } from "@/lib/leader-data";
import { useWallet } from "@/hooks/useWallet";
import { cn } from "@/lib/utils";

// Import refactored components
import LeaderEditDialog from "./leader/LeaderEditDialog";
import LeaderBadges from "./leader/LeaderBadges";
import LeaderImage from "./leader/LeaderImage";
import LeaderInfo from "./leader/LeaderInfo";
import VoteButton from "./leader/VoteButton";

interface LeaderCardProps {
  leader: Leader;
  onVote?: (leaderId: number) => void;
  rank: number;
}

const LeaderCard = ({ leader, onVote, rank }: LeaderCardProps) => {
  const { isConnected, wallet } = useWallet();
  
  // Local state to reflect the current values (including after updates)
  const [currentName, setCurrentName] = useState(leader.name);
  const [currentCountry, setCurrentCountry] = useState(leader.country);
  const [currentCountryCode, setCurrentCountryCode] = useState(leader.countryCode);
  
  // Fallback image if the provided one fails to load
  const [imageSrc, setImageSrc] = useState(leader.image);

  const handleImageError = () => {
    // If the image fails to load, use a fallback
    setImageSrc(`https://ui-avatars.com/api/?name=${encodeURIComponent(currentName)}&background=random&size=256`);
  };

  const handleLeaderUpdate = (updates: {
    name?: string;
    image?: string;
    country?: string;
    countryCode?: string;
  }) => {
    // Update local state based on what changed
    if (updates.name) setCurrentName(updates.name);
    if (updates.image) setImageSrc(updates.image);
    if (updates.country) setCurrentCountry(updates.country);
    if (updates.countryCode) setCurrentCountryCode(updates.countryCode);
  };

  const handleVote = async () => {
    if (onVote) {
      onVote(leader.id);
    }
  };

  const isNetworkValid = wallet.chainId === '0x1252';

  return (
    <div 
      className={cn(
        "relative rounded-xl overflow-hidden card-hover border",
        "transform transition-all duration-500 ease-out flex flex-col h-full",
        "dark:bg-gray-800/50 bg-gray-900 border-gray-700",
        rank <= 3 ? "shadow-md" : "shadow-sm"
      )}
    >
      {/* Edit dialog component */}
      <LeaderEditDialog leader={leader} onUpdate={handleLeaderUpdate} />
      
      {/* Badges component */}
      <LeaderBadges 
        rank={rank} 
        name={currentName} 
        country={currentCountry} 
        countryCode={currentCountryCode} 
      />

      {/* Image component */}
      <LeaderImage 
        imageSrc={imageSrc} 
        name={currentName} 
        onImageError={handleImageError} 
      />

      {/* Leader info section */}
      <div className="p-4 flex flex-col flex-grow">
        <LeaderInfo 
          name={currentName} 
          country={currentCountry} 
          countryCode={currentCountryCode} 
          votes={leader.votes} 
        />
        
        {/* Vote button */}
        <div className="flex items-center mt-2">
          <VoteButton 
            isConnected={isConnected} 
            networkValid={isNetworkValid} 
            onVote={handleVote} 
          />
        </div>
      </div>
    </div>
  );
};

export default LeaderCard;
