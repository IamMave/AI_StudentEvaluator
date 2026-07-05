export interface StudentEvaluation {
  id: string;
  name: string;
  rank: number;
  score: number;
  confidence: number;
  status: 'Excellent' | 'Good' | 'Needs Improvement' | 'Critical';
  understandingSummary: string;
  strengths: string[];
  missingConcepts: string[];
  mentorRecommendations: string;
  nextLearningGoal: string;
  feedback: string;
}

export interface DashboardData {
  totalStudents: number;
  averageScore: number;
  highestScore: number;
  lowestScore: number;
  scoreDistribution: { range: string; count: number }[];
  confidenceDistribution: { level: string; count: number }[];
  students: StudentEvaluation[];
}