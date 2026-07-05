import React, { useState } from 'react';
import axios from 'axios';
import { BarChart, Bar, XAxis, YAxis, ResponsiveContainer } from 'recharts';
import { jsPDF } from "jspdf"; 
import './App.css';

export default function App() {
  // --- STATE MANAGEMENT ---
  const [summary, setSummary] = useState('');
  const [chat, setChat] = useState('');
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedStudent, setSelectedStudent] = useState(null);
  
  // NEW: Pagination State
  const [currentPage, setCurrentPage] = useState(1);
  const studentsPerPage = 3;

  // --- API CALL ---
  const handleStartEvaluation = async () => {
    setLoading(true);
    try {
      const response = await axios.post('http://localhost:8080/api/evaluate', {
        mentorSummary: summary,
        chatLog: chat
      });
      setResult(response.data);
      setCurrentPage(1); // Reset to page 1 on new evaluation
    } catch (error) {
      alert("Error calling backend: " + error.message);
    }
    setLoading(false);
  };

  // --- RESET HANDLER ---
  const handleReset = () => {
    setResult(null);
    setSummary('');
    setChat('');
    setSearchTerm('');
    setSelectedStudent(null);
    setCurrentPage(1);
  };

  const handleSearch = (e) => {
    setSearchTerm(e.target.value);
    setCurrentPage(1); // Reset to page 1 when searching
  };

  // --- PDF GENERATOR FUNCTION ---
  const generatePDFReport = () => {
    if (!result || !result.studentEvaluations) return;

    const doc = new jsPDF();
    const pageWidth = doc.internal.pageSize.getWidth();
    const pageHeight = doc.internal.pageSize.getHeight(); 
    const margin = 20;
    const textWidth = pageWidth - margin * 2;

    result.studentEvaluations.forEach((student, index) => {
      if (index > 0) doc.addPage();
      let cursorY = 20;

      doc.setFontSize(22);
      doc.setTextColor(43, 108, 176); 
      doc.setFont("helvetica", "bold");
      doc.text("Student Performance Report", margin, cursorY);
      cursorY += 12;

      doc.setFontSize(16);
      doc.setTextColor(26, 32, 44);
      doc.text(`Name: ${student.studentName || 'Unknown Profile'}`, margin, cursorY);
      cursorY += 8;
      
      doc.setFontSize(12);
      doc.setFont("helvetica", "normal");
      doc.setTextColor(113, 128, 150);
      doc.text(`Rank: #${index + 1}   |   Absolute Score: ${student.score}%   |   AI Confidence: ${student.confidence}%`, margin, cursorY);
      cursorY += 15;

      const addSection = (title, content, colorRGB) => {
        if (cursorY > pageHeight - 40) {
          doc.addPage();
          cursorY = 20;
        }

        doc.setFontSize(11);
        doc.setFont("helvetica", "bold");
        doc.setTextColor(colorRGB[0], colorRGB[1], colorRGB[2]);
        doc.text(title.toUpperCase(), margin, cursorY);
        cursorY += 6;

        doc.setFontSize(11);
        doc.setFont("helvetica", "normal");
        doc.setTextColor(74, 85, 104);

        if (Array.isArray(content)) {
          if (content.length === 0) {
            doc.text("None identified.", margin, cursorY);
            cursorY += 8;
          } else {
            content.forEach(item => {
              const lines = doc.splitTextToSize(`• ${item}`, textWidth);
              if (cursorY + (lines.length * 5) > pageHeight - 20) {
                doc.addPage();
                cursorY = 20;
              }
              doc.text(lines, margin, cursorY);
              cursorY += (lines.length * 5) + 2;
            });
          }
        } else {
          const validContent = (content && String(content).trim() !== '') ? String(content) : "No objective generated.";
          const lines = doc.splitTextToSize(validContent, textWidth);
          if (cursorY + (lines.length * 5) > pageHeight - 20) {
             doc.addPage();
             cursorY = 20;
          }
          doc.text(lines, margin, cursorY);
          cursorY += (lines.length * 5) + 4;
        }
        cursorY += 6; 
      };

      addSection("Understanding Summary", student.understandingSummary, [49, 130, 206]); 
      addSection("Proven Strengths", student.strengths, [47, 133, 90]); 
      addSection("Missing Concepts & Gaps", student.missingConcepts, [197, 48, 48]); 
      addSection("Mentor Architect Recommendations", student.mentorRecommendations, [214, 158, 46]); 
      
      const goalData = student.nextObjective || student.learningGoal || student.nextLearningGoal;
      addSection("Next Objective Learning Goal", goalData, [43, 108, 176]); 
    });

    doc.save("Cohort_Evaluation_Report.pdf");
  };

  // --- HELPER FUNCTIONS ---
  const getLowestScore = () => {
    if (!result || !result.studentEvaluations || result.studentEvaluations.length === 0) return '0';
    return Math.min(...result.studentEvaluations.map(s => s.score));
  };

  // Reverted to Dark Theme Badges
  const getMetricClassification = (score) => {
    if (score >= 75) return { label: 'On Track', class: 'badge-good', color: '#68d391', border: '#276749', bg: 'rgba(39, 103, 73, 0.1)' };
    if (score >= 50) return { label: 'Needs Improvement', class: 'badge-warning', color: '#f6ad55', border: '#975a16', bg: 'rgba(151, 90, 22, 0.1)' };
    return { label: 'Critical', class: 'badge-critical', color: '#fc8181', border: '#9b2c2c', bg: 'rgba(155, 44, 44, 0.1)' };
  };

  const getDistributionData = () => {
    const bins = { '0-20': 0, '21-40': 0, '41-60': 0, '61-80': 0, '81-100': 0 };
    if (result?.studentEvaluations) {
      result.studentEvaluations.forEach(s => {
        if (s.score <= 20) bins['0-20']++;
        else if (s.score <= 40) bins['21-40']++;
        else if (s.score <= 60) bins['41-60']++;
        else if (s.score <= 80) bins['61-80']++;
        else bins['81-100']++;
      });
    }
    return Object.keys(bins).map(key => ({ name: key, count: bins[key] }));
  };

  // --- PAGINATION & FILTER LOGIC ---
  const filteredStudents = result?.studentEvaluations?.filter(student => {
    const name = student.studentName || '';
    return name.toLowerCase().includes(searchTerm.toLowerCase());
  }) || [];

  const attentionStudents = result?.studentEvaluations?.filter(s => s.score < 40) || [];

  const indexOfLastStudent = currentPage * studentsPerPage;
  const indexOfFirstStudent = indexOfLastStudent - studentsPerPage;
  const currentStudents = filteredStudents.slice(indexOfFirstStudent, indexOfLastStudent);
  const totalPages = Math.ceil(filteredStudents.length / studentsPerPage);

  // --- CALCULATE Y-AXIS TICKS EXPLICITLY ---
  const distributionData = getDistributionData();
  const maxBinCount = Math.max(...distributionData.map(d => d.count), 0);
  const yAxisTicks = Array.from({ length: maxBinCount + 2 }, (_, i) => i);

  return (
    <div className="main-container" style={{ backgroundColor: '#0b0e14', minHeight: '100vh', color: '#fff', padding: '30px', paddingBottom: '80px', fontFamily: 'Inter, sans-serif' }}>
      
      <header style={{ textAlign: 'center', marginBottom: '40px' }}>
        <h1 style={{ margin: 0, fontSize: '32px', fontWeight: 'bold' }}>AI Student Evaluator</h1>
        <p style={{ margin: '8px 0 0 0', color: '#8892b0', fontSize: '15px' }}>
          Intelligent Cohort Analytics & Performance Tracking
        </p>
      </header>

      {!result ? (
        <div style={{ background: '#151921', padding: '30px', borderRadius: '8px', border: '1px solid #2d3748', maxWidth: '800px', margin: '0 auto' }}>
          <h2 style={{ borderBottom: '1px solid #2d3748', paddingBottom: '15px', marginBottom: '20px', marginTop: 0, textAlign: 'center' }}>Data Ingestion</h2>
          
          <label style={{ display: 'block', color: '#a0aec0', fontSize: '13px', marginBottom: '8px', textTransform: 'uppercase', fontWeight: 600 }}>Mentor Summary</label>
          <textarea 
            placeholder="Paste the class summary here..." 
            value={summary} 
            onChange={(e) => setSummary(e.target.value)} 
            style={{ width: '100%', height: '120px', background: '#0b0e14', color: '#fff', border: '1px solid #2d3748', borderRadius: '6px', padding: '15px', marginBottom: '20px', boxSizing: 'border-box', outline: 'none' }}
          />

          <label style={{ display: 'block', color: '#a0aec0', fontSize: '13px', marginBottom: '8px', textTransform: 'uppercase', fontWeight: 600 }}>WhatsApp Chat Log</label>
          <textarea 
            placeholder="Paste the chat logs here..." 
            value={chat} 
            onChange={(e) => setChat(e.target.value)} 
            style={{ width: '100%', height: '120px', background: '#0b0e14', color: '#fff', border: '1px solid #2d3748', borderRadius: '6px', padding: '15px', marginBottom: '25px', boxSizing: 'border-box', outline: 'none' }}
          />

          <div style={{ textAlign: 'center' }}>
            <button 
              onClick={handleStartEvaluation} 
              disabled={loading}
              style={{ background: '#3182ce', color: '#fff', padding: '15px 30px', border: 'none', borderRadius: '6px', cursor: loading ? 'not-allowed' : 'pointer', fontWeight: 'bold', fontSize: '15px' }}
            >
              {loading ? 'Processing via AI Engine...' : 'Start AI Evaluation'}
            </button>
          </div>
        </div>
      ) : (
        <div className="dashboard-print-area">
          
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '20px', marginBottom: '25px' }}>
            <div style={{ background: '#151921', padding: '20px', borderRadius: '8px', border: '1px solid #2d3748', display: 'flex', alignItems: 'center', gap: '15px' }}>
              <div style={{ background: 'rgba(49, 130, 206, 0.1)', padding: '15px', borderRadius: '8px', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#3182ce" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"></path><circle cx="9" cy="7" r="4"></circle><path d="M23 21v-2a4 4 0 0 0-3-3.87"></path><path d="M16 3.13a4 4 0 0 1 0 7.75"></path></svg>
              </div>
              <div>
                <p style={{ color: '#a0aec0', fontSize: '11px', margin: '0 0 5px 0', textTransform: 'uppercase', letterSpacing: '1px', fontWeight: 'bold' }}>Students Evaluated</p>
                <h2 style={{ margin: 0, fontSize: '28px' }}>{result.classAnalytics?.totalStudents || 0}</h2>
              </div>
            </div>
            
            <div style={{ background: '#151921', padding: '20px', borderRadius: '8px', border: '1px solid #2d3748', display: 'flex', alignItems: 'center', gap: '15px' }}>
              <div style={{ background: 'rgba(11, 197, 234, 0.1)', padding: '15px', borderRadius: '8px', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#0bc5ea" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="22 12 18 12 15 21 9 3 6 12 2 12"></polyline></svg>
              </div>
              <div>
                <p style={{ color: '#a0aec0', fontSize: '11px', margin: '0 0 5px 0', textTransform: 'uppercase', letterSpacing: '1px', fontWeight: 'bold' }}>Average Score</p>
                <h2 style={{ margin: 0, fontSize: '28px' }}>{result.classAnalytics?.averageScore?.toFixed(0) || 0}%</h2>
              </div>
            </div>
            
            <div style={{ background: '#151921', padding: '20px', borderRadius: '8px', border: '1px solid #2d3748', display: 'flex', alignItems: 'center', gap: '15px' }}>
              <div style={{ background: 'rgba(56, 161, 105, 0.1)', padding: '15px', borderRadius: '8px', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#38a169" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="8" r="7"></circle><polyline points="8.21 13.89 7 23 12 20 17 23 15.79 13.88"></polyline></svg>
              </div>
              <div>
                <p style={{ color: '#a0aec0', fontSize: '11px', margin: '0 0 5px 0', textTransform: 'uppercase', letterSpacing: '1px', fontWeight: 'bold' }}>Highest Score</p>
                <h2 style={{ margin: 0, fontSize: '28px' }}>{result.classAnalytics?.highestScorer?.score || 0}%</h2>
              </div>
            </div>
            
            <div style={{ background: '#151921', padding: '20px', borderRadius: '8px', border: '1px solid #2d3748', display: 'flex', alignItems: 'center', gap: '15px' }}>
              <div style={{ background: 'rgba(229, 62, 62, 0.1)', padding: '15px', borderRadius: '8px', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#e53e3e" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z"></path><line x1="12" y1="9" x2="12" y2="13"></line><line x1="12" y1="17" x2="12.01" y2="17"></line></svg>
              </div>
              <div>
                <p style={{ color: '#a0aec0', fontSize: '11px', margin: '0 0 5px 0', textTransform: 'uppercase', letterSpacing: '1px', fontWeight: 'bold' }}>Lowest Score</p>
                <h2 style={{ margin: 0, fontSize: '28px' }}>{getLowestScore()}%</h2>
              </div>
            </div>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr', gap: '20px', marginBottom: '25px' }}>
            
            <div style={{ background: '#151921', padding: '20px', borderRadius: '8px', border: '1px solid #2d3748', minHeight: '300px' }}>
              <h3 style={{ margin: '0 0 30px 0', fontSize: '16px' }}>Class Score Breakdown</h3>
              <div style={{ height: '220px', width: '100%' }}>
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={distributionData}>
                    <XAxis dataKey="name" stroke="#4a5568" tick={{ fill: '#718096', fontSize: 12 }} axisLine={{ stroke: '#2d3748' }} />
                    <YAxis 
                      stroke="#4a5568" 
                      tick={{ fill: '#718096', fontSize: 12 }} 
                      axisLine={{ stroke: '#2d3748' }} 
                      tickLine={false} 
                      ticks={yAxisTicks}
                      interval={0}       /* FIX: Forces all numbers to render regardless of space */
                      domain={[0, maxBinCount + 1]} 
                    />
                    <Bar dataKey="count" fill="#3182ce" radius={[4, 4, 0, 0]} barSize={40} />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </div>
            
            <div style={{ background: '#151921', padding: '20px', borderRadius: '8px', border: '1px solid #2d3748', minHeight: '300px', maxHeight: '300px', overflowY: 'auto' }}>
              <h3 style={{ margin: '0 0 20px 0', fontSize: '16px', color: '#fc8181' }}>Students who need attention</h3>
              <div>
                {attentionStudents.length > 0 ? (
                  attentionStudents.map((student, idx) => (
                    <div 
                      key={idx} 
                      style={{ 
                        display: 'flex', 
                        justifyContent: 'space-between', 
                        alignItems: 'center',
                        padding: '12px 15px', 
                        background: 'rgba(229, 62, 62, 0.08)', 
                        border: '1px solid #9b2c2c', 
                        borderRadius: '6px', 
                        marginBottom: '10px' 
                      }}
                    >
                      <span style={{ fontWeight: 'bold', fontSize: '14px', color: '#e2e8f0' }}>{student.studentName || 'Unknown Profile'}</span>
                      <span style={{ color: '#fc8181', fontWeight: 'bold', fontSize: '14px', background: 'rgba(252, 129, 129, 0.1)', padding: '4px 8px', borderRadius: '4px' }}>
                        {student.score}%
                      </span>
                    </div>
                  ))
                ) : (
                  <div style={{ color: '#a0aec0', textAlign: 'center', marginTop: '80px', fontSize: '14px' }}>
                    No students require immediate attention (All ≥ 40%).
                  </div>
                )}
              </div>
            </div>
          </div>

          <div style={{ background: '#151921', padding: '20px', borderRadius: '8px', border: '1px solid #2d3748', marginBottom: '30px' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
              <h3 style={{ margin: 0, fontSize: '18px' }}>Performance Report</h3>
              <input 
                type="text" 
                placeholder="🔍 Search Profiles..." 
                value={searchTerm}
                onChange={handleSearch}
                style={{ background: '#0b0e14', border: '1px solid #2d3748', padding: '10px 15px', borderRadius: '6px', color: '#fff', outline: 'none', width: '250px' }}
              />
            </div>
            
            <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left', fontSize: '14px' }}>
              <thead>
                <tr style={{ color: '#a0aec0', textTransform: 'uppercase', letterSpacing: '1px', fontSize: '12px', borderBottom: '1px solid #2d3748' }}>
                  <th style={{ padding: '15px 10px' }}>Rank</th>
                  <th style={{ padding: '15px 10px' }}>Student Pipeline Profile</th>
                  <th style={{ padding: '15px 10px' }}>Score</th>
                  <th style={{ padding: '15px 10px' }}>AI Confidence</th>
                  <th style={{ padding: '15px 10px' }}>Metric Classification</th>
                </tr>
              </thead>
              <tbody>
                {currentStudents.length > 0 ? (
                  currentStudents.map((student, index) => {
                    const actualRank = indexOfFirstStudent + index + 1;
                    const classification = getMetricClassification(student.score);
                    return (
                      <tr 
                        key={index} 
                        onClick={() => setSelectedStudent({ ...student, rank: actualRank })}
                        style={{ borderBottom: '1px solid #2d3748', cursor: 'pointer', transition: 'background-color 0.2s' }}
                        onMouseOver={(e) => e.currentTarget.style.backgroundColor = '#1e2430'}
                        onMouseOut={(e) => e.currentTarget.style.backgroundColor = 'transparent'}
                      >
                        <td style={{ padding: '15px 10px' }}>{actualRank}</td>
                        <td style={{ padding: '15px 10px', fontWeight: 'bold' }}>{student.studentName || 'Unknown Profile'}</td>
                        <td style={{ padding: '15px 10px', color: '#3182ce', fontWeight: 'bold' }}>{student.score}%</td>
                        <td style={{ padding: '15px 10px', color: '#a0aec0' }}>{student.confidence}%</td>
                        <td style={{ padding: '15px 10px' }}>
                          <span style={{ 
                            padding: '6px 12px', 
                            borderRadius: '4px', 
                            fontSize: '12px',
                            fontWeight: '600',
                            border: `1px solid ${classification.border}`,
                            color: classification.color,
                            backgroundColor: classification.bg
                          }}>
                            {classification.label}
                          </span>
                        </td>
                      </tr>
                    );
                  })
                ) : (
                  <tr>
                    <td colSpan="5" style={{ padding: '20px', textAlign: 'center', color: '#a0aec0' }}>No student profiles found.</td>
                  </tr>
                )}
              </tbody>
            </table>

            {/* Pagination Controls */}
            {totalPages > 1 && (
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: '20px', padding: '0 10px' }}>
                <button 
                  onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
                  disabled={currentPage === 1}
                  style={{ 
                    padding: '8px 16px', 
                    background: currentPage === 1 ? '#1a202c' : '#2d3748', 
                    color: currentPage === 1 ? '#4a5568' : '#fff', 
                    border: 'none', 
                    borderRadius: '4px', 
                    cursor: currentPage === 1 ? 'not-allowed' : 'pointer',
                    transition: 'background-color 0.2s'
                  }}
                >
                  Previous
                </button>
                <span style={{ color: '#a0aec0', fontSize: '13px' }}>
                  Page {currentPage} of {totalPages}
                </span>
                <button 
                  onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
                  disabled={currentPage === totalPages}
                  style={{ 
                    padding: '8px 16px', 
                    background: currentPage === totalPages ? '#1a202c' : '#2d3748', 
                    color: currentPage === totalPages ? '#4a5568' : '#fff', 
                    border: 'none', 
                    borderRadius: '4px', 
                    cursor: currentPage === totalPages ? 'not-allowed' : 'pointer',
                    transition: 'background-color 0.2s'
                  }}
                >
                  Next
                </button>
              </div>
            )}
          </div>

          <div style={{ display: 'flex', justifyContent: 'center', gap: '20px' }}>
            <button 
              onClick={handleReset}
              style={{ background: '#2d3748', color: '#fff', padding: '15px 30px', border: '1px solid #4a5568', borderRadius: '6px', cursor: 'pointer', fontWeight: 'bold', fontSize: '16px', transition: 'background 0.2s' }}
              onMouseOver={(e) => e.currentTarget.style.backgroundColor = '#4a5568'}
              onMouseOut={(e) => e.currentTarget.style.backgroundColor = '#2d3748'}
            >
              ↻ Evaluate Another Session
            </button>

            <button 
              onClick={generatePDFReport}
              style={{ background: 'transparent', color: '#fff', padding: '15px 30px', border: '1px solid #2d3748', borderRadius: '6px', cursor: 'pointer', fontWeight: 'bold', fontSize: '16px', transition: 'background 0.2s' }}
              onMouseOver={(e) => e.currentTarget.style.backgroundColor = '#1a202c'}
              onMouseOut={(e) => e.currentTarget.style.backgroundColor = 'transparent'}
            >
              📄 Export PDF Report
            </button>
          </div>

        </div>
      )}

      {selectedStudent && (
        <div style={{ position: 'fixed', top: 0, left: 0, right: 0, bottom: 0, backgroundColor: 'rgba(0, 0, 0, 0.7)', display: 'flex', justifyContent: 'center', alignItems: 'center', zIndex: 1000, padding: '20px' }}>
          
          <div style={{ background: '#151921', width: '100%', maxWidth: '750px', maxHeight: '90vh', overflowY: 'auto', borderRadius: '12px', border: '1px solid #2d3748', padding: '30px', position: 'relative', boxShadow: '0 20px 25px -5px rgba(0, 0, 0, 0.5)' }}>
            
            <button onClick={() => setSelectedStudent(null)} style={{ position: 'absolute', top: '25px', right: '25px', background: 'transparent', border: 'none', color: '#a0aec0', cursor: 'pointer', fontSize: '20px' }}>✕</button>
            
            <div style={{ textAlign: 'center', marginBottom: '25px', paddingRight: '20px' }}>
              <h2 style={{ margin: '0 0 5px 0', fontSize: '24px', color: '#fff' }}>{selectedStudent.studentName || 'Unknown Profile'}</h2>
              <p style={{ color: '#a0aec0', fontSize: '13px', margin: 0 }}>Rank Priority Matrix #{selectedStudent.rank} • Absolute Eval Score: {selectedStudent.score}%</p>
            </div>
            
            <h4 style={{ color: '#3182ce', fontSize: '11px', textTransform: 'uppercase', letterSpacing: '1px', marginBottom: '10px', textAlign: 'center' }}>Understanding Summary</h4>
            <p style={{ fontSize: '15px', lineHeight: '1.6', marginBottom: '30px', color: '#e2e8f0', textAlign: 'center' }}>{selectedStudent.understandingSummary || 'No summary available.'}</p>
            
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '25px', marginBottom: '30px' }}>
              <div>
                <h4 style={{ color: '#38a169', fontSize: '11px', textTransform: 'uppercase', letterSpacing: '1px', marginBottom: '10px', textAlign: 'center' }}>Proven Strengths</h4>
                {selectedStudent.strengths?.length > 0 ? selectedStudent.strengths.map((strength, i) => (
                  <div key={i} style={{ border: '1px solid #276749', color: '#68d391', padding: '12px 15px', borderRadius: '6px', fontSize: '13px', marginBottom: '10px', backgroundColor: 'rgba(39, 103, 73, 0.1)', textAlign: 'center' }}>{strength}</div>
                )) : <p style={{ color: '#a0aec0', fontSize: '13px', textAlign: 'center' }}>None identified.</p>}
              </div>
              <div>
                <h4 style={{ color: '#e53e3e', fontSize: '11px', textTransform: 'uppercase', letterSpacing: '1px', marginBottom: '10px', textAlign: 'center' }}>Missing Concepts & Gaps</h4>
                {selectedStudent.missingConcepts?.length > 0 ? selectedStudent.missingConcepts.map((concept, i) => (
                  <div key={i} style={{ border: '1px solid #9b2c2c', color: '#fc8181', padding: '12px 15px', borderRadius: '6px', fontSize: '13px', marginBottom: '10px', backgroundColor: 'rgba(155, 44, 44, 0.1)', textAlign: 'center' }}>{concept}</div>
                )) : <p style={{ color: '#a0aec0', fontSize: '13px', textAlign: 'center' }}>None identified.</p>}
              </div>
            </div>
            
            <h4 style={{ color: '#ecc94b', fontSize: '11px', textTransform: 'uppercase', letterSpacing: '1px', marginBottom: '10px', textAlign: 'center' }}>Mentor Architect Recommendations</h4>
            <div style={{ background: '#0b0e14', padding: '20px', borderRadius: '8px', fontSize: '14px', lineHeight: '1.6', border: '1px solid #2d3748', color: '#e2e8f0', marginBottom: '25px', textAlign: 'center' }}>
              {selectedStudent.mentorRecommendations || 'No recommendations provided.'}
            </div>
            
            <div style={{ background: '#1a202c', padding: '20px', borderRadius: '8px', border: '1px solid #2d3748', textAlign: 'center' }}>
              <div style={{ color: '#3182ce', fontSize: '11px', textTransform: 'uppercase', letterSpacing: '1px', fontWeight: 'bold', marginBottom: '8px' }}>Next Objective Learning Goal</div>
              <div style={{ fontSize: '15px', fontWeight: 'bold', color: '#fff' }}>{selectedStudent.nextLearningGoal || 'No objective generated.'}</div>
            </div>
            
          </div>
        </div>
      )}
    </div>
  );
}