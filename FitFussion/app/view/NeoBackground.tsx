import React, { useEffect, useMemo, useRef } from 'react';
import {
  Animated,
  Dimensions,
  Easing,
  StyleSheet,
  View,
} from 'react-native';

const { width, height } = Dimensions.get('window');

const PARTICLE_COUNT = 30;
const STREAK_COUNT = 8;

export default function MotivatingBackground() {
  const glowPulse = useRef(new Animated.Value(0)).current;
  const rotateMoon = useRef(new Animated.Value(0)).current;

  const particles = useMemo(
    () =>
      [...Array(PARTICLE_COUNT)].map(() => ({
        x: Math.random() * width,
        delay: Math.random() * 4000,
        move: new Animated.Value(0),
        size: Math.random() * 4 + 2,
      })),
    []
  );

  const streaks = useMemo(
    () =>
      [...Array(STREAK_COUNT)].map(() => ({
        x: Math.random() * width,
        move: new Animated.Value(0),
      })),
    []
  );

  useEffect(() => {
    // Moon breathing glow
    Animated.loop(
      Animated.sequence([
        Animated.timing(glowPulse, {
          toValue: 1,
          duration: 3500,
          easing: Easing.inOut(Easing.ease),
          useNativeDriver: true,
        }),
        Animated.timing(glowPulse, {
          toValue: 0,
          duration: 3500,
          easing: Easing.inOut(Easing.ease),
          useNativeDriver: true,
        }),
      ])
    ).start();

    // Slow moon movement
    Animated.loop(
      Animated.timing(rotateMoon, {
        toValue: 1,
        duration: 90000,
        easing: Easing.linear,
        useNativeDriver: true,
      })
    ).start();

    // Rising particles
    particles.forEach((particle) => {
      const animate = () => {
        particle.move.setValue(0);

        Animated.timing(particle.move, {
          toValue: 1,
          duration: 5000 + Math.random() * 3000,
          delay: particle.delay,
          easing: Easing.out(Easing.ease),
          useNativeDriver: true,
        }).start(() => animate());
      };

      animate();
    });

    // Light streaks
    streaks.forEach((streak) => {
      const animate = () => {
        streak.move.setValue(0);

        Animated.timing(streak.move, {
          toValue: 1,
          duration: 3500 + Math.random() * 2500,
          easing: Easing.linear,
          useNativeDriver: true,
        }).start(() => animate());
      };

      animate();
    });
  }, []);

  const glowScale = glowPulse.interpolate({
    inputRange: [0, 1],
    outputRange: [1, 1.15],
  });

  const glowOpacity = glowPulse.interpolate({
    inputRange: [0, 1],
    outputRange: [0.08, 0.22],
  });

  const moonRotation = rotateMoon.interpolate({
    inputRange: [0, 1],
    outputRange: ['0deg', '360deg'],
  });

  return (
    <View style={styles.container} pointerEvents="none">

      {/* Motivational moon */}
      <Animated.View
        style={[
          styles.moonContainer,
          {
            transform: [{ rotate: moonRotation }],
          },
        ]}
      >
        {/* Glow */}
        <Animated.View
          style={[
            styles.moonGlow,
            {
              opacity: glowOpacity,
              transform: [{ scale: glowScale }],
            },
          ]}
        />

        {/* Moon */}
        <View style={styles.moon}>
          <View style={[styles.crater, { top: 45, left: 55 }]} />
          <View style={[styles.craterSmall, { top: 90, left: 120 }]} />
          <View style={[styles.craterLarge, { top: 140, left: 70 }]} />
          <View style={[styles.crater, { top: 120, left: 180 }]} />
          <View style={[styles.craterSmall, { top: 70, left: 200 }]} />
          <View style={[styles.craterLarge, { top: 170, left: 150 }]} />
        </View>
      </Animated.View>

      {/* Sunrise glow */}
      <Animated.View
        style={[
          styles.sunriseGlow,
          {
            opacity: glowOpacity,
            transform: [{ scale: glowScale }],
          },
        ]}
      />

      {/* Rising particles */}
      {particles.map((particle, index) => {
        const translateY = particle.move.interpolate({
          inputRange: [0, 1],
          outputRange: [height + 50, -100],
        });

        const opacity = particle.move.interpolate({
          inputRange: [0, 0.2, 0.8, 1],
          outputRange: [0, 0.8, 0.8, 0],
        });

        return (
          <Animated.View
            key={index}
            style={[
              styles.particle,
              {
                left: particle.x,
                width: particle.size,
                height: particle.size,
                borderRadius: particle.size,
                opacity,
                transform: [{ translateY }],
              },
            ]}
          />
        );
      })}

      {/* Light streaks */}
      {streaks.map((streak, index) => {
        const translateY = streak.move.interpolate({
          inputRange: [0, 1],
          outputRange: [height + 100, -200],
        });

        return (
          <Animated.View
            key={index}
            style={[
              styles.streak,
              {
                left: streak.x,
                transform: [{ translateY }],
              },
            ]}
          />
        );
      })}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: '#020617',
    overflow: 'hidden',
  },

  // Bottom motivational glow
  sunriseGlow: {
    position: 'absolute',
    width: 500,
    height: 500,
    borderRadius: 250,
    backgroundColor: 'rgba(59,130,246,0.18)',
    bottom: -250,
    alignSelf: 'center',
  },

  // Moon container
  moonContainer: {
    position: 'absolute',
    alignSelf: 'center',
    top: height * 0.18,
    width: 280,
    height: 280,
    justifyContent: 'center',
    alignItems: 'center',
  },

  // Moon outer glow
  moonGlow: {
    position: 'absolute',
    width: 360,
    height: 360,
    borderRadius: 180,
    backgroundColor: 'rgba(96,165,250,0.08)',
  },

  // Main moon
  moon: {
    width: 250,
    height: 250,
    borderRadius: 125,

    backgroundColor: '#DDE7F5',

    shadowColor: '#FFFFFF',
    shadowOpacity: 0.3,
    shadowRadius: 40,

    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.08)',

    overflow: 'hidden',

    opacity: 0.08,
  },

  // Craters
  crater: {
    position: 'absolute',
    width: 42,
    height: 42,
    borderRadius: 21,
    backgroundColor: 'rgba(120,140,165,0.20)',
  },

  craterSmall: {
    position: 'absolute',
    width: 22,
    height: 22,
    borderRadius: 11,
    backgroundColor: 'rgba(120,140,165,0.16)',
  },

  craterLarge: {
    position: 'absolute',
    width: 58,
    height: 58,
    borderRadius: 29,
    backgroundColor: 'rgba(130,150,175,0.18)',
  },

  // Floating particles
  particle: {
    position: 'absolute',
    backgroundColor: '#60A5FA',
    shadowColor: '#93C5FD',
    shadowOpacity: 0.8,
    shadowRadius: 8,
  },

  // Energy streaks
  streak: {
    position: 'absolute',
    width: 2,
    height: 120,
    borderRadius: 999,
    backgroundColor: 'rgba(147,197,253,0.18)',
  },
});