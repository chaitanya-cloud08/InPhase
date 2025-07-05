// src/components/CyclePhaseDisplay.jsx
import { motion } from 'framer-motion';
import Card from './ui/Card';

const CyclePhaseDisplay = ({ cycleInfo }) => {
  if (!cycleInfo || !cycleInfo.phase) {
    return (
      <Card className="text-center">
        <p className="text-text-secondary">{cycleInfo?.message || "Log your period to begin cycle tracking."}</p>
      </Card>
    );
  }

  const { phase, dayOfCycle } = cycleInfo;
  const Icon = phase.icon;

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