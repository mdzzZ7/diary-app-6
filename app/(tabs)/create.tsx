import React, { useState } from 'react';
import { View, Text, TextInput, Pressable, StyleSheet, ScrollView, KeyboardAvoidingView, Platform } from 'react-native';
import { useRouter } from 'expo-router';
import { useDiary } from '../../src/context/DiaryContext';
import { COLORS, SPACE, RADIUS, TYPO } from '../../src/styles/tokens';

const MOODS = ['😊', '🎯', '😌', '🥳', '😢', '😡'];

export default function CreateScreen() {
  const router = useRouter();
  const { addEntry } = useDiary();

  const [title, setTitle] = useState('');
  const [date, setDate] = useState(new Date().toISOString().split('T')[0]);
  const [body, setBody] = useState('');
  const [mood, setMood] = useState('😊');

  const canSave = title.trim().length > 0 && body.trim().length > 0;

  const save = () => {
    if (!canSave) return;
    addEntry({
      title: title.trim(),
      date: date.trim(),
      preview: body.trim().slice(0, 100) + '...',
      body: body.trim(),
      mood,
    });
    setTitle('');
    setBody('');
    setMood('😊');
    router.replace('/');
  };

  return (
    <KeyboardAvoidingView 
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      style={styles.container}
    >
      <ScrollView contentContainerStyle={styles.scroll}>
        <View style={styles.card}>
          <Text style={styles.label}>Pilih Mood</Text>
          <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.moodRow}>
            {MOODS.map((item) => (
              <Pressable
                key={item}
                onPress={() => setMood(item)}
                style={[
                  styles.moodButton,
                  mood === item && styles.moodSelected,
                ]}
              >
                <Text style={styles.mood}>{item}</Text>
              </Pressable>
            ))}
          </ScrollView>

          <View style={styles.inputGroup}>
            <Text style={styles.label}>Tanggal</Text>
            <TextInput
              value={date}
              onChangeText={setDate}
              placeholder="YYYY-MM-DD"
              placeholderTextColor={COLORS.muted}
              style={styles.input}
            />
          </View>

          <View style={styles.inputGroup}>
            <Text style={styles.label}>Judul</Text>
            <TextInput
              value={title}
              onChangeText={setTitle}
              placeholder="Apa yang menarik hari ini?"
              placeholderTextColor={COLORS.muted}
              style={styles.input}
            />
          </View>

          <View style={styles.inputGroup}>
            <Text style={styles.label}>Cerita</Text>
            <TextInput
              value={body}
              onChangeText={setBody}
              placeholder="Ceritakan selengkapnya..."
              placeholderTextColor={COLORS.muted}
              multiline
              style={[styles.input, styles.bodyInput]}
            />
          </View>
        </View>

        <Pressable
          onPress={save}
          disabled={!canSave}
          style={({ pressed }) => [
            styles.saveButton,
            !canSave && styles.disabled,
            pressed && canSave && styles.saveButtonPressed
          ]}
        >
          <Text style={styles.saveText}>Simpan Diary</Text>
        </Pressable>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: COLORS.background },
  scroll: { padding: SPACE.l, gap: SPACE.l },
  card: {
    backgroundColor: COLORS.surface,
    padding: SPACE.l,
    borderRadius: RADIUS.card,
    borderWidth: 1,
    borderColor: COLORS.border,
    gap: SPACE.l,
  },
  inputGroup: { gap: SPACE.s },
  label: { fontWeight: '600', color: COLORS.text, fontSize: TYPO.body },
  input: {
    backgroundColor: COLORS.background,
    borderWidth: 1,
    borderColor: COLORS.border,
    borderRadius: RADIUS.m,
    padding: SPACE.m,
    fontSize: TYPO.body,
    color: COLORS.text,
  },
  bodyInput: { minHeight: 150, textAlignVertical: 'top' },
  moodRow: { gap: SPACE.m, paddingBottom: SPACE.xs },
  moodButton: {
    width: 56,
    height: 56,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: COLORS.background,
    borderWidth: 1,
    borderColor: COLORS.border,
    borderRadius: RADIUS.pill,
  },
  moodSelected: {
    borderColor: COLORS.accent,
    backgroundColor: COLORS.accentLight,
    borderWidth: 2,
  },
  mood: { fontSize: 28 },
  saveButton: {
    backgroundColor: COLORS.accent,
    padding: SPACE.l,
    borderRadius: RADIUS.card,
    alignItems: 'center',
  },
  saveButtonPressed: { opacity: 0.9, transform: [{ scale: 0.98 }] },
  disabled: { backgroundColor: COLORS.muted, opacity: 0.5 },
  saveText: { color: '#fff', fontWeight: '700', fontSize: TYPO.title },
});