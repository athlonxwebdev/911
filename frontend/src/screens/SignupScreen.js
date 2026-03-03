import { useState } from 'react';
import { Pressable, StyleSheet, Text, TextInput } from 'react-native';
import { GradientScreen } from '../components/GradientScreen';
import { useAuth } from '../context/AuthContext';
import { colors } from '../theme/colors';

export default function SignupScreen({ onSwitch }) {
  const { signup } = useAuth();
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  return (
    <GradientScreen>
      <Text style={styles.title}>Create Account</Text>
      <TextInput value={name} onChangeText={setName} placeholder="Name" placeholderTextColor={colors.muted} style={styles.input} />
      <TextInput value={email} onChangeText={setEmail} placeholder="Email" placeholderTextColor={colors.muted} style={styles.input} />
      <TextInput value={password} onChangeText={setPassword} placeholder="Password" placeholderTextColor={colors.muted} secureTextEntry style={styles.input} />
      <Pressable style={styles.button} onPress={() => signup(name, email, password)}>
        <Text style={styles.buttonText}>Signup</Text>
      </Pressable>
      <Pressable onPress={onSwitch}><Text style={styles.link}>Already have an account? Login</Text></Pressable>
    </GradientScreen>
  );
}

const styles = StyleSheet.create({
  title: { color: colors.text, fontSize: 28, fontWeight: '700', marginBottom: 20 },
  input: { backgroundColor: colors.card, color: colors.text, borderRadius: 14, padding: 14, marginBottom: 12 },
  button: { backgroundColor: colors.accent, borderRadius: 14, padding: 14, marginTop: 8 },
  buttonText: { textAlign: 'center', fontWeight: '700' },
  link: { color: colors.text, marginTop: 16, textAlign: 'center' }
});
