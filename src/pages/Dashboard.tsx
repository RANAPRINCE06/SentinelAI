import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, BarChart, Bar } from 'recharts';
import { ArrowUpRight, ArrowDownRight, Users, MessageSquare, TrendingUp, AlertTriangle } from "lucide-react";
import { useDashboardData } from "../hooks/useDashboardData";

export function Dashboard() {
  const [timeline, setTimeline] = useState<"24h" | "7d" | "30d">("24h");
  const { feed, chartData } = useDashboardData(timeline);

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-display font-bold text-white tracking-tight">Global Dashboard</h1>
          <p className="text-sm text-slate-400 mt-1">Real-time overview of your digital perimeter.</p>
        </div>
        <div className="flex items-center gap-3">
          <select 
            value={timeline} 
            onChange={(e) => setTimeline(e.target.value as "24h" | "7d" | "30d")}
            className="bg-slate-900 border border-slate-700 text-sm rounded-md px-3 py-1.5 focus:outline-none focus:ring-1 focus:ring-indigo-500 text-slate-300"
          >
            <option value="24h">Last 24 Hours</option>
            <option value="7d">Last 7 Days</option>
            <option value="30d">Last 30 Days</option>
          </select>
        </div>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {chartData.kpis.map((stat, i) => {
          const Icon = stat.icon;
          return (
            <motion.div 
              key={`${timeline}-${i}`}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1 }}
              className="glass-panel p-5 rounded-xl flex flex-col"
            >
              <div className="flex justify-between items-start mb-4">
                <div className="h-8 w-8 rounded-md bg-slate-800 flex items-center justify-center">
                  <Icon className="h-4 w-4 text-slate-400" />
                </div>
                <span className={`inline-flex items-center gap-1 text-xs font-medium ${stat.positive ? 'text-emerald-400' : 'text-rose-400'}`}>
                  {stat.change} {stat.positive ? <ArrowUpRight className="h-3 w-3" /> : <ArrowDownRight className="h-3 w-3" />}
                </span>
              </div>
              <div className="mt-auto">
                <span className="text-3xl font-display font-bold text-white">{stat.value}</span>
                <p className="text-sm text-slate-400 mt-1">{stat.label}</p>
              </div>
            </motion.div>
          )
        })}
      </div>

      {/* Main Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="glass-panel p-6 rounded-xl lg:col-span-2">
          <h2 className="text-lg font-semibold text-white mb-6">Sentiment & Volume Correlation</h2>
          <div className="h-72 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={chartData.trendData} margin={{ top: 0, right: 0, left: -20, bottom: 0 }}>
                <defs>
                  <linearGradient id="colorVolume" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#6366f1" stopOpacity={0.3}/>
                    <stop offset="95%" stopColor="#6366f1" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="#1e293b" vertical={false} />
                <XAxis dataKey="time" stroke="#475569" fontSize={12} tickLine={false} axisLine={false} />
                <YAxis stroke="#475569" fontSize={12} tickLine={false} axisLine={false} />
                <Tooltip 
                  contentStyle={{ backgroundColor: '#0f172a', borderColor: '#1e293b', borderRadius: '8px' }}
                  itemStyle={{ color: '#e2e8f0' }}
                />
                <Area type="monotone" dataKey="volume" stroke="#6366f1" strokeWidth={2} fillOpacity={1} fill="url(#colorVolume)" />
                <Area type="monotone" dataKey="sentiment" stroke="#10b981" strokeWidth={2} fillOpacity={0} />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="glass-panel p-6 rounded-xl">
          <h2 className="text-lg font-semibold text-white mb-6">Trending Topics</h2>
          <div className="h-72 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={chartData.topicData} layout="vertical" margin={{ top: 0, right: 0, left: 0, bottom: 0 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="#1e293b" horizontal={false} />
                <XAxis type="number" stroke="#475569" fontSize={12} tickLine={false} axisLine={false} />
                <YAxis dataKey="name" type="category" stroke="#94a3b8" fontSize={12} tickLine={false} axisLine={false} width={80} />
                <Tooltip 
                  cursor={{fill: '#1e293b'}}
                  contentStyle={{ backgroundColor: '#0f172a', borderColor: '#1e293b', borderRadius: '8px' }} 
                />
                <Bar dataKey="count" fill="#8b5cf6" radius={[0, 4, 4, 0]} barSize={20} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>
      
      {/* Live Stream Table Preview */}
      <div className="glass-panel rounded-xl overflow-hidden">
        <div className="p-6 border-b border-slate-800 flex justify-between items-center">
          <h2 className="text-lg font-semibold text-white">Live Data Feed</h2>
          <span className="flex h-2 w-2 relative">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-indigo-400 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2 w-2 bg-indigo-500"></span>
          </span>
        </div>
        <div className="overflow-x-auto overflow-hidden">
          <table className="w-full text-left text-sm text-slate-400 table-fixed">
            <thead className="bg-slate-900/50 text-xs uppercase text-slate-500">
              <tr>
                <th className="px-6 py-3 font-medium w-32">Source</th>
                <th className="px-6 py-3 font-medium w-[32rem]">Content Snippet</th>
                <th className="px-6 py-3 font-medium w-32">Sentiment</th>
                <th className="px-6 py-3 font-medium w-32">Time</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800/60 relative h-[250px]">
              <AnimatePresence>
                {feed.map((row) => (
                  <motion.tr 
                    key={row.id} 
                    initial={{ opacity: 0, backgroundColor: "#312e81" }} // dark indigo highlight on entry
                    animate={{ opacity: 1, backgroundColor: "transparent" }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 1 }}
                    className="hover:bg-slate-800/30"
                  >
                    <td className="px-6 py-4 whitespace-nowrap font-medium text-slate-300">{row.source}</td>
                    <td className="px-6 py-4 truncate max-w-md">{row.text}</td>
                    <td className={`px-6 py-4 ${row.color}`}>{row.sentiment}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-slate-500 font-mono text-xs">{row.time}</td>
                  </motion.tr>
                ))}
              </AnimatePresence>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
