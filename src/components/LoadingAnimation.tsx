"use client";

import { motion } from "framer-motion";
import { useEffect, useState } from "react";

const steps = [
  { text: "Extracting CV content...", icon: "📄" },
  { text: "Analyzing your experience...", icon: "🔍" },
  { text: "Crafting your portfolio...", icon: "🎨" },
  { text: "Adding finishing touches...", icon: "✨" },
];

export default function LoadingAnimation() {
  const [currentStep, setCurrentStep] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentStep((prev) => (prev < steps.length - 1 ? prev + 1 : prev));
    }, 2000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-[#030014]/90 backdrop-blur-xl">
      <div className="text-center space-y-8 max-w-md mx-auto px-6">
        <div className="relative w-32 h-32 mx-auto">
          <motion.div
            className="absolute inset-0 rounded-full"
            style={{
              background:
                "conic-gradient(from 0deg, #667eea, #764ba2, #f093fb, #667eea)",
            }}
            animate={{ rotate: 360 }}
            transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
          />
          <div className="absolute inset-2 rounded-full bg-[#030014] flex items-center justify-center">
            <motion.span
              className="text-4xl"
              animate={{ scale: [1, 1.2, 1] }}
              transition={{ duration: 1, repeat: Infinity }}
            >
              {steps[currentStep].icon}
            </motion.span>
          </div>
        </div>

        <div className="space-y-4">
          <motion.h2
            key={currentStep}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-xl font-semibold text-white"
          >
            {steps[currentStep].text}
          </motion.h2>

          <div className="flex justify-center gap-2">
            {steps.map((_, i) => (
              <motion.div
                key={i}
                className="h-1.5 rounded-full"
                style={{ width: i <= currentStep ? "2rem" : "0.375rem" }}
                animate={{
                  backgroundColor:
                    i <= currentStep
                      ? "#667eea"
                      : "rgba(255, 255, 255, 0.2)",
                  width: i <= currentStep ? "2rem" : "0.375rem",
                }}
                transition={{ duration: 0.5 }}
              />
            ))}
          </div>
        </div>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 0.5 }}
          transition={{ delay: 1 }}
          className="text-sm text-gray-400"
        >
          Powered by Gemini AI
        </motion.p>
      </div>
    </div>
  );
}
