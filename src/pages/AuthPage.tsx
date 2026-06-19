import { useState } from "react";
import { Orbit, Mail, Lock, ArrowRight } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import { motion } from "motion/react";
import { signInWithEmailAndPassword, createUserWithEmailAndPassword, GoogleAuthProvider, signInWithPopup, updateProfile } from "firebase/auth";
import { doc, setDoc } from "firebase/firestore";
import { auth, db } from "../lib/firebase";

export function AuthPage() {
  const [isLogin, setIsLogin] = useState(true);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [role, setRole] = useState("user");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    
    try {
      if (isLogin) {
        await signInWithEmailAndPassword(auth, email, password);
      } else {
        const userCredential = await createUserWithEmailAndPassword(auth, email, password);
        const user = userCredential.user;
        
        await updateProfile(user, { displayName: name });
        // Save role to Firestore
        await setDoc(doc(db, "users", user.uid), {
          name: name,
          email: email,
          role: role,
          createdAt: new Date().toISOString()
        });
      }
      navigate("/dashboard");
    } catch (err: any) {
      setError(err.message || "An error occurred during authentication.");
    }
  };

  const handleGoogleSignIn = async () => {
    try {
      const provider = new GoogleAuthProvider();
      await signInWithPopup(auth, provider);
      navigate("/dashboard");
    } catch (err: any) {
      setError(err.message || "Failed to sign in with Google.");
    }
  };

  return (
    <div className="min-h-screen bg-[#0B0E14] text-slate-200 flex flex-col justify-center py-12 sm:px-6 lg:px-8 relative overflow-hidden">
      {/* Background decorations */}
      <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-40 -right-32 w-96 h-96 rounded-full bg-indigo-500/10 blur-3xl"></div>
        <div className="absolute -bottom-40 -left-32 w-96 h-96 rounded-full bg-purple-500/10 blur-3xl"></div>
      </div>

      <div className="sm:mx-auto sm:w-full sm:max-w-md z-10">
        <Link to="/" className="flex justify-center items-center gap-3 mb-6">
          <div className="h-10 w-10 rounded-lg bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center shadow-lg shadow-indigo-500/20">
            <Orbit className="h-6 w-6 text-white" />
          </div>
          <span className="font-display font-bold text-3xl tracking-tight text-white">SentinelAI</span>
        </Link>
        <h2 className="mt-2 text-center text-2xl font-bold tracking-tight text-white">
          {isLogin ? "Sign in to your account" : "Create your account"}
        </h2>
        <p className="mt-2 text-center text-sm text-slate-400">
          Or{" "}
          <button 
            onClick={() => setIsLogin(!isLogin)}
            className="font-medium text-indigo-400 hover:text-indigo-300 transition-colors"
          >
            {isLogin ? "start your 14-day free trial" : "sign in to your existing account"}
          </button>
        </p>
      </div>

      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
        className="mt-8 sm:mx-auto sm:w-full sm:max-w-md z-10"
      >
        <div className="glass-panel py-8 px-4 sm:rounded-2xl sm:px-10 border border-slate-800 shadow-xl">
          <form className="space-y-6" onSubmit={handleSubmit}>
            {error && (
              <div className="bg-rose-500/10 border border-rose-500/50 text-rose-400 text-sm rounded-md p-3">
                {error}
              </div>
            )}
            
            {!isLogin && (
              <div className="space-y-4">
                <div>
                  <label htmlFor="name" className="block text-sm font-medium text-slate-300">
                    Full Name
                  </label>
                  <div className="mt-1 relative">
                    <input
                      id="name"
                      name="name"
                      type="text"
                      autoComplete="name"
                      required
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      className="appearance-none block w-full px-3 py-2 border border-slate-700 rounded-md bg-slate-900/50 text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent sm:text-sm transition-colors"
                      placeholder="John Doe"
                    />
                  </div>
                </div>

                <div>
                  <label htmlFor="role" className="block text-sm font-medium text-slate-300">
                    Select Role
                  </label>
                  <div className="mt-1 relative">
                    <select
                      id="role"
                      name="role"
                      value={role}
                      onChange={(e) => setRole(e.target.value)}
                      className="appearance-none block w-full px-3 py-2 border border-slate-700 rounded-md bg-slate-900/50 text-white focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent sm:text-sm transition-colors"
                    >
                      <option value="user">Standard User</option>
                      <option value="admin">Administrator</option>
                    </select>
                  </div>
                </div>
              </div>
            )}

            <div>
              <label htmlFor="email" className="block text-sm font-medium text-slate-300">
                Email address
              </label>
              <div className="mt-1 relative rounded-md shadow-sm">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Mail className="h-5 w-5 text-slate-500" />
                </div>
                <input
                  id="email"
                  name="email"
                  type="email"
                  autoComplete="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="appearance-none block w-full pl-10 pr-3 py-2 border border-slate-700 rounded-md bg-slate-900/50 text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent sm:text-sm transition-colors"
                  placeholder="you@example.com"
                />
              </div>
            </div>

            <div>
              <label htmlFor="password" className="block text-sm font-medium text-slate-300">
                Password
              </label>
              <div className="mt-1 relative rounded-md shadow-sm">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Lock className="h-5 w-5 text-slate-500" />
                </div>
                <input
                  id="password"
                  name="password"
                  type="password"
                  autoComplete="current-password"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="appearance-none block w-full pl-10 pr-3 py-2 border border-slate-700 rounded-md bg-slate-900/50 text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent sm:text-sm transition-colors"
                  placeholder="••••••••"
                />
              </div>
            </div>

            {isLogin && (
              <div className="flex items-center justify-between">
                <div className="flex items-center">
                  <input
                    id="remember-me"
                    name="remember-me"
                    type="checkbox"
                    className="h-4 w-4 text-indigo-500 focus:ring-indigo-500 border-slate-700 rounded bg-slate-900"
                  />
                  <label htmlFor="remember-me" className="ml-2 block text-sm text-slate-400">
                    Remember me
                  </label>
                </div>

                <div className="text-sm">
                  <a href="#" className="font-medium text-indigo-400 hover:text-indigo-300">
                    Forgot your password?
                  </a>
                </div>
              </div>
            )}

            <div>
              <button
                type="submit"
                className="w-full flex justify-center py-2.5 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 focus:ring-offset-[#0B0E14] transition-all disabled:opacity-50 flex items-center gap-2"
              >
                {isLogin ? "Sign in" : "Create account"} <ArrowRight className="h-4 w-4" />
              </button>
            </div>
          </form>

          <div className="mt-6">
            <div className="relative">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-slate-700" />
              </div>
              <div className="relative flex justify-center text-sm">
                <span className="px-2 bg-[#0B0E14] text-slate-400 glass-panel">Or continue with</span>
              </div>
            </div>

            <div className="mt-6">
              <button
                type="button"
                onClick={handleGoogleSignIn}
                className="w-full flex items-center justify-center gap-3 py-2.5 px-4 border border-slate-700 rounded-md shadow-sm bg-slate-900/50 text-sm font-medium text-slate-300 hover:bg-slate-800 hover:border-slate-600 transition-all"
              >
                <svg className="h-5 w-5" aria-hidden="true" viewBox="0 0 24 24">
                  <path
                    d="M12.0003 4.75C13.7703 4.75 15.3553 5.36002 16.6053 6.54998L20.0303 3.125C17.9502 1.19 15.2353 0 12.0003 0C7.31028 0 3.25527 2.69 1.25024 6.65L5.20526 9.715C6.13028 6.845 8.81525 4.75 12.0003 4.75Z"
                    fill="#EA4335"
                  />
                  <path
                    d="M23.4953 12.275C23.4953 11.41 23.4153 10.595 23.2753 9.805H12.0003V14.45H18.4352C18.1502 15.935 17.3353 17.185 16.1253 18.01V21.055H20.0103C22.2803 18.96 23.4953 15.905 23.4953 12.275Z"
                    fill="#4285F4"
                  />
                  <path
                    d="M5.20526 14.285C4.96525 13.565 4.83527 12.8 4.83527 12C4.83527 11.2 4.96525 10.435 5.20526 9.715L1.25024 6.65C0.455243 8.245 0 10.065 0 12C0 13.935 0.455243 15.755 1.25024 17.35L5.20526 14.285Z"
                    fill="#FBBC05"
                  />
                  <path
                    d="M12.0003 24C15.2403 24 17.9653 22.935 19.9453 21.095L16.0603 18.05C14.9853 18.77 13.6153 19.25 12.0003 19.25C8.81525 19.25 6.13028 17.155 5.20526 14.285L1.25024 17.35C3.25527 21.31 7.31028 24 12.0003 24Z"
                    fill="#34A853"
                  />
                </svg>
                Sign in with Google
              </button>
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  );
}
