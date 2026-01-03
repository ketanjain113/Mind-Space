
export interface Message {
  id: string;
  text: string;
  sender: 'user' | 'ai';
  timestamp: number;
}

export interface TestResult {
  title: string;
  score: number;
  maxScore: number;
  insight: string;
}

export interface CommunityPost {
  id: string;
  authorAlias: string;
  content: string;
  reactions: number;
  timestamp: number;
}

export interface Session {
  id: string;
  topic: string;
  speaker: string;
  dateTime: string;
  status: 'upcoming' | 'past';
}
