import { useState, useEffect } from "react";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, RadialBarChart, RadialBar, Legend } from "recharts";
import { ShieldAlert, Activity, CheckCircle, Clock } from "lucide-react";
import { motion } from "motion/react";

const initialPerformanceData = [
  { name: 'Jan', processed: 4000, alerts: 240 },
  { name: 'Feb', processed: 3000, alerts: 139 },
  { name: 'Mar', processed: 2000, alerts: 980 },
  { name: 'Apr', processed: 2780, alerts: 390 },
  { name: 'May', processed: 1890, alerts: 480 },
  { name: 'Jun', processed: 2390, alerts: 380 },
  { name: 'Jul', processed: 3490, alerts: 430 },
];

const initialEmotionData = [
  { name: 'Joy', count: 45, fill: '#10b981' },
  { name: 'Surprise', count: 20, fill: '#3b82f6' },
  { name: 'Neutral', count: 18, fill: '#64748b' },
  { name: 'Sadness', count: 10, fill: '#f59e0b' },
  { name: 'Anger', count: 7, fill: '#ef4444' },
];

export function PerformanceAnalytics() {
  const [performanceData, setPerformanceData] = useState(initialPerformanceData);
  const [emotionData, setEmotionData] = useState(initialEmotionData);
  const [stats, setStats] = useState([
    { label: "Model Accuracy (F1)", value: "0.94", suffix: "", icon: CheckCircle, color: "text-emerald-400" },
    { label: "Avg Inference Time", value: "45", suffix: "ms", icon: Clock, color: "text-indigo-400" },
    { label: "Throughput", value: "1.2", suffix: "M/day", icon: Activity, color: "text-blue-400" },
    { label: "False Positive Rate", value: "2.4", suffix: "%", icon: ShieldAlert, color: "text-amber-400" }
  ]);

  useEffect(() => {
    const interval = setInterval(() => {
      setPerformanceData(prev => {
        const newData = [...prev];
        const lastIdx = newData.length - 1;
        newData[lastIdx] = {
          ...newData[lastIdx],
          processed: newData[lastIdx].processed + Math.floor(Math.random() * 50),
          alerts: newData[lastIdx].alerts + Math.floor(Math.random() * 5)
        };
        return newData;
      });

      setEmotionData(prev => {
        const newData = [...prev];
        const randIdx = Math.floor(Math.random() * newData.length);
        newData[randIdx] = {
          ...newData[randIdx],
          count: newData[randIdx].count + Math.floor(Math.random() * 3)
        };
        return newData;
      });

      setStats(prev => {
        const newStats = [...prev];
        // Fluctuate inference time
        const currentInference = parseFloat(newStats[1].value);
        newStats[1].value = Math.max(20, Math.min(100, currentInference + (Math.random() * 4 - 2))).toFixed(1);
        
        // Fluctuate FP rate slightly
        const currentFp = parseFloat(newStats[3].value);
        newStats[3].value = Math.max(0.1, Math.min(5.0, currentFp + (Math.random() * 0.2 - 0.1))).toFixed(2);
        
        return newStats;
      });
    }, 3000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-display font-bold text-white tracking-tight flex items-center gap-3">
          System Performance & ML Metrics
          <span className="flex h-3 w-3 relative">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-indigo-400 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-3 w-3 bg-indigo-500"></span>
          </span>
        </h1>
        <p className="text-sm text-slate-400 mt-1">Detailed evaluation of NLP models and ingestion handlers with real-time telemetry.</p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {stats.map((stat, i) => {
          const Icon = stat.icon;
          return (
            <div key={i} className="glass-panel p-5 rounded-xl border-l-4 transition-all duration-300" style={{borderLeftColor: stat.color.replace('text-', '')}}>
              <div className="flex justify-between items-start">
                <p className="text-sm text-slate-400">{stat.label}</p>
                <Icon className={`h-5 w-5 ${stat.color}`} />
              </div>
              <p className="text-3xl font-display font-bold text-white mt-2">
                <motion.span key={stat.value} initial={{ opacity: 0.5, y: -5 }} animate={{ opacity: 1, y: 0 }}>
                  {stat.value}
                </motion.span>
                {stat.suffix}
              </p>
            </div>
          )
        })}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="glass-panel p-6 rounded-xl">
          <h2 className="text-lg font-semibold text-white mb-6">Historical Processing Volume</h2>
          <div className="h-80 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={performanceData} margin={{ top: 20, right: 30, left: 0, bottom: 0 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="#1e293b" vertical={false} />
                <XAxis dataKey="name" stroke="#64748b" tickLine={false} axisLine={false} />
                <YAxis stroke="#64748b" tickLine={false} axisLine={false} />
                <Tooltip 
                  contentStyle={{ backgroundColor: '#0f172a', borderColor: '#1e293b', borderRadius: '8px' }}
                  itemStyle={{ color: '#e2e8f0' }}
                  cursor={{fill: '#1e293b'}}
                />
                <Bar dataKey="processed" name="Text Processed" fill="#6366f1" radius={[4, 4, 0, 0]} />
                <Bar dataKey="alerts" name="Alerts Generated" fill="#fbbf24" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
        
        <div className="glass-panel p-6 rounded-xl">
          <h2 className="text-lg font-semibold text-white mb-6">Emotion Classification Breakdown</h2>
          <div className="h-80 w-full flex items-center justify-center">
             <ResponsiveContainer width="100%" height="100%">
              <RadialBarChart cx="50%" cy="50%" innerRadius="20%" outerRadius="90%" barSize={20} data={emotionData}>
                <RadialBar
                  minAngle={15}
                  background={{ fill: '#1e293b' }}
                  clockWise
                  dataKey="count"
                  cornerRadius={10}
                />
                <Legend iconSize={10} layout="vertical" verticalAlign="middle" wrapperStyle={{ right: 0, color: '#e2e8f0' }} />
                <Tooltip contentStyle={{ backgroundColor: '#0f172a', borderColor: '#1e293b', borderRadius: '8px' }} />
              </RadialBarChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>
    </div>
  );
}
