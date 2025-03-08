
export interface Leader {
  id: number;
  name: string;
  country: string;
  countryCode: string;
  image: string;
  votes: number;
}

// Crypto community leaders
export const leaders: Leader[] = [
  {
    id: 1,
    name: "Vitalik Buterin",
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
  {
    id: 9,
    name: "Andre Cronje",
    country: "South Africa",
    countryCode: "ZA",
    image: "https://images.unsplash.com/photo-1621692943864-44708573528e?w=500&q=80",
    votes: 129
  },
  {
    id: 10,
    name: "Anatoly Yakovenko",
    country: "United States",
    countryCode: "US",
    image: "https://images.unsplash.com/photo-1649972938084-e0e494723c26?w=500&q=80",
    votes: 114
  },
  {
    id: 11,
    name: "Do Kwon",
    country: "South Korea",
    countryCode: "KR",
    image: "https://images.unsplash.com/photo-1633422488528-4e35324beb8d?w=500&q=80",
    votes: 110
  },
  {
    id: 12,
    name: "Justin Sun",
    country: "China",
    countryCode: "CN",
    image: "https://images.unsplash.com/photo-1642096633497-350cd2683ba7?w=500&q=80",
    votes: 97
  }
];

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
  return updatedLeaders;
};
