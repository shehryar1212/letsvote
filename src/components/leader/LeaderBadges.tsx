
import { cn } from "@/lib/utils";

interface LeaderBadgesProps {
  rank: number;
  name: string;
  country: string;
  countryCode: string;
}

const LeaderBadges = ({ rank, name, country, countryCode }: LeaderBadgesProps) => {
  return (
    <>
      {/* Country flag badge */}
      <div className="absolute top-2 right-2 z-10">
        <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-gray-800/90 backdrop-blur-sm text-gray-100 border border-gray-700">
          <img 
            src={`https://flagcdn.com/w20/${countryCode.toLowerCase()}.png`} 
            alt={country} 
            className="w-4 h-auto mr-1" 
          />
          {name}
        </span>
      </div>
      
      {/* Rank badge for top 3 */}
      {rank <= 3 && (
        <div className="absolute top-2 left-12 z-10">
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
    </>
  );
};

export default LeaderBadges;
