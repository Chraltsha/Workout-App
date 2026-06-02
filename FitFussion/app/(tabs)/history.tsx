import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import { SafeAreaView, StyleSheet, Text, View } from 'react-native';

export default function HistorySessionScreen() {
  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.container}>
        <MaterialIcons name="history" size={48} color="#7de7ff" />
        <Text style={styles.title}>History Session</Text>
        <Text style={styles.subtitle}>Review completed sessions, personal bests, streak history, and weekly trends.</Text>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#06131f',
  },
  container: {
    flex: 1,
    justifyContent: 'center',
    padding: 24,
  },
  title: {
    color: '#f4fbff',
    fontSize: 30,
    fontWeight: '900',
    letterSpacing: 0,
    marginTop: 16,
  },
  subtitle: {
    color: '#8aa0b7',
    fontSize: 16,
    lineHeight: 24,
    marginTop: 10,
  },
});
