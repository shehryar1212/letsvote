
interface LeaderInfoProps {
  name: string;
  country: string;
  countryCode: string;
  votes: number;
}

const LeaderInfo = ({ name, country, countryCode, votes }: LeaderInfoProps) => {
  return (
    <div className="p-4 flex flex-col flex-grow">
      <div className="flex items-center justify-between mb-2">
        <h3 className="text-lg font-semibold text-white">{name}</h3>
      </div>
      
      <div className="flex items-center text-sm text-gray-300 mb-3">
        <img 
          src={`https://flagcdn.com/w20/${countryCode.toLowerCase()}.png`} 
          alt={country} 
          className="w-4 h-auto mr-1.5" 
        />
        <span>{country}</span>
      </div>
      
      <div className="flex items-center mt-auto pt-2 border-t border-gray-700">
        <div className="text-sm font-medium flex items-center">
          <span className="text-gray-400 mr-1">Votes:</span>
          <span className="font-bold text-white">{votes.toLocaleString()}</span>
        </div>
      </div>
    </div>
  );
};

export default LeaderInfo;
