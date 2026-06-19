import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import { AlertCircle, X, ShieldAlert, Activity, Cpu } from "lucide-react";

type AnomalyType = "critical" | "warning" | "info";

interface AnomalyToast {
  id: string;
  title: string;
  message: string;
  type: AnomalyType;
}

const mockAnomalies = [
  { title: "Volume Spike Detected", message: "A sudden 300% spike in topic mentions for 'Outage'.", type: "critical" },
  { title: "Sentiment Drop", message: "Net sentiment dropped by 15% in the last 10 minutes.", type: "warning" },
  { title: "New Entity Emerging", message: "Entity '@competitor' mentions accelerating rapidly.", type: "info" },
  { title: "Inference Engine Shift", message: "Model latency increased by 15ms. Auto-scaling initiated.", type: "warning" },
  { title: "Crisis Alert Triggered", message: "Multiple high-severity negative triggers detected.", type: "critical" }
] as const;

export function GlobalAnomalyToasts() {
  const [toasts, setToasts] = useState<AnomalyToast[]>([]);

  useEffect(() => {
    // Simulate real-time anomaly detection
    const interval = setInterval(() => {
      if (Math.random() > 0.6) { // 40% chance every 8 seconds
        const randomAnomaly = mockAnomalies[Math.floor(Math.random() * mockAnomalies.length)];
        const newToast: AnomalyToast = {
          id: Math.random().toString(36).substring(7),
          title: randomAnomaly.title,
          message: randomAnomaly.message,
          type: randomAnomaly.type,
        };
        
        setToasts(prev => [newToast, ...prev].slice(0, 5)); // Keep max 5 toasts
        
        // Auto-dismiss after 6 seconds
        setTimeout(() => {
          setToasts(prev => prev.filter(t => t.id !== newToast.id));
        }, 6000);
      }
    }, 8000);

    return () => clearInterval(interval);
  }, []);

  const dismissToast = (id: string) => {
    setToasts(prev => prev.filter(t => t.id !== id));
  };

  return (
    <div className="fixed bottom-6 right-6 z-50 flex flex-col gap-3 max-w-sm w-full pointer-events-none">
      <AnimatePresence>
        {toasts.map(toast => {
          const isCritical = toast.type === "critical";
          const isWarning = toast.type === "warning";
          
          return (
            <motion.div
              key={toast.id}
              layout
              initial={{ opacity: 0, y: 50, scale: 0.9, x: 20 }}
              animate={{ opacity: 1, y: 0, scale: 1, x: 0 }}
              exit={{ opacity: 0, scale: 0.9, x: 20 }}
              transition={{ type: "spring", stiffness: 400, damping: 25 }}
              className={`pointer-events-auto rounded-lg border backdrop-blur-md p-4 shadow-xl ${
                isCritical ? 'bg-rose-950/80 border-rose-500/50 text-rose-200' :
                isWarning ? 'bg-amber-950/80 border-amber-500/50 text-amber-200' :
                'bg-indigo-950/80 border-indigo-500/50 text-indigo-200'
              }`}
            >
              <div className="flex items-start gap-3">
                <div className="mt-0.5">
                  {isCritical ? <ShieldAlert className="h-5 w-5 text-rose-400" /> :
                   isWarning ? <Activity className="h-5 w-5 text-amber-400" /> :
                   <Cpu className="h-5 w-5 text-indigo-400" />}
                </div>
                <div className="flex-1">
                  <h4 className={`text-sm font-semibold ${
                    isCritical ? 'text-rose-300' :
                    isWarning ? 'text-amber-300' :
                    'text-indigo-300'
                  }`}>
                    {toast.title}
                  </h4>
                  <p className={`text-xs mt-1 ${
                    isCritical ? 'text-rose-200/80' :
                    isWarning ? 'text-amber-200/80' :
                    'text-indigo-200/80'
                  }`}>
                    {toast.message}
                  </p>
                </div>
                <button
                  onClick={() => dismissToast(toast.id)}
                  className={`p-1 rounded-md transition-colors ${
                    isCritical ? 'hover:bg-rose-500/20 text-rose-400' :
                    isWarning ? 'hover:bg-amber-500/20 text-amber-400' :
                    'hover:bg-indigo-500/20 text-indigo-400'
                  }`}
                >
                  <X className="h-4 w-4" />
                </button>
              </div>
            </motion.div>
          );
        })}
      </AnimatePresence>
    </div>
  );
}
