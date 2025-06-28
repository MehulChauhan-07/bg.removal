import React, { useEffect, useState } from "react";

const ProcessingProgress = ({ isProcessing, onComplete }) => {
  const [progress, setProgress] = useState(0);
  const [currentPhase, setCurrentPhase] = useState("");

  // Processing phases with descriptions
  const phases = [
    { name: "Uploading", description: "Transferring your image" },
    { name: "Analyzing", description: "Detecting objects and edges" },
    { name: "Processing", description: "Removing background" },
    { name: "Finalizing", description: "Preparing result" },
  ];

  useEffect(() => {
    if (!isProcessing) {
      setProgress(0);
      return;
    }

    let timer;
    let phaseIndex = 0;
    setCurrentPhase(phases[0].name);

    const simulateProgress = () => {
      setProgress((prevProgress) => {
        // Phase transitions
        if (prevProgress >= 25 && phaseIndex === 0) {
          phaseIndex = 1;
          setCurrentPhase(phases[1].name);
        } else if (prevProgress >= 50 && phaseIndex === 1) {
          phaseIndex = 2;
          setCurrentPhase(phases[2].name);
        } else if (prevProgress >= 75 && phaseIndex === 2) {
          phaseIndex = 3;
          setCurrentPhase(phases[3].name);
        }

        const newProgress = prevProgress + 0.5;

        // Complete the process
        if (newProgress >= 100) {
          clearInterval(timer);
          setTimeout(() => {
            onComplete && onComplete();
          }, 500);
          return 100;
        }

        return newProgress;
      });
    };

    timer = setInterval(simulateProgress, 50);
    return () => clearInterval(timer);
  }, [isProcessing, onComplete]);

  if (!isProcessing) return null;

  const currentPhaseObj = phases.find((phase) => phase.name === currentPhase);

  return (
    <div className="w-full max-w-md mx-auto my-6">
      <div className="flex items-center mb-2">
        <span className="text-sm font-medium text-blue-600">
          {currentPhase}
        </span>
        <span className="ml-auto text-sm font-medium">
          {Math.round(progress)}%
        </span>
      </div>

      <div className="w-full bg-gray-200 rounded-full h-2.5 mb-4">
        <div
          className="bg-blue-600 h-2.5 rounded-full transition-all duration-300 ease-out"
          style={{ width: `${progress}%` }}
          role="progressbar"
          aria-valuenow={Math.round(progress)}
          aria-valuemin="0"
          aria-valuemax="100"
        ></div>
      </div>

      <p className="text-sm text-gray-500">
        {currentPhaseObj?.description || ""}
      </p>

      {/* Processing animation */}
      <div className="flex justify-center mt-6">
        <div className="flex space-x-2">
          {[0, 1, 2].map((dot) => (
            <div
              key={dot}
              className={`w-3 h-3 rounded-full bg-blue-600 animate-bounce`}
              style={{
                animationDelay: `${dot * 0.15}s`,
                opacity: 0.6 + dot * 0.2,
              }}
            ></div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ProcessingProgress;
