// src/components/HistoryList.jsx
import Card from './ui/Card';
import Button from './ui/Button';
import { MOOD_OPTIONS } from '../constants/appData';
import { Trash2, Edit } from 'lucide-react';

const HistoryList = ({ entries, onEdit, onDelete }) => {
  if (entries.length === 0) {
    return <Card><p className="text-center text-text-secondary">No entries yet. Start by adding today's entry!</p></Card>
  }
  
  // Sort entries by date, newest first
  const sortedEntries = [...entries].sort((a, b) => new Date(b.date) - new Date(a.date));

  return (
    <div className="space-y-4">
      {sortedEntries.map(entry => (
        <Card key={entry.date}>
          <div className="flex justify-between items-start">
            <div>
              <h3 className="font-bold text-lg text-brand-primary">
                {new Date(entry.date).toLocaleDateString('en-US', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}
              </h3>
              <p className="text-2xl mt-1">{MOOD_OPTIONS.find(m => m.value == entry.mood)?.icon} <span className="text-sm font-medium align-middle">{MOOD_OPTIONS.find(m => m.value == entry.mood)?.label}</span></p>
            </div>
            <div className="flex gap-2">
               <button onClick={() => onEdit(entry)} className="p-2 text-brand-secondary hover:bg-pastel-blue/50 rounded-full transition-colors"><Edit size={20} /></button>
               <button onClick={() => {if(confirm('Are you sure you want to delete this entry?')) {onDelete(entry.date)}}} className="p-2 text-red-500 hover:bg-pastel-pink/50 rounded-full transition-colors"><Trash2 size={20} /></button>
            </div>
          </div>
          <div className="mt-4 border-t pt-4 text-sm text-text-secondary space-y-1">
             <p><strong>Energy:</strong> {entry.energyLevel}/10 | <strong>Stress:</strong> {entry.stressLevel}/10 | <strong>Sleep:</strong> {entry.sleepHours} hrs</p>
             {entry.periodStarted && <p className="text-red-600 font-semibold">Period Day</p>}
             {entry.cravings?.length > 0 && <p><strong>Cravings:</strong> {entry.cravings.join(', ')}</p>}
             {entry.notes && <p className="mt-2 italic"><strong>Notes:</strong> "{entry.notes}"</p>}
          </div>
        </Card>
      ))}
    </div>
  );
};

export default HistoryList;