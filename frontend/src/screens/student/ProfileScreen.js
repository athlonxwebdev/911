import { Pressable, StyleSheet, Text, View } from 'react-native';
import { GradientScreen } from '../../components/GradientScreen';
import { useAuth } from '../../context/AuthContext';
import { colors } from '../../theme/colors';

export default function ProfileScreen() {
  const { user, logout } = useAuth();
  return (
    <GradientScreen>
      <Text style={styles.title}>Profile</Text>
      <View style={styles.card}>
        <Text style={styles.label}>Name: {user?.name}</Text>
        <Text style={styles.label}>Email: {user?.email}</Text>
        <Text style={styles.label}>Role: {user?.role}</Text>
      </View>
      <Pressable style={styles.btn} onPress={logout}><Text>Logout</Text></Pressable>
    </GradientScreen>
  );
}

const styles = StyleSheet.create({
  title: { color: colors.text, fontSize: 24, fontWeight: '700', marginBottom: 12 },
  card: { backgroundColor: colors.card, borderRadius: 16, padding: 14, marginBottom: 12 },
  label: { color: colors.text, marginBottom: 6 },
  btn: { backgroundColor: colors.accent, borderRadius: 12, padding: 12, alignItems: 'center' }
});
