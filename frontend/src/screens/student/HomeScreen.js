import { StyleSheet, Text, View } from 'react-native';
import { GradientScreen } from '../../components/GradientScreen';
import { colors } from '../../theme/colors';

export default function HomeScreen() {
  return (
    <GradientScreen>
      <Text style={styles.title}>Student Home</Text>
      <View style={styles.card}>
        <Text style={styles.cardText}>Quick overview of your campus updates and chatbot shortcuts.</Text>
      </View>
    </GradientScreen>
  );
}

const styles = StyleSheet.create({
  title: { color: colors.text, fontSize: 24, fontWeight: '700', marginBottom: 12 },
  card: { backgroundColor: colors.card, padding: 16, borderRadius: 16 },
  cardText: { color: colors.text }
});
