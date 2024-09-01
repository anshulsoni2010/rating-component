"use client";
import { FaRegSmileBeam, FaRegSmile, FaRegMeh, FaRegSadTear, FaRegSadCry, FaPaperPlane } from "react-icons/fa";
import { useRef, useEffect, useState } from "react";
import { motion, AnimatePresence, useAnimation } from "framer-motion";
import { cn } from "@/lib/utils";
import Confetti from 'react-confetti';

const FeedbackRating = () => {
  const [rating, setRating] = useState<number | null>(null);
  const [feedbackActive, setFeedbackActive] = useState(false);
  const [feedback, setFeedback] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [feedbackError, setFeedbackError] = useState<string | null>(null);
  const node = useRef<HTMLDivElement>(null);
  const confettiRef = useRef<HTMLDivElement>(null);

  const buttonControls = useAnimation();
  const containerControls = useAnimation();
  const planeControls = useAnimation();

  useEffect(() => {
    if (feedbackActive) {
      const handleClickOutside = (e: MouseEvent) => {
        if (node.current && !node.current.contains(e.target as Node)) {
          setFeedbackActive(false);
          setRating(null);
          setFeedback("");
          setFeedbackError(null);
        }
      };
      document.addEventListener("mousedown", handleClickOutside);
      return () => {
        document.removeEventListener("mousedown", handleClickOutside);
      };
    }
  }, [feedbackActive]);

  const handleSubmit = async () => {
    if (feedback.trim().length === 0 || feedback.trim().length <= 4) {
      setFeedbackError("Feedback must be more than 4 characters.");
      return;
    }

    setIsSubmitting(true);
    setIsSubmitted(false);
    setFeedbackError(null);

    await buttonControls.start({
      scale: [1, 1.2, 1],
      rotate: [0, 10, -10, 0],
      transition: { duration: 0.5 },
    });

    // Plane animation
    await planeControls.start({
      x: [0, 100, -100, 0],
      y: [0, -50, -50, 0],
      scale: [1, 1.5, 1.5, 1],
      rotate: [0, 45, 45, 0],
      transition: { duration: 2, ease: "easeInOut" },
    });

    // Simulate a network request delay
    setTimeout(() => {
      setIsSubmitting(false);
      setIsSubmitted(true);
      planeControls.start({ fill: "#2ECC40" });
    }, 1000);
  };

  const ratingIcons = [
    { icon: FaRegSadCry, color: "#FF4136", label: "Terrible" },
    { icon: FaRegSadTear, color: "#FF851B", label: "Bad" },
    { icon: FaRegMeh, color: "#FFDC00", label: "Okay" },
    { icon: FaRegSmile, color: "#2ECC40", label: "Good" },
    { icon: FaRegSmileBeam, color: "#01FF70", label: "Excellent" },
  ];

  const containerVariants = {
    initial: { width: "90%", maxWidth: "36rem", height: "8rem", opacity: 0, y: 20 },
    active: {
      width: "90%", maxWidth: "52rem", height: "24rem", opacity: 1, y: 0,
      transition: { duration: 0.6, ease: "easeInOut" }
    },
    inactive: {
      width: "90%", maxWidth: "36rem", height: "8rem", opacity: 1, y: 0,
      transition: { duration: 0.6, ease: "easeInOut" }
    }
  };

  return (
    <motion.div
      ref={node}
      variants={containerVariants}
      initial="initial"
      animate={feedbackActive ? "active" : "inactive"}
      className="bg-gradient-to-br from-zinc-900 to-zinc-800 shadow-2xl overflow-visible border border-zinc-700 relative mx-auto"
    >
      {[
        { position: "top-0 left-0", translate: "-translate-x-1/2 -translate-y-1/2" },
        { position: "top-0 right-0", translate: "translate-x-1/2 -translate-y-1/2" },
        { position: "bottom-0 left-0", translate: "-translate-x-1/2 translate-y-1/2" },
        { position: "bottom-0 right-0", translate: "translate-x-1/2 translate-y-1/2" }
      ].map((corner, index) => (
        <svg
          key={index}
          className={`absolute ${corner.position} ${corner.translate} text-zinc-600`}
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <motion.path
            d="M12 4V20M4 12H20"
            stroke="currentColor"
            strokeWidth="1"
            strokeLinecap="square"
            strokeLinejoin="round"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: index * 0.1, duration: 0.5 }}
          />
        </svg>
      ))}
      <motion.div
        className="p-4 sm:p-10 h-full flex flex-col justify-between"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.2, duration: 0.5 }}
      >
        <AnimatePresence>
          {feedbackActive && (
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.5 }}
            >
              {isSubmitting ? (
                <motion.div
                  className="w-full h-40 flex items-center justify-center bg-zinc-800 border border-zinc-600"
                  initial={{ scale: 0, rotate: -180 }}
                  animate={{ scale: 1, rotate: 0 }}
                  transition={{ type: "spring", stiffness: 260, damping: 20 }}
                >
                  <motion.div
                    className="loader border-t-4 border-white rounded-full w-16 h-16"
                    animate={{ rotate: 360 }}
                    transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                  ></motion.div>
                </motion.div>
              ) : isSubmitted ? (
                <motion.div
                  className="w-full h-40 flex items-center justify-center bg-zinc-800 border border-zinc-600 text-white text-2xl relative overflow-hidden"
                  initial={{ scale: 0, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  transition={{ type: "spring", stiffness: 260, damping: 20 }}
                >
                  <motion.span
                    initial={{ y: 20, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ delay: 0.2, duration: 0.5 }}
                  >
                    Your feedback is submitted!
                  </motion.span>
                  <div ref={confettiRef} className="absolute inset-0 w-full h-full">
                    <Confetti
                      recycle={false}
                      numberOfPieces={300}
                      gravity={0.3}
                      colors={['#002366', '#003399', '#0044cc', '#0055ff', '#3366ff']}
                    />
                  </div>
                </motion.div>
              ) : (
                <>
                  <motion.textarea
                    value={feedback}
                    onChange={(e) => setFeedback(e.target.value)}
                    className="w-full h-40 p-6 bg-zinc-800 border border-zinc-600 resize-none text-white focus:outline-none focus:border-[#4138af] rounded-xl text-lg mb-2 placeholder-zinc-500 transition-all duration-300"
                    placeholder="Your feedback is valuable to us..."
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 20 }}
                    transition={{ duration: 0.5 }}
                    disabled={isSubmitted}
                  />
                  {feedbackError && (
                    <motion.div
                      className="text-red-500 text-sm mt-2"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      transition={{ duration: 0.5 }}
                    >
                      {feedbackError}
                    </motion.div>
                  )}
                </>
              )}
            </motion.div>
          )}
        </AnimatePresence>
        <motion.div
          className={cn("flex items-center", feedbackActive ? "justify-between" : "justify-center")}
          layout
          transition={{ duration: 0.5 }}
        >
          <motion.div
            className="flex space-x-2 sm:space-x-6"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.3, duration: 0.5 }}
          >
            {ratingIcons.map((item, index) => (
              <motion.button
                key={index}
                whileHover={{ scale: 1.15, rotate: 5 }}
                whileTap={{ scale: 0.95, rotate: -5 }}
                onClick={() => {
                  if (!isSubmitted) {
                    setRating(index + 1);
                    setFeedbackActive(true);
                  }
                }}
                className="focus:outline-none relative"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1, duration: 0.3 }}
                disabled={isSubmitted}
              >
                <motion.div
                  animate={{
                    scale: rating === index + 1 ? 1.2 : 1,
                    y: rating === index + 1 ? -5 : 0,
                  }}
                  transition={{ type: "spring", stiffness: 500, damping: 30 }}
                >
                  <item.icon
                    size={48}
                    className={cn(
                      "transition-all duration-300",
                      rating === index + 1 ? "opacity-100" : "opacity-50 hover:opacity-75"
                    )}
                    fill={rating === index + 1 ? item.color : "#ffffff"}
                  />
                </motion.div>
                <AnimatePresence>
                  {rating === index + 1 && (
                    <motion.span
                      initial={{ opacity: 0, y: 10, scale: 0.8 }}
                      animate={{ opacity: 1, y: 0, scale: 1 }}
                      exit={{ opacity: 0, y: 10, scale: 0.8 }}
                      transition={{ duration: 0.3 }}
                      className="absolute -bottom-8 left-1/2 transform -translate-x-1/2 text-sm font-medium text-white bg-zinc-700 px-3 py-1 whitespace-nowrap rounded-full"
                    >
                      {item.label}
                    </motion.span>
                  )}
                </AnimatePresence>
              </motion.button>
            ))}
          </motion.div>
          <AnimatePresence>
            {feedbackActive && (
              <motion.button
                className="flex items-center justify-center w-12 h-12 rounded-full bg-white shadow-lg text-zinc-900 overflow-hidden"
                initial={{ scale: 0, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0, opacity: 0 }}
                transition={{ type: "spring", stiffness: 260, damping: 20 }}
                onClick={handleSubmit}
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
              >
                <motion.div animate={planeControls}>
                  <FaPaperPlane size={24} />
                </motion.div>
              </motion.button>
            )}
          </AnimatePresence>
        </motion.div>
      </motion.div>
    </motion.div>
  );
};

export default FeedbackRating;
