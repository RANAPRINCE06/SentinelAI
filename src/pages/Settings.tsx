import { useState } from "react";
import { User, Bell, Key, Database, Shield, CheckCircle } from "lucide-react";
import { motion, AnimatePresence } from "motion/react";

const navItems = [
  { id: "profile", name: "Profile", icon: User },
  { id: "notifications", name: "Notifications", icon: Bell },
  { id: "api-keys", name: "API Keys", icon: Key },
  { id: "data-sources", name: "Data Sources", icon: Database },
  { id: "security", name: "Security", icon: Shield },
];

export function Settings() {
  const [activeTab, setActiveTab] = useState("api-keys");
  const [isSaving, setIsSaving] = useState(false);
  const [saveSuccess, setSaveSuccess] = useState(false);
  const [apiKey, setApiKey] = useState("************************");
  const [model, setModel] = useState("gemini-1.5-pro");

  const handleSave = () => {
    setIsSaving(true);
    setSaveSuccess(false);
    setTimeout(() => {
      setIsSaving(false);
      setSaveSuccess(true);
      setTimeout(() => setSaveSuccess(false), 3000);
    }, 800);
  };

  return (
    <div className="max-w-4xl mx-auto space-y-8">
      <div>
        <h1 className="text-2xl font-display font-bold text-white tracking-tight flex items-center gap-3">
          Platform Settings
        </h1>
        <p className="text-sm text-slate-400 mt-1">Manage infrastructure connections and account preferences.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="md:col-span-1 space-y-1">
          <nav className="flex flex-col space-y-1">
            {navItems.map((item) => {
              const Icon = item.icon;
              const current = activeTab === item.id;
              return (
                <button
                  key={item.name}
                  onClick={() => setActiveTab(item.id)}
                  className={`flex items-center gap-3 px-3 py-2.5 rounded-md text-sm font-medium transition-colors text-left w-full ${
                    current 
                      ? "bg-indigo-500/10 text-indigo-400" 
                      : "text-slate-400 hover:bg-slate-800/50 hover:text-slate-200"
                  }`}
                >
                  <Icon className="h-4 w-4" />
                  {item.name}
                </button>
              )
            })}
          </nav>
        </div>
        
        <div className="md:col-span-3 space-y-6">
          <AnimatePresence mode="wait">
            {activeTab === "api-keys" && (
              <motion.div 
                key="api-keys"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                className="space-y-6"
              >
                <div className="glass-panel p-6 rounded-xl border border-slate-800">
                  <h2 className="text-lg font-medium text-white mb-4">Gemini AI Configuration</h2>
                  <p className="text-sm text-slate-400 mb-6">Connect your Gemini API key to enable AI-powered summaries and deep insight generation.</p>
                  
                  <div className="space-y-4">
                    <div>
                      <label className="block text-sm font-medium text-slate-300 mb-1">API Key</label>
                      <input 
                        type="password" 
                        value={apiKey}
                        disabled
                        placeholder="AIzaSy..."
                        className="w-full bg-slate-900 border border-slate-700/50 rounded-md px-3 py-2 text-slate-500 cursor-not-allowed focus:outline-none transition-colors" 
                      />
                      <p className="text-xs text-slate-500 mt-1">API Key is managed by your organization.</p>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-slate-300 mb-1">Default Model</label>
                      <select 
                        value={model}
                        onChange={(e) => setModel(e.target.value)}
                        className="w-full bg-slate-900 border border-slate-700 rounded-md px-3 py-2 text-slate-300 focus:outline-none focus:border-indigo-500 transition-colors"
                      >
                        <option value="gemini-1.5-pro">gemini-1.5-pro (Recommended for deep analysis)</option>
                        <option value="gemini-1.5-flash">gemini-1.5-flash (Faster inference)</option>
                      </select>
                    </div>
                  </div>
                  
                  <div className="mt-6 flex justify-end items-center gap-4">
                    <AnimatePresence>
                      {saveSuccess && (
                        <motion.span 
                          initial={{ opacity: 0, scale: 0.9 }}
                          animate={{ opacity: 1, scale: 1 }}
                          exit={{ opacity: 0 }}
                          className="text-emerald-400 text-sm flex items-center gap-1"
                        >
                          <CheckCircle className="h-4 w-4" /> Saved Successfully
                        </motion.span>
                      )}
                    </AnimatePresence>
                    <button 
                      onClick={handleSave}
                      disabled={isSaving}
                      className="bg-indigo-600 hover:bg-indigo-500 disabled:opacity-75 disabled:cursor-not-allowed text-white px-4 py-2 rounded-md text-sm font-medium transition-colors shadow-sm shadow-indigo-900"
                    >
                      {isSaving ? "Saving..." : "Save Configuration"}
                    </button>
                  </div>
                </div>
              </motion.div>
            )}
            
            {activeTab === "data-sources" && (
              <motion.div 
                key="data-sources"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                className="space-y-6"
              >
                <div className="glass-panel p-6 rounded-xl border border-slate-800">
                   <h2 className="text-lg font-medium text-white mb-4">Data Retention Policy</h2>
                   <p className="text-sm text-slate-400 mb-4">Configure how long raw ingested text and analysis results are stored before automated deletion.</p>
                   
                   <div className="space-y-4">
                     <div>
                        <label className="block text-sm font-medium text-slate-300 mb-1">Raw Data Retention</label>
                        <select className="w-full bg-slate-900 border border-slate-700 rounded-md px-3 py-2 text-slate-300 focus:outline-none focus:border-indigo-500">
                          <option>7 Days</option>
                          <option>30 Days</option>
                          <option>90 Days</option>
                          <option>1 Year</option>
                        </select>
                     </div>
                     <div className="pt-4 border-t border-slate-800 mt-6 pb-2">
                       <button className="text-rose-400 text-sm font-medium hover:text-rose-300 transition-colors bg-rose-500/10 px-4 py-2 rounded-md hover:bg-rose-500/20 w-auto">
                         Purge all historical data immediately
                       </button>
                     </div>
                   </div>
                </div>
              </motion.div>
            )}

            {activeTab !== "api-keys" && activeTab !== "data-sources" && (
              <motion.div 
                key={activeTab}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                className="glass-panel p-12 rounded-xl flex flex-col items-center justify-center text-center border border-slate-800"
              >
                <div className="h-16 w-16 bg-slate-800 rounded-full flex items-center justify-center mb-4">
                  <Shield className="h-8 w-8 text-slate-500" />
                </div>
                <h3 className="text-lg font-medium text-white mb-2">Configuration area locked</h3>
                <p className="text-sm text-slate-400 max-w-sm">This section is currently managed by your organization's IT administrator.</p>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
}
