// src/utils/cycleLogic.js
import { differenceInDays } from 'date-fns';
import { CYCLE_PHASES } from '../constants/appData';

// --- UPDATED: Add 'targetDateStr' parameter ---
export const calculateCyclePhase = (entries, cycleLength = 28, targetDateStr = null) => {
  if (!entries || entries.length === 0) {
    return { phase: null, dayOfCycle: 0 };
  }

  // --- UPDATED: Use the target date if provided, otherwise default to today ---
  const targetDate = targetDateStr ? new Date(targetDateStr + 'T00:00:00') : new Date();
  targetDate.setHours(0, 0, 0, 0); // Normalize to the start of the day

  // Find the most recent period start date *on or before the target date*
  const periodStarts = entries
    .filter(e => e.periodStarted && new Date(e.date) <= targetDate) // Critical update
    .map(e => new Date(e.date))
    .sort((a, b) => b - a);

  if (periodStarts.length === 0) {
    return { phase: null, dayOfCycle: 0, message: "Log a period before this date to see its cycle phase." };
  }

  const lastPeriodDate = periodStarts[0];
  const dayOfCycle = differenceInDays(targetDate, lastPeriodDate) + 1;

  if (dayOfCycle <= 0 || dayOfCycle > cycleLength * 1.5) {
     return { phase: null, dayOfCycle: 0, message: "Log a recent period to update your cycle." };
  }

  // Pass the target date string in the result for UI use
  const result = { dayOfCycle, targetDateStr: targetDate.toISOString().split('T')[0] };

  if (dayOfCycle >= 1 && dayOfCycle <= 5) {
    return { ...result, phase: CYCLE_PHASES.MENSTRUAL };
  } else if (dayOfCycle >= 6 && dayOfCycle <= 13) {
    return { ...result, phase: CYCLE_PHASES.FOLLICULAR };
  } else if (dayOfCycle >= 14 && dayOfCycle <= 15) {
    return { ...result, phase: CYCLE_PHASES.OVULATION };
  } else {
    return { ...result, phase: CYCLE_PHASES.LUTEAL };
  }
};