import { useRouter } from 'expo-router';
import { Pressable, StyleSheet, Text, View } from 'react-native';

export default function LoginScreen() {
  const router = useRouter();

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Login</Text>

      <Pressable style={styles.button} onPress={() => router.push('/signup')}>
        <Text style={styles.buttonText}>Signup</Text>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    flex: 1,
    justifyContent: 'center',
  },
  title: {
    fontSize: 28,
  },
  buttonText: {
    color: 'white',
  },
  button: {
    alignItems: 'center',
    backgroundColor: 'black',
    borderRadius: 8,
    justifyContent: 'center',
    marginTop: 16,
    minWidth: 120,
    paddingHorizontal: 20,
    paddingVertical: 12,
  },
});