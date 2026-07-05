import React from 'react';
import { Grid, Paper, Typography } from '@mui/material';
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts';
import { DashboardData } from '../types';

const PIE_COLORS = ['#3b82f6', '#06b6d4', '#64748b'];

export const Charts: React.FC<{ data: DashboardData }> = ({ data }) => {
  // Failsafe: Ensure arrays exist even if the Java JSON omits them
  const scoreData = data?.scoreDistribution || [];
  const confidenceData = data?.confidenceDistribution || [];

  return (
    <Grid container spacing={3} mb={4}>
      <Grid item xs={12} md={8}>
        <Paper sx={{ p: 3, height: 320 }}>
          <Typography variant="h6" color="text.primary" mb={2}>Score Distribution Grid</Typography>
          <ResponsiveContainer width="100%" height="90%">
            <BarChart data={scoreData}>
              <XAxis dataKey="range" stroke="#475569" fontSize={12} tickLine={false} />
              <YAxis stroke="#475569" fontSize={12} tickLine={false} />
              <Tooltip cursor={{ fill: 'rgba(255,255,255,0.02)' }} contentStyle={{ backgroundColor: '#0f172a', borderColor: 'rgba(255,255,255,0.1)', borderRadius: '8px' }} />
              <Bar dataKey="count" fill="#3b82f6" radius={[4, 4, 0, 0]} maxBarSize={45} />
            </BarChart>
          </ResponsiveContainer>
        </Paper>
      </Grid>
      <Grid item xs={12} md={4}>
        <Paper sx={{ p: 3, height: 320 }}>
          <Typography variant="h6" color="text.primary" mb={2}>Metrics Confidence Matrix</Typography>
          <ResponsiveContainer width="100%" height="90%">
            <PieChart>
              <Pie data={confidenceData} innerRadius={65} outerRadius={90} paddingAngle={4} dataKey="count" nameKey="level">
                {confidenceData.map((_, index) => (
                  <Cell key={`cell-${index}`} fill={PIE_COLORS[index % PIE_COLORS.length]} />
                ))}
              </Pie>
              <Tooltip contentStyle={{ backgroundColor: '#0f172a', borderColor: 'rgba(255,255,255,0.1)', borderRadius: '8px' }} />
            </PieChart>
          </ResponsiveContainer>
        </Paper>
      </Grid>
    </Grid>
  );
};