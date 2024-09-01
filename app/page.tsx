"use client";

import dynamic from 'next/dynamic';
import FeedbackRating from "./components/rating";

import { FaHeart, FaCss3Alt, FaReact, FaRunning } from "react-icons/fa";
import { motion } from "framer-motion";

const Particles = dynamic(() => import("./components/background"), { ssr: false });

export default function Home() {
  return (
    <div className="relative min-h-screen h-screen">
      {/* Particle Background */}
      <Particles
        className="absolute inset-0"
        quantity={150}
        color="#4138af"
        size={0.6}
        staticity={60}
        ease={50}
        vx={0.1}
        vy={0.1}
      />
      <div className="flex min-h-screen h-screen items-center justify-center relative">
        {/* main thing 👇 */}
        <FeedbackRating />
      </div>

      <div className='absolute inset-0 flex flex-col items-center justify-end pointer-events-none'>
        <div className="bg-gradient-to-r from-transparent via-[#4138af] to-transparent h-px w-full pointer-events-auto" />

        <motion.footer
          className="bottom-0 w-full text-center p-4 bg-black text-white flex flex-col items-center space-y-2 pointer-events-auto"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <motion.div
            className="flex items-center space-x-2"
            whileHover={{ scale: 1.1 }}
          >
            <span>Made with</span>
            <FaHeart className="text-red-500" />
            <span>by Anshul Soni</span>
          </motion.div>
          <motion.div
            className="flex space-x-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3, duration: 0.5 }}
          >
            <motion.div
              className="flex items-center space-x-2"
              whileHover={{ scale: 1.1 }}
            >
              <FaCss3Alt className="h-6" />
              <span>Tailwind CSS</span>
            </motion.div>
            <motion.div
              className="flex items-center space-x-2"
              whileHover={{ scale: 1.1 }}
            >
              <FaReact className="h-6" />
              <span>Next.js</span>
            </motion.div>
            <motion.div
              className="flex items-center space-x-2"
              whileHover={{ scale: 1.1 }}
            >
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" className="h-6"><path d="M12 12l-8 -8v16l16 -16v16l-4 -4"></path><path d="M20 12l-8 8l-4 -4"></path></svg>
              <span>Framer Motion</span>
            </motion.div>
          </motion.div>
        </motion.footer>
      </div>
      <div className="fixed top-4 right-4 flex space-x-2 z-50">
        <motion.div
          className="cursor-pointer bg-white p-1 rounded-full"
          whileHover={{ scale: 1.1 }}
          onClick={() => window.location.href = "https://x.com/anshulsoni2010"}
        >
          <svg xmlns="http://www.w3.org/2000/svg" height="24" viewBox="0 0 50 50" fill="black">
            <path d="M 11 4 C 7.134 4 4 7.134 4 11 L 4 39 C 4 42.866 7.134 46 11 46 L 39 46 C 42.866 46 46 42.866 46 39 L 46 11 C 46 7.134 42.866 4 39 4 L 11 4 z M 13.085938 13 L 21.023438 13 L 26.660156 21.009766 L 33.5 13 L 36 13 L 27.789062 22.613281 L 37.914062 37 L 29.978516 37 L 23.4375 27.707031 L 15.5 37 L 13 37 L 22.308594 26.103516 L 13.085938 13 z M 16.914062 15 L 31.021484 35 L 34.085938 35 L 19.978516 15 L 16.914062 15 z"></path>
          </svg>
        </motion.div>
        <motion.div
          className="cursor-pointer bg-white p-1 rounded-full"
          whileHover={{ scale: 1.1 }}
          onClick={() => window.location.href = "https://github.com/anshulsoni2010"}
        >
          <svg xmlns="http://www.w3.org/2000/svg" height="24" viewBox="0 0 24 24" fill="black">
            <path d="M12 0C5.37 0 0 5.37 0 12c0 5.3 3.438 9.8 8.205 11.385.6.11.82-.26.82-.577v-2.165c-3.338.726-4.042-1.61-4.042-1.61-.546-1.387-1.333-1.757-1.333-1.757-1.09-.745.083-.73.083-.73 1.205.085 1.84 1.237 1.84 1.237 1.07 1.835 2.807 1.305 3.492.997.108-.775.42-1.305.763-1.605-2.665-.3-5.466-1.335-5.466-5.93 0-1.31.467-2.38 1.235-3.22-.123-.303-.535-1.523.117-3.176 0 0 1.008-.322 3.3 1.23.957-.266 1.98-.398 3-.403 1.02.005 2.043.137 3 .403 2.29-1.552 3.297-1.23 3.297-1.23.653 1.653.24 2.873.118 3.176.77.84 1.233 1.91 1.233 3.22 0 4.61-2.803 5.625-5.475 5.92.43.37.823 1.102.823 2.222v3.293c0 .32.218.694.825.577C20.565 21.8 24 17.3 24 12c0-6.63-5.37-12-12-12z"/>
          </svg>
        </motion.div>
      </div>
    </div>
  );
}
