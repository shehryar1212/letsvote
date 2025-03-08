
import { useState, useEffect } from "react";
import LeaderCard from "./LeaderCard";
import { Leader, getLeadersSortedByVotes } from "@/lib/leader-data";

const LeaderGrid = () => {
  const [leaders, setLeaders] = useState<Leader[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Load from our data service that now uses localStorage
    const fetchLeaders = async () => {
      setLoading(true);
      // Simulate network delay (reduced for better UX)
      await new Promise(resolve => setTimeout(resolve, 500));
      setLeaders(getLeadersSortedByVotes());
      setLoading(false);
    };

    fetchLeaders();
  }, []);

  const handleVote = (leaderId: number) => {
    setLeaders(prevLeaders => {
      const newLeaders = prevLeaders.map(leader => {
        if (leader.id === leaderId) {
          return { ...leader, votes: leader.votes + 1 };
        }
        return leader;
      });
      
      // Resort the leaders by votes
      const sortedLeaders = [...newLeaders].sort((a, b) => b.votes - a.votes);
      
      // Persist the vote in localStorage
      try {
        localStorage.setItem('cryptoLeaders', JSON.stringify(sortedLeaders));
      } catch (e) {
        console.error("Error saving votes to localStorage:", e);
      }
      
      return sortedLeaders;
    });
  };

  if (loading) {
    return (
      <div className="w-full h-full grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {Array.from({ length: 8 }).map((_, index) => (
          <div 
            key={index} 
            className="rounded-xl overflow-hidden bg-gray-100 dark:bg-gray-800/40 animate-pulse h-[360px]"
          >
            <div className="w-full aspect-[3/4] bg-gray-200 dark:bg-gray-700/50"></div>
            <div className="p-4">
              <div className="h-5 bg-gray-200 dark:bg-gray-700/50 rounded w-3/4 mb-2"></div>
              <div className="h-4 bg-gray-200 dark:bg-gray-700/50 rounded w-1/2"></div>
              <div className="mt-4 pt-2 border-t flex justify-between">
                <div className="h-4 bg-gray-200 dark:bg-gray-700/50 rounded w-1/4"></div>
                <div className="h-8 bg-gray-200 dark:bg-gray-700/50 rounded w-1/4"></div>
              </div>
            </div>
          </div>
        ))}
      </div>
    );
  }

  return (
    <div className="w-full grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 sm:gap-5">
      {leaders.map((leader, index) => (
        <div 
          key={leader.id}
          className="opacity-0 animate-fade-up"
          style={{ animationDelay: `${index * 0.1}s`, animationFillMode: 'forwards' }}
        >
          <LeaderCard 
            leader={leader} 
            onVote={handleVote} 
            rank={index + 1} 
          />
        </div>
      ))}
    </div>
  );
};

export default LeaderGrid;
