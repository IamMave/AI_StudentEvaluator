import React, { useState } from 'react';
import { Paper, Typography, Box, Chip, TextField, InputAdornment } from '@mui/material';
import { DataGrid, GridColDef } from '@mui/x-data-grid';
import SearchIcon from '@mui/icons-material/Search';
import { StudentEvaluation } from '../types';

interface Props { students: StudentEvaluation[]; onRowClick: (student: StudentEvaluation) => void; }

export const StudentTable: React.FC<Props> = ({ students, onRowClick }) => {
  const [search, setSearch] = useState('');
  
  // Failsafe: Ensure students is an array and names are valid before filtering
  const safeStudents = students || [];
  const filteredRows = safeStudents.filter(s => 
    (s?.name || '').toLowerCase().includes(search.toLowerCase())
  );

  const columns: GridColDef[] = [
    { field: 'rank', headerName: 'RANK', width: 80 },
    { field: 'name', headerName: 'STUDENT PIPELINE PROFILE', flex: 1, renderCell: (params) => <Typography sx={{ fontWeight: 500, fontSize: '0.95rem' }}>{params.value || 'Unknown'}</Typography> },
    { field: 'score', headerName: 'SCORE', width: 110, renderCell: (params) => <Typography sx={{ color: '#3b82f6', fontWeight: 600 }}>{params.value || 0}%</Typography> },
    { field: 'confidence', headerName: 'AI CONFIDENCE', width: 140, renderCell: (params) => <Typography sx={{ color: '#94a3b8' }}>{params.value || 0}%</Typography> },
    { 
      field: 'status', headerName: 'METRIC CLASSIFICATION', width: 200,
      renderCell: (params) => {
        let color: 'success' | 'warning' | 'error' | 'default' = 'default';
        if (params.value === 'Excellent') color = 'success';
        if (params.value === 'Good') color = 'success';
        if (params.value === 'Needs Improvement') color = 'warning';
        if (params.value === 'Critical') color = 'error';
        return <Chip label={params.value || 'N/A'} color={color} size="small" variant="outlined" sx={{ borderRadius: '6px', fontWeight: 500 }} />;
      }
    },
  ];

  return (
    <Paper sx={{ p: 3, display: 'flex', flexDirection: 'column', height: 460 }}>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
        <Typography variant="h6">Performance Indexes</Typography>
        <TextField
          size="small" variant="outlined" placeholder="Search Profiles..." value={search} onChange={(e) => setSearch(e.target.value)}
          InputProps={{ startAdornment: <InputAdornment position="start"><SearchIcon sx={{ color: 'text.secondary', fontSize: '1.2rem' }} /></InputAdornment> }}
          sx={{ '& .MuiOutlinedInput-root': { borderRadius: '8px', bgcolor: 'rgba(255,255,255,0.02)' } }}
        />
      </Box>
      <Box sx={{ flexGrow: 1, width: '100%' }}>
        <DataGrid
          rows={filteredRows} columns={columns} onRowClick={(p) => onRowClick(p.row as StudentEvaluation)} autoPageSize disableRowSelectionOnClick
          getRowId={(row) => row.id || Math.random().toString()}
          sx={{
            border: 'none', '& .MuiDataGrid-cell': { borderBottom: '1px solid rgba(255,255,255,0.04)' },
            '& .MuiDataGrid-columnHeaders': { borderBottom: '1px solid rgba(255,255,255,0.08)', textTransform: 'uppercase', fontSize: '0.75rem', letterSpacing: '0.05em' },
            '& .MuiDataGrid-row': { '&:hover': { cursor: 'pointer', backgroundColor: 'rgba(59, 130, 246, 0.04)' } }
          }}
        />
      </Box>
    </Paper>
  );
};