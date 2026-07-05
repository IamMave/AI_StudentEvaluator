import React from 'react';
import { useNavigate } from 'react-router-dom';

export default function Dashboard() {
  const navigate = useNavigate();

  return (
    // Outer wrapper matching the dark background color of your app
    <div className="min-h-screen bg-[#0b0f19] font-sans pt-6">
      
      {/* Centered container with max width */}
      <div className="max-w-7xl mx-auto px-4 pb-12">
        
        {/* Header */}
        <header className="flex justify-center items-center mb-10 relative">
          <div className="text-center"> 
            <h1 className="text-3xl font-bold text-white mb-1">AI Student Evaluator</h1>
            <p className="text-[#8c94a6] text-sm">Intelligent Cohort Analytics & Performance Tracking (Ollama Context Engine)</p>
          </div>
          
          {/*<div className="absolute right-0 flex gap-3">
             <button className="flex items-center gap-2 border border-gray-700 bg-transparent hover:bg-gray-800 transition px-3 py-1.5 rounded text-xs text-gray-300">
                <span>✨</span> CLASS INSIGHTS
             </button>
             <button className="flex items-center gap-2 border border-gray-700 bg-transparent hover:bg-gray-800 transition px-3 py-1.5 rounded text-xs text-gray-300">
                <span>📄</span> EXCEL
             </button>
             <button className="flex items-center gap-2 border border-gray-700 bg-transparent hover:bg-gray-800 transition px-3 py-1.5 rounded text-xs text-gray-300">
                <span>📄</span> PDF
             </button>
          </div>*/}
        </header>

        {/* Metric Cards - Icons removed, text centered */}
        <div className="grid grid-cols-4 gap-6 mb-8">
          <div className="bg-[#111526] border border-gray-800 p-6 rounded-xl flex flex-col items-center justify-center text-center shadow-sm">
            <span className="text-gray-400 text-xs font-bold tracking-wider uppercase mb-2">Students Evaluated</span>
            <span className="text-4xl font-bold text-white">3</span>
          </div>

          <div className="bg-[#111526] border border-gray-800 p-6 rounded-xl flex flex-col items-center justify-center text-center shadow-sm">
            <span className="text-gray-400 text-xs font-bold tracking-wider uppercase mb-2">Average Score</span>
            <span className="text-4xl font-bold text-white">72%</span>
          </div>

          <div className="bg-[#111526] border border-gray-800 p-6 rounded-xl flex flex-col items-center justify-center text-center shadow-sm">
            <span className="text-gray-400 text-xs font-bold tracking-wider uppercase mb-2">Highest Score</span>
            <span className="text-4xl font-bold text-white">85%</span>
          </div>

          <div className="bg-[#111526] border border-gray-800 p-6 rounded-xl flex flex-col items-center justify-center text-center shadow-sm">
            <span className="text-gray-400 text-xs font-bold tracking-wider uppercase mb-2">Lowest Score</span>
            <span className="text-4xl font-bold text-white">50%</span>
          </div>
        </div>

        {/* Charts Section - Titles centered */}
        <div className="grid grid-cols-3 gap-6 mb-8">
           <div className="col-span-2 bg-[#111526] border border-gray-800 p-6 rounded-xl min-h-[350px] flex flex-col">
              <h3 className="text-white font-semibold text-center mb-6">Score Distribution Grid</h3>
              <div className="flex-grow flex items-center justify-center text-gray-600 border border-dashed border-gray-700 rounded">
                  {/* Replace this div with your exact Bar Chart Component */}
                  [ Bar Chart Rendered Here ]
              </div>
           </div>
           <div className="col-span-1 bg-[#111526] border border-gray-800 p-6 rounded-xl min-h-[350px] flex flex-col">
              <h3 className="text-white font-semibold text-center mb-6">Metrics Confidence Matrix</h3>
              <div className="flex-grow flex items-center justify-center text-gray-600 border border-dashed border-gray-700 rounded">
                  {/* Replace this div with your exact Doughnut Chart Component */}
                  [ Doughnut Chart Rendered Here ]
              </div>
           </div>
        </div>

        {/* Performance Indexes Table Section */}
        <div className="bg-[#111526] border border-gray-800 p-6 rounded-xl">
          <div className="flex justify-between items-center mb-6">
             <h3 className="text-white font-semibold text-lg">Performance Indexes</h3>
             <div className="relative">
                <input 
                  type="text" 
                  placeholder="🔍 Search Profiles..." 
                  className="bg-[#0b0f19] border border-gray-700 text-sm text-gray-300 rounded-md px-3 py-2 w-64 focus:outline-none focus:border-blue-500"
                />
             </div>
          </div>
          
          <div className="w-full">
            <div className="grid grid-cols-6 text-xs font-bold text-gray-400 uppercase tracking-wider mb-4 px-4">
              <div>Rank</div>
              <div className="col-span-2">Student Pipeline Profile</div>
              <div>Score</div>
              <div>AI Confidence</div>
              <div>Metric Classification</div>
            </div>
            
            <div className="border-t border-gray-800">
              {/* Row 1 */}
              <div className="grid grid-cols-6 items-center py-4 px-4 border-b border-gray-800/50">
                <div className="text-white">1</div>
                <div className="col-span-2 text-white font-medium">Singh</div>
                <div className="text-blue-500 font-medium">85%</div>
                <div className="text-gray-400">90%</div>
                <div><span className="border border-green-800/50 text-green-500 px-3 py-1 rounded text-xs">On Track</span></div>
              </div>
              {/* Row 2 */}
              <div className="grid grid-cols-6 items-center py-4 px-4 border-b border-gray-800/50">
                <div className="text-white">2</div>
                <div className="col-span-2 text-white font-medium">Sharma</div>
                <div className="text-blue-500 font-medium">80%</div>
                <div className="text-gray-400">85%</div>
                <div><span className="border border-green-800/50 text-green-500 px-3 py-1 rounded text-xs">On Track</span></div>
              </div>
              {/* Row 3 */}
              <div className="grid grid-cols-6 items-center py-4 px-4">
                <div className="text-white">3</div>
                <div className="col-span-2 text-white font-medium">Yadav</div>
                <div className="text-blue-500 font-medium">50%</div>
                <div className="text-gray-400">70%</div>
                <div><span className="border border-yellow-800/50 text-yellow-500 px-3 py-1 rounded text-xs">Needs Improvement</span></div>
              </div>
            </div>
          </div>
        </div>

        {/* Evaluate Another Session Button */}
        <div className="mt-10 flex justify-center">
          <button
            onClick={() => navigate('/prompts')}
            className="px-8 py-3 bg-[#1e2336] hover:bg-[#2a314d] text-gray-200 border border-gray-600 rounded-md font-medium transition-all duration-200 shadow-sm"
          >
            Evaluate Another Session
          </button>
        </div>
        
      </div>
    </div>
  );
}