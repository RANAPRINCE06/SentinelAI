import { useState, useEffect } from "react";
import { FileText, Download, Calendar, Filter, Plus, FileSymlink, X, Loader2 } from "lucide-react";
import { motion, AnimatePresence } from "motion/react";

const initialReports = [
  { id: "REP-2026-06-A", name: "Weekly Sentiment Wrap-up", date: new Date().toLocaleDateString(), type: "PDF", size: "2.4 MB" },
  { id: "REP-2026-06-B", name: "Crisis Alert Post-Mortem", date: new Date(Date.now() - 86400000 * 2).toLocaleDateString(), type: "PDF", size: "4.1 MB" },
  { id: "REP-2026-06-C", name: "Raw Ingestion Data Dump", date: new Date(Date.now() - 86400000 * 3).toLocaleDateString(), type: "CSV", size: "145 MB" },
  { id: "REP-2026-06-D", name: "Monthly Executive Summary", date: new Date(Date.now() - 86400000 * 15).toLocaleDateString(), type: "PDF", size: "8.2 MB" },
  { id: "REP-2026-05-A", name: "Weekly Sentiment Wrap-up", date: new Date(Date.now() - 86400000 * 23).toLocaleDateString(), type: "PDF", size: "2.3 MB" },
];

export function Reports() {
  const [reports, setReports] = useState(initialReports);
  const [filterType, setFilterType] = useState<"All" | "PDF" | "CSV">("All");
  const [isGenerating, setIsGenerating] = useState(false);
  const [showFilter, setShowFilter] = useState(false);
  const [showExport, setShowExport] = useState(false);

  useEffect(() => {
    // Simulate real-time auto-generated reports from system alerts
    const interval = setInterval(() => {
      if (Math.random() > 0.7) {
        const newReport = {
          id: `REP-AUTO-${Math.floor(Math.random() * 10000)}`,
          name: "Automated Threat Alert Summary",
          date: new Date().toLocaleDateString(),
          type: Math.random() > 0.5 ? "PDF" : "CSV",
          size: `${(Math.random() * 10 + 1).toFixed(1)} MB`
        };
        setReports(prev => [newReport, ...prev]);
      }
    }, 12000); // Check every 12 seconds
    return () => clearInterval(interval);
  }, []);

  const handleGenerateReport = () => {
    setIsGenerating(true);
    setTimeout(() => {
      const newReport = {
        id: `REP-MANUAL-${Math.floor(Math.random() * 10000)}`,
        name: "Custom Execution Report",
        date: new Date().toLocaleDateString(),
        type: "PDF",
        size: "3.5 MB"
      };
      setReports(prev => [newReport, ...prev]);
      setIsGenerating(false);
    }, 2500);
  };

  const handleDownload = (report: any) => {
    if (report.type === "CSV") {
      const content = `ID,Report Name,Date,Type,Total Items\n${report.id},"${report.name}",${report.date},${report.type},${Math.floor(Math.random() * 5000) + 1000}\n`;
      const blob = new Blob([content], { type: "text/csv" });
      const url = URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = `${report.name.replace(/\s+/g, '_')}.csv`;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      URL.revokeObjectURL(url);
    } else {
      import("jspdf").then(({ jsPDF }) => {
        const doc = new jsPDF();
        doc.setFont("helvetica", "bold");
        doc.setFontSize(20);
        doc.text(report.name, 20, 30);
        
        doc.setFont("helvetica", "normal");
        doc.setFontSize(12);
        doc.text(`Report ID: ${report.id}`, 20, 45);
        doc.text(`Generated Date: ${report.date}`, 20, 55);
        doc.text(`Format: ${report.type}`, 20, 65);
        
        doc.text("---------------------------------------------------------", 20, 80);
        doc.text("This is an auto-generated intelligence report.", 20, 95);
        doc.text("All tracked signals, events, and metrics have been processed", 20, 105);
        doc.text("in real-time securely.", 20, 115);
        
        doc.save(`${report.name.replace(/\s+/g, '_')}.pdf`);
      });
    }
  };

  const filteredReports = reports.filter(r => filterType === "All" || r.type === filterType);

  return (
    <div className="space-y-6 max-w-5xl mx-auto">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h1 className="text-2xl font-display font-bold text-white tracking-tight flex items-center gap-3">
            Intelligence Reports
            <span className="flex h-3 w-3 relative">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-3 w-3 bg-emerald-500"></span>
            </span>
          </h1>
          <p className="text-sm text-slate-400 mt-1">Export, schedule, and review live generated summaries.</p>
        </div>
        <div className="flex gap-3 relative">
          <button 
            onClick={() => setShowFilter(!showFilter)}
            className={`px-4 py-2 rounded-md text-sm font-medium transition-colors flex items-center gap-2 ${showFilter ? 'bg-indigo-600 text-white' : 'bg-slate-800 hover:bg-slate-700 text-white'}`}
          >
            <Filter className="h-4 w-4" /> Filter {filterType !== "All" && `(${filterType})`}
          </button>
          
          {showFilter && (
            <div className="absolute top-12 left-0 w-48 bg-slate-800 border border-slate-700 rounded-md shadow-xl py-2 z-10">
              <div className="px-3 pb-2 mb-2 border-b border-slate-700 text-xs font-semibold text-slate-400 uppercase">File Type</div>
              <button onClick={() => { setFilterType("All"); setShowFilter(false); }} className={`w-full text-left px-4 py-2 text-sm ${filterType === "All" ? "text-indigo-400 bg-slate-700/50" : "text-slate-300 hover:bg-slate-700/50"}`}>All Reports</button>
              <button onClick={() => { setFilterType("PDF"); setShowFilter(false); }} className={`w-full text-left px-4 py-2 text-sm ${filterType === "PDF" ? "text-indigo-400 bg-slate-700/50" : "text-slate-300 hover:bg-slate-700/50"}`}>PDF Only</button>
              <button onClick={() => { setFilterType("CSV"); setShowFilter(false); }} className={`w-full text-left px-4 py-2 text-sm ${filterType === "CSV" ? "text-indigo-400 bg-slate-700/50" : "text-slate-300 hover:bg-slate-700/50"}`}>CSV Only</button>
            </div>
          )}

          <div className="relative">
            <button 
              onClick={() => setShowExport(!showExport)}
              className="bg-indigo-600/20 hover:bg-indigo-500/30 text-indigo-400 border border-indigo-500/30 px-4 py-2 rounded-md text-sm font-medium transition-colors flex items-center gap-2 shadow-sm"
            >
              <Download className="h-4 w-4" /> Export Analytics
            </button>
            
            {showExport && (
              <div className="absolute top-12 left-0 w-48 bg-slate-800 border border-slate-700 rounded-md shadow-xl py-2 z-10">
                <div className="px-3 pb-2 mb-2 border-b border-slate-700 text-xs font-semibold text-slate-400 uppercase">Export Format</div>
                <button 
                  onClick={() => {
                    handleDownload({ id: `EXP-${Date.now()}`, name: "Current Analytics Export", date: new Date().toLocaleDateString(), type: "CSV", size: "1.2 MB" });
                    setShowExport(false);
                  }}
                  className="w-full text-left px-4 py-2 text-sm text-slate-300 hover:bg-slate-700/50"
                >
                  Download as CSV
                </button>
                <button 
                  onClick={() => {
                    handleDownload({ id: `EXP-${Date.now()}`, name: "Current Analytics Export", date: new Date().toLocaleDateString(), type: "PDF", size: "1.2 MB" });
                    setShowExport(false);
                  }}
                  className="w-full text-left px-4 py-2 text-sm text-slate-300 hover:bg-slate-700/50"
                >
                  Download as PDF
                </button>
              </div>
            )}
          </div>
          
          <button 
            onClick={handleGenerateReport}
            disabled={isGenerating}
            className="bg-indigo-600 hover:bg-indigo-500 text-white px-4 py-2 rounded-md text-sm font-medium transition-colors flex items-center gap-2 shadow-sm shadow-indigo-900 disabled:opacity-75 disabled:cursor-wait w-48 justify-center"
          >
            {isGenerating ? (
              <><Loader2 className="h-4 w-4 animate-spin" /> Generating...</>
            ) : (
              <><Plus className="h-4 w-4" /> Generate New</>
            )}
          </button>
        </div>
      </div>

      <div className="glass-panel rounded-xl overflow-hidden shadow-xl border border-slate-800">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm text-slate-300">
            <thead className="bg-slate-900/80 text-xs uppercase text-slate-500 border-b border-slate-800">
              <tr>
                <th className="px-6 py-4 font-semibold">Report Name</th>
                <th className="px-6 py-4 font-semibold">Generation Date</th>
                <th className="px-6 py-4 font-semibold">Format</th>
                <th className="px-6 py-4 font-semibold">Size</th>
                <th className="px-6 py-4 font-semibold text-right">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800/60 relative">
              <AnimatePresence>
                {filteredReports.map((report) => (
                  <motion.tr 
                    key={report.id} 
                    initial={{ opacity: 0, backgroundColor: "#312e81" }}
                    animate={{ opacity: 1, backgroundColor: "transparent" }}
                    exit={{ opacity: 0, scale: 0.95 }}
                    transition={{ duration: 0.8 }}
                    className="hover:bg-slate-800/40 transition-colors group"
                  >
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-3">
                        <div className="h-10 w-10 rounded bg-slate-800 flex items-center justify-center text-indigo-400 group-hover:bg-indigo-500/10 group-hover:text-indigo-300 transition-colors">
                          <FileText className="h-5 w-5" />
                        </div>
                        <div>
                          <div className="font-medium text-white">{report.name}</div>
                          <div className="font-mono text-xs text-slate-500">{report.id}</div>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-2 text-slate-400">
                        <Calendar className="h-4 w-4" /> {report.date}
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <span className={`inline-flex items-center rounded-md px-2 py-1 text-xs font-medium ring-1 ring-inset ${
                        report.type === 'PDF' ? 'bg-red-400/10 text-red-400 ring-red-400/20' : 'bg-green-400/10 text-green-400 ring-green-400/20'
                      }`}>
                        {report.type}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-slate-400 font-mono text-xs">{report.size}</td>
                    <td className="px-6 py-4 text-right">
                      <button 
                        onClick={() => handleDownload(report)}
                        className="text-indigo-400 hover:text-indigo-300 p-2 rounded-full hover:bg-slate-800 transition-colors"
                        title="Download"
                      >
                        <Download className="h-5 w-5" />
                      </button>
                    </td>
                  </motion.tr>
                ))}
              </AnimatePresence>
              {filteredReports.length === 0 && (
                <tr>
                  <td colSpan={5} className="px-6 py-8 text-center text-slate-500">
                    No reports match your filter criteria.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
