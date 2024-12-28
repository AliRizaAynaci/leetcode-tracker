export interface User {
    username: string;
    totalSolved: number;
    easySolved: number;
    mediumSolved: number;
    hardSolved: number;
    lastUpdated: string;
  }
  
  export interface Problem {
    id: number;
    title: string;
    difficulty: 'Easy' | 'Medium' | 'Hard';
    isSolved: boolean;
    notes?: string;
    lastAttempt?: string;
    category?: string;
  }