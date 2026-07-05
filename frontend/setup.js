const fs = require('fs');
const path = require('path');

// 1. Define the directory structure
const dirs = [
  'src',
  'src/components',
  'src/pages',
  'src/services',
  'src/theme',
  'src/types'
];

console.log('🚀 Initializing Enterprise Frontend Project...');
dirs.forEach(dir => {
  if (!fs.existsSync(dir)) fs.mkdirSync(dir, { recursive: true });
});

// 2. Define all project files
const files = {
  // CONFIGURATIONS
  'package.json': `{
  "name": "ai-mentor-frontend",
  "private": true,
  "version": "1.0.0",
  "type": "module",
  "scripts": {
    "dev": "vite",
    "build": "tsc && vite build",
    "preview": "vite preview"
  },
  "dependencies": {
    "@emotion/react": "^11.11.0",
    "@emotion/styled": "^11.11.0",
    "@mui/icons-material": "^5.11.16",
    "@mui/material": "^5.11.16",
    "@mui/x-data-grid": "^6.3.0",
    "axios": "^1.4.0",
    "framer-motion": "^10.12.4",
    "react": "^18.2.0",
    "react-dom": "^18.2.0",
    "react-router-dom": "^6.11.1",
    "recharts": "^2.5.0"
  },
  "devDependencies": {
    "@types/react": "^18.0.28",
    "@types/react-dom": "^18.0.11",
    "@vitejs/plugin-react": "^3.1.0",
    "typescript": "^5.0.2",
    "vite": "^4.2.0"
  }
}`,

  'vite.config.ts': `import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  server: {
    port: 3000,
    proxy: {
      '/api': {
        target: 'http://localhost:8080',
        changeOrigin: true,
        secure: false,
      },
    },
  },
});`,

  'tsconfig.json': `{
  "compilerOptions": {
    "target": "ES2020",
    "useDefineForClassFields": true,
    "lib": ["DOM", "DOM.Iterable", "ES2020"],
    "module": "ESNext",
    "skipLibCheck": true,
    "moduleResolution": "node",
    "allowImportingTsExtensions": true,
    "resolveJsonModule": true,
    "isolatedModules": true,
    "noEmit": true,
    "jsx": "react-jsx",
    "strict": true,
    "noUnusedLocals": true,
    "noUnusedParameters": true,
    "noFallthroughCasesInSwitch": true
  },
  "include": ["src"],
  "references": [{ "path": "./tsconfig.node.json" }]
}`,

  'tsconfig.node.json': `{
  "compilerOptions": {
    "composite": true,
    "skipLibCheck": true,
    "module": "ESNext",
    "moduleResolution": "node",
    "allowSyntheticDefaultImports": true
  },
  "include": ["vite.config.ts"]
}`,

  'index.html': `<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <link rel="icon" type="image/svg+xml" href="data:image/svg+xml,<svg xmlns=%22http://www.w3.org/2000/svg%22 viewBox=%220 0 100 100%22><text y=%22.9em%22 font-size=%2290%22>🤖</text></svg>" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>AI Mentor Workspace</title>
    <link rel="preconnect" href="https://fonts.googleapis.com">
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
    <link href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&display=swap" rel="stylesheet">
  </head>
  <body>
    <div id="root"></div>
    <script type="module" src="/src/main.tsx"></script>
  </body>
</html>`,

  // TYPES & THEME
  'src/types/index.ts': `export interface StudentEvaluation {
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
}`,

  'src/theme/theme.ts': `import { createTheme } from '@mui/material/styles';

export const darkTheme = createTheme({
  palette: {
    mode: 'dark',
    primary: { main: '#3b82f6', light: '#60a5fa', dark: '#2563eb' },
    background: { default: '#020617', paper: 'rgba(15, 23, 42, 0.45)' },
    text: { primary: '#f8fafc', secondary: '#94a3b8' },
    divider: 'rgba(255,255,255,0.06)',
  },
  shape: { borderRadius: 12 },
  typography: {
    fontFamily: '"Inter", sans-serif',
    h4: { fontWeight: 700, letterSpacing: '-0.03em' },
    h6: { fontWeight: 600, letterSpacing: '-0.01em' },
  },
  components: {
    MuiPaper: {
      styleOverrides: {
        root: {
          backgroundImage: 'none',
          backdropFilter: 'blur(16px)',
          border: '1px solid rgba(255, 255, 255, 0.07)',
          boxShadow: '0 8px 32px 0 rgba(0, 0, 0, 0.37)',
        },
      },
    },
  },
});`,

  // SERVICES
  'src/services/api.ts': `import axios from 'axios';
import { DashboardData } from '../types';

const apiClient = axios.create({
  baseURL: '/api',
  headers: { 'Content-Type': 'application/json' }
});

export const fetchDashboardData = async (): Promise<DashboardData> => {
  try {
    const response = await apiClient.get<DashboardData>('/dashboard');
    return response.data;
  } catch (error) {
    console.warn('Backend connection unavailable. Generating fallback runtime simulation data.');
    return {
      totalStudents: 32,
      averageScore: 78.4,
      highestScore: 96,
      lowestScore: 52,
      scoreDistribution: [
        { range: '50-60', count: 4 },
        { range: '61-70', count: 6 },
        { range: '71-80', count: 12 },
        { range: '81-90', count: 8 },
        { range: '91-100', count: 2 },
      ],
      confidenceDistribution: [
        { level: 'High Assurance', count: 18 },
        { level: 'Moderate', count: 10 },
        { level: 'Tentative', count: 4 },
      ],
      students: [
        {
          id: '1', name: 'Alexander Wright', rank: 1, score: 96, confidence: 94, status: 'Excellent',
          understandingSummary: 'Superb control over Object-Oriented design principles and execution logic.',
          strengths: ['Architecture Design', 'Algorithmic Optimization'], missingConcepts: [],
          mentorRecommendations: 'Introduce core performance caching layer strategies.',
          nextLearningGoal: 'Distributed Event-Driven Architecture', feedback: 'Stellar work.'
        },
        {
          id: '2', name: 'Elena Rostova', rank: 2, score: 84, confidence: 81, status: 'Good',
          understandingSummary: 'Good command over CRUD operational layers, struggles slightly on deep asynchronous control patterns.',
          strengths: ['Database Normalization', 'API Endpoint Design'], missingConcepts: ['Thread Pooling execution bounds'],
          mentorRecommendations: 'Review concurrency handles and memory locks.',
          nextLearningGoal: 'Java Multithreading Deep Dive', feedback: 'Consistent progression.'
        },
        {
          id: '3', name: 'Marcus Vance', rank: 3, score: 58, confidence: 45, status: 'Critical',
          understandingSummary: 'Requires heavy foundational enforcement on basic iteration safety and collections configuration structure.',
          strengths: ['Basic Syntax Application'], missingConcepts: ['Generics constraints', 'Exception handling frameworks'],
          mentorRecommendations: 'Pair-program through active logical flow breakdowns.',
          nextLearningGoal: 'Java Collections API Mastery', feedback: 'Needs immediate structural review.'
        }
      ]
    };
  }
};`,

  // COMPONENTS
  'src/components/Header.tsx': `import React from 'react';
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
};`,

  'src/components/SummaryCards.tsx': `import React from 'react';
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
    { title: 'Average Score', value: \`\${data.averageScore}%\`, icon: <QueryStatsIcon sx={{ color: '#06b6d4' }} /> },
    { title: 'Highest Score', value: \`\${data.highestScore}%\`, icon: <WorkspacePremiumIcon sx={{ color: '#10b981' }} /> },
    { title: 'Lowest Score', value: \`\${data.lowestScore}%\`, icon: <ReportProblemIcon sx={{ color: '#f43f5e' }} /> },
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
};`,

  'src/components/Charts.tsx': `import React from 'react';
import { Grid, Paper, Typography } from '@mui/material';
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts';
import { DashboardData } from '../types';

const PIE_COLORS = ['#3b82f6', '#06b6d4', '#64748b'];

export const Charts: React.FC<{ data: DashboardData }> = ({ data }) => {
  return (
    <Grid container spacing={3} mb={4}>
      <Grid item xs={12} md={8}>
        <Paper sx={{ p: 3, height: 320 }}>
          <Typography variant="h6" color="text.primary" mb={2}>Score Distribution Grid</Typography>
          <ResponsiveContainer width="100%" height="90%">
            <BarChart data={data.scoreDistribution}>
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
              <Pie data={data.confidenceDistribution} innerRadius={65} outerRadius={90} paddingAngle={4} dataKey="count" nameKey="level">
                {data.confidenceDistribution.map((_, index) => (
                  <Cell key={\`cell-\${index}\`} fill={PIE_COLORS[index % PIE_COLORS.length]} />
                ))}
              </Pie>
              <Tooltip contentStyle={{ backgroundColor: '#0f172a', borderColor: 'rgba(255,255,255,0.1)', borderRadius: '8px' }} />
            </PieChart>
          </ResponsiveContainer>
        </Paper>
      </Grid>
    </Grid>
  );
};`,

  'src/components/StudentTable.tsx': `import React, { useState } from 'react';
import { Paper, Typography, Box, Chip, TextField, InputAdornment } from '@mui/material';
import { DataGrid, GridColDef } from '@mui/x-data-grid';
import SearchIcon from '@mui/icons-material/Search';
import { StudentEvaluation } from '../types';

interface Props { students: StudentEvaluation[]; onRowClick: (student: StudentEvaluation) => void; }

export const StudentTable: React.FC<Props> = ({ students, onRowClick }) => {
  const [search, setSearch] = useState('');
  
  const filteredRows = students.filter(s => s.name.toLowerCase().includes(search.toLowerCase()));

  const columns: GridColDef[] = [
    { field: 'rank', headerName: 'RANK', width: 80 },
    { field: 'name', headerName: 'STUDENT PIPELINE PROFILE', flex: 1, renderCell: (params) => <Typography sx={{ fontWeight: 500, fontSize: '0.95rem' }}>{params.value}</Typography> },
    { field: 'score', headerName: 'SCORE', width: 110, renderCell: (params) => <Typography sx={{ color: '#3b82f6', fontWeight: 600 }}>{params.value}%</Typography> },
    { field: 'confidence', headerName: 'AI CONFIDENCE', width: 140, renderCell: (params) => <Typography sx={{ color: '#94a3b8' }}>{params.value}%</Typography> },
    { 
      field: 'status', headerName: 'METRIC CLASSIFICATION', width: 200,
      renderCell: (params) => {
        let color: 'success' | 'warning' | 'error' | 'default' = 'default';
        if (params.value === 'Excellent') color = 'success';
        if (params.value === 'Good') color = 'success';
        if (params.value === 'Needs Improvement') color = 'warning';
        if (params.value === 'Critical') color = 'error';
        return <Chip label={params.value} color={color} size="small" variant="outlined" sx={{ borderRadius: '6px', fontWeight: 500 }} />;
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
          sx={{
            border: 'none', '& .MuiDataGrid-cell': { borderBottom: '1px solid rgba(255,255,255,0.04)' },
            '& .MuiDataGrid-columnHeaders': { borderBottom: '1px solid rgba(255,255,255,0.08)', textTransform: 'uppercase', fontSize: '0.75rem', letterSpacing: '0.05em' },
            '& .MuiDataGrid-row': { '&:hover': { cursor: 'pointer', backgroundColor: 'rgba(59, 130, 246, 0.04)' } }
          }}
        />
      </Box>
    </Paper>
  );
};`,

  'src/components/StudentDetailsModal.tsx': `import React from 'react';
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
};`,

  // PAGES & CORE ENTRY POINTS
  'src/pages/Dashboard.tsx': `import React, { useEffect, useState } from 'react';
import { Box, CircularProgress, Container } from '@mui/material';
import { Header } from '../components/Header';
import { SummaryCards } from '../components/SummaryCards';
import { Charts } from '../components/Charts';
import { StudentTable } from '../components/StudentTable';
import { StudentDetailsModal } from '../components/StudentDetailsModal';
import { fetchDashboardData } from '../services/api';
import { DashboardData, StudentEvaluation } from '../types';

export const Dashboard = () => {
  const [data, setData] = useState<DashboardData | null>(null);
  const [loading, setLoading] = useState(true);
  const [selectedStudent, setSelectedStudent] = useState<StudentEvaluation | null>(null);

  useEffect(() => {
    fetchDashboardData().then(result => {
      setData(result);
      setLoading(false);
    });
  }, []);

  if (loading || !data) {
    return (
      <Box display="flex" justifyContent="center" alignItems="center" minHeight="100vh" bgcolor="#020617">
        <CircularProgress size={50} thickness={4} sx={{ color: '#3b82f6' }} />
      </Box>
    );
  }

  return (
    <Container maxWidth="xl" sx={{ py: 3 }}>
      <Header />
      <SummaryCards data={data} />
      <Charts data={data} />
      <StudentTable students={data.students} onRowClick={setSelectedStudent} />
      <StudentDetailsModal open={Boolean(selectedStudent)} student={selectedStudent} onClose={() => setSelectedStudent(null)} />
    </Container>
  );
};`,

  'src/App.tsx': `import React from 'react';
import { ThemeProvider, CssBaseline } from '@mui/material';
import { darkTheme } from './theme/theme';
import { Dashboard } from './pages/Dashboard';

function App() {
  return (
    <ThemeProvider theme={darkTheme}>
      <CssBaseline />
      <Dashboard />
    </ThemeProvider>
  );
}

export default App;`,

  'src/index.css': `body {
  margin: 0;
  background-color: #020617;
  -webkit-font-smoothing: antialiased;
}
::-webkit-scrollbar { width: 6px; height: 6px; }
::-webkit-scrollbar-track { background: transparent; }
::-webkit-scrollbar-thumb { background: #1e293b; border-radius: 10px; }
::-webkit-scrollbar-thumb:hover { background: #334155; }`,

  'src/main.tsx': `import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import './index.css';

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);`
};

// 3. Programmatically generate files
Object.entries(files).forEach(([filepath, content]) => {
  fs.writeFileSync(path.normalize(filepath), content.trim(), 'utf8');
  console.log(`  🔹 Generated: ${filepath}`);
});

console.log('\\n✅ Architecture Generation Complete!');
console.log('--------------------------------------------------');
console.log('👉 Final Setup Commands:');
console.log('   npm install');
console.log('   npm run dev');
console.log('--------------------------------------------------\\n');