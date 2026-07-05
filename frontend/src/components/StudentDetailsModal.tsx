import React from 'react';
import { Dialog, DialogTitle, DialogContent, Typography, Box, Chip, Divider, IconButton, Grid } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import ArrowRightAltIcon from '@mui/icons-material/ArrowRightAlt';
import { StudentEvaluation } from '../types';

interface Props { student: StudentEvaluation | null; open: boolean; onClose: () => void; }

export const StudentDetailsModal: React.FC<Props> = ({ student, open, onClose }) => {
  if (!student) return null;

  return (
    <Dialog open={open} onClose={onClose} maxWidth="md" fullWidth PaperProps={{ sx: { bgcolor: '#0b0f19', border: '1px solid rgba(255,255,255,0.1)' } }}>
      <DialogTitle sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', pb: 2 }}>
        <Box>
          <Typography variant="h5" sx={{ fontWeight: 700 }}>{student.name}</Typography>
          <Typography variant="body2" color="text.secondary">Rank Priority Matrix #{student.rank} &bull; Absolute Eval Score: {student.score}%</Typography>
        </Box>
        <IconButton onClick={onClose} sx={{ color: 'text.secondary' }}><CloseIcon /></IconButton>
      </DialogTitle>
      
      <DialogContent dividers sx={{ borderColor: 'rgba(255,255,255,0.06)', py: 3 }}>
        <Box mb={3.5}>
          <Typography variant="caption" color="primary" sx={{ display: 'block', fontWeight: 700, mb: 1, letterSpacing: '0.05em' }}>UNDERSTANDING SUMMARY</Typography>
          <Typography variant="body1" sx={{ color: 'text.primary', lineHeight: 1.6 }}>{student.understandingSummary}</Typography>
        </Box>

        <Grid container spacing={3} mb={3.5}>
          <Grid item xs={12} sm={6}>
            <Typography variant="caption" sx={{ display: 'block', color: '#10b981', fontWeight: 700, mb: 1.5, letterSpacing: '0.05em' }}>PROVEN STRENGTHS</Typography>
            <Box display="flex" gap={1} flexWrap="wrap">
              {student.strengths.map((s, i) => <Chip key={i} label={s} size="small" sx={{ bgcolor: 'rgba(16, 185, 129, 0.06)', color: '#10b981', borderColor: 'rgba(16, 185, 129, 0.2)', borderRadius: '6px' }} variant="outlined" />)}
            </Box>
          </Grid>
          <Grid item xs={12} sm={6}>
            <Typography variant="caption" sx={{ display: 'block', color: '#f43f5e', fontWeight: 700, mb: 1.5, letterSpacing: '0.05em' }}>MISSING CONCEPTS & GAP GAPING</Typography>
            <Box display="flex" gap={1} flexWrap="wrap">
              {student.missingConcepts.length > 0 ? student.missingConcepts.map((m, i) => (
                <Chip key={i} label={m} size="small" sx={{ bgcolor: 'rgba(244, 63, 94, 0.06)', color: '#f43f5e', borderColor: 'rgba(244, 63, 94, 0.2)', borderRadius: '6px' }} variant="outlined" />
              )) : <Typography variant="body2" color="text.secondary">No conceptual flaws observed.</Typography>}
            </Box>
          </Grid>
        </Grid>

        <Divider sx={{ my: 2.5, borderColor: 'rgba(255,255,255,0.06)' }} />

        <Box mb={3.5}>
          <Typography variant="caption" sx={{ display: 'block', color: '#eab308', fontWeight: 700, mb: 1, letterSpacing: '0.05em' }}>MENTOR ARCHITECT RECOMMENDATIONS</Typography>
          <Typography variant="body2" sx={{ bgcolor: 'rgba(255,255,255,0.01)', p: 2, borderRadius: '8px', border: '1px solid rgba(255,255,255,0.03)', color: 'text.secondary', lineHeight: 1.6 }}>
            {student.mentorRecommendations}
          </Typography>
        </Box>

        <Box sx={{ p: 2, borderRadius: '8px', bgcolor: 'rgba(59, 130, 246, 0.03)', border: '1px solid rgba(59, 130, 246, 0.1)', display: 'flex', alignItems: 'center', gap: 2 }}>
          <ArrowRightAltIcon color="primary" />
          <Box>
            <Typography variant="caption" color="primary" sx={{ display: 'block', fontWeight: 700, letterSpacing: '0.05em' }}>NEXT OBJECTIVE LEARNING GOAL</Typography>
            <Typography variant="body2" color="text.primary" sx={{ fontWeight: 500 }}>{student.nextLearningGoal}</Typography>
          </Box>
        </Box>
      </DialogContent>
    </Dialog>
  );
};