// src/utils/cycleLogic.js
import { differenceInDays } from 'date-fns';
import { CYCLE_PHASES } from '../constants/appData';

const MAX_REASONABLE_CYCLE_LENGTH = 60; 
const DEFAULT_MENSTRUAL_PHASE_LENGTH = 7; // A fallback if period end is not logged

export const calculateCyclePhase = (entries, targetDateStr = null) => {
  if (!entries || entries.length === 0) {
    return { phase: null, dayOfCycle: 0, message: "Log your first period to start tracking your cycle." };
  }
  
  const targetDate = targetDateStr ? new Date(targetDateStr + 'T00:00:00') : new Date();
  targetDate.setHours(0, 0, 0, 0);

  // Get all period start and end dates from history
  const periodStarts = entries.filter(e => e.periodStarted).map(e => new Date(e.date));
  const periodEnds = entries.filter(e => e.periodEnded).map(e => new Date(e.date));

  // Find the most recent period start date on or before the target date
  const lastPeriodStart = periodStarts
    .filter(d => d <= targetDate)
    .sort((a, b) => b - a)[0];

  if (!lastPeriodStart) {
    return { phase: null, dayOfCycle: 0, message: "Log a period before this date to see its cycle phase." };
  }

  const dayOfCycle = differenceInDays(targetDate, lastPeriodStart) + 1;
  const result = { dayOfCycle, targetDateStr: targetDate.toISOString().split('T')[0] };

  // --- NEW, PERSONALIZED MENSTRUAL PHASE LOGIC ---
  // Find the first logged end date that comes after our start date
  const relevantPeriodEnd = periodEnds
    .filter(d => d >= lastPeriodStart)
    .sort((a, b) => a - b)[0];

  if (relevantPeriodEnd && targetDate >= lastPeriodStart && targetDate <= relevantPeriodEnd) {
    // Case 1: The target date is within a logged start/end period. This is the most accurate.
    return { ...result, phase: CYCLE_PHASES.MENSTRUAL };
  } else if (!relevantPeriodEnd && dayOfCycle <= DEFAULT_MENSTRUAL_PHASE_LENGTH) {
    // Case 2: The period has started, but not ended yet. We use a fallback duration.
    return { ...result, phase: CYCLE_PHASES.MENSTRUAL };
  }
  // --- END OF NEW MENSTRUAL LOGIC ---

  // Check for irregular cycle length (this check runs *after* the menstrual phase check)
  if (dayOfCycle > MAX_REASONABLE_CYCLE_LENGTH) {
    return {
      phase: null,
      dayOfCycle: dayOfCycle,
      message: `Your last period was over ${MAX_REASONABLE_CYCLE_LENGTH} days ago. Phase tracking is paused until your next period is logged. This is common with PCOD, and that's okay.`
    };
  }
  
  // The rest of the logic for regular, post-menstrual phases
  if (dayOfCycle >= 1 && dayOfCycle <= 13) {
    // Follicular now starts from day 1 but is overridden by the menstrual logic above
    return { ...result, phase: CYCLE_PHASES.FOLLICULAR };
  } else if (dayOfCycle >= 14 && dayOfCycle <= 15) {
    return { ...result, phase: CYCLE_PHASES.OVULATION };
  } else {
    return { ...result, phase: CYCLE_PHASES.LUTEAL };
  }
};