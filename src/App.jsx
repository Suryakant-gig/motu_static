import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import PandaScene from './components/3d/PandaScene';
import AudioPlayer from './components/common/AudioPlayer';
import BackgroundDecorations from './components/common/BackgroundDecorations';
import ProgressBar from './components/ProgressBar';

// Step components
import HeroScene from './components/steps/HeroScene';
import DrinkSelection from './components/steps/DrinkSelection';
import LocationSelection from './components/steps/LocationSelection';
import DatePicker from './components/steps/DatePicker';
import TimeSelection from './components/steps/TimeSelection';
import OutfitSelection from './components/steps/OutfitSelection';
import ExtrasSelection from './components/steps/ExtrasSelection';
import DateSummary from './components/steps/DateSummary';
import SuccessScene from './components/steps/SuccessScene';

export default function App() {
  // Step 0: Hero
  // Step 1: Drink
  // Step 2: Location
  // Step 3: Date
  // Step 4: Time
  // Step 5: Outfit
  // Step 6: Extras
  // Step 7: Summary
  // Step 8: Success
  const [activeStep, setActiveStep] = useState(0);

  // Form State
  const [dateDetails, setDateDetails] = useState({
    heroResponse: 'YES! OF COURSE ❤️',
    drink: null, // 'coffee' | 'chai'
    location: null,
    date: null,
    time: null,
    outfit: 'Casual and comfy',
    snacks: 'Together',
    personalMessage: '',
  });

  // Step transitions
  const handleHeroAccept = (response) => {
    setDateDetails((prev) => ({ ...prev, heroResponse: response }));
    setActiveStep(1);
  };

  const handleHeroMaybe = (response) => {
    setDateDetails((prev) => ({ ...prev, heroResponse: response }));
    setActiveStep(1);
  };

  const handleNext = () => {
    setActiveStep((prev) => Math.min(prev + 1, 8));
  };

  const handleBack = () => {
    setActiveStep((prev) => Math.max(prev - 1, 0));
  };

  const handleEditFromSummary = () => {
    setActiveStep(1); // Return to first step
  };

  const handleSuccess = () => {
    setActiveStep(8);
  };

  const handleReplay = () => {
    setDateDetails({
      heroResponse: 'YES! OF COURSE ❤️',
      drink: null,
      location: null,
      date: null,
      time: null,
      outfit: 'Casual and comfy',
      snacks: 'Together',
      personalMessage: '',
    });
    setActiveStep(0);
  };

  // Determine 3D Canvas height based on current step
  const getPandaHeight = () => {
    if (activeStep === 0) return 'h-64 sm:h-80 md:h-96';
    if (activeStep === 8) return 'h-64 sm:h-80 md:h-96';
    return 'h-48 sm:h-56';
  };

  return (
    <div className="min-h-screen w-full relative flex flex-col justify-between overflow-x-hidden bg-[#FFF5F7] text-[#49343D]">
      {/* Ambient background particles & glows */}
      <BackgroundDecorations />

      {/* Floating Audio Player (Top-Right) */}
      <AudioPlayer />

      {/* Header Bar */}
      <header className="relative z-20 w-full pt-4 pb-2 px-4 flex items-center justify-center">
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex items-center gap-2 cursor-pointer select-none"
          onClick={() => activeStep > 0 && activeStep < 8 && setActiveStep(0)}
        >
          <span className="text-xl">🐼</span>
          <span className="font-script text-xl sm:text-2xl text-[#D9658B]">
            A Little Date With You
          </span>
          <span className="text-sm text-[#FF5C8A]">❤️</span>
        </motion.div>
      </header>

      {/* Progress Bar (Visible during steps 1 to 7) */}
      {activeStep >= 1 && activeStep <= 7 && (
        <div className="relative z-20 w-full">
          <ProgressBar
            currentStep={activeStep}
            totalSteps={7}
            onStepClick={(step) => setActiveStep(step)}
          />
        </div>
      )}

      {/* Main Interactive Stage */}
      <main className="relative z-10 flex-1 flex flex-col items-center justify-center w-full px-2 py-4">
        {/* 3D Panda Companion Canvas */}
        <div className={`w-full max-w-2xl mx-auto transition-all duration-500 ease-in-out ${getPandaHeight()}`}>
          <PandaScene
            activeStep={activeStep}
            drinkChoice={dateDetails.drink}
            isCelebration={activeStep === 8}
          />
        </div>

        {/* Dynamic Multi-Step Content with Smooth Framer Motion Transitions */}
        <div className="w-full max-w-4xl mx-auto">
          <AnimatePresence mode="wait">
            {activeStep === 0 && (
              <motion.div
                key="step-0"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.35 }}
                className="w-full"
              >
                <HeroScene
                  onAccept={handleHeroAccept}
                  onMaybe={handleHeroMaybe}
                />
              </motion.div>
            )}

            {activeStep === 1 && (
              <motion.div
                key="step-1"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.35 }}
                className="w-full"
              >
                <DrinkSelection
                  selectedDrink={dateDetails.drink}
                  onSelectDrink={(drink) =>
                    setDateDetails((prev) => ({ ...prev, drink }))
                  }
                  onNext={handleNext}
                />
              </motion.div>
            )}

            {activeStep === 2 && (
              <motion.div
                key="step-2"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.35 }}
                className="w-full"
              >
                <LocationSelection
                  selectedLocation={dateDetails.location}
                  onSelectLocation={(location) =>
                    setDateDetails((prev) => ({ ...prev, location }))
                  }
                  onNext={handleNext}
                  onBack={handleBack}
                />
              </motion.div>
            )}

            {activeStep === 3 && (
              <motion.div
                key="step-3"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.35 }}
                className="w-full"
              >
                <DatePicker
                  selectedDate={dateDetails.date}
                  onSelectDate={(date) =>
                    setDateDetails((prev) => ({ ...prev, date }))
                  }
                  onNext={handleNext}
                  onBack={handleBack}
                />
              </motion.div>
            )}

            {activeStep === 4 && (
              <motion.div
                key="step-4"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.35 }}
                className="w-full"
              >
                <TimeSelection
                  selectedTime={dateDetails.time}
                  onSelectTime={(time) =>
                    setDateDetails((prev) => ({ ...prev, time }))
                  }
                  onNext={handleNext}
                  onBack={handleBack}
                />
              </motion.div>
            )}

            {activeStep === 5 && (
              <motion.div
                key="step-5"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.35 }}
                className="w-full"
              >
                <OutfitSelection
                  selectedOutfit={dateDetails.outfit}
                  onSelectOutfit={(outfit) =>
                    setDateDetails((prev) => ({ ...prev, outfit }))
                  }
                  onNext={handleNext}
                  onBack={handleBack}
                />
              </motion.div>
            )}

            {activeStep === 6 && (
              <motion.div
                key="step-6"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.35 }}
                className="w-full"
              >
                <ExtrasSelection
                  selectedSnacks={dateDetails.snacks}
                  personalMessage={dateDetails.personalMessage}
                  onSelectSnacks={(snacks) =>
                    setDateDetails((prev) => ({ ...prev, snacks }))
                  }
                  onChangeMessage={(personalMessage) =>
                    setDateDetails((prev) => ({ ...prev, personalMessage }))
                  }
                  onNext={handleNext}
                  onBack={handleBack}
                />
              </motion.div>
            )}

            {activeStep === 7 && (
              <motion.div
                key="step-7"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.35 }}
                className="w-full"
              >
                <DateSummary
                  dateDetails={dateDetails}
                  onEdit={handleEditFromSummary}
                  onSubmissionSuccess={handleSuccess}
                />
              </motion.div>
            )}

            {activeStep === 8 && (
              <motion.div
                key="step-8"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.35 }}
                className="w-full"
              >
                <SuccessScene onReplay={handleReplay} />
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </main>

      {/* Footer */}
      <footer className="relative z-10 w-full py-4 text-center text-xs text-[#A78E99] font-rounded">
        <p>Made with all my heart ❤️ • Forever and always</p>
      </footer>
    </div>
  );
}

