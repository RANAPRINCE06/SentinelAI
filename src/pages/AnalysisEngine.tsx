import { useState, useRef } from "react";
import { UploadCloud, Search, CheckCircle2, ChevronRight, BarChart, ChevronDown, FileText } from "lucide-react";
import { motion, AnimatePresence } from "motion/react";

export function AnalysisEngine() {
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [complete, setComplete] = useState(false);
  const [file, setFile] = useState<File | null>(null);
  const [targetNode, setTargetNode] = useState("");
  const [expandedItem, setExpandedItem] = useState<number | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const startAnalysis = () => {
    setIsAnalyzing(true);
    setTimeout(() => {
      setIsAnalyzing(false);
      setComplete(true);
    }, 3000);
  };

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      setFile(e.target.files[0]);
      // Reset analysis states when new file uploaded
      setComplete(false);
    }
  };

  const toggleHistoryItem = (idx: number) => {
    if (expandedItem === idx) {
      setExpandedItem(null);
    } else {
      setExpandedItem(idx);
    }
  };

  return (
    <div className="max-w-5xl mx-auto space-y-8">
      <div>
        <h1 className="text-2xl font-display font-bold text-white tracking-tight">Analysis Engine</h1>
        <p className="text-sm text-slate-400 mt-1">Run complex ad-hoc queries against live datasets.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div 
          onClick={() => fileInputRef.current?.click()}
          className="glass-panel p-6 rounded-xl flex flex-col justify-center items-center text-center border-dashed border-2 border-slate-700/50 hover:border-indigo-500/50 transition-colors cursor-pointer group py-12"
        >
          <input 
            type="file" 
            className="hidden" 
            ref={fileInputRef} 
            onChange={handleFileUpload} 
            accept=".csv,.json,.txt"
          />
          {file ? (
             <div className="flex flex-col items-center">
               <div className="h-16 w-16 rounded-full bg-emerald-500/20 flex items-center justify-center mb-4 transition-colors">
                 <FileText className="h-8 w-8 text-emerald-400 transition-colors" />
               </div>
               <h3 className="text-lg font-medium text-white mb-2">{file.name}</h3>
               <p className="text-sm text-slate-400 max-w-xs cursor-pointer hover:text-indigo-400 transition-colors">
                 Click to change file
               </p>
             </div>
          ) : (
            <>
              <div className="h-16 w-16 rounded-full bg-slate-800 flex items-center justify-center mb-4 group-hover:bg-indigo-500/20 transition-colors">
                <UploadCloud className="h-8 w-8 text-slate-400 group-hover:text-indigo-400 transition-colors" />
              </div>
              <h3 className="text-lg font-medium text-white mb-2">Upload Dataset</h3>
              <p className="text-sm text-slate-400 max-w-xs">Drop CSV, JSON, or click to upload and begin processing.</p>
            </>
          )}
        </div>

        <div className="glass-panel p-6 rounded-xl flex flex-col justify-between">
          <div>
            <h3 className="text-lg font-medium text-white mb-4">Quick Analysis</h3>
            <div className="space-y-4">
              <div>
                <label className="block text-xs font-medium text-slate-400 mb-1 uppercase tracking-wider">Target Node</label>
                <div className="relative">
                  <Search className="absolute left-3 top-2.5 h-4 w-4 text-slate-500" />
                  <input 
                    type="text" 
                    value={targetNode}
                    onChange={(e) => setTargetNode(e.target.value)}
                    placeholder="e.g. #MarketTrends2026" 
                    className="w-full bg-slate-900 border border-slate-700 rounded-lg pl-10 pr-4 py-2 text-sm text-white focus:ring-1 focus:ring-indigo-500 focus:border-indigo-500" 
                  />
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-medium text-slate-400 mb-1 uppercase tracking-wider">Depth</label>
                  <select className="w-full bg-slate-900 border border-slate-700 rounded-lg px-3 py-2 text-sm text-white focus:ring-1 focus:ring-indigo-500">
                    <option>Standard (10k nodes)</option>
                    <option>Deep (50k nodes)</option>
                    <option>Max (100k nodes)</option>
                  </select>
                </div>
                <div>
                  <label className="block text-xs font-medium text-slate-400 mb-1 uppercase tracking-wider">Model</label>
                  <select className="w-full bg-slate-900 border border-slate-700 rounded-lg px-3 py-2 text-sm text-white focus:ring-1 focus:ring-indigo-500">
                    <option>Sentinel Fast-9</option>
                    <option>Sentinel Pro-12</option>
                  </select>
                </div>
              </div>
            </div>
          </div>
          <button 
            onClick={startAnalysis}
            disabled={(!file && targetNode.trim() === '') || isAnalyzing || complete}
            className="w-full mt-6 bg-indigo-600 hover:bg-indigo-500 disabled:opacity-50 disabled:cursor-not-allowed text-white font-medium py-2 rounded-lg transition-colors flex items-center justify-center gap-2 shadow-sm shadow-indigo-900"
          >
            {isAnalyzing ? (
              <><span className="animate-spin h-4 w-4 border-2 border-white/20 border-t-white rounded-full"></span> Processing...</>
            ) : complete ? (
              <><CheckCircle2 className="h-4 w-4" /> Analysis Complete</>
            ) : (
              "Initialize Analysis"
            )}
          </button>
        </div>
      </div>

      <AnimatePresence>
        {complete && (
          <motion.div 
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="glass-panel p-6 rounded-xl border-emerald-500/20 overflow-hidden"
          >
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-lg font-medium text-white flex items-center gap-2">
                <CheckCircle2 className="text-emerald-400 h-5 w-5" /> Results Generated
              </h3>
              <button className="text-sm text-indigo-400 flex items-center hover:text-indigo-300 transition-colors">
                Export Report <ChevronRight className="h-4 w-4" />
              </button>
            </div>
            
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
              <div className="bg-slate-900/50 rounded-lg p-4 border border-slate-800">
                <p className="text-xs text-slate-400 uppercase tracking-wider font-semibold mb-1">Dominant Sentiment</p>
                <p className="text-2xl font-display font-medium text-emerald-400">Positive (72%)</p>
              </div>
              <div className="bg-slate-900/50 rounded-lg p-4 border border-slate-800">
                <p className="text-xs text-slate-400 uppercase tracking-wider font-semibold mb-1">Key Entities</p>
                <p className="text-2xl font-display font-medium text-white">4,892 found</p>
              </div>
              <div className="bg-slate-900/50 rounded-lg p-4 border border-slate-800">
                <p className="text-xs text-slate-400 uppercase tracking-wider font-semibold mb-1">Confidence Score</p>
                <p className="text-2xl font-display font-medium text-indigo-400">98.4%</p>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* History */}
      <div className="glass-panel rounded-xl overflow-hidden">
        <div className="p-4 border-b border-slate-800">
          <h3 className="text-sm font-semibold text-white">Recent Analysis History</h3>
        </div>
        <div className="divide-y divide-slate-800">
          {[
            { name: "Competitor Q3 Mention Scan", status: "Complete", time: "2h ago", nodes: "14.2k", sentiment: "Neutral", entities: "1,204" },
            { name: "Brand Reputation Vector", status: "Complete", time: "1d ago", nodes: "8.9k", sentiment: "Positive", entities: "845" },
            { name: "Product Launch Fallback", status: "Complete", time: "3d ago", nodes: "52k", sentiment: "Mixed", entities: "5,120" },
          ].map((item, idx) => (
            <div key={idx} className="flex flex-col">
              <div 
                className="p-4 flex items-center justify-between hover:bg-slate-800/30 transition-colors cursor-pointer"
                onClick={() => toggleHistoryItem(idx)}
              >
                <div className="flex items-center gap-3">
                  <BarChart className="h-5 w-5 text-slate-500" />
                  <div>
                    <p className="text-sm font-medium text-slate-200">{item.name}</p>
                    <p className="text-xs text-slate-500">{item.nodes} nodes processed • {item.time}</p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <span className="inline-flex items-center rounded-full bg-emerald-400/10 px-2 py-1 text-xs font-medium text-emerald-400 ring-1 ring-inset ring-emerald-400/20">
                    {item.status}
                  </span>
                  {expandedItem === idx ? (
                    <ChevronDown className="h-4 w-4 text-slate-600" />
                  ) : (
                    <ChevronRight className="h-4 w-4 text-slate-600" />
                  )}
                </div>
              </div>
              <AnimatePresence>
                {expandedItem === idx && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: 'auto', opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    className="overflow-hidden"
                  >
                    <div className="px-12 pb-4 pt-1 grid grid-cols-2 sm:grid-cols-4 gap-4 bg-slate-900/20">
                      <div>
                        <p className="text-xs text-slate-500 uppercase tracking-wider">Nodes</p>
                        <p className="text-sm font-medium text-slate-300">{item.nodes}</p>
                      </div>
                      <div>
                        <p className="text-xs text-slate-500 uppercase tracking-wider">Sentiment</p>
                        <p className="text-sm font-medium text-slate-300">{item.sentiment}</p>
                      </div>
                      <div>
                        <p className="text-xs text-slate-500 uppercase tracking-wider">Entities</p>
                        <p className="text-sm font-medium text-slate-300">{item.entities}</p>
                      </div>
                      <div className="flex items-end">
                        <button className="text-xs text-indigo-400 hover:text-indigo-300 font-medium">
                          View Full Report
                        </button>
                      </div>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
