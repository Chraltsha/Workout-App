export type WorkoutCategory = 'Full Body' | 'Upper' | 'Lower' | 'Core' | 'Cardio';

export type Workout = {
  id: string;
  name: string;
  category: WorkoutCategory;
  duration: string;
  seconds: number;
  target: string;
  accent: string;
};

export const WORKOUT_CATEGORIES: WorkoutCategory[] = [
  'Full Body',
  'Upper',
  'Lower',
  'Core',
  'Cardio',
];

export const WORKOUTS: Workout[] = [
  {
    id: 'run',
    name: 'Speed Steps',
    category: 'Cardio',
    duration: '30 sec',
    seconds: 30,
    target: 'Tap every step',
    accent: '#2DD8FF',
  },
  {
    id: 'pushup',
    name: 'Push Up Rush',
    category: 'Upper',
    duration: '45 sec',
    seconds: 45,
    target: 'Max clean reps',
    accent: '#5D8CFF',
  },
  {
    id: 'situp',
    name: 'Core Crunch',
    category: 'Core',
    duration: '40 sec',
    seconds: 40,
    target: 'Beat your score',
    accent: '#7BE8FF',
  },
  {
    id: 'squat',
    name: 'Squat Sprint',
    category: 'Lower',
    duration: '45 sec',
    seconds: 45,
    target: 'Power reps',
    accent: '#23C7FF',
  },
  {
    id: 'burpee',
    name: 'Burpee Blitz',
    category: 'Full Body',
    duration: '30 sec',
    seconds: 30,
    target: 'All-out round',
    accent: '#3E74FF',
  },
  {
    id: 'planktap',
    name: 'Plank Tap',
    category: 'Core',
    duration: '35 sec',
    seconds: 35,
    target: 'Fast shoulder taps',
    accent: '#6CEBFF',
  },
  {
    id: 'jumpingjack',
    name: 'Jumping Jack Jam',
    category: 'Cardio',
    duration: '45 sec',
    seconds: 45,
    target: 'Keep rhythm',
    accent: '#21A8FF',
  },
  {
    id: 'lunge',
    name: 'Lunge Ladder',
    category: 'Lower',
    duration: '40 sec',
    seconds: 40,
    target: 'Alternate legs',
    accent: '#5596FF',
  },
];
