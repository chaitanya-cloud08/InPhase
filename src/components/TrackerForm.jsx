// src/components/TrackerForm.jsx
import React, { useState } from 'react'; // removed useEffect
import { MOOD_OPTIONS, SKIN_CONDITIONS, HAIR_CONDITIONS, FLOW_INTENSITY, CRAVING_OPTIONS } from '../constants/appData';
import { getTodayDateString } from '../utils/helpers';
import Button from './ui/Button';
import Card from './ui/Card';

// --- UPDATED: Accept currentDate prop ---
const TrackerForm = ({ onSave, existingEntry, currentDate }) => {
  
  // --- UPDATED: Initialize state based on props ---
  // The state is initialized once when the component mounts.
  // Because we use a `key` prop in App.jsx, this component will re-mount
  // with the correct initial state whenever the date changes.
  const [entry, setEntry] = useState(
    existingEntry || {
      date: currentDate, // Use the date passed via props
      mood: 3,
      energyLevel: 5,
      sleepHours: 8,
      periodStarted: false,
      cramps: false,
      flowIntensity: '',
      skinCondition: 'Normal',
      hairCondition: 'Normal',
      cravings: [],
      weight: '',
      stressLevel: 5,
      notes: ''
    }
  );

  // The useEffect hook that set the entry is no longer needed because
  // the key prop in App.jsx forces a re-mount with fresh state.

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    if (type === 'checkbox') {
        if (name === 'cravings') {
            setEntry(prev => ({
                ...prev,
                cravings: checked ? [...prev.cravings, value] : prev.cravings.filter(c => c !== value)
            }));
        } else {
            setEntry(prev => ({ ...prev, [name]: checked }));
        }
    } else {
      setEntry(prev => ({ ...prev, [name]: value }));
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSave(entry);
    
  };
  
const isToday = currentDate === getTodayDateString();
  return (
    <Card className="w-full">
      {/* --- UPDATED: Title is now dynamic based on the date being viewed --- */}
      <h2 className="text-2xl font-bold text-brand-primary mb-4">
        {isToday ? "Daily Check-in" : "Editing Entry For"} 
        <span className="ml-2 font-normal text-text-secondary">
          {new Date(entry.date + 'T00:00:00').toLocaleDateString('en-US', { weekday: 'long', month: 'long', day: 'numeric' })}
        </span>
      </h2>
      <form onSubmit={handleSubmit} className="space-y-6">
        
        {/* The rest of the form remains exactly the same... */}
        
        {/* Mood */}
        <div>
          <label className="block font-medium mb-2">How are you feeling?</label>
          <div className="flex justify-around bg-pastel-blue/30 p-2 rounded-full">
            {MOOD_OPTIONS.map(({ value, label, icon }) => (
              <label key={value} className="flex flex-col items-center cursor-pointer">
                <input type="radio" name="mood" value={value} checked={entry.mood == value} onChange={handleChange} className="hidden" />
                <span className={`text-3xl transition-transform duration-200 ${entry.mood == value ? 'scale-125' : 'opacity-60'}`}>{icon}</span>
                <span className={`text-xs mt-1 font-medium ${entry.mood == value ? 'text-brand-primary' : 'text-text-secondary'}`}>{label}</span>
              </label>
            ))}
          </div>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Energy & Stress */}
          <div>
            <label htmlFor="energyLevel" className="block font-medium mb-1">Energy Level: {entry.energyLevel}/10</label>
            <input type="range" id="energyLevel" name="energyLevel" min="1" max="10" value={entry.energyLevel} onChange={handleChange} />
          </div>
           <div>
            <label htmlFor="stressLevel" className="block font-medium mb-1">Stress Level: {entry.stressLevel}/10</label>
            <input type="range" id="stressLevel" name="stressLevel" min="1" max="10" value={entry.stressLevel} onChange={handleChange} />
          </div>

          {/* Sleep & Weight */}
          <div>
            <label htmlFor="sleepHours" className="block font-medium mb-1">Hours of Sleep</label>
            <input type="number" id="sleepHours" name="sleepHours" value={entry.sleepHours} onChange={handleChange} className="w-full rounded-lg border-gray-300 focus:border-brand-primary focus:ring-brand-primary" />
          </div>
           <div>
            <label htmlFor="weight" className="block font-medium mb-1">Weight (kg, optional)</label>
            <input type="number" step="0.1" id="weight" name="weight" value={entry.weight} onChange={handleChange} className="w-full rounded-lg border-gray-300 focus:border-brand-primary focus:ring-brand-primary" />
          </div>
        </div>

        {/* Period */}
        <div className="p-4 bg-pastel-pink/30 rounded-lg">
          <h3 className="font-semibold text-lg mb-2">Period Details</h3>
          <div className="flex flex-wrap items-center gap-4">
            <label className="flex items-center gap-2"><input type="checkbox" name="periodStarted" checked={entry.periodStarted} onChange={handleChange} className="rounded text-brand-primary focus:ring-brand-primary" /> Period Started Today</label>
            <label className="flex items-center gap-2"><input type="checkbox" name="cramps" checked={entry.cramps} onChange={handleChange} className="rounded text-brand-primary focus:ring-brand-primary" /> Cramps</label>
          </div>
           { (entry.periodStarted || entry.flowIntensity) && (
              <div className="mt-4">
                <label className="block font-medium mb-2">Flow Intensity</label>
                <div className="flex gap-2">
                    {FLOW_INTENSITY.map(flow => (
                        <button type="button" key={flow} onClick={() => setEntry(p => ({...p, flowIntensity: flow}))}
                          className={`px-3 py-1.5 rounded-full text-sm transition-colors ${entry.flowIntensity === flow ? 'bg-brand-primary text-white' : 'bg-white hover:bg-gray-100'}`}>
                          {flow}
                        </button>
                    ))}
                </div>
              </div>
           )}
        </div>

        {/* Skin & Hair */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label htmlFor="skinCondition" className="block font-medium mb-1">Skin Condition</label>
            <select name="skinCondition" id="skinCondition" value={entry.skinCondition} onChange={handleChange} className="w-full rounded-lg border-gray-300 focus:border-brand-primary focus:ring-brand-primary">
              {SKIN_CONDITIONS.map(c => <option key={c} value={c}>{c}</option>)}
            </select>
          </div>
           <div>
            <label htmlFor="hairCondition" className="block font-medium mb-1">Hair Condition</label>
            <select name="hairCondition" id="hairCondition" value={entry.hairCondition} onChange={handleChange} className="w-full rounded-lg border-gray-300 focus:border-brand-primary focus:ring-brand-primary">
              {HAIR_CONDITIONS.map(c => <option key={c} value={c}>{c}</option>)}
            </select>
          </div>
        </div>

        {/* Cravings */}
        <div>
          <label className="block font-medium mb-2">Food Cravings</label>
          <div className="flex flex-wrap gap-2">
            {CRAVING_OPTIONS.map(craving => (
              <label key={craving} className="cursor-pointer">
                <input type="checkbox" name="cravings" value={craving} checked={entry.cravings.includes(craving)} onChange={handleChange} className="hidden" />
                <span className={`px-3 py-1.5 rounded-full text-sm transition-colors ${entry.cravings.includes(craving) ? 'bg-brand-primary text-white' : 'bg-pastel-yellow/50 hover:bg-pastel-yellow'}`}>{craving}</span>
              </label>
            ))}
          </div>
        </div>

        {/* Notes */}
        <div>
          <label htmlFor="notes" className="block font-medium mb-1">Additional Notes</label>
          <textarea id="notes" name="notes" rows="3" value={entry.notes} onChange={handleChange} className="w-full rounded-lg border-gray-300 focus:border-brand-primary focus:ring-brand-primary"></textarea>
        </div>

        <div className="text-center pt-4">
          <Button type="submit">
            {existingEntry ? 'Update Entry' : 'Save Entry'}
          </Button>
        </div>
      </form>
    </Card>
  );
};

export default TrackerForm;