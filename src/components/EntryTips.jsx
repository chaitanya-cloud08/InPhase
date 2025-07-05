// src/components/EntryTips.jsx
import { Sparkles } from 'lucide-react';
import Card from './ui/Card';
import { generateSmartTips } from '../utils/helpers';

const EntryTips = ({ entry }) => {
  // Generate tips based on the provided entry object
  const tips = generateSmartTips(entry);

  // If there is no entry for the day, or the entry generates no tips,
  // don't render this component at all.
  if (!entry || tips.length === 0) {
    return null; // or you could return a placeholder card
  }

  return (
    <Card className="bg-pastel-green/40">
      <div className="flex items-center gap-2 mb-2 text-green-800">
        <Sparkles size={20} />
        <h3 className="font-semibold text-lg">Insights for Your Day</h3>
      </div>
      <ul className="list-disc list-inside space-y-1 text-text-secondary">
        {tips.map((tip, index) => (
          <li key={index}>{tip}</li>
        ))}
      </ul>
    </Card>
  );
};

export default EntryTips;