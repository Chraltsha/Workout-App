import React, { useMemo, useState } from 'react';
import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  StyleSheet,
  Image,
  useWindowDimensions,
} from 'react-native';
import NeoBackground from './NeoBackground';
import { WORKOUT_CATEGORIES, WORKOUTS, Workout, WorkoutCategory } from './workoutData';

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

const CHALLENGES = [
  {
    id: 'burpee',
    label: 'New Challenge',
    title: '30s',
    subtitle: 'Burpee Blitz - max reps',
  },
  {
    id: 'pushup',
    label: 'Upper Rush',
    title: '45s',
    subtitle: 'Push Up Rush - clean reps',
  },
  {
    id: 'jumpingjack',
    label: 'Cardio Jam',
    title: '45s',
    subtitle: 'Jumping Jack Jam - keep rhythm',
  },
  {
    id: 'planktap',
    label: 'Core Trial',
    title: '35s',
    subtitle: 'Plank Tap - fast taps',
  },
  {
    id: 'squat',
    label: 'Leg Power',
    title: '45s',
    subtitle: 'Squat Sprint - power reps',
  },
  {
    id: 'run',
    label: 'Speed Round',
    title: '30s',
    subtitle: 'Speed Steps - tap every step',
  },
];

interface WorkoutHomeProps {
  onStartWorkout: (workoutId: string) => void;
}

type CategoryFilter = WorkoutCategory | 'All';

export default function WorkoutHome({ onStartWorkout }: WorkoutHomeProps) {
  const { width } = useWindowDimensions();
  const [selectedCategory, setSelectedCategory] = useState<CategoryFilter>('All');
  const [showAll, setShowAll] = useState(false);
  const isCompact = width < 370;
  const challengeWidth = Math.min(width - 64, 330);

  const categories: CategoryFilter[] = ['All', ...WORKOUT_CATEGORIES];
  const filteredWorkouts = useMemo(() => {
    const matches =
      selectedCategory === 'All'
        ? WORKOUTS
        : WORKOUTS.filter((workout) => workout.category === selectedCategory);

    return showAll ? matches : matches.slice(0, 5);
  }, [selectedCategory, showAll]);

  const visibleCount =
    selectedCategory === 'All'
      ? WORKOUTS.length
      : WORKOUTS.filter((workout) => workout.category === selectedCategory).length;

  const renderRecommended = ({ item }: { item: Workout }) => (
    <TouchableOpacity style={styles.listItem} onPress={() => onStartWorkout(item.id)}>
      <View style={styles.itemLeft}>
        <View style={[styles.iconPlaceholder, { borderColor: item.accent }]}>
          <Text style={styles.iconText}>{item.name.charAt(0)}</Text>
        </View>
        <View style={styles.itemCopy}>
          <Text style={styles.itemTitle}>{item.name}</Text>
          <Text style={styles.itemSub}>{item.duration} - {item.target}</Text>
        </View>
      </View>
      <View style={styles.itemRight}>
        <Text style={styles.startText}>Start</Text>
      </View>
    </TouchableOpacity>
  );

  const ListHeader = (
    <>
      <View style={styles.headerRow}>
        <View>
          <Text style={styles.smallText}>Rep battle ready</Text>
          <Text style={styles.userName}>user</Text>
        </View>
        <View style={styles.avatar} />
      </View>

      <FlatList
        horizontal
        data={CHALLENGES}
        keyExtractor={(item) => item.id}
        showsHorizontalScrollIndicator={false}
        snapToInterval={challengeWidth + 12}
        decelerationRate="fast"
        contentContainerStyle={styles.challengeCarousel}
        renderItem={({ item }) => (
          <TouchableOpacity
            style={[
              styles.challengeCard,
              { width: challengeWidth },
              isCompact && styles.challengeCardCompact,
            ]}
            onPress={() => onStartWorkout(item.id)}
            activeOpacity={0.84}>
            <View style={styles.challengeCopy}>
              <Text style={styles.challengeLabel}>{item.label}</Text>
              <Text style={[styles.challengeNumber, isCompact && styles.challengeNumberCompact]}>
                {item.title}
              </Text>
              <Text style={styles.challengeUnit}>{item.subtitle}</Text>
              <TouchableOpacity style={styles.joinButton} onPress={() => onStartWorkout(item.id)}>
                <Text style={styles.joinText}>Join Challenge</Text>
              </TouchableOpacity>
            </View>
            <Image
              style={[styles.challengeImage, isCompact && styles.challengeImageCompact]}
              source={require('../../assets/images/react-logo.png')}
            />
          </TouchableOpacity>
        )}
      />

      <View style={styles.scoreStrip}>
        <View>
          <Text style={styles.scoreValue}>8</Text>
          <Text style={styles.scoreLabel}>Games</Text>
        </View>
        <View style={styles.scoreDivider} />
        <View>
          <Text style={styles.scoreValue}>45s</Text>
          <Text style={styles.scoreLabel}>Longest</Text>
        </View>
        <View style={styles.scoreDivider} />
        <View>
          <Text style={styles.scoreValue}>Tap</Text>
          <Text style={styles.scoreLabel}>To count reps</Text>
        </View>
      </View>

      <FlatList
        horizontal
        data={categories}
        keyExtractor={(item) => item}
        contentContainerStyle={styles.chipsRow}
        showsHorizontalScrollIndicator={false}
        renderItem={({ item }) => {
          const active = selectedCategory === item;
          return (
            <TouchableOpacity
              style={[styles.chip, active && styles.chipActive]}
              onPress={() => {
                setSelectedCategory(item);
                setShowAll(false);
              }}
              activeOpacity={0.78}>
              <Text style={[styles.chipText, active && styles.chipTextActive]}>{item}</Text>
            </TouchableOpacity>
          );
        }}
      />

      <View style={styles.sectionHeader}>
        <Text style={styles.sectionTitle}>Workout Games</Text>
        <TouchableOpacity onPress={() => setShowAll((value) => !value)}>
          <Text style={styles.seeAll}>{showAll ? 'Show Less' : `See All (${visibleCount})`}</Text>
        </TouchableOpacity>
      </View>
    </>
  );

  return (
    <View style={styles.container}>
      <NeoBackground />
      <FlatList
        data={filteredWorkouts}
        renderItem={renderRecommended}
        keyExtractor={(i) => i.id}
        ListHeaderComponent={ListHeader}
        contentContainerStyle={styles.listContent}
        showsVerticalScrollIndicator={false}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: palette.background,
    overflow: 'hidden',
  },
  headerRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 20,
  },
  smallText: {
    color: palette.muted,
    fontSize: 13,
    fontWeight: '500',
  },
  userName: {
    color: palette.text,
    fontSize: 26,
    fontWeight: '800',
    letterSpacing: 0,
    marginTop: 3,
  },
  avatar: {
    width: 46,
    height: 46,
    borderRadius: 23,
    backgroundColor: palette.surfaceRaised,
    borderWidth: 1,
    borderColor: palette.border,
    shadowColor: palette.blue,
    shadowOpacity: 0.32,
    shadowRadius: 14,
    shadowOffset: { width: 0, height: 8 },
    elevation: 8,
  },
  challengeCarousel: {
    paddingBottom: 18,
  },
challengeCard: {
  backgroundColor: '#102A50',
  borderRadius: 24,
  padding: 20,
  flexDirection: 'row',
  justifyContent: 'space-between',
  alignItems: 'center',
  marginRight: 14,

  borderWidth: 1,
  borderColor: 'rgba(123,232,255,0.22)',

  shadowColor: '#2DD8FF',
  shadowOpacity: 0.45,
  shadowRadius: 24,
  shadowOffset: {
    width: 0,
    height: 14,
  },
  elevation: 14,

  overflow: 'hidden',
},
  challengeCardCompact: {
    padding: 15,
  },
  challengeCopy: {
    flex: 1,
    paddingRight: 12,
  },
  challengeLabel: {
    color: palette.blueSoft,
    fontSize: 13,
    fontWeight: '700',
    marginBottom: 6,
  },
  challengeNumber: {
    color: palette.text,
    fontSize: 50,
    fontWeight: '900',
    lineHeight: 56,
  },

  
  challengeNumberCompact: {
    fontSize: 42,
    lineHeight: 48,
  },
  challengeUnit: {
    color: palette.muted,
    fontSize: 13,
    fontWeight: '600',
    marginBottom: 12,
    textTransform: 'uppercase',
  },

 joinButton: {
  alignSelf: 'flex-start',
  backgroundColor: '#2DD8FF',

  paddingHorizontal: 18,
  paddingVertical: 12,
  borderRadius: 16,

  shadowColor: '#2DD8FF',
  shadowOpacity: 0.6,
  shadowRadius: 20,
  shadowOffset: {
    width: 0,
    height: 8,
  },

  

  elevation: 12,

  borderWidth: 1,
  borderColor: '#7BE8FF',
},

  joinText: {
    color: '#03111D',
    fontWeight: '900',
  },
  challengeImage: {
    width: 92,
    height: 92,
    opacity: 0.78,
    tintColor: palette.blueSoft,
  },
  challengeImageCompact: {
    width: 70,
    height: 70,
  },
  scoreStrip: {
    backgroundColor: 'rgba(8, 22, 44, 0.72)',
    borderWidth: 1,
    borderColor: palette.border,
    borderRadius: 16,
    padding: 14,
    marginBottom: 16,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  scoreValue: {
    color: palette.text,
    fontSize: 16,
    fontWeight: '900',
    textAlign: 'center',
  },
  scoreLabel: {
    color: palette.muted,
    fontSize: 11,
    fontWeight: '700',
    marginTop: 3,
    textAlign: 'center',
  },
  scoreDivider: {
    width: 1,
    height: 34,
    backgroundColor: palette.border,
  },
  chipsRow: {
    paddingBottom: 18,
  },
  chip: {
    backgroundColor: palette.surface,
    paddingHorizontal: 14,
    paddingVertical: 10,
    borderRadius: 14,
    marginRight: 9,
    borderWidth: 1,
    borderColor: palette.border,
  },
  chipActive: {
    backgroundColor: palette.blueDeep,
    borderColor: palette.blue,
    shadowColor: palette.blue,
    shadowOpacity: 0.3,
    shadowRadius: 10,
    shadowOffset: { width: 0, height: 6 },
    elevation: 6,
  },
  chipText: {
    color: palette.muted,
    fontWeight: '700',
    fontSize: 13,
  },
  chipTextActive: {
    color: palette.text,
  },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  sectionTitle: {
    color: palette.text,
    fontSize: 17,
    fontWeight: '800',
  },
  seeAll: {
    color: palette.blue,
    fontWeight: '800',
  },
  listContent: {
    paddingHorizontal: 20,
    paddingTop: 22,
    paddingBottom: 30,
  },
  listItem: {
    backgroundColor: palette.surface,
    padding: 15,
    borderRadius: 16,
    marginBottom: 12,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: palette.border,
  },
  itemLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
    minWidth: 0,
  },
  iconPlaceholder: {
    width: 48,
    height: 48,
    borderRadius: 14,
    backgroundColor: palette.surfaceSoft,
    marginRight: 13,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
    borderColor: 'rgba(123, 232, 255, 0.24)',
  },
  iconText: {
    color: palette.blue,
    fontSize: 20,
    fontWeight: '900',
  },
  itemTitle: {
    color: palette.text,
    fontSize: 16,
    fontWeight: '800',
  },
  itemCopy: {
    flex: 1,
    minWidth: 0,
  },
  itemSub: {
    color: palette.muted,
    fontSize: 12,
    fontWeight: '600',
    marginTop: 3,
  },
  itemRight: {
    backgroundColor: 'rgba(45, 216, 255, 0.1)',
    borderWidth: 1,
    borderColor: 'rgba(45, 216, 255, 0.22)',
    borderRadius: 12,
    paddingHorizontal: 12,
    paddingVertical: 8,
    marginLeft: 10,
  },
  startText: {
    color: palette.blue,
    fontWeight: '900',
  },
});
