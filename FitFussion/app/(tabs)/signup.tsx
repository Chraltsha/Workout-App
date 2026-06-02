import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import { AuthAnimatedBackground } from '@/components/auth-animated-background';
import { router } from 'expo-router';
import { useState } from 'react';
import { Modal, SafeAreaView, ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';

export default function SignUpScreen() {
  const [showProfileModal, setShowProfileModal] = useState(false);

  return (
    <SafeAreaView style={styles.safeArea}>
      <AuthAnimatedBackground />
      <View style={styles.screen}>
        <View style={styles.authCard}>
          <TouchableOpacity style={styles.backButton} activeOpacity={0.8} onPress={() => router.back()}>
            <MaterialIcons name="chevron-left" size={14} color="#7de7ff" />
            <Text style={styles.backText}>Back</Text>
          </TouchableOpacity>

          <View style={styles.logoMark}>
            <View style={styles.logoBlock} />
            <View style={styles.logoWing} />
          </View>

          <View style={styles.formArea}>
            <Text style={styles.eyebrow}>FitFussion</Text>
            <Text style={styles.title}>Create your account</Text>

            <TextInput placeholder="Name" placeholderTextColor="#52667a" style={styles.input} />
            <TextInput
              autoCapitalize="none"
              keyboardType="email-address"
              placeholder="Email"
              placeholderTextColor="#52667a"
              style={styles.input}
            />
            <TextInput
              placeholder="Password"
              placeholderTextColor="#52667a"
              secureTextEntry
              style={styles.input}
            />
            <TextInput
              placeholder="Confirm password"
              placeholderTextColor="#52667a"
              secureTextEntry
              style={styles.input}
            />

            <TouchableOpacity
              style={styles.primaryButton}
              activeOpacity={0.85}
              onPress={() => setShowProfileModal(true)}>
              <Text style={styles.primaryButtonText}>Sign up</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.footerLink}
              activeOpacity={0.85}
              onPress={() => router.push('/(tabs)/login')}>
              <Text style={styles.footerMuted}>Already have an account?</Text>
              <Text style={styles.footerAction}>Sign in</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>

      <Modal animationType="fade" transparent visible={showProfileModal}>
        <View style={styles.modalBackdrop}>
          <View style={styles.modalCard}>
            <View style={styles.modalHeader}>
              <View>
                <Text style={styles.modalEyebrow}>Profile Setup</Text>
                <Text style={styles.modalTitle}>Tell us about you</Text>
              </View>
              <TouchableOpacity
                style={styles.closeButton}
                activeOpacity={0.8}
                onPress={() => setShowProfileModal(false)}>
                <MaterialIcons name="close" size={20} color="#7de7ff" />
              </TouchableOpacity>
            </View>

            <ScrollView contentContainerStyle={styles.modalFields} showsVerticalScrollIndicator={false}>
              <TextInput placeholder="Age" placeholderTextColor="#52667a" keyboardType="number-pad" style={styles.input} />
              <TextInput placeholder="Height (cm)" placeholderTextColor="#52667a" keyboardType="number-pad" style={styles.input} />
              <TextInput placeholder="Weight (kg)" placeholderTextColor="#52667a" keyboardType="number-pad" style={styles.input} />
              <TextInput placeholder="Gender" placeholderTextColor="#52667a" style={styles.input} />
              <TextInput placeholder="Fitness goal" placeholderTextColor="#52667a" style={styles.input} />
              <TextInput placeholder="Activity level" placeholderTextColor="#52667a" style={styles.input} />

              <TouchableOpacity style={styles.modalPrimaryButton} activeOpacity={0.85} onPress={() => router.replace('/')}>
                <Text style={styles.primaryButtonText}>Save profile</Text>
              </TouchableOpacity>
            </ScrollView>
          </View>
        </View>
      </Modal>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#06131f',
  },
  screen: {
    alignItems: 'center',
    flex: 1,
    justifyContent: 'center',
    padding: 24,
  },
  authCard: {
    backgroundColor: '#0b1c2d',
    borderColor: '#173b57',
    borderRadius: 18,
    borderWidth: 1,
    maxWidth: 330,
    minHeight: 560,
    padding: 24,
    shadowColor: '#0ce7ff',
    shadowOffset: { height: 18, width: 0 },
    shadowOpacity: 0.16,
    shadowRadius: 28,
    width: '100%',
  },
  backButton: {
    alignItems: 'center',
    alignSelf: 'flex-start',
    flexDirection: 'row',
    gap: 2,
    minHeight: 30,
  },
  backText: {
    color: '#8aa0b7',
    fontSize: 11,
    fontWeight: '800',
  },
  logoMark: {
    height: 56,
    marginTop: 38,
    position: 'relative',
    width: 78,
  },
  logoBlock: {
    backgroundColor: '#7de7ff',
    borderRadius: 4,
    height: 18,
    left: 0,
    position: 'absolute',
    shadowColor: '#0ce7ff',
    shadowOpacity: 0.7,
    shadowRadius: 10,
    top: 10,
    transform: [{ skewX: '-24deg' }],
    width: 48,
  },
  logoWing: {
    backgroundColor: '#7de7ff',
    borderRadius: 4,
    height: 18,
    left: 20,
    position: 'absolute',
    shadowColor: '#0ce7ff',
    shadowOpacity: 0.7,
    shadowRadius: 10,
    top: 27,
    transform: [{ skewX: '-24deg' }],
    width: 38,
  },
  formArea: {
    gap: 10,
    marginTop: 22,
  },
  eyebrow: {
    color: '#7de7ff',
    fontSize: 12,
    fontWeight: '900',
    textTransform: 'uppercase',
  },
  title: {
    color: '#f4fbff',
    fontSize: 20,
    fontWeight: '900',
    letterSpacing: 0,
    marginBottom: 8,
  },
  input: {
    backgroundColor: '#06131f',
    borderColor: '#173b57',
    borderRadius: 4,
    borderWidth: 1,
    color: '#f4fbff',
    fontSize: 13,
    minHeight: 44,
    paddingHorizontal: 14,
  },
  primaryButton: {
    alignItems: 'center',
    backgroundColor: '#7de7ff',
    borderRadius: 4,
    justifyContent: 'center',
    marginTop: 18,
    minHeight: 44,
    shadowColor: '#0ce7ff',
    shadowOffset: { height: 9, width: 0 },
    shadowOpacity: 0.45,
    shadowRadius: 16,
  },
  primaryButtonText: {
    color: '#06131f',
    fontSize: 13,
    fontWeight: '900',
  },
  footerLink: {
    alignItems: 'center',
    flexDirection: 'row',
    gap: 6,
    justifyContent: 'center',
    marginTop: 14,
  },
  footerMuted: {
    color: '#8aa0b7',
    fontSize: 12,
    fontWeight: '800',
  },
  footerAction: {
    color: '#7de7ff',
    fontSize: 12,
    fontWeight: '900',
  },
  modalBackdrop: {
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.72)',
    flex: 1,
    justifyContent: 'center',
    padding: 20,
  },
  modalCard: {
    backgroundColor: '#0b1c2d',
    borderColor: '#173b57',
    borderRadius: 14,
    borderWidth: 1,
    maxHeight: '86%',
    maxWidth: 360,
    padding: 18,
    shadowColor: '#0ce7ff',
    shadowOffset: { height: 14, width: 0 },
    shadowOpacity: 0.24,
    shadowRadius: 24,
    width: '100%',
  },
  modalHeader: {
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  modalEyebrow: {
    color: '#7de7ff',
    fontSize: 12,
    fontWeight: '900',
    textTransform: 'uppercase',
  },
  modalTitle: {
    color: '#f4fbff',
    fontSize: 24,
    fontWeight: '900',
    letterSpacing: 0,
    marginTop: 4,
  },
  closeButton: {
    alignItems: 'center',
    backgroundColor: '#06131f',
    borderColor: '#173b57',
    borderRadius: 20,
    borderWidth: 1,
    height: 40,
    justifyContent: 'center',
    width: 40,
  },
  modalFields: {
    gap: 12,
    paddingTop: 18,
  },
  modalPrimaryButton: {
    alignItems: 'center',
    backgroundColor: '#7de7ff',
    borderRadius: 4,
    justifyContent: 'center',
    marginTop: 8,
    minHeight: 48,
    shadowColor: '#0ce7ff',
    shadowOffset: { height: 9, width: 0 },
    shadowOpacity: 0.45,
    shadowRadius: 16,
  },
});
