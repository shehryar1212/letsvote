
export interface Leader {
  id: number;
  name: string;
  country: string;
  countryCode: string;
  image: string;
  votes: number;
}

// Original data as fallback
const defaultLeaders: Leader[] = [
  {
    id: 1,
    name: "Donald Trump",
    country: "United States",
    countryCode: "US",
    image: "data:image/jpeg;base64,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",
    votes: 256
  },
  {
    id: 2,
    name: "Changpeng Zhao (CZ)",
    country: "China/Canada",
    countryCode: "CA",
    image: "https://images.unsplash.com/photo-1622020457014-afd782ffb3ce?w=500&q=80",
    votes: 234
  },
  {
    id: 3,
    name: "Brian Armstrong",
    country: "United States",
    countryCode: "US",
    image: "https://images.unsplash.com/photo-1622473590773-f588134b6ce7?w=500&q=80",
    votes: 198
  },
  {
    id: 4,
    name: "Charles Hoskinson",
    country: "United States",
    countryCode: "US",
    image: "https://images.unsplash.com/photo-1621504450181-5d356f61d307?w=500&q=80",
    votes: 187
  },
  {
    id: 5,
    name: "Michael Saylor",
    country: "United States",
    countryCode: "US",
    image: "https://images.unsplash.com/photo-1634821566146-d10d6d68f84a?w=500&q=80",
    votes: 165
  },
  {
    id: 6,
    name: "Gavin Wood",
    country: "United Kingdom",
    countryCode: "GB",
    image: "https://images.unsplash.com/photo-1628019128658-703d60131b55?w=500&q=80",
    votes: 156
  },
  {
    id: 7,
    name: "Hayden Adams",
    country: "United States",
    countryCode: "US",
    image: "https://images.unsplash.com/photo-1633422488528-4e35324beb8d?w=500&q=80",
    votes: 143
  },
  {
    id: 8,
    name: "hjgj",
    country: "United States",
    countryCode: "US",
    image:"",
    votes: 132
  },

 
];

// Initialize leaders from localStorage or use defaults
const initializeLeaders = (): Leader[] => {
  const savedLeaders = localStorage.getItem('cryptoLeaders');
  if (savedLeaders) {
    try {
      return JSON.parse(savedLeaders);
    } catch (e) {
      console.error("Error parsing saved leaders:", e);
      return [...defaultLeaders];
    }
  }
  return [...defaultLeaders];
};

// Export leaders with persistence
export let leaders: Leader[] = initializeLeaders();

// Helper to save leaders to localStorage
const saveLeadersToStorage = () => {
  try {
    localStorage.setItem('cryptoLeaders', JSON.stringify(leaders));
  } catch (e) {
    console.error("Error saving leaders to localStorage:", e);
  }
};

// Sort leaders by votes (highest first)
export const getLeadersSortedByVotes = (): Leader[] => {
  return [...leaders].sort((a, b) => b.votes - a.votes);
};

// Helper function to update a leader's name
export const updateLeaderName = (id: number, newName: string): Leader[] => {
  const updatedLeaders = leaders.map(leader => {
    if (leader.id === id) {
      return { ...leader, name: newName };
    }
    return leader;
  });
  // Update the original array
  leaders.length = 0;
  leaders.push(...updatedLeaders);
  saveLeadersToStorage(); // Save changes
  return updatedLeaders;
};

// Helper function to update a leader's image
export const updateLeaderImage = (id: number, newImageUrl: string): Leader[] => {
  const updatedLeaders = leaders.map(leader => {
    if (leader.id === id) {
      return { ...leader, image: newImageUrl };
    }
    return leader;
  });
  // Update the original array
  leaders.length = 0;
  leaders.push(...updatedLeaders);
  saveLeadersToStorage(); // Save changes
  return updatedLeaders;
};

// Helper function to update a leader's country
export const updateLeaderCountry = (id: number, newCountry: string): Leader[] => {
  const updatedLeaders = leaders.map(leader => {
    if (leader.id === id) {
      return { ...leader, country: newCountry };
    }
    return leader;
  });
  // Update the original array
  leaders.length = 0;
  leaders.push(...updatedLeaders);
  saveLeadersToStorage(); // Save changes
  return updatedLeaders;
};

// Helper function to update a leader's country code
export const updateLeaderCountryCode = (id: number, newCountryCode: string): Leader[] => {
  const updatedLeaders = leaders.map(leader => {
    if (leader.id === id) {
      return { ...leader, countryCode: newCountryCode };
    }
    return leader;
  });
  // Update the original array
  leaders.length = 0;
  leaders.push(...updatedLeaders);
  saveLeadersToStorage(); // Save changes
  return updatedLeaders;
};
