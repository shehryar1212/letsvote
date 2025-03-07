
export interface Leader {
  id: number;
  name: string;
  country: string;
  countryCode: string;
  image: string;
  votes: number;
}

// Placeholder data for testing
export const leaders: Leader[] = [
  {
    id: 1,
    name: "Abraham Lincoln",
    country: "United States",
    countryCode: "US",
    image: "https://images.unsplash.com/photo-1556126389-1b267ce485fe",
    votes: 256
  },
  {
    id: 2,
    name: "Winston Churchill",
    country: "United Kingdom",
    countryCode: "GB",
    image: "https://images.unsplash.com/photo-1541346383171-28c85e5f612a",
    votes: 234
  },
  {
    id: 3,
    name: "Mahatma Gandhi",
    country: "India",
    countryCode: "IN",
    image: "https://images.unsplash.com/photo-1597324164732-7e8d93056da6",
    votes: 198
  },
  {
    id: 4,
    name: "Nelson Mandela",
    country: "South Africa",
    countryCode: "ZA",
    image: "https://images.unsplash.com/photo-1604329067239-c2f488a9a31b",
    votes: 187
  },
  {
    id: 5,
    name: "Catherine the Great",
    country: "Russia",
    countryCode: "RU",
    image: "https://images.unsplash.com/photo-1618423576975-66dd48ba4afb",
    votes: 165
  },
  {
    id: 6,
    name: "Julius Caesar",
    country: "Italy",
    countryCode: "IT",
    image: "https://images.unsplash.com/photo-1598715685267-0f45532ab5ca",
    votes: 156
  },
  {
    id: 7,
    name: "Genghis Khan",
    country: "Mongolia",
    countryCode: "MN",
    image: "https://images.unsplash.com/photo-1568657608044-65b94bff280f",
    votes: 143
  },
  {
    id: 8,
    name: "Napoleon Bonaparte",
    country: "France",
    countryCode: "FR",
    image: "https://images.unsplash.com/photo-1554981448-6d3f4e84b8d7",
    votes: 132
  },
  {
    id: 9,
    name: "Cleopatra",
    country: "Egypt",
    countryCode: "EG",
    image: "https://images.unsplash.com/photo-1595979904886-56e0dcd663d7",
    votes: 129
  },
  {
    id: 10,
    name: "Otto von Bismarck",
    country: "Germany",
    countryCode: "DE",
    image: "https://images.unsplash.com/photo-1587654780291-39c9404d746b",
    votes: 114
  },
  {
    id: 11,
    name: "Alexander the Great",
    country: "Greece",
    countryCode: "GR",
    image: "https://images.unsplash.com/photo-1566308354920-35330b271c47",
    votes: 110
  },
  {
    id: 12,
    name: "Elizabeth I",
    country: "United Kingdom",
    countryCode: "GB",
    image: "https://images.unsplash.com/photo-1621551122354-e96737d64b70",
    votes: 97
  },
  {
    id: 13,
    name: "Charlemagne",
    country: "France",
    countryCode: "FR",
    image: "https://images.unsplash.com/photo-1576609878386-04fc33d14c31",
    votes: 92
  },
  {
    id: 14,
    name: "Cyrus the Great",
    country: "Iran",
    countryCode: "IR",
    image: "https://images.unsplash.com/photo-1642096633497-350cd2683ba7",
    votes: 89
  },
  {
    id: 15,
    name: "Marcus Aurelius",
    country: "Italy",
    countryCode: "IT",
    image: "https://images.unsplash.com/photo-1588511706503-2c780e0d0f4a",
    votes: 76
  },
  {
    id: 16,
    name: "Emperor Meiji",
    country: "Japan",
    countryCode: "JP",
    image: "https://images.unsplash.com/photo-1624494133364-48d7767ee7dc",
    votes: 72
  },
  {
    id: 17,
    name: "Simon Bolivar",
    country: "Venezuela",
    countryCode: "VE",
    image: "https://images.unsplash.com/photo-1628188762248-bbe5234ed8a5",
    votes: 68
  },
  {
    id: 18,
    name: "Mansa Musa",
    country: "Mali",
    countryCode: "ML",
    image: "https://images.unsplash.com/photo-1613855618482-cc0d0eefb76e",
    votes: 65
  },
  {
    id: 19,
    name: "Queen Victoria",
    country: "United Kingdom",
    countryCode: "GB",
    image: "https://images.unsplash.com/photo-1626214550629-be59ddf9a2c4",
    votes: 61
  },
  {
    id: 20,
    name: "Peter the Great",
    country: "Russia",
    countryCode: "RU",
    image: "https://images.unsplash.com/photo-1587653263995-404c42a48574",
    votes: 58
  }
];

// Sort leaders by votes (highest first)
export const getLeadersSortedByVotes = (): Leader[] => {
  return [...leaders].sort((a, b) => b.votes - a.votes);
};
