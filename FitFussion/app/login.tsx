import { useRouter } from 'expo-router';
import { useState } from 'react';
import { Pressable, StyleSheet, Text, TextInput, View } from 'react-native';

export default function LoginScreen() {
  const router = useRouter();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [rememberMe, setRememberMe] = useState(false);

  return (
    <View style={styles.container}>
      <View style={styles.loginBox}>
        <Text style={styles.title}>Login</Text>

        <TextInput
          style={styles.input}
          placeholder="Username"
          placeholderTextColor="#777"
          value={username}
          onChangeText={setUsername}
        />

        <TextInput
          style={styles.input}
          placeholder="Password"
          placeholderTextColor="#777"
          secureTextEntry
          value={password}
          onChangeText={setPassword}
        />

        <Pressable
          style={styles.rememberRow}
          onPress={() => setRememberMe(!rememberMe)}
        >
          <View style={styles.checkbox}>
            {rememberMe && <Text style={styles.checkmark}>X</Text>}
          </View>
          <Text style={styles.rememberText}>Remember me</Text>
        </Pressable>

        <Pressable 
          style={styles.loginButton}
          onPress={() => router.push('/view/workout')}
        >
          <Text style={styles.loginButtonText}>Login</Text>
        </Pressable>

        <View style={styles.signupRow}>
          <Text style={styles.signupText}>Don't have an account?</Text>
          <Pressable onPress={() => router.push('/signup')}>
            <Text style={styles.signupLink}> Sign up</Text>
          </Pressable>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    backgroundColor: '#f2f2f2',
    flex: 1,
    justifyContent: 'center',
    padding: 20,
  },
  loginBox: {
    backgroundColor: 'white',
    borderRadius: 8,
    padding: 20,
    width: '100%',
    maxWidth: 360,
  },
  title: {
    fontWeight: 'bold',
    fontSize: 28,
    marginBottom: 20,
    textAlign: 'center',
  },
  input: {
    borderColor: '#cccccc',
    borderRadius: 8,
    borderWidth: 1,
    fontSize: 16,
    marginBottom: 12,
    padding: 12,
  },
  rememberRow: {
    alignItems: 'center',
    flexDirection: 'row',
    marginBottom: 16,
  },
  checkbox: {
    alignItems: 'center',
    borderColor: '#333333',
    borderRadius: 4,
    borderWidth: 1,
    height: 22,
    justifyContent: 'center',
    marginRight: 8,
    width: 22,
  },
  checkmark: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  rememberText: {
    fontSize: 16,
  },
  loginButton: {
    alignItems: 'center',
    backgroundColor: 'black',
    borderRadius: 8,
    marginBottom: 16,
    padding: 14,
  },
  loginButtonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
  signupRow: {
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: 8,
  },
  signupText: {
    color: '#555555',
  },
  signupLink: {
    color: 'black',
    fontWeight: 'bold',
  },
});
