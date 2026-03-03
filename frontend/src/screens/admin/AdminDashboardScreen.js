import { useEffect, useState } from 'react';
import { FlatList, Pressable, StyleSheet, Text, TextInput, View } from 'react-native';
import { api } from '../../api/client';
import { GradientScreen } from '../../components/GradientScreen';
import { colors } from '../../theme/colors';

export default function AdminDashboardScreen() {
  const [title, setTitle] = useState('');
  const [body, setBody] = useState('');
  const [tag, setTag] = useState('');
  const [keywords, setKeywords] = useState('');
  const [response, setResponse] = useState('');
  const [intents, setIntents] = useState([]);

  const loadIntents = () => api.get('/intents').then(({ data }) => setIntents(data));
  useEffect(() => { loadIntents(); }, []);

  const postAnnouncement = async () => {
    await api.post('/announcements', { title, body });
    setTitle('');
    setBody('');
  };

  const addIntent = async () => {
    await api.post('/intents', {
      tag,
      keywords: keywords.split(',').map((k) => k.trim()).filter(Boolean),
      patterns: [],
      response
    });
    setTag('');
    setKeywords('');
    setResponse('');
    loadIntents();
  };

  return (
    <GradientScreen>
      <Text style={styles.title}>Admin Dashboard</Text>
      <View style={styles.card}>
        <Text style={styles.heading}>Post Announcement</Text>
        <TextInput value={title} onChangeText={setTitle} placeholder="Title" style={styles.input} />
        <TextInput value={body} onChangeText={setBody} placeholder="Body" style={styles.input} />
        <Pressable style={styles.btn} onPress={postAnnouncement}><Text>Publish</Text></Pressable>
      </View>
      <View style={styles.card}>
        <Text style={styles.heading}>Manage Chatbot Intents</Text>
        <TextInput value={tag} onChangeText={setTag} placeholder="Tag" style={styles.input} />
        <TextInput value={keywords} onChangeText={setKeywords} placeholder="Keywords comma separated" style={styles.input} />
        <TextInput value={response} onChangeText={setResponse} placeholder="Response" style={styles.input} />
        <Pressable style={styles.btn} onPress={addIntent}><Text>Add Intent</Text></Pressable>
      </View>
      <FlatList
        data={intents}
        keyExtractor={(item) => item._id}
        renderItem={({ item }) => <Text style={styles.intent}>{item.tag} • {item.keywords.join(', ')}</Text>}
      />
    </GradientScreen>
  );
}

const styles = StyleSheet.create({
  title: { color: colors.text, fontSize: 24, fontWeight: '700', marginBottom: 12 },
  card: { backgroundColor: colors.card, borderRadius: 16, padding: 12, marginBottom: 10 },
  heading: { color: colors.text, fontWeight: '700', marginBottom: 8 },
  input: { backgroundColor: '#fff', borderRadius: 10, padding: 10, marginBottom: 8 },
  btn: { backgroundColor: colors.accent, borderRadius: 10, padding: 10, alignItems: 'center' },
  intent: { color: colors.text, marginBottom: 6 }
});
