import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { AlertTriangle, Home, ArrowLeft, Compass, Sparkles } from "lucide-react";
import Button from "@/components/ui/Button";
import Card, { CardContent } from "@/components/ui/Card";

// Transition curve for fluid movement
const TRANSITION_EASE = [0.16, 1, 0.3, 1];

// Stagger parent container
const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.12,
      delayChildren: 0.1,
    },
  },
};

// Directional animations for text/elements
const slideFromTop = {
  hidden: { opacity: 0, y: -50, scale: 0.9 },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: { duration: 0.8, ease: TRANSITION_EASE },
  },
};

const slideFromLeft = {
  hidden: { opacity: 0, x: -60, filter: "blur(6px)" },
  visible: {
    opacity: 1,
    x: 0,
    filter: "blur(0px)",
    transition: { duration: 0.8, ease: TRANSITION_EASE },
  },
};

const slideFromRight = {
  hidden: { opacity: 0, x: 60, filter: "blur(6px)" },
  visible: {
    opacity: 1,
    x: 0,
    filter: "blur(0px)",
    transition: { duration: 0.8, ease: TRANSITION_EASE },
  },
};

const zoomFromBack = {
  hidden: { opacity: 0, scale: 0.7, filter: "blur(10px)" },
  visible: {
    opacity: 1,
    scale: 1,
    filter: "blur(0px)",
    transition: { duration: 0.9, ease: TRANSITION_EASE },
  },
};

export default function NotFound() {
  const navigate = useNavigate();

  const handleGoHome = () => {
    navigate("/");
  };

  const handleGoBack = () => {
    navigate(-1);
  };

  return (
    <div className="relative min-h-screen w-full flex items-center justify-center overflow-hidden bg-slate-950 text-white px-4">
      {/* Ambient Lightroom Glow & Background FX */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-gradient-to-tr from-indigo-600/30 via-rose-500/20 to-teal-400/30 rounded-full blur-[130px] pointer-events-none" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_0%,rgba(2,6,23,0.85)_100%)] pointer-events-none" />

      {/* Floating background decorative 404 text */}
      <motion.div
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 0.04, scale: 1 }}
        transition={{ duration: 1.5, ease: TRANSITION_EASE }}
        className="absolute select-none font-black text-[22vw] text-white pointer-events-none tracking-widest"
      >
        404
      </motion.div>

      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="relative z-10 w-full max-w-lg"
      >
        <Card className="w-full shadow-2xl border border-white/10 bg-slate-900/60 backdrop-blur-2xl rounded-3xl overflow-hidden relative group">
          {/* Top highlight border glow */}
          <div className="absolute top-0 inset-x-0 h-1 bg-gradient-to-r from-rose-500 via-indigo-500 to-teal-400 opacity-80" />

          <CardContent className="pt-10 pb-10 px-6 sm:px-10 text-center relative z-10">
            {/* Animated Icon Container */}
            <motion.div variants={zoomFromBack} className="flex justify-center mb-6">
              <div className="relative">
                {/* Pulsing Backlight Effect */}
                <motion.div
                  animate={{ scale: [1, 1.25, 1], opacity: [0.3, 0.6, 0.3] }}
                  transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
                  className="absolute -inset-2 bg-rose-500/30 rounded-full blur-xl"
                />
                
                {/* Floating Icon Frame */}
                <motion.div
                  animate={{ y: [-4, 6, -4] }}
                  transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                  className="relative flex items-center justify-center p-5 rounded-2xl bg-gradient-to-br from-slate-800 to-slate-900 border border-white/15 shadow-xl"
                >
                  <AlertTriangle className="h-12 w-12 text-rose-400 drop-shadow-[0_0_12px_rgba(244,63,94,0.5)]" />
                  <motion.div
                    animate={{ rotate: 360 }}
                    transition={{ duration: 12, repeat: Infinity, ease: "linear" }}
                    className="absolute -top-1 -right-1 text-teal-400"
                  >
                    <Sparkles className="w-5 h-5" />
                  </motion.div>
                </motion.div>
              </div>
            </motion.div>

            {/* Title - Slide From Top */}
            <motion.h1
              variants={slideFromTop}
              className="text-6xl font-extrabold tracking-tight bg-gradient-to-r from-white via-slate-200 to-slate-400 bg-clip-text text-transparent mb-2"
            >
              404
            </motion.h1>

            {/* Subtitle - Slide From Left */}
            <motion.h2
              variants={slideFromLeft}
              className="text-2xl font-bold text-slate-100 mb-3 flex items-center justify-center gap-2"
            >
              <Compass className="w-5 h-5 text-teal-400 animate-spin" style={{ animationDuration: '8s' }} />
              Page Lost in Space
            </motion.h2>

            {/* Description - Slide From Right */}
            <motion.p
              variants={slideFromRight}
              className="text-slate-400 mb-8 leading-relaxed text-sm sm:text-base max-w-sm mx-auto"
            >
              The page you're trying to reach doesn't exist, was renamed, or has traveled to another realm.
            </motion.p>

            {/* Action Buttons - Zoom From Back */}
            <motion.div
              variants={zoomFromBack}
              className="flex flex-col sm:flex-row gap-3 justify-center items-center"
            >
              <Button
                onClick={handleGoBack}
                className="w-full sm:w-auto bg-slate-800/80 hover:bg-slate-700/80 text-slate-200 border border-white/10 px-6 py-3 rounded-xl transition-all duration-300 flex items-center justify-center gap-2 hover:scale-[1.02] active:scale-[0.98]"
              >
                <ArrowLeft className="w-4 h-4" />
                Go Back
              </Button>

              <Button
                onClick={handleGoHome}
                className="w-full sm:w-auto bg-gradient-to-r from-indigo-600 via-teal-600 to-emerald-600 hover:from-indigo-500 hover:to-emerald-500 text-white px-7 py-3 rounded-xl transition-all duration-300 shadow-lg shadow-indigo-500/20 flex items-center justify-center gap-2 hover:scale-[1.02] active:scale-[0.98] font-medium"
              >
                <Home className="w-4 h-4" />
                Return Home
              </Button>
            </motion.div>
          </CardContent>
        </Card>
      </motion.div>
    </div>
  );
}