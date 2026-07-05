import React from 'react';
import { Grid, Paper, Typography, Box } from '@mui/material';
import { motion } from 'framer-motion';
import { DashboardData } from '../types';
import SupervisedUserCircleIcon from '@mui/icons-material/SupervisedUserCircle';
import QueryStatsIcon from '@mui/icons-material/QueryStats';
import WorkspacePremiumIcon from '@mui/icons-material/WorkspacePremium';
import ReportProblemIcon from '@mui/icons-material/ReportProblem';

const MotionPaper = motion(Paper);

export const SummaryCards: React.FC<{ data: DashboardData }> = ({ data }) => {
  const cards = [
    { title: 'Students Evaluated', value: data.totalStudents, icon: <SupervisedUserCircleIcon sx={{ color: '#3b82f6' }} /> },
    { title: 'Average Score', value: `${data.averageScore}%`, icon: <QueryStatsIcon sx={{ color: '#06b6d4' }} /> },
    { title: 'Highest Score', value: `${data.highestScore}%`, icon: <WorkspacePremiumIcon sx={{ color: '#10b981' }} /> },
    { title: 'Lowest Score', value: `${data.lowestScore}%`, icon: <ReportProblemIcon sx={{ color: '#f43f5e' }} /> },
  ];

  return (
    <Grid container spacing={3} mb={4}>
      {cards.map((card, index) => (
        <Grid item xs={12} sm={6} md={3} key={index}>
          <MotionPaper
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, delay: index * 0.05 }}
            sx={{ p: 2.5, display: 'flex', alignItems: 'center', gap: 2.5 }}
          >
            <Box sx={{ p: 1.5, borderRadius: '10px', bgcolor: 'rgba(255,255,255,0.03)', display: 'flex' }}>
              {card.icon}
            </Box>
            <Box>
              <Typography variant="caption" color="text.secondary" sx={{ textTransform: 'uppercase', fontWeight: 600, letterSpacing: '0.05em' }}>{card.title}</Typography>
              <Typography variant="h5" color="text.primary" sx={{ mt: 0.5, fontWeight: 700 }}>{card.value}</Typography>
            </Box>
          </MotionPaper>
        </Grid>
      ))}
    </Grid>
  );
};