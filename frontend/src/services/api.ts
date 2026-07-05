import axios from 'axios';
import { DashboardData, StudentEvaluation } from '../types';

export const fetchDashboardData = async (): Promise<DashboardData> => {
  try {
    const response = await axios.get('/dashboard-data.json', {
      headers: { 'Accept': 'application/json' },
      params: { t: new Date().getTime() } 
    });
    
    const raw = response.data;
    const analytics = raw.classAnalytics || {};

    // 1. Map the array and translate Java keys (like studentName) to React keys (like name)
    let parsedList: StudentEvaluation[] = (raw.studentEvaluations || []).map((item: any, index: number) => {
      
      let statusBadge: StudentEvaluation['status'] = 'Good';
      if (item.score >= 80) statusBadge = 'Excellent';
      else if (item.score < 50) statusBadge = 'Critical';
      else if (item.score < 70) statusBadge = 'Needs Improvement';

      return {
        id: String(index),
        name: item.studentName || 'Unknown', 
        rank: 0, // Calculated below
        score: item.score || 0,
        confidence: item.confidence || 0,
        status: statusBadge,
        understandingSummary: item.understandingSummary || 'No summary provided.',
        strengths: item.strengths || [],
        missingConcepts: item.missingConcepts || [],
        mentorRecommendations: item.mentorRecommendations || 'No recommendations.',
        nextLearningGoal: item.nextLearningGoal || 'None set.',
        feedback: item.feedback || 'No feedback.'
      };
    });

    // 2. Sort by score (highest to lowest) and assign ranks
    parsedList.sort((a, b) => b.score - a.score);
    parsedList = parsedList.map((s, idx) => ({ ...s, rank: idx + 1 }));

    // 3. Construct the final object expected by the React Dashboard
    return {
      totalStudents: analytics.totalStudents || 0,
      averageScore: analytics.averageScore || 0,
      highestScore: analytics.highestScorer?.score || 0,
      lowestScore: analytics.lowestScorer?.score || 0,
      
      // Calculate chart data dynamically from the list
      scoreDistribution: [
        { range: '0-20', count: parsedList.filter(s => s.score <= 20).length },
        { range: '21-40', count: parsedList.filter(s => s.score > 20 && s.score <= 40).length },
        { range: '41-60', count: parsedList.filter(s => s.score > 40 && s.score <= 60).length },
        { range: '61-80', count: parsedList.filter(s => s.score > 60 && s.score <= 80).length },
        { range: '81-100', count: parsedList.filter(s => s.score > 80).length }
      ],
      
      confidenceDistribution: [
        { level: 'High', count: parsedList.filter(s => s.confidence >= 80).length },
        { level: 'Medium', count: parsedList.filter(s => s.confidence >= 50 && s.confidence < 80).length },
        { level: 'Low', count: parsedList.filter(s => s.confidence < 50).length }
      ],
      
      students: parsedList
    };

  } catch (error) {
    console.error('Failed to load dashboard data.', error);
    throw new Error('Could not find dashboard-data.json or the format was invalid.');
  }
};