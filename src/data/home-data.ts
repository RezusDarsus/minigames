export interface GameCard {
  readonly title: string;
  readonly rating: string;
  readonly likes: string;
  readonly image: string;
  readonly size: 'edge' | 'standard' | 'featured';
}

export interface LeaderboardPlayer {
  readonly rank: number;
  readonly initials: string;
  readonly name: string;
  readonly gamesPlayed: string;
  readonly score: string;
  readonly streak: string;
  readonly favoriteGame: string;
}

export const gameCards: readonly GameCard[] = [
  {
    title: 'ISLANDERS: New Shores',
    rating: '4.9',
    likes: '54.2K',
    image: new URL('../assets/images/figma-03.jpeg', import.meta.url).href,
    size: 'edge',
  },
  {
    title: 'ISLANDERS: New Shores',
    rating: '4.9',
    likes: '54.2K',
    image: new URL('../assets/images/figma-04.jpeg', import.meta.url).href,
    size: 'standard',
  },
  {
    title: 'Vacation Cafe Simulator',
    rating: '4.8',
    likes: '28.7K',
    image: new URL('../assets/images/figma-08.jpeg', import.meta.url).href,
    size: 'featured',
  },
  {
    title: 'Winter Burrow',
    rating: '4.9',
    likes: '32.4K',
    image: new URL('../assets/images/figma-09.jpeg', import.meta.url).href,
    size: 'standard',
  },
  {
    title: 'Cozy Sudoku',
    rating: '4.7',
    likes: '18.9K',
    image: new URL('../assets/images/figma-10.jpeg', import.meta.url).href,
    size: 'edge',
  },
];

export const leaderboardPlayers: readonly LeaderboardPlayer[] = [
  {
    rank: 1,
    initials: 'AP',
    name: 'Alex_Pro99',
    gamesPlayed: '142',
    score: '94,250',
    streak: '12 days',
    favoriteGame: 'Heartopia',
  },
  {
    rank: 2,
    initials: 'CG',
    name: 'CozyGamer_x',
    gamesPlayed: '118',
    score: '81,400',
    streak: '8 days',
    favoriteGame: 'Cat Mail Co.',
  },
  {
    rank: 3,
    initials: 'MM',
    name: 'MatchMaster',
    gamesPlayed: '98',
    score: '72,110',
    streak: '5 days',
    favoriteGame: 'Tiny Glade',
  },
  {
    rank: 4,
    initials: 'BP',
    name: 'BubblePop',
    gamesPlayed: '87',
    score: '65,900',
    streak: '3 days',
    favoriteGame: 'Whisper of the House',
  },
  {
    rank: 5,
    initials: 'SG',
    name: 'SudokuGod',
    gamesPlayed: '74',
    score: '59,320',
    streak: '2 days',
    favoriteGame: 'Cat Chess',
  },
];
