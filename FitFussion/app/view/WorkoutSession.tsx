import React, { useState } from 'react';
import { View } from 'react-native';
import WorkoutHome from './WorkoutHome';
import ActiveSession from './ActiveSession';
import { WORKOUTS } from './workoutData';

type Screen = 'home' | 'session';

export default function WorkoutSession() {
  const [currentScreen, setCurrentScreen] = useState<Screen>('home');
  const [selectedWorkoutId, setSelectedWorkoutId] = useState<string | null>(null);

  const handleStartWorkout = (workoutId: string) => {
    setSelectedWorkoutId(workoutId);
    setCurrentScreen('session');
  };

  const handleBackHome = () => {
    setCurrentScreen('home');
    setSelectedWorkoutId(null);
  };

  const selected = WORKOUTS.find((w) => w.id === selectedWorkoutId) ?? null;

  return (
    <View style={{ flex: 1, backgroundColor: '#050B18' }}>
      {currentScreen === 'home' && (
        <WorkoutHome onStartWorkout={handleStartWorkout} />
      )}

      {currentScreen === 'session' && selectedWorkoutId && selected && (
        <ActiveSession
          workoutId={selected.id}
          workoutName={selected.name}
          workoutSeconds={selected.seconds}
          workoutTarget={selected.target}
          onBack={handleBackHome}
        />
      )}
    </View>
  );
}
