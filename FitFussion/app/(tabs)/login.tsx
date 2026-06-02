import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import { AuthAnimatedBackground } from '@/components/auth-animated-background';
import { router } from 'expo-router';
import { SafeAreaView, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';

export default function LoginScreen() {
  return (
    <SafeAreaView style={styles.safeArea}>
      <AuthAnimatedBackground />
      <View style={styles.screen}>
        <View style={styles.authCard}>
          <View style={styles.logoMark}>
            <View style={styles.logoBlock} />
            <View style={styles.logoWing} />
          </View>

          <View style={styles.cornerLine} />

          <View style={styles.formArea}>
            <Text style={styles.eyebrow}>FitFussion</Text>
            <Text style={styles.title}>Login to your account</Text>

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

            <TouchableOpacity activeOpacity={0.8} style={styles.forgotButton}>
              <Text style={styles.forgotText}>Forgot password</Text>
            </TouchableOpacity>

            <TouchableOpacity style={styles.primaryButton} activeOpacity={0.85} onPress={() => router.replace('/')}>
              <Text style={styles.primaryButtonText}>Sign in</Text>
            </TouchableOpacity>

            <View style={styles.dividerRow}>
              <View style={styles.divider} />
              <Text style={styles.dividerText}>Or login with</Text>
              <View style={styles.divider} />
            </View>

            <View style={styles.socialRow}>
              <TouchableOpacity style={styles.socialButton} activeOpacity={0.8}>
                <MaterialIcons name="alternate-email" size={19} color="#7de7ff" />
              </TouchableOpacity>
              <TouchableOpacity style={styles.socialButton} activeOpacity={0.8}>
                <Text style={styles.socialText}>f</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.socialButton} activeOpacity={0.8}>
                <MaterialIcons name="apple" size={21} color="#7de7ff" />
              </TouchableOpacity>
            </View>
            <TouchableOpacity
              style={styles.footerLink}
              activeOpacity={0.85}
              onPress={() => router.push('/(tabs)/signup')}>
              <Text style={styles.footerMuted}>Don&apos;t have an account?</Text>
              <Text style={styles.footerAction}>Sign up</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
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
    overflow: 'hidden',
    padding: 24,
    shadowColor: '#0ce7ff',
    shadowOffset: { height: 18, width: 0 },
    shadowOpacity: 0.16,
    shadowRadius: 28,
    width: '100%',
  },
  logoMark: {
    height: 56,
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
  cornerLine: {
    borderColor: '#173b57',
    borderRadius: 4,
    borderWidth: 1,
    height: 164,
    position: 'absolute',
    right: -28,
    top: 24,
    transform: [{ rotate: '44deg' }],
    width: 86,
  },
  formArea: {
    gap: 10,
    marginTop: 76,
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
  forgotButton: {
    alignSelf: 'flex-end',
    paddingBottom: 2,
    paddingTop: 2,
  },
  forgotText: {
    color: '#8aa0b7',
    fontSize: 11,
    fontWeight: '800',
  },
  primaryButton: {
    alignItems: 'center',
    backgroundColor: '#7de7ff',
    borderRadius: 4,
    justifyContent: 'center',
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
  dividerRow: {
    alignItems: 'center',
    flexDirection: 'row',
    gap: 8,
    marginTop: 46,
  },
  divider: {
    backgroundColor: '#173b57',
    flex: 1,
    height: 1,
  },
  dividerText: {
    color: '#8aa0b7',
    fontSize: 11,
    fontWeight: '800',
  },
  socialRow: {
    flexDirection: 'row',
    gap: 14,
    justifyContent: 'center',
    marginTop: 8,
  },
  socialButton: {
    alignItems: 'center',
    backgroundColor: '#06131f',
    borderColor: '#173b57',
    borderRadius: 4,
    borderWidth: 1,
    height: 38,
    justifyContent: 'center',
    width: 48,
  },
  socialText: {
    color: '#7de7ff',
    fontSize: 23,
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
});
