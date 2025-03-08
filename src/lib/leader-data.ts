
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
    name: "Donad",
    country: "Russia/Canada",
    countryCode: "CA",
    image: "https://images.unsplash.com/photo-1621504450181-5d356f61d307?w=500&q=80",
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
    name: "Sam Bankman-Fried",
    country: "United States",
    countryCode: "US",
    image: "https://images.unsplash.com/photo-1628019128658-703d60131b55?w=500&q=80",
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
