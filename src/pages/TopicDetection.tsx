import { Eye, Hash, TrendingUp } from "lucide-react";
import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";

const initialTopics = [
  { id: 1, name: "Product Launch", volume: 12450, growth: "+45%", sentiment: 82, size: "lg" },
  { id: 2, name: "Customer Support", volume: 8320, growth: "-12%", sentiment: 45, size: "md" },
  { id: 3, name: "Pricing Update", volume: 15400, growth: "+120%", sentiment: 30, size: "xl" },
  { id: 4, name: "API Downtime", volume: 5200, growth: "+300%", sentiment: 15, size: "md" },
  { id: 5, name: "New Feature", volume: 3100, growth: "+20%", sentiment: 90, size: "sm" },
  { id: 6, name: "Integration", volume: 2800, growth: "+5%", sentiment: 75, size: "sm" },
];

const initialEntities = [
  { id: 1, name: "@competitor", mentions: 12000 },
  { id: 2, name: "CEO Name", mentions: 4000 },
  { id: 3, name: "Product X", mentions: 22000 },
];

export function TopicDetection() {
  const [topics, setTopics] = useState(initialTopics);
  const [entities, setEntities] = useState(initialEntities);

  useEffect(() => {
    const interval = setInterval(() => {
      // Simulate volume and sentiment realistic fluctuation
      setTopics(prev => prev.map(topic => {
        const volChange = Math.floor(Math.random() * 15);
        let newSentiment = topic.sentiment + (Math.floor(Math.random() * 5) - 2);
        newSentiment = Math.max(0, Math.min(100, newSentiment));
        
        const newVolume = topic.volume + volChange;
        let newSize = topic.size;
        // Dynamically adjust size based on volume thresholds
        if (newVolume > 15000) newSize = "xl";
        else if (newVolume > 10000) newSize = "lg";
        else if (newVolume > 5000) newSize = "md";
        else newSize = "sm";

        return { ...topic, volume: newVolume, sentiment: newSentiment, size: newSize };
      }));

      // Simulate entity mentions going up
      setEntities(prev => prev.map(entity => ({
        ...entity,
        mentions: entity.mentions + Math.floor(Math.random() * 5)
      })));
    }, 2500);

    return () => clearInterval(interval);
  }, []);

  const fastMovingTopics = [...topics].sort((a,b) => parseInt(b.growth) - parseInt(a.growth)).slice(0, 3);

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-display font-bold text-white tracking-tight flex items-center gap-3">
          Topic Detection
          <span className="flex h-3 w-3 relative">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-3 w-3 bg-emerald-500"></span>
          </span>
        </h1>
        <p className="text-sm text-slate-400 mt-1">Real-time extraction of themes and entities from unstructured text streams.</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        <div className="lg:col-span-3 glass-panel p-8 rounded-xl min-h-[500px] relative flex items-center justify-center overflow-hidden">
          {/* Conceptual representation of a topic cluster/bubble chart */}
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-indigo-900/20 via-[#0B0E14] to-[#0B0E14]"></div>
          
          <div className="relative w-full h-full min-h-[400px] flex items-center justify-center p-8">
            <div className="flex flex-wrap items-center justify-center gap-6 max-w-3xl">
              <AnimatePresence>
                {topics.map((topic) => {
                  const colorClass = topic.sentiment > 60 ? "border-emerald-500/50 bg-emerald-500/10 text-emerald-300" :
                                     topic.sentiment < 40 ? "border-rose-500/50 bg-rose-500/10 text-rose-300" :
                                     "border-amber-500/50 bg-amber-500/10 text-amber-300";
                  
                  const sizeClass = topic.size === 'xl' ? "p-8 text-xl" :
                                    topic.size === 'lg' ? "p-6 text-lg" :
                                    topic.size === 'md' ? "p-4 text-base" : "p-3 text-sm";
                                    
                  return (
                    <motion.div 
                      key={topic.id}
                      layout
                      initial={{ scale: 0, opacity: 0 }}
                      animate={{ scale: 1, opacity: 1 }}
                      transition={{ type: "spring", stiffness: 300, damping: 20 }}
                      className={`rounded-full border backdrop-blur-md flex flex-col items-center justify-center shadow-lg transition-colors cursor-pointer ${colorClass} ${sizeClass} aspect-square hover:scale-110`}
                    >
                      <span className="font-semibold text-center leading-tight">#{topic.name.replace(' ', '')}</span>
                      {topic.size !== 'sm' && <motion.span key={topic.volume} initial={{ opacity: 0 }} animate={{ opacity: 0.8 }} className="opacity-80 text-xs mt-1 font-mono">{topic.volume.toLocaleString()}</motion.span>}
                    </motion.div>
                  )
                })}
              </AnimatePresence>
            </div>
          </div>
        </div>

        <div className="space-y-4">
          <div className="glass-panel p-5 rounded-xl">
            <h3 className="text-sm font-semibold text-white flex items-center gap-2 mb-4">
              <TrendingUp className="h-4 w-4 text-indigo-400" /> Fast Moving Topics
            </h3>
            <ul className="space-y-3">
              <AnimatePresence mode="popLayout">
                {fastMovingTopics.map((t) => (
                  <motion.li 
                    key={t.id}
                    layout
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ type: "spring" }}
                    className="flex justify-between items-center text-sm border-b border-slate-800 pb-2 last:border-0 last:pb-0"
                  >
                    <span className="text-slate-300">{t.name}</span>
                    <span className={`font-mono ${t.growth.startsWith('+') ? 'text-rose-400' : 'text-emerald-400'}`}>{t.growth}</span>
                  </motion.li>
                ))}
              </AnimatePresence>
            </ul>
          </div>
          
          <div className="glass-panel p-5 rounded-xl">
            <h3 className="text-sm font-semibold text-white flex items-center gap-2 mb-4">
              <Hash className="h-4 w-4 text-indigo-400" /> Tracked Entities
            </h3>
            <ul className="space-y-3 text-sm">
              <AnimatePresence>
                {entities.map(entity => (
                  <motion.li key={entity.id} className="text-slate-300 flex justify-between items-center bg-slate-900/30 p-2 rounded-md">
                    <span>{entity.name}</span> 
                    <motion.span key={entity.mentions} initial={{ opacity: 0.5, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} className="text-slate-400 font-mono text-xs bg-slate-800 px-2 py-1 rounded">
                      {(entity.mentions / 1000).toFixed(1)}k
                    </motion.span>
                  </motion.li>
                ))}
              </AnimatePresence>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}
