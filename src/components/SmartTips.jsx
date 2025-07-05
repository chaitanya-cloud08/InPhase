// src/components/SmartTips.jsx
import { Lightbulb } from 'lucide-react';
import Card from './ui/Card';

// --- UPDATED: This component now only takes cyclePhaseInfo ---
const SmartTips = ({ cyclePhaseInfo }) => {
  const cycleTips = cyclePhaseInfo?.phase?.tips || [];

  // Don't render the component if there are no cycle-specific tips to show
  if (cycleTips.length === 0) {
    return null;
  }

  return (
    <Card className="bg-pastel-yellow/50">
      <div className="flex items-center gap-2 mb-2 text-yellow-800">
        <Lightbulb size={20} />
        {/* --- UPDATED: Title is more specific now --- */}
        <h3 className="font-semibold text-lg">Tips for Your Phase</h3>
      </div>
      <ul className="list-disc list-inside space-y-1 text-text-secondary">
        {cycleTips.map((tip, index) => (
          <li key={index}>{tip}</li>
        ))}
      </ul>
    </Card>
  );
};

export default SmartTips;