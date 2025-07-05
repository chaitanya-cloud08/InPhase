// src/utils/helpers.js

import { SMART_TIPS_TRIGGERS } from "../constants/appData";

export const generateSmartTips = (entry) => {
  const tips = [];
  if (!entry) return tips;

  if (entry.energyLevel <= 2) tips.push(SMART_TIPS_TRIGGERS.lowEnergy);
  if (entry.stressLevel >= 7) tips.push(SMART_TIPS_TRIGGERS.highStress);
  if (entry.skinCondition === 'Acne') tips.push(SMART_TIPS_TRIGGERS.acne);
  if (entry.hairCondition === 'Hair Fall') tips.push(SMART_TIPS_TRIGGERS.hairfall);
  if (entry.cravings?.length > 0) tips.push(SMART_TIPS_TRIGGERS.cravings);
  if (entry.sleepHours < 6) tips.push(SMART_TIPS_TRIGGERS.poorSleep);
  
  return tips.sort(() => 0.5 - Math.random()).slice(0, 2);
};

// --- THIS IS THE CORRECT, ROBUST IMPLEMENTATION ---
export const getTodayDateString = () => {
    const today = new Date();
    
    const year = today.getFullYear();
    
    // getMonth() is 0-indexed (0 for January), so we add 1.
    // padStart ensures the month is always two digits (e.g., '07' for July).
    const month = String(today.getMonth() + 1).padStart(2, '0');
    
    // getDate() returns the day of the month.
    // padStart ensures the day is always two digits (e.g., '06').
    const day = String(today.getDate()).padStart(2, '0');
    
    return `${year}-${month}-${day}`;
}