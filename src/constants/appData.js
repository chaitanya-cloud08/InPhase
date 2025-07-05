// src/constants/appData.js
import { Droplet, Heart, Moon, Brain, Pizza, Meh, Smile, Frown, ChevronsRight } from 'lucide-react';

export const MOOD_OPTIONS = [
  { value: 5, label: 'Excellent', icon: '😊' },
  { value: 4, label: 'Good', icon: '🙂' },
  { value: 3, label: 'Okay', icon: '😐' },
  { value: 2, label: 'Bad', icon: '☹️' },
  { value: 1, label: 'Awful', icon: '😭' },
];

export const SKIN_CONDITIONS = ['Normal', 'Acne', 'Oily', 'Dry'];
export const HAIR_CONDITIONS = ['Normal', 'Hair Fall', 'Oily', 'Dry'];
export const FLOW_INTENSITY = ['Low', 'Medium', 'High'];

export const CRAVING_OPTIONS = ['Sweet', 'Salty', 'Carbs', 'Chocolate', 'Fried', 'Healthy'];

export const CYCLE_PHASES = {
  MENSTRUAL: {
    name: 'Menstrual',
    icon: Droplet,
    color: 'bg-pastel-pink',
    description: "Your period has begun. Time to rest and be gentle with yourself.",
    tips: [
      "Prioritize rest and gentle movement like stretching or walking.",
      "Eat iron-rich foods like spinach, lentils, and red meat.",
      "Use a heating pad to soothe cramps."
    ]
  },
  FOLLICULAR: {
    name: 'Follicular',
    icon: ChevronsRight,
    color: 'bg-pastel-blue',
    description: "Energy is rising! A great time for new beginnings and creative projects.",
    tips: [
      "Your energy is increasing. Try more dynamic workouts like dancing or light cardio.",
      "Focus on lean proteins and fresh vegetables.",
      "It's a great time for brainstorming and starting new tasks."
    ]
  },
  OVULATION: {
    name: 'Ovulation',
    icon: Heart,
    color: 'bg-pastel-green',
    description: "You're at your peak! Energy and social drive are high.",
    tips: [
      "You're at your peak energy! This is the perfect time for high-intensity workouts.",
      "Connect with others; your social energy is high.",
      "Eat fiber-rich and antioxidant-rich foods like berries and leafy greens."
    ]
  },
  LUTEAL: {
    name: 'Luteal',
    icon: Moon,
    color: 'bg-pastel-purple',
    description: "Time to wind down. Focus on self-care as energy levels decrease.",
    tips: [
      "As energy wanes, opt for calming activities like yoga or pilates.",
      "Reduce caffeine and sugar to manage PMS symptoms.",
      "Eat complex carbs like sweet potatoes to stabilize mood."
    ]
  },
};

export const SMART_TIPS_TRIGGERS = {
  lowEnergy: "Feeling low on energy? A short, 5-minute walk can do wonders.",
  highStress: "Stress levels seem high. Try a 3-minute breathing exercise to find your center.",
  acne: "Noticing acne? Ensure you're drinking plenty of water and consider reducing dairy/sugar.",
  hairfall: "Experiencing hair fall? Make sure you're getting enough protein and iron.",
  cravings: "Food cravings kicking in? Opt for a healthier alternative like dark chocolate or fruit.",
  poorSleep: "Didn't sleep well? Try to avoid caffeine after 2 PM and create a relaxing bedtime routine.",
};