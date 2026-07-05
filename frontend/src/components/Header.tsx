import React from 'react';
import { Box, Typography, Button, Stack, Tooltip } from '@mui/material';
import InsertDriveFileIcon from '@mui/icons-material/InsertDriveFile';
import PictureAsPdfIcon from '@mui/icons-material/PictureAsPdf';
import AutoAwesomeIcon from '@mui/icons-material/AutoAwesome';

export const Header = () => {
  return (
    <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 4, mt: 2 }}>
      <Box>
        <Typography variant="h4" color="text.primary">AI Student Evaluator</Typography>
        <Typography variant="body2" color="text.secondary">Enterprise Performance Assessment Workspace (Ollama Context Engine)</Typography>
      </Box>
      <Stack direction="row" spacing={1.5}>
        <Tooltip title="Placeholder - Feature Ready">
          <span><Button variant="outlined" startIcon={<AutoAwesomeIcon />} color="primary" disabled>Class Insights</Button></span>
        </Tooltip>
        <Tooltip title="Placeholder - Feature Ready">
          <span><Button variant="outlined" startIcon={ <InsertDriveFileIcon />} color="inherit" disabled>Excel</Button></span>
        </Tooltip>
        <Tooltip title="Placeholder - Feature Ready">
          <span><Button variant="outlined" startIcon={<PictureAsPdfIcon />} color="inherit" disabled>PDF</Button></span>
        </Tooltip>
      </Stack>
    </Box>
  );
};