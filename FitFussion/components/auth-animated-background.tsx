import { useEffect, useRef } from 'react';
import { Animated, Easing, StyleSheet, View } from 'react-native';

export function AuthAnimatedBackground() {
  const drift = useRef(new Animated.Value(0)).current;
  const pulse = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    const driftLoop = Animated.loop(
      Animated.timing(drift, {
        toValue: 1,
        duration: 9000,
        easing: Easing.inOut(Easing.quad),
        useNativeDriver: true,
      })
    );

    const pulseLoop = Animated.loop(
      Animated.sequence([
        Animated.timing(pulse, {
          toValue: 1,
          duration: 2600,
          easing: Easing.inOut(Easing.quad),
          useNativeDriver: true,
        }),
        Animated.timing(pulse, {
          toValue: 0,
          duration: 2600,
          easing: Easing.inOut(Easing.quad),
          useNativeDriver: true,
        }),
      ])
    );

    driftLoop.start();
    pulseLoop.start();

    return () => {
      driftLoop.stop();
      pulseLoop.stop();
    };
  }, [drift, pulse]);

  const translateY = drift.interpolate({
    inputRange: [0, 1],
    outputRange: [-80, 80],
  });

  const translateX = drift.interpolate({
    inputRange: [0, 1],
    outputRange: [-30, 34],
  });

  const glowOpacity = pulse.interpolate({
    inputRange: [0, 1],
    outputRange: [0.16, 0.36],
  });

  return (
    <View pointerEvents="none" style={styles.background}>
      <Animated.View style={[styles.scanGlow, { opacity: glowOpacity }]} />
      <Animated.View style={[styles.streakGroup, { transform: [{ translateY }] }]}>
        <View style={[styles.streak, styles.streakOne]} />
        <View style={[styles.streak, styles.streakTwo]} />
        <View style={[styles.streak, styles.streakThree]} />
      </Animated.View>
      <Animated.View style={[styles.panelOutline, { transform: [{ translateX }, { rotate: '45deg' }] }]} />
      <Animated.View style={[styles.lowerLine, { transform: [{ translateX }] }]} />
    </View>
  );
}

const styles = StyleSheet.create({
  background: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: '#06131f',
    overflow: 'hidden',
  },
  scanGlow: {
    backgroundColor: '#0ce7ff',
    bottom: 84,
    height: 96,
    left: -40,
    position: 'absolute',
    right: -40,
    transform: [{ rotate: '-8deg' }],
  },
  streakGroup: {
    ...StyleSheet.absoluteFillObject,
  },
  streak: {
    backgroundColor: '#0ce7ff',
    height: 2,
    opacity: 0.3,
    position: 'absolute',
    transform: [{ rotate: '-28deg' }],
  },
  streakOne: {
    right: -80,
    top: 120,
    width: 260,
  },
  streakTwo: {
    left: -60,
    top: 310,
    width: 220,
  },
  streakThree: {
    bottom: 180,
    right: -70,
    width: 300,
  },
  panelOutline: {
    borderColor: '#174a68',
    borderRadius: 8,
    borderWidth: 1,
    height: 170,
    opacity: 0.5,
    position: 'absolute',
    right: -34,
    top: 150,
    width: 170,
  },
  lowerLine: {
    backgroundColor: '#173b57',
    bottom: 112,
    height: 1,
    left: 32,
    opacity: 0.8,
    position: 'absolute',
    right: 32,
  },
});
