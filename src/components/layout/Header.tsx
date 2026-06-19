import { useState, useRef, useEffect } from "react";
import { Bell, Search, Menu, Check } from "lucide-react";
import { motion, AnimatePresence } from "motion/react";
import { useNavigate } from "react-router-dom";

const mockNotifications = [
  { id: 1, title: "Sentiment Alert", message: "Negative sentiment spike detected in 'Product Launch'.", time: "2 min ago", unread: true, type: "warning" },
  { id: 2, title: "Daily Summary", message: "Your complete daily analytics report is ready.", time: "1 hr ago", unread: true, type: "info" },
  { id: 3, title: "System Update", message: "Engine v2.4 seamlessly deployed.", time: "4 hrs ago", unread: false, type: "system" },
];

export function Header({ setMobileMenuOpen }: { setMobileMenuOpen: (open: boolean) => void }) {
  const [isNotificationsOpen, setIsNotificationsOpen] = useState(false);
  const [notifications, setNotifications] = useState(mockNotifications);
  const [searchQuery, setSearchQuery] = useState("");
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const searchRef = useRef<HTMLDivElement>(null);
  const navigate = useNavigate();

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsNotificationsOpen(false);
      }
      if (searchRef.current && !searchRef.current.contains(event.target as Node)) {
        setIsSearchOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const markAllRead = () => {
    setNotifications(prev => prev.map(n => ({ ...n, unread: false })));
  };

  const unreadCount = notifications.filter(n => n.unread).length;

  const mockSearchResults = [
    { id: 1, title: "Sentiment Analysis Config", type: "Settings", href: "/settings" },
    { id: 2, title: "Product Launch Topic", type: "Topic", href: "/topics" },
    { id: 3, title: "System Performance Report", type: "Report", href: "/reports" },
    { id: 4, title: "Tech2026 Engagement", type: "Dashboard", href: "/dashboard" },
  ].filter(item => item.title.toLowerCase().includes(searchQuery.toLowerCase()) || item.type.toLowerCase().includes(searchQuery.toLowerCase()));


  return (
    <header className="h-16 border-b border-slate-800 bg-[#0B0E14]/80 backdrop-blur-md sticky top-0 z-40 flex items-center justify-between px-4 sm:px-6">
      <div className="flex items-center gap-4 flex-1">
        <button 
          onClick={() => setMobileMenuOpen(true)}
          className="lg:hidden text-slate-400 hover:text-white"
        >
          <Menu className="h-5 w-5" />
        </button>
        
        <div className="max-w-md w-full relative hidden sm:block" ref={searchRef}>
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <Search className="h-4 w-4 text-slate-500" />
          </div>
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => {
              setSearchQuery(e.target.value);
              setIsSearchOpen(true);
            }}
            onFocus={() => setIsSearchOpen(true)}
            className="block w-full pl-10 pr-3 py-2 border border-slate-700 rounded-md leading-5 bg-slate-900/50 text-slate-300 placeholder-slate-500 focus:outline-none focus:ring-1 focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm transition-colors"
            placeholder="Search keywords, topics, or nodes..."
          />
          
          <AnimatePresence>
            {isSearchOpen && searchQuery.length > 0 && (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 10 }}
                transition={{ duration: 0.15 }}
                className="absolute left-0 right-0 mt-2 bg-slate-800 border border-slate-700 rounded-lg shadow-xl overflow-hidden z-50"
              >
                {mockSearchResults.length > 0 ? (
                  <div className="max-h-64 overflow-y-auto py-2">
                    {mockSearchResults.map(result => (
                      <button
                        key={result.id}
                        onClick={() => {
                          setSearchQuery("");
                          setIsSearchOpen(false);
                          navigate(result.href);
                        }}
                        className="w-full text-left px-4 py-2 hover:bg-slate-700/50 transition-colors flex items-center justify-between"
                      >
                        <span className="text-sm text-slate-200">{result.title}</span>
                        <span className="text-xs text-slate-500 font-mono bg-slate-900/50 px-2 py-0.5 rounded">{result.type}</span>
                      </button>
                    ))}
                  </div>
                ) : (
                  <div className="px-4 py-3 text-sm text-slate-400 text-center">
                    No results found for "{searchQuery}"
                  </div>
                )}
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
      
      <div className="flex items-center gap-4">
        <div className="flex items-center gap-2 text-xs">
          <span className="flex h-2 w-2 relative">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
          </span>
          <span className="text-slate-400 font-mono hidden sm:inline-block">System Online</span>
        </div>
        
        <div className="relative" ref={dropdownRef}>
          <button 
            onClick={() => setIsNotificationsOpen(!isNotificationsOpen)}
            className="relative p-2 text-slate-400 hover:text-slate-200 transition-colors"
          >
            <Bell className="h-5 w-5" />
            {unreadCount > 0 && (
              <span className="absolute top-1.5 right-1.5 block h-2 w-2 rounded-full bg-rose-500 ring-2 ring-[#0B0E14]" />
            )}
          </button>

          <AnimatePresence>
            {isNotificationsOpen && (
              <motion.div
                initial={{ opacity: 0, y: 10, scale: 0.95 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: 10, scale: 0.95 }}
                transition={{ duration: 0.15 }}
                className="absolute right-0 mt-2 w-80 bg-slate-800 border border-slate-700 rounded-lg shadow-xl overflow-hidden z-50"
              >
                <div className="flex items-center justify-between px-4 py-3 border-b border-slate-700 bg-slate-800/50">
                  <h3 className="text-sm font-semibold text-white">Notifications</h3>
                  {unreadCount > 0 && (
                    <button 
                      onClick={markAllRead}
                      className="text-xs text-indigo-400 hover:text-indigo-300 transition-colors flex items-center gap-1"
                    >
                      <Check className="h-3 w-3" /> Mark all read
                    </button>
                  )}
                </div>
                <div className="max-h-96 overflow-y-auto">
                  {notifications.map(notification => (
                    <div 
                      key={notification.id} 
                      className={`px-4 py-3 border-b border-slate-700/50 last:border-b-0 hover:bg-slate-700/30 transition-colors cursor-pointer ${notification.unread ? 'bg-slate-800' : ''}`}
                    >
                      <div className="flex justify-between items-start mb-1">
                        <div className="flex items-center gap-2">
                          {notification.unread && <span className="h-1.5 w-1.5 rounded-full bg-indigo-500 block" />}
                          <h4 className={`text-sm font-medium ${notification.unread ? 'text-white' : 'text-slate-300'}`}>
                            {notification.title}
                          </h4>
                        </div>
                        <span className="text-[10px] text-slate-500 whitespace-nowrap ml-2 mt-0.5">{notification.time}</span>
                      </div>
                      <p className={`text-xs ${notification.unread ? 'text-slate-300' : 'text-slate-400'} line-clamp-2 ${notification.unread ? 'ml-3.5' : ''}`}>
                        {notification.message}
                      </p>
                    </div>
                  ))}
                </div>
                <div className="px-4 py-2 border-t border-slate-700 bg-slate-800/50 text-center">
                  <button 
                    onClick={() => {
                      setIsNotificationsOpen(false);
                      navigate("/real-time");
                    }}
                    className="text-xs font-medium text-slate-400 hover:text-white transition-colors"
                  >
                    View All Activity
                  </button>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </header>
  );
}
