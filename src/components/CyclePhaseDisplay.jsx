// src/components/CyclePhaseDisplay.jsx
import { motion } from 'framer-motion';
import { PauseCircle } from 'lucide-react';
import Card from './ui/Card';

const CyclePhaseDisplay = ({ cycleInfo }) => {
  // This 'if' block now handles three cases:
  // 1. No entries at all.
  // 2. No period logged before the selected date.
  // 3. The cycle is longer than our reasonable threshold (the new logic).
  if (!cycleInfo || !cycleInfo.phase) {
    return (
      <Card className="bg-gray-100 text-center">
        <PauseCircle className="mx-auto text-gray-400 mb-2" size={32} />
        <p className="text-text-secondary font-medium">
          {cycleInfo?.message || "Log your period to begin cycle tracking."}
        </p>
        {/* Also show the day count if it's a long cycle, which is useful info */}
        {cycleInfo?.dayOfCycle > 0 && (
          <p className="mt-2 text-sm font-semibold text-brand-primary">
            Current Cycle Day: {cycleInfo.dayOfCycle}
          </p>
        )}
      </Card>
    );
  }

  const { phase, dayOfCycle, targetDateStr } = cycleInfo;
  const Icon = phase.icon;
  
  const isToday = targetDateStr === new Date().toISOString().split('T')[0];
  const displayDate = new Date(targetDateStr + 'T00:00:00').toLocaleDateString('en-us', { month: 'short', day: 'numeric' });

  return (
    <motion.div
      initial={{ scale: 0.9, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      transition={{ type: 'spring', stiffness: 260, damping: 20 }}
    >
      <Card className={`!bg-opacity-80 ${phase.color}`}>
        <div className="flex items-center gap-4">
          <div className={`p-3 rounded-full bg-white/50`}>
            <Icon className="text-black" size={32} />
          </div>
          <div>
            <p className="font-bold text-xl text-black">
              {phase.name} Phase
              {!isToday && <span className="text-sm font-normal ml-2">({displayDate})</span>}
            </p>
            <p className="text-black text-sm">Day {dayOfCycle} of your cycle</p>
          </div>
        </div>
        <p className="mt-3 text-black">{phase.description}</p>
      </Card>
    </motion.div>
  );
};

export default CyclePhaseDisplay;