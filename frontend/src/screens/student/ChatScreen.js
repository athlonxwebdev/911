import { useState } from 'react';
import { Pressable, ScrollView, StyleSheet, Text, TextInput, View } from 'react-native';
import { api } from '../../api/client';
import { GradientScreen } from '../../components/GradientScreen';
import { colors } from '../../theme/colors';

export default function ChatScreen() {
  const [message, setMessage] = useState('');
  const [messages, setMessages] = useState([]);

  const send = async () => {
    if (!message.trim()) return;
    const userBubble = { type: 'user', text: message };
    const { data } = await api.post('/chat', { message });
    const botBubble = { type: 'bot', text: data.reply };
    setMessages((prev) => [...prev, userBubble, botBubble]);
    setMessage('');
  };

  return (
    <GradientScreen>
      <Text style={styles.title}>Campus Chatbot</Text>
      <ScrollView style={styles.chatArea}>
        {messages.map((item, idx) => (
          <View key={`${item.type}-${idx}`} style={[styles.bubble, item.type === 'user' ? styles.user : styles.bot]}>
            <Text style={[styles.msgText, item.type === 'user' && styles.userText]}>{item.text}</Text>
          </View>
        ))}
      </ScrollView>
      <View style={styles.row}>
        <TextInput value={message} onChangeText={setMessage} style={styles.input} placeholder="Ask about fees, hostel, exams..." />
        <Pressable style={styles.send} onPress={send}><Text>Send</Text></Pressable>
      </View>
    </GradientScreen>
  );
}

const styles = StyleSheet.create({
  title: { color: colors.text, fontSize: 24, fontWeight: '700', marginBottom: 12 },
  chatArea: { flex: 1, marginBottom: 12 },
  bubble: { padding: 12, borderRadius: 14, marginBottom: 8, maxWidth: '85%' },
  user: { backgroundColor: colors.bubbleUser, alignSelf: 'flex-end' },
  bot: { backgroundColor: colors.bubbleBot, alignSelf: 'flex-start' },
  msgText: { color: '#222' },
  userText: { color: '#111' },
  row: { flexDirection: 'row', gap: 8 },
  input: { flex: 1, backgroundColor: '#fff', borderRadius: 12, paddingHorizontal: 10 },
  send: { backgroundColor: colors.accent, borderRadius: 12, paddingHorizontal: 14, justifyContent: 'center' }
});
