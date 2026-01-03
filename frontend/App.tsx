import React, { useState, useEffect } from "react";
import {
  HashRouter as Router,
  Routes,
  Route,
  useLocation,
  Navigate,
} from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import Home from "./src/pages/Home";
import TalkNow from "./src/pages/TalkNow";
import Tests from "./src/pages/Tests";
import Community from "./src/pages/Community";
import Profile from "./src/pages/Profile";
import Login from "./src/pages/Login";
import Signup from "./src/pages/Signup";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import SOSButton from "./components/SOSButton";
import Neural3DBackground from "./src/components/Neural3DBackground";
import Chat from "./src/components/chat";

const AnimatedRoutes = ({
  isLoggedIn,
  setIsLoggedIn,
}: {
  isLoggedIn: boolean;
  setIsLoggedIn: (val: boolean) => void;
}) => {
  const location = useLocation();
  return (
    <AnimatePresence mode="wait">
      <React.Fragment key={location.pathname}>
        <Routes location={location}>
          <Route
            path="/"
            element={
              <PageWrapper>
                <Home isLoggedIn={isLoggedIn} />
              </PageWrapper>
            }
          />
          <Route
            path="/talk"
            element={
              <PageWrapper>
                <TalkNow />
              </PageWrapper>
            }
          />
          <Route
            path="/tests"
            element={
              <PageWrapper>
                <Tests />
              </PageWrapper>
            }
          />
          <Route
            path="/community"
            element={
              <PageWrapper>
                <Community />
              </PageWrapper>
            }
          />
          <Route
            path="/profile"
            element={
              isLoggedIn ? (
                <PageWrapper>
                  <Profile setIsLoggedIn={setIsLoggedIn} />
                </PageWrapper>
              ) : (
                <Navigate to="/login" />
              )
            }
          />
          <Route
            path="/login"
            element={
              <PageWrapper>
                <Login setIsLoggedIn={setIsLoggedIn} />
              </PageWrapper>
            }
          />
          <Route
            path="/signup"
            element={
              <PageWrapper>
                <Signup setIsLoggedIn={setIsLoggedIn} />
              </PageWrapper>
            }
          />
        </Routes>
      </React.Fragment>
    </AnimatePresence>
  );
};

const PageWrapper: React.FC<{ children: React.ReactNode }> = ({ children }) => (
  <motion.div
    initial={{ opacity: 0, y: 10 }}
    animate={{ opacity: 1, y: 0 }}
    exit={{ opacity: 0, y: -10 }}
    transition={{ duration: 0.4, ease: [0.23, 1, 0.32, 1] }}
  >
    {children}
  </motion.div>
);

const App: React.FC = () => {
  const [isSOSOpen, setIsSOSOpen] = useState(false);
  const [theme, setTheme] = useState<"dark" | "light">("dark");
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    // Check local storage for mock session
    const auth = localStorage.getItem("mindspace_auth");
    if (auth === "true") setIsLoggedIn(true);

    if (theme === "light") {
      document.body.classList.add("light-mode");
    } else {
      document.body.classList.remove("light-mode");
    }
  }, [theme]);

  const toggleTheme = () =>
    setTheme((prev) => (prev === "dark" ? "light" : "dark"));

  const handleSetLoggedIn = (val: boolean) => {
    setIsLoggedIn(val);
    if (val) localStorage.setItem("mindspace_auth", "true");
    else localStorage.removeItem("mindspace_auth");
  };

  return (
    <Router>
      {/* 3D background canvas (fixed, behind UI) */}
      <Neural3DBackground />

      <div
        className="min-h-screen flex flex-col relative"
        style={{ position: "relative", zIndex: 1 }}
      >
        <Navbar
          theme={theme}
          toggleTheme={toggleTheme}
          isLoggedIn={isLoggedIn}
        />

        <main className="flex-grow pt-24 pb-12">
          <AnimatedRoutes
            isLoggedIn={isLoggedIn}
            setIsLoggedIn={handleSetLoggedIn}
          />
        </main>

        <Footer />

        <SOSButton isOpen={isSOSOpen} setIsOpen={setIsSOSOpen} />

        <AnimatePresence>
          {isSOSOpen && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 z-[60] flex items-center justify-center p-6 bg-slate-900/30 backdrop-blur-md"
              onClick={() => setIsSOSOpen(false)}
            >
              <motion.div
                initial={{ scale: 0.95, opacity: 0, y: 30 }}
                animate={{ scale: 1, opacity: 1, y: 0 }}
                exit={{ scale: 0.95, opacity: 0, y: 30 }}
                onClick={(e) => e.stopPropagation()}
                className="bg-[var(--card-bg)] backdrop-blur-xl rounded-[40px] shadow-2xl p-10 max-w-lg w-full border border-[var(--border-color)]"
              >
                <div className="text-center mb-8">
                  <div className="w-20 h-20 bg-red-50 text-red-500 rounded-3xl flex items-center justify-center mx-auto mb-6 shadow-inner">
                    <svg
                      className="w-10 h-10"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={1.5}
                        d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
                      />
                    </svg>
                  </div>
                  <h2 className="text-3xl font-bold text-[var(--text-main)] tracking-tight">
                    You are not alone.
                  </h2>
                  <p className="text-[var(--text-muted)] mt-3 text-lg">
                    Help is available immediately. Please reach out to these
                    resources.
                  </p>
                </div>

                <div className="grid gap-4">
                  {[
                    {
                      title: "Campus Security",
                      value: "0123-456-7890",
                      sub: "24/7 Response Unit",
                    },
                    {
                      title: "Crisis Line",
                      value: "988",
                      sub: "National Suicide Prevention",
                    },
                    {
                      title: "Health Wing",
                      value: "Level 2, South Hall",
                      sub: "Walk-ins Welcome",
                    },
                  ].map((item, i) => (
                    <motion.div
                      key={i}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.1 * i }}
                      className="p-5 glass-card rounded-2xl flex justify-between items-center"
                    >
                      <div>
                        <h3 className="text-xs font-bold text-[var(--text-muted)] uppercase tracking-widest">
                          {item.title}
                        </h3>
                        <p className="text-xl font-semibold text-[var(--text-main)]">
                          {item.value}
                        </p>
                      </div>
                      <p className="text-[10px] text-[var(--text-muted)] font-medium italic">
                        {item.sub}
                      </p>
                    </motion.div>
                  ))}
                </div>

                <button
                  onClick={() => setIsSOSOpen(false)}
                  className="w-full mt-10 py-4 bg-[var(--text-main)] text-[var(--bg-dark)] rounded-2xl font-semibold hover:opacity-90 transition-all shadow-xl"
                >
                  I'm safe now
                </button>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </Router>
  );
};

export default App;
