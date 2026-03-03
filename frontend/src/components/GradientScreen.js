import { LinearGradient } from 'expo-linear-gradient';
import { SafeAreaView, StyleSheet, View } from 'react-native';
import { colors } from '../theme/colors';

export const GradientScreen = ({ children }) => (
  <LinearGradient colors={[colors.bgStart, colors.bgEnd]} style={styles.gradient}>
    <SafeAreaView style={styles.safe}>
      <View style={styles.container}>{children}</View>
    </SafeAreaView>
  </LinearGradient>
);

const styles = StyleSheet.create({
  gradient: { flex: 1 },
  safe: { flex: 1 },
  container: { flex: 1, padding: 16 }
});
