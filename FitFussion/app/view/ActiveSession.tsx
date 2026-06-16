import React, { useEffect, useState, useRef } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Alert, useWindowDimensions } from 'react-native';
import NeoBackground from './NeoBackground';

const palette = {
  background: '#050B18',
  surface: '#08162C',
  surfaceRaised: '#0D203D',
  surfaceSoft: '#102A50',
  blue: '#2DD8FF',
  blueDeep: '#1B6DFF',
  blueSoft: '#7BE8FF',
  text: '#F4FBFF',
  muted: '#8FA8C4',
  border: 'rgba(77, 216, 255, 0.18)',
};

interface ActiveSessionProps {
  workoutId: string;
  workoutName?: string;
  workoutSeconds?: number;
  workoutTarget?: string;
  onBack?: () => void;
}

export default function ActiveSession({
  workoutId,
  workoutName,
  workoutSeconds = 30,
  workoutTarget = 'Max reps',
  onBack,
}: ActiveSessionProps) {
  const { width } = useWindowDimensions();
  const tapSize = Math.min(178, Math.max(132, width * 0.46));
  const [reps, setReps] = useState(0);
  const [timeLeft, setTimeLeft] = useState(workoutSeconds);
  const [running, setRunning] = useState(false);
  const timerRef = useRef<number | null>(null);

  useEffect(() => {
    setRunning(false);
    setReps(0);
    setTimeLeft(workoutSeconds);
  }, [workoutId, workoutSeconds]);

  useEffect(() => {
    if (running) {
      timerRef.current = setInterval(() => {
        setTimeLeft((t) => Math.max(0, t - 1));
      }, 1000) as unknown as number;
    }

    return () => {
      if (timerRef.current) clearInterval(timerRef.current as any);
    };
  }, [running]);

  useEffect(() => {
    if (timeLeft <= 0 && running) {
      setRunning(false);
      Alert.alert('Time up!', `You did ${reps} reps`);
    }
  }, [timeLeft, running, reps]);

  const handleTap = () => {
    if (!running) setRunning(true);
    if (timeLeft > 0) setReps((r) => r + 1);
  };

  const reset = () => {
    setRunning(false);
    setReps(0);
    setTimeLeft(workoutSeconds);
  };

  return (
    <View style={styles.container}>
      <NeoBackground />
      <View style={styles.header}>
        <TouchableOpacity onPress={onBack}>
          <Text style={styles.back}>Back</Text>
        </TouchableOpacity>
        <Text style={styles.title}>{workoutName ?? 'Workout'}</Text>
        <View style={{ width: 48 }} />
      </View>

      <View style={styles.card}>
        <Text style={styles.modeLabel}>{workoutTarget}</Text>
        <Text style={styles.label}>Time Left</Text>
        <Text style={styles.timer}>{timeLeft}s</Text>
        <Text style={styles.label}>Reps</Text>
        <Text style={styles.reps}>{reps}</Text>

        <TouchableOpacity
          style={[
            styles.tapButton,
            { width: tapSize, height: tapSize, borderRadius: tapSize / 2 },
            running && styles.tapButtonRunning,
          ]}
          onPress={handleTap}
          activeOpacity={0.68}>
          <Text style={styles.tapText}>TAP</Text>
          <Text style={styles.tapHint}>{running ? 'count rep' : 'start game'}</Text>
        </TouchableOpacity>

        <View style={styles.controls}>
          <TouchableOpacity style={styles.controlBtn} onPress={() => setTimeLeft((t) => t + 15)} disabled={running}>
            <Text style={styles.controlText}>+15s</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.controlBtn} onPress={() => setTimeLeft((t) => Math.max(5, t - 10))} disabled={running}>
            <Text style={styles.controlText}>-10s</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.controlBtn} onPress={reset}>
            <Text style={styles.controlText}>Reset</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: palette.background,
    paddingHorizontal: 20,
    paddingTop: 22,
    overflow: 'hidden',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 18,
    zIndex: 1,
  },
  back: {
    color: palette.blue,
    fontWeight: '800',
  },
  title: {
    color: palette.text,
    fontSize: 19,
    fontWeight: '900',
  },
  card: {
    backgroundColor: palette.surfaceRaised,
    borderRadius: 20,
    padding: 22,
    alignItems: 'center',
    marginTop: 8,
    borderWidth: 1,
    borderColor: palette.border,
    shadowColor: palette.blueDeep,
    shadowOpacity: 0.36,
    shadowRadius: 18,
    shadowOffset: { width: 0, height: 12 },
    elevation: 10,
    zIndex: 1,
  },
  modeLabel: {
    color: palette.blueSoft,
    fontSize: 13,
    fontWeight: '900',
    marginBottom: 18,
    textTransform: 'uppercase',
    textAlign: 'center',
  },
  label: {
    color: palette.muted,
    fontSize: 13,
    fontWeight: '700',
    textTransform: 'uppercase',
  },
  timer: {
    color: palette.text,
    fontSize: 42,
    fontWeight: '900',
    marginVertical: 8,
  },
  reps: {
    color: palette.blue,
    fontSize: 46,
    fontWeight: '900',
    marginBottom: 14,
    textShadowColor: 'rgba(45, 216, 255, 0.45)',
    textShadowRadius: 14,
  },
  tapButton: {
    backgroundColor: palette.blue,
    alignItems: 'center',
    justifyContent: 'center',
    marginVertical: 14,
    borderWidth: 8,
    borderColor: 'rgba(123, 232, 255, 0.24)',
    shadowColor: palette.blue,
    shadowOpacity: 0.5,
    shadowRadius: 22,
    shadowOffset: { width: 0, height: 10 },
    elevation: 12,
  },
  tapButtonRunning: {
    backgroundColor: palette.blueSoft,
    transform: [{ scale: 1.02 }],
  },
  tapText: {
    fontSize: 38,
    fontWeight: '900',
    color: '#03111D',
  },
  tapHint: {
    color: '#06324A',
    fontSize: 11,
    fontWeight: '900',
    marginTop: 2,
    textTransform: 'uppercase',
  },
  controls: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
    marginTop: 14,
  },
  controlBtn: {
    backgroundColor: palette.surface,
    paddingHorizontal: 13,
    paddingVertical: 10,
    borderRadius: 12,
    marginHorizontal: 5,
    borderWidth: 1,
    borderColor: palette.border,
  },
  controlText: {
    color: palette.text,
    fontWeight: '800',
  },
});
