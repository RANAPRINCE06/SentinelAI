import { useState, useEffect } from "react";
import { Activity, Signal, Zap, AlertTriangle } from "lucide-react";
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";

const generateData = () => {
  const data = [];
  let time = new Date();
  for (let i = 0; i < 20; i++) {
    data.push({
      time: time.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', second: '2-digit' }),
      events: Math.floor(Math.random() * 100) + 20,
    });
    time.setSeconds(time.getSeconds() - 10);
  }
  return data.reverse();
};

const mockTweets = [
  { user: "@tech_guru", text: "The new AI processing framework is unbelievably fast! #Tech2026", sentiment: "positive" },
  { user: "@market_watcher", text: "Seeing some network latency in the US-east region. Anyone else?", sentiment: "negative" },
  { user: "@data_nerd", text: "Just ingested 5TB of training data without breaking a sweat.", sentiment: "positive" },
  { user: "@random_user42", text: "I can't seem to get the API to authenticate properly today :(", sentiment: "negative" },
  { user: "@system_ops", text: "Deploying the latest security patch across all nodes.", sentiment: "neutral" },
  { user: "@dev_life", text: "Wow, the new dashboard interface is so clean and responsive.", sentiment: "positive" },
  { user: "@cloud_architect", text: "Scaling up cluster to handle the sudden traffic spike.", sentiment: "neutral" },
  { user: "@angry_customer", text: "Why is the service completely down right now?! Unacceptable.", sentiment: "negative" },
];

export function RealTimeHub() {
  const [data, setData] = useState(generateData());
  const [feed, setFeed] = useState([
    { id: 1, type: 'neutral', user: '@system_ops', message: 'Stream initialized. Awaiting tweets...', time: 'Just now' },
    { id: 2, type: 'positive', user: '@tech_guru', message: 'The new AI processing framework is unbelievably fast! #Tech2026', time: '1m ago' },
    { id: 3, type: 'negative', user: '@market_watcher', message: 'Seeing some network latency in the US-east region. Anyone else?', time: '3m ago' },
  ]);

  useEffect(() => {
    const interval = setInterval(() => {
      setData(current => {
        const newData = [...current.slice(1)];
        newData.push({
          time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', second: '2-digit' }),
          events: Math.floor(Math.random() * 100) + 20,
        });
        return newData;
      });

      // Simulate incoming tweets
      if (Math.random() > 0.4) {
        setFeed(current => {
          const randomTweet = mockTweets[Math.floor(Math.random() * mockTweets.length)];
          const newTweet = {
            id: Date.now(),
            type: randomTweet.sentiment,
            user: randomTweet.user,
            message: randomTweet.text,
            time: 'Just now'
          };
          // Update times of existing items
          const updatedFeed = current.map(item => {
            if (item.time === 'Just now') return { ...item, time: '10s ago' };
            return item;
          });
          return [newTweet, ...updatedFeed].slice(0, 10); // keep last 10 tweets
        });
      }
    }, 10000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-display font-bold text-white tracking-tight flex items-center gap-3">
          Real-Time Hub 
          <span className="flex h-3 w-3 relative">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-3 w-3 bg-emerald-500"></span>
          </span>
        </h1>
        <p className="text-sm text-slate-400 mt-1">Live streaming ingestion and rapid alerting via WebSocket.</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 space-y-6">
          <div className="glass-panel p-6 rounded-xl">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-lg font-semibold text-white flex items-center gap-2">
                <Activity className="h-5 w-5 text-indigo-400" /> Live Ingestion Velocity
              </h2>
              <div className="text-sm font-mono text-emerald-400 bg-emerald-400/10 px-2 py-1 rounded">
                ~ {data[data.length - 1].events * 12} req/sec
              </div>
            </div>
            <div className="h-72 w-full">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={data} margin={{ top: 0, right: 0, left: -20, bottom: 0 }}>
                  <defs>
                    <linearGradient id="colorVelocity" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#10b981" stopOpacity={0.3}/>
                      <stop offset="95%" stopColor="#10b981" stopOpacity={0}/>
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" stroke="#1e293b" vertical={false} />
                  <XAxis dataKey="time" stroke="#475569" fontSize={12} tickLine={false} axisLine={false} />
                  <YAxis stroke="#475569" fontSize={12} tickLine={false} axisLine={false} />
                  <Tooltip 
                    contentStyle={{ backgroundColor: '#0f172a', borderColor: '#1e293b', borderRadius: '8px' }}
                    itemStyle={{ color: '#e2e8f0' }}
                  />
                  <Area type="step" dataKey="events" stroke="#10b981" strokeWidth={2} fillOpacity={1} fill="url(#colorVelocity)" animationDuration={300} />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </div>
          
          <div className="grid grid-cols-2 gap-4">
            <div className="glass-panel p-5 rounded-xl">
               <h3 className="text-sm font-medium text-slate-400 mb-2">WebSocket Connection</h3>
               <div className="flex items-center gap-2 text-white font-medium">
                 <Signal className="h-5 w-5 text-emerald-400" /> Connected
               </div>
               <p className="text-xs text-slate-500 mt-2 font-mono">wss://api.sentinel.ai/stream</p>
            </div>
            <div className="glass-panel p-5 rounded-xl">
               <h3 className="text-sm font-medium text-slate-400 mb-2">Processing Latency</h3>
               <div className="flex items-center gap-2 text-white font-medium">
                 <Zap className="h-5 w-5 text-amber-400" /> 42ms avg
               </div>
               <p className="text-xs text-slate-500 mt-2 font-mono">p99: 115ms</p>
            </div>
          </div>
        </div>

        <div className="glass-panel rounded-xl overflow-hidden flex flex-col h-[500px]">
          <div className="p-4 border-b border-slate-800 bg-slate-900/50 flex items-center justify-between">
            <h2 className="text-lg font-semibold text-white">Live Twitter Stream</h2>
            <div className="text-xs font-medium bg-[#1DA1F2]/10 text-[#1DA1F2] px-2 py-1 rounded-full flex items-center gap-1">
              <span className="h-2 w-2 rounded-full bg-[#1DA1F2] animate-pulse"></span>
              Live
            </div>
          </div>
          <div className="flex-1 overflow-y-auto p-4 space-y-4">
            {feed.map((item) => (
              <div key={item.id} className="p-3 bg-slate-800/30 rounded-lg border border-slate-700/50">
                <div className="flex justify-between items-start mb-2">
                  <div className="flex items-center gap-2">
                    <div className="h-6 w-6 rounded-full bg-slate-700 flex items-center justify-center text-xs font-bold text-white">
                      {item.user.charAt(1).toUpperCase()}
                    </div>
                    <span className="text-sm font-medium text-slate-200">{item.user}</span>
                  </div>
                  <span className="text-xs text-slate-500 font-mono">{item.time}</span>
                </div>
                <p className="text-sm text-slate-300 mb-2">{item.message}</p>
                <div className="flex items-center gap-2">
                  <span className={`text-[10px] uppercase tracking-wider font-bold px-2 py-0.5 rounded-full ${
                    item.type === 'negative' ? 'bg-rose-500/10 text-rose-400 border border-rose-500/20' : 
                    item.type === 'positive' ? 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/20' : 
                    'bg-slate-500/10 text-slate-400 border border-slate-500/20'
                  }`}>
                    {item.type} sentiment
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
