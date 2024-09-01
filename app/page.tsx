"use client";

import dynamic from 'next/dynamic';
import FeedbackRating from "./components/rating";

const Particles = dynamic(() => import("./components/background"), { ssr: false });

export default function Home() {
  return (
    <div className="relative min-h-screen">
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
      <div className="flex min-h-screen items-center justify-center relative">
{/* main thing 👇 */}
        <FeedbackRating />
      </div>
    </div>
  );
}
