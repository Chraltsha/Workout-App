import React from 'react';
import { Pressable, StyleSheet, Text, TextInput, View } from 'react-native';

export default function SignupScreen() {
  const [username, setUsername] = React.useState('');
  const [email, setEmail] = React.useState('');
  const [password, setPassword] = React.useState('');
  const [confirmPassword, setConfirmPassword] = React.useState('');

  return (
    <View style={styles.container}>
      <View style={styles.form}>
        <Text style={styles.title}>Sign up</Text>

        <View style={styles.field}>
          <Text style={styles.label}>Username</Text>
          <TextInput
            onChangeText={setUsername}
            placeholder="Enter username"
            style={styles.input}
            value={username}
          />
        </View>

        <View style={styles.field}>
          <Text style={styles.label}>Email</Text>
          <TextInput
            autoCapitalize="none"
            keyboardType="email-address"
            onChangeText={setEmail}
            placeholder="Enter email"
            style={styles.input}
            value={email}
          />
        </View>

        <View style={styles.field}>
          <Text style={styles.label}>Password</Text>
          <TextInput
            onChangeText={setPassword}
            placeholder="Enter password"
            secureTextEntry
            style={styles.input}
            value={password}
          />
        </View>

        <View style={styles.field}>
          <Text style={styles.label}>Confirm password</Text>
          <TextInput
            onChangeText={setConfirmPassword}
            placeholder="Confirm password"
            secureTextEntry
            style={styles.input}
            value={confirmPassword}
          />
        </View>

        <Pressable style={styles.button}>
          <Text style={styles.buttonText}>Sign up</Text>
        </Pressable>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  button: {
    alignItems: 'center',
    backgroundColor: 'black',
    borderRadius: 8,
    justifyContent: 'center',
    marginTop: 8,
    minHeight: 44,
  },
  buttonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: '700',
  },
  container: {
    alignItems: 'center',
    flex: 1,
    justifyContent: 'center',
    padding: 24,
  },
  field: {
    gap: 6,
  },
  form: {
    gap: 14,
    width: '100%',
    maxWidth: 340,
  },
  input: {
    borderColor: '#ccc',
    borderRadius: 8,
    borderWidth: 1,
    minHeight: 44,
    paddingHorizontal: 12,
  },
  label: {
    fontSize: 13,
    fontWeight: '600',
  },
  title: {
    fontSize: 28,
    fontWeight: '700',
    textAlign: 'center',
  },
});
