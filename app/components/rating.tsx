"use client";
import { FaRegSmileBeam, FaRegSmile, FaRegMeh, FaRegSadTear, FaRegSadCry, FaPaperPlane } from "react-icons/fa";
import { useRef, useEffect, useState } from "react";
import { motion, AnimatePresence, useAnimation } from "framer-motion";
import { cn } from "@/lib/utils";

const FeedbackRating = () => {
  const [rating, setRating] = useState<number | null>(null);
  const [feedbackActive, setFeedbackActive] = useState(false);
  const [feedback, setFeedback] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const node = useRef<HTMLDivElement>(null);

  const buttonControls = useAnimation();

  useEffect(() => {
    if (feedbackActive) {
      const handleClickOutside = (e: MouseEvent) => {
        if (node.current && !node.current.contains(e.target as Node)) {
          setFeedbackActive(false);
          setRating(null);
          setFeedback("");
        }
      };
      document.addEventListener("mousedown", handleClickOutside);
      return () => {
        document.removeEventListener("mousedown", handleClickOutside);
      };
    }
  }, [feedbackActive]);

  const handleSubmit = async () => {
    setIsSubmitting(true);
    setIsSubmitted(false);

    await buttonControls.start({
      scale: [1, 1.2, 1],
      rotate: [0, 10, -10, 0],
      transition: { duration: 0.5 },
    });

    // Simulate a network request delay
    setTimeout(() => {
      setIsSubmitting(false);
      setIsSubmitted(true);
    }, 3000); // 3 seconds delay to show the loader and the animation
  };

  const ratingIcons = [
    { icon: FaRegSadCry, color: "#FF4136", label: "Terrible" },
    { icon: FaRegSadTear, color: "#FF851B", label: "Bad" },
    { icon: FaRegMeh, color: "#FFDC00", label: "Okay" },
    { icon: FaRegSmile, color: "#2ECC40", label: "Good" },
    { icon: FaRegSmileBeam, color: "#01FF70", label: "Excellent" },
  ];

  return (
    <motion.div
      ref={node}
      initial={{ width: "18rem", height: "4rem" }}
      animate={{
        width: feedbackActive ? "26rem" : "18rem",
        height: feedbackActive ? "12rem" : "4rem",
      }}
      transition={{ duration: 0.4, ease: [0.6, 0.05, -0.01, 0.9] }}
      className="bg-gradient-to-br from-zinc-900 to-zinc-800 rounded-xl shadow-2xl overflow-hidden border border-zinc-700"
    >
      <div className="p-5 h-full flex flex-col justify-between">
        <AnimatePresence>
          {feedbackActive && (
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.3 }}
            >
              {isSubmitting ? (
                <div className="w-full h-20 flex items-center justify-center bg-zinc-800 rounded-lg border border-zinc-600">
                  <div className="loader border-t-4 border-[#F0FFFF] rounded-full w-8 h-8 animate-spin"></div>
                </div>
              ) : isSubmitted ? (
                <div className="w-full h-20 flex items-center justify-center bg-zinc-800 rounded-lg border border-zinc-600 text-white">
                  Your feedback is submitted!
                </div>
              ) : (
                <textarea
                  value={feedback}
                  onChange={(e) => setFeedback(e.target.value)}
                  className="w-full h-20 p-3 bg-zinc-800 rounded-lg border border-zinc-600 resize-none text-white focus:outline-none focus:border-blue-500 text-sm mb-1 placeholder-zinc-500 transition-all duration-300"
                  placeholder="Your feedback is valuable to us..."
                />
              )}
            </motion.div>
          )}
        </AnimatePresence>
        <div className={cn("flex items-center", feedbackActive ? "justify-between" : "justify-center")}>
          <div className="flex space-x-3">
            {ratingIcons.map((item, index) => (
              <motion.button
                key={index}
                whileHover={{ scale: 1.15, rotate: 5 }}
                whileTap={{ scale: 0.95, rotate: -5 }}
                onClick={() => {
                  setRating(index + 1);
                  setFeedbackActive(true);
                }}
                className="focus:outline-none relative"
              >
                <motion.div
                  animate={{
                    scale: rating === index + 1 ? 1.2 : 1,
                    y: rating === index + 1 ? -5 : 0,
                  }}
                  transition={{ type: "spring", stiffness: 500, damping: 30 }}
                >
                  <item.icon
                    size={32}
                    className={cn(
                      "transition-all duration-300",
                      rating === index + 1 ? "opacity-100" : "opacity-50 hover:opacity-75"
                    )}
                    fill={rating === index + 1 ? item.color : "#ffffff"}
                  />
                </motion.div>
                {rating === index + 1 && (
                  <motion.span
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="absolute -bottom-6 left-1/2 transform -translate-x-1/2 text-xs font-medium text-white bg-zinc-700 px-2 py-1 rounded-full whitespace-nowrap"
                  >
                    {item.label}
                  </motion.span>
                )}
              </motion.button>
            ))}
          </div>
          <AnimatePresence>
            {feedbackActive && (
              <motion.button
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.8 }}
                whileHover={{ scale: 1.05, boxShadow: "0 0 15px rgba(128, 128, 128, 0.1)" }}
                whileTap={{ scale: 0.95 }}
                onClick={handleSubmit}
                className="relative overflow-hidden rounded-full bg-[#c4c4c4] px-4 py-3 text-sm font-medium text-gray-950"
              >
                <motion.div
                  className="absolute inset-0 bg-[#ffffff]"
                  initial={{ scaleX: 0 }}
                  animate={{ scaleX: isSubmitted ? 1 : 0 }}
                  transition={{ duration: 0.5 }}
                  style={{ transformOrigin: 'left' }}
                />
                <motion.div className="relative z-10 flex items-center justify-center space-x-1">
                  <FaPaperPlane size={16} />
                  <span>{isSubmitted ? 'Submitted' : 'Submit'}</span>
                </motion.div>
              </motion.button>
            )}
          </AnimatePresence>
        </div>
      </div>
    </motion.div>
  );
};

export default FeedbackRating;
