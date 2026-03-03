import { useEffect, useState } from 'react';
import { FlatList, StyleSheet, Text, View } from 'react-native';
import { api } from '../../api/client';
import { GradientScreen } from '../../components/GradientScreen';
import { colors } from '../../theme/colors';

export default function AnnouncementsScreen() {
  const [items, setItems] = useState([]);

  useEffect(() => {
    api.get('/announcements').then(({ data }) => setItems(data));
  }, []);

  return (
    <GradientScreen>
      <Text style={styles.title}>Announcements</Text>
      <FlatList
        data={items}
        keyExtractor={(item) => item._id}
        renderItem={({ item }) => (
          <View style={styles.card}>
            <Text style={styles.heading}>{item.title}</Text>
            <Text style={styles.body}>{item.body}</Text>
          </View>
        )}
      />
    </GradientScreen>
  );
}

const styles = StyleSheet.create({
  title: { color: colors.text, fontSize: 24, fontWeight: '700', marginBottom: 12 },
  card: { backgroundColor: colors.card, borderRadius: 16, padding: 14, marginBottom: 10 },
  heading: { color: colors.text, fontSize: 18, fontWeight: '700' },
  body: { color: colors.muted, marginTop: 8 }
});
