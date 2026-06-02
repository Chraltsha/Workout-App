import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import { router } from 'expo-router';
import { SafeAreaView, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';

const user = {
  name: 'Jethro',
  level: 'Level 8 Athlete',
  visibility: 'Public',
  workouts: 42,
  runs: 18,
  calories: '12.8k',
};

const week = [
  { day: 'Sun', date: 28, done: true },
  { day: 'Mon', date: 29, done: true },
  { day: 'Tue', date: 30, done: false },
  { day: 'Wed', date: 1, done: true, active: true },
  { day: 'Thu', date: 2, done: false },
  { day: 'Fri', date: 3, done: false },
  { day: 'Sat', date: 4, done: false },
];

const activities = [
  { icon: 'directions-run', title: 'Morning Run', meta: 'Today at 6:40am', value: '5.2 km' },
  { icon: 'fitness-center', title: 'Upper Body', meta: 'Yesterday at 7:15pm', value: '48 min' },
  { icon: 'local-fire-department', title: 'HIIT Burn', meta: 'May 31 at 5:30pm', value: '420 cal' },
];

const recommendations = [
  { title: 'Neon Core Blast', meta: '30 min', tag: 'Strength' },
  { title: 'Zone 2 Run', meta: '45 min', tag: 'Cardio' },
  { title: 'Mobility Reset', meta: '18 min', tag: 'Recovery' },
];

export default function HomeScreen() {
  return (
    <SafeAreaView style={styles.safeArea}>
      <ScrollView contentContainerStyle={styles.container} showsVerticalScrollIndicator={false}>
        <View style={styles.header}>
          <View style={styles.avatar}>
            <Text style={styles.avatarText}>JW</Text>
          </View>
          <View style={styles.headerCopy}>
            <Text style={styles.eyebrow}>Welcome back</Text>
            <Text style={styles.title}>Hello {user.name}</Text>
            <Text style={styles.subtitle}>{user.level}</Text>
          </View>
          <TouchableOpacity
            style={styles.iconButton}
            activeOpacity={0.8}
            onPress={() => router.push('/(tabs)/login')}>
            <MaterialIcons name="logout" size={22} color="#7de7ff" />
          </TouchableOpacity>
        </View>

        <View style={styles.challengeCard}>
          <View style={styles.challengeIcon}>
            <MaterialIcons name="emoji-events" size={30} color="#06131f" />
          </View>
          <View style={styles.challengeCopy}>
            <Text style={styles.challengeTitle}>New Challenge</Text>
            <Text style={styles.challengeMeta}>2 weeks of power training</Text>
          </View>
          <TouchableOpacity style={styles.startButton} activeOpacity={0.85}>
            <Text style={styles.startButtonText}>Start</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.profileCard}>
          <View>
            <Text style={styles.sectionTitle}>Profile Visibility</Text>
            <Text style={styles.mutedText}>Control who can see your stats and activity.</Text>
          </View>
          <View style={styles.segmentedControl}>
            <TouchableOpacity style={[styles.segment, styles.segmentActive]} activeOpacity={0.85}>
              <MaterialIcons name="public" size={16} color="#06131f" />
              <Text style={styles.segmentActiveText}>{user.visibility}</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.segment} activeOpacity={0.85}>
              <MaterialIcons name="lock" size={16} color="#8aa0b7" />
              <Text style={styles.segmentText}>Private</Text>
            </TouchableOpacity>
          </View>
        </View>

        <View style={styles.statsGrid}>
          <StatCard label="Workouts" value={user.workouts} icon="fitness-center" />
          <StatCard label="Runs" value={user.runs} icon="directions-run" />
          <StatCard label="Calories" value={user.calories} icon="bolt" />
        </View>

        <View style={styles.sectionHeader}>
          <Text style={styles.sectionTitle}>Streaks</Text>
          <Text style={styles.neonText}>9 day streak</Text>
        </View>
        <View style={styles.weekRow}>
          {week.map((item) => (
            <View key={`${item.day}-${item.date}`} style={styles.dayItem}>
              <Text style={[styles.dayText, item.active && styles.dayTextActive]}>{item.day}</Text>
              <View
                style={[
                  styles.dayCircle,
                  item.done && styles.dayDone,
                  item.active && styles.dayActive,
                ]}>
                <Text style={[styles.dateText, item.done && styles.dateTextDone]}>{item.date}</Text>
              </View>
            </View>
          ))}
        </View>

        <View style={styles.sectionHeader}>
          <Text style={styles.sectionTitle}>Previous Workouts</Text>
          <TouchableOpacity activeOpacity={0.8}>
            <MaterialIcons name="tune" size={22} color="#7de7ff" />
          </TouchableOpacity>
        </View>
        <View style={styles.activityList}>
          {activities.map((activity) => (
            <View key={activity.title} style={styles.activityRow}>
              <View style={styles.activityIcon}>
                <MaterialIcons name={activity.icon as never} size={23} color="#06131f" />
              </View>
              <View style={styles.activityCopy}>
                <Text style={styles.activityTitle}>{activity.title}</Text>
                <Text style={styles.mutedText}>{activity.meta}</Text>
              </View>
              <Text style={styles.activityValue}>{activity.value}</Text>
            </View>
          ))}
        </View>

        <Text style={styles.sectionTitle}>Recommended Workouts</Text>
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.recommendationRow}>
          {recommendations.map((workout) => (
            <TouchableOpacity key={workout.title} style={styles.recommendationCard} activeOpacity={0.85}>
              <View style={styles.recommendationBadge}>
                <Text style={styles.recommendationBadgeText}>{workout.tag}</Text>
              </View>
              <Text style={styles.recommendationTitle}>{workout.title}</Text>
              <Text style={styles.mutedText}>{workout.meta}</Text>
            </TouchableOpacity>
          ))}
        </ScrollView>
      </ScrollView>
    </SafeAreaView>
  );
}

function StatCard({
  label,
  value,
  icon,
}: {
  label: string;
  value: string | number;
  icon: keyof typeof MaterialIcons.glyphMap;
}) {
  return (
    <View style={styles.statCard}>
      <MaterialIcons name={icon} size={20} color="#7de7ff" />
      <Text style={styles.statValue}>{value}</Text>
      <Text style={styles.mutedText}>{label}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#06131f',
  },
  container: {
    gap: 18,
    padding: 20,
    paddingBottom: 112,
  },
  header: {
    alignItems: 'center',
    flexDirection: 'row',
    gap: 14,
    paddingTop: 10,
  },
  avatar: {
    alignItems: 'center',
    backgroundColor: '#0ce7ff',
    borderRadius: 26,
    height: 52,
    justifyContent: 'center',
    shadowColor: '#0ce7ff',
    shadowOpacity: 0.5,
    shadowRadius: 16,
    width: 52,
  },
  avatarText: {
    color: '#06131f',
    fontSize: 18,
    fontWeight: '900',
  },
  headerCopy: {
    flex: 1,
  },
  eyebrow: {
    color: '#7de7ff',
    fontSize: 12,
    fontWeight: '700',
    textTransform: 'uppercase',
  },
  title: {
    color: '#f4fbff',
    fontSize: 28,
    fontWeight: '900',
    letterSpacing: 0,
  },
  subtitle: {
    color: '#8aa0b7',
    fontSize: 14,
    marginTop: 3,
  },
  iconButton: {
    alignItems: 'center',
    backgroundColor: '#0d2033',
    borderColor: '#173b57',
    borderRadius: 22,
    borderWidth: 1,
    height: 44,
    justifyContent: 'center',
    width: 44,
  },
  challengeCard: {
    alignItems: 'center',
    backgroundColor: '#0ce7ff',
    borderRadius: 8,
    flexDirection: 'row',
    gap: 14,
    padding: 16,
    shadowColor: '#0ce7ff',
    shadowOpacity: 0.35,
    shadowRadius: 18,
  },
  challengeIcon: {
    alignItems: 'center',
    backgroundColor: '#b5fb44',
    borderRadius: 26,
    height: 52,
    justifyContent: 'center',
    width: 52,
  },
  challengeCopy: {
    flex: 1,
  },
  challengeTitle: {
    color: '#06131f',
    fontSize: 18,
    fontWeight: '900',
  },
  challengeMeta: {
    color: '#0b3a4b',
    fontSize: 13,
    marginTop: 2,
  },
  startButton: {
    backgroundColor: '#f4fbff',
    borderRadius: 8,
    paddingHorizontal: 18,
    paddingVertical: 10,
  },
  startButtonText: {
    color: '#06131f',
    fontSize: 12,
    fontWeight: '900',
    textTransform: 'uppercase',
  },
  profileCard: {
    backgroundColor: '#0b1c2d',
    borderColor: '#173b57',
    borderRadius: 8,
    borderWidth: 1,
    gap: 14,
    padding: 16,
  },
  sectionTitle: {
    color: '#f4fbff',
    fontSize: 20,
    fontWeight: '900',
    letterSpacing: 0,
  },
  mutedText: {
    color: '#8aa0b7',
    fontSize: 13,
  },
  segmentedControl: {
    backgroundColor: '#06131f',
    borderRadius: 8,
    flexDirection: 'row',
    padding: 4,
  },
  segment: {
    alignItems: 'center',
    borderRadius: 6,
    flex: 1,
    flexDirection: 'row',
    gap: 6,
    justifyContent: 'center',
    minHeight: 38,
  },
  segmentActive: {
    backgroundColor: '#7de7ff',
  },
  segmentText: {
    color: '#8aa0b7',
    fontWeight: '800',
  },
  segmentActiveText: {
    color: '#06131f',
    fontWeight: '900',
  },
  statsGrid: {
    flexDirection: 'row',
    gap: 10,
  },
  statCard: {
    backgroundColor: '#0b1c2d',
    borderColor: '#173b57',
    borderRadius: 8,
    borderWidth: 1,
    flex: 1,
    gap: 8,
    minHeight: 104,
    padding: 14,
  },
  statValue: {
    color: '#f4fbff',
    fontSize: 23,
    fontWeight: '900',
  },
  sectionHeader: {
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  neonText: {
    color: '#7de7ff',
    fontSize: 13,
    fontWeight: '900',
  },
  weekRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  dayItem: {
    alignItems: 'center',
    gap: 8,
  },
  dayText: {
    color: '#697c91',
    fontSize: 12,
    fontWeight: '800',
  },
  dayTextActive: {
    color: '#7de7ff',
  },
  dayCircle: {
    alignItems: 'center',
    borderColor: '#1d3448',
    borderRadius: 20,
    borderWidth: 1,
    height: 40,
    justifyContent: 'center',
    width: 40,
  },
  dayDone: {
    backgroundColor: '#11293d',
    borderColor: '#7de7ff',
  },
  dayActive: {
    shadowColor: '#0ce7ff',
    shadowOpacity: 0.55,
    shadowRadius: 12,
  },
  dateText: {
    color: '#8aa0b7',
    fontSize: 13,
    fontWeight: '800',
  },
  dateTextDone: {
    color: '#f4fbff',
  },
  activityList: {
    backgroundColor: '#0b1c2d',
    borderColor: '#173b57',
    borderRadius: 8,
    borderWidth: 1,
    overflow: 'hidden',
  },
  activityRow: {
    alignItems: 'center',
    borderBottomColor: '#132c42',
    borderBottomWidth: 1,
    flexDirection: 'row',
    gap: 12,
    padding: 14,
  },
  activityIcon: {
    alignItems: 'center',
    backgroundColor: '#7de7ff',
    borderRadius: 22,
    height: 44,
    justifyContent: 'center',
    width: 44,
  },
  activityCopy: {
    flex: 1,
  },
  activityTitle: {
    color: '#f4fbff',
    fontSize: 15,
    fontWeight: '900',
  },
  activityValue: {
    color: '#f4fbff',
    fontSize: 16,
    fontWeight: '900',
  },
  recommendationRow: {
    gap: 12,
    paddingRight: 20,
  },
  recommendationCard: {
    backgroundColor: '#0b1c2d',
    borderColor: '#173b57',
    borderRadius: 8,
    borderWidth: 1,
    gap: 10,
    minHeight: 142,
    padding: 16,
    width: 176,
  },
  recommendationBadge: {
    alignSelf: 'flex-start',
    backgroundColor: '#102f48',
    borderRadius: 6,
    paddingHorizontal: 9,
    paddingVertical: 5,
  },
  recommendationBadgeText: {
    color: '#7de7ff',
    fontSize: 11,
    fontWeight: '900',
    textTransform: 'uppercase',
  },
  recommendationTitle: {
    color: '#f4fbff',
    fontSize: 18,
    fontWeight: '900',
  },
});
