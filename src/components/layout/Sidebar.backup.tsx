import { NavLink, useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "motion/react";
import { 
  BarChart2, 
  Activity, 
  BrainCircuit, 
  Orbit, 
  FileText, 
  Settings,
  ShieldAlert,
  LogOut,
  X
} from "lucide-react";
import { cn } from "../../lib/utils";
import { useEffect, useState } from "react";
import { auth } from "../../lib/firebase";
import { onAuthStateChanged, signOut, User } from "firebase/auth";

const navItems = [
  { name: "Dashboard", href: "/dashboard", icon: BarChart2 },
  { name: "Real-Time Hub", href: "/real-time", icon: Activity },
  { name: "Analysis Engine", href: "/analysis", icon: BrainCircuit },
  { name: "Topic Detection", href: "/topics", icon: Orbit },
  { name: "Performance", href: "/performance", icon: ShieldAlert },
  { name: "Reports", href: "/reports", icon: FileText },
  { name: "Settings", href: "/settings", icon: Settings },
];

interface SidebarProps {
  isMobileMenuOpen: boolean;
  setMobileMenuOpen: (open: boolean) => void;
}

export function Sidebar({ isMobileMenuOpen, setMobileMenuOpen }: SidebarProps) {
  const [user, setUser] = useState<User | null>(null);
  const navigate = useNavigate();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
    });
    return () => unsubscribe();
  }, []);

  const handleSignOut = async () => {
    await signOut(auth);
    navigate("/auth");
  };

  const SidebarContent = (
    <>
      <div className="p-6 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="h-8 w-8 rounded-lg bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center">
            <Orbit className="h-5 w-5 text-white" />
          </div>
          <span className="font-display font-bold text-xl tracking-tight text-white">SentinelAI</span>
        </div>
        <button 
          onClick={() => setMobileMenuOpen(false)}
          className="lg:hidden text-slate-400 hover:text-white"
        >
          <X className="h-5 w-5" />
        </button>
      </div>
      
      <div className="px-4 py-2 text-xs font-semibold text-slate-500 uppercase tracking-wider">
        Main Menu
      </div>
      
      <nav className="flex-1 px-3 space-y-1 overflow-y-auto mt-2">
        {navItems.map((item) => {
          const Icon = item.icon;
          return (
            <NavLink
              key={item.name}
              to={item.href}
              onClick={() => setMobileMenuOpen(false)}
              className={({ isActive }) =>
                cn(
                  "flex items-center gap-3 px-3 py-2.5 rounded-md text-sm font-medium transition-colors",
                  isActive
                    ? "bg-indigo-500/10 text-indigo-400"
                    : "text-slate-400 hover:bg-slate-800/50 hover:text-slate-200"
                )
              }
            >
              <Icon className="h-4 w-4" />
              {item.name}
            </NavLink>
          );
        })}
      </nav>
      
      <div className="p-4 border-t border-slate-800 mt-auto">
        <div className="flex items-center gap-3 glass-panel p-3 rounded-lg mb-2">
          {user?.photoURL ? (
            <img src={user.photoURL} alt="Avatar" className="h-8 w-8 rounded-full flex-shrink-0" referrerPolicy="no-referrer" />
          ) : (
            <div className="h-8 w-8 rounded-full bg-slate-700 flex-shrink-0 flex items-center justify-center text-sm font-medium text-white">
              {user?.displayName?.charAt(0) || user?.email?.charAt(0) || "U"}
            </div>
          )}
          <div className="flex-1 min-w-0">
            <p className="text-sm font-medium text-slate-200 truncate">{user?.displayName || "Admin User"}</p>
            <p className="text-xs text-slate-500 truncate">{user?.email || "Pro License"}</p>
          </div>
        </div>
        <button 
          onClick={handleSignOut}
          className="w-full flex items-center justify-center gap-2 text-sm text-slate-400 hover:text-slate-200 transition-colors py-2 rounded-md hover:bg-slate-800"
        >
          <LogOut className="h-4 w-4" /> Sign Out
        </button>
      </div>
    </>
  );

  return (
    <>
      <AnimatePresence>
        {isMobileMenuOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setMobileMenuOpen(false)}
              className="fixed inset-0 bg-[#0B0E14]/80 backdrop-blur-sm z-40 lg:hidden"
            />
            <motion.aside
              initial={{ x: "-100%" }}
              animate={{ x: 0 }}
              exit={{ x: "-100%" }}
              transition={{ type: "spring", bounce: 0, duration: 0.3 }}
              className="fixed inset-y-0 left-0 w-64 border-r border-slate-800 bg-[#0B0E14] z-50 flex flex-col lg:hidden"
            >
              {SidebarContent}
            </motion.aside>
          </>
        )}
      </AnimatePresence>

      <aside className="w-64 border-r border-slate-800 bg-[#0B0E14] h-screen flex flex-col hidden lg:flex">
        {SidebarContent}
      </aside>
    </>
  );
}
