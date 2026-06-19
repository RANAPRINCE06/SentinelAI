import { Link } from "react-router-dom";
import { ArrowRight, Orbit, Shield, Zap, BarChart2 } from "lucide-react";
import { motion } from "motion/react";

export function LandingPage() {
  return (
    <div className="min-h-screen bg-[#0B0E14] text-slate-200">
      <header className="absolute inset-x-0 top-0 z-50">
        <nav className="flex items-center justify-between p-6 lg:px-8" aria-label="Global">
          <div className="flex lg:flex-1">
            <a href="#" className="-m-1.5 p-1.5 flex items-center gap-3">
              <div className="h-8 w-8 rounded-lg bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center">
                <Orbit className="h-5 w-5 text-white" />
              </div>
              <span className="font-display font-bold text-xl tracking-tight text-white">SentinelAI</span>
            </a>
          </div>
          <div className="flex flex-1 justify-end items-center gap-4">
            <Link to="/auth" className="text-sm font-semibold leading-6 text-slate-300 hover:text-white transition-colors">
              Sign In
            </Link>
            <Link to="/dashboard" className="text-sm font-semibold leading-6 bg-indigo-600 hover:bg-indigo-500 text-white px-4 py-2 rounded-md transition-colors">
              Dashboard <span aria-hidden="true">&rarr;</span>
            </Link>
          </div>
        </nav>
      </header>

      <div className="relative isolate px-6 pt-14 lg:px-8">
        <div className="absolute inset-x-0 -top-40 -z-10 transform-gpu overflow-hidden blur-3xl sm:-top-80" aria-hidden="true">
          <div className="relative left-[calc(50%-11rem)] aspect-[1155/678] w-[36.125rem] -translate-x-1/2 rotate-[30deg] bg-gradient-to-tr from-[#ff80b5] to-[#9089fc] opacity-20 sm:left-[calc(50%-30rem)] sm:w-[72.1875rem]" style={{ clipPath: 'polygon(74.1% 44.1%, 100% 61.6%, 97.5% 26.9%, 85.5% 0.1%, 80.7% 2%, 72.5% 32.5%, 60.2% 62.4%, 52.4% 68.1%, 47.5% 58.3%, 45.2% 34.5%, 27.5% 76.7%, 0.1% 64.9%, 17.9% 100%, 27.6% 76.8%, 76.1% 97.7%, 74.1% 44.1%)' }}></div>
        </div>
        
        <div className="mx-auto max-w-4xl pt-16 pb-32 sm:pt-24 sm:pb-48 lg:pt-32 lg:pb-56">
          <div className="hidden sm:mb-8 sm:flex sm:justify-center">
            <div className="relative rounded-full px-3 py-1 text-sm leading-6 text-slate-400 ring-1 ring-white/10 hover:ring-white/20">
              Announcing our next generation AI reasoning engine.{' '}
              <a href="#" className="font-semibold text-indigo-400"><span className="absolute inset-0" aria-hidden="true"></span>Read more <span aria-hidden="true">&rarr;</span></a>
            </div>
          </div>
          
          <div className="text-center">
            <motion.h1 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="font-display text-4xl font-bold tracking-tight text-white sm:text-7xl"
            >
              Social Intelligence, <br/><span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 to-purple-500">Redefined.</span>
            </motion.h1>
            
            <motion.p 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="mt-6 text-lg leading-8 text-slate-400 max-w-2xl mx-auto"
            >
              Transform social noise into actionable executive intelligence. Monitor trends, analyze sentiment, and predict market movements with military-grade AI architecture.
            </motion.p>
            
            <motion.div 
               initial={{ opacity: 0, y: 20 }}
               animate={{ opacity: 1, y: 0 }}
               transition={{ duration: 0.8, delay: 0.4 }}
              className="mt-10 flex items-center justify-center gap-x-6"
            >
              <Link to="/dashboard" className="rounded-md bg-indigo-500 px-3.5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-indigo-400 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-400 flex items-center gap-2 transition-all">
                Access Dashboard <ArrowRight className="h-4 w-4" />
              </Link>
            </motion.div>
          </div>
        </div>
      </div>
      
      {/* Features section preview */}
      <div className="mx-auto max-w-7xl px-6 lg:px-8 pb-24">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {[
            { icon: Shield, title: "Threat Detection", desc: "Identify reputation risks before they escalate to mainstream platforms." },
            { icon: Zap, title: "Real-Time Processing", desc: "Ingest and analyze thousands of data points per second with zero latency." },
            { icon: BarChart2, title: "Predictive Analytics", desc: "Forecast trend trajectories based on historical performance vectors." }
          ].map((feature, idx) => {
            const Icon = feature.icon;
            return (
              <div key={idx} className="glass-panel p-6 rounded-2xl">
                <div className="h-10 w-10 rounded-lg bg-indigo-500/20 flex items-center justify-center mb-4">
                  <Icon className="h-5 w-5 text-indigo-400" />
                </div>
                <h3 className="text-lg font-semibold text-white mb-2">{feature.title}</h3>
                <p className="text-slate-400 text-sm leading-relaxed">{feature.desc}</p>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
