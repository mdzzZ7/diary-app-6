import React from 'react';
import { View, Text, ScrollView, Pressable, StyleSheet } from 'react-native';
import { Stack, useLocalSearchParams } from 'expo-router';

import { useDiary } from '../../src/context/DiaryContext';
import { COLORS, SPACE, RADIUS, TYPO } from '../../src/styles/tokens';

export default function DetailScreen() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const { getById, likedIds, toggleLike } = useDiary();

  const entry = getById(id);

  if (!entry) {
    return (
      <View style={styles.center}>
        <Text style={styles.errorText}>Diary tidak ditemukan.</Text>
      </View>
    );
  }

  const liked = likedIds.has(entry.id);

  return (
    <View style={styles.wrapper}>
      <Stack.Screen
        options={{
          headerRight: () => (
            <Pressable
              onPress={() => toggleLike(entry.id)}
              style={styles.headerLike}
              hitSlop={20}
            >
              <Text style={styles.headerLikeText}>{liked ? '❤️' : '🤍'}</Text>
            </Pressable>
          ),
        }}
      />
      <ScrollView contentContainerStyle={styles.container}>
        <View style={styles.header}>
          <View style={styles.moodCircle}>
            <Text style={styles.mood}>{entry.mood}</Text>
          </View>
          <View style={styles.meta}>
            <Text style={styles.date}>{entry.date}</Text>
            <Text style={styles.title}>{entry.title}</Text>
          </View>
        </View>

        <View style={styles.contentCard}>
          <Text style={styles.body}>{entry.body}</Text>
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  wrapper: { flex: 1, backgroundColor: COLORS.background },
  container: { padding: SPACE.l, gap: SPACE.l },
  header: { flexDirection: 'row', alignItems: 'center', gap: SPACE.m },
  moodCircle: {
    width: 72,
    height: 72,
    borderRadius: RADIUS.pill,
    backgroundColor: COLORS.surface,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: COLORS.border,
  },
  mood: { fontSize: 40 },
  meta: { flex: 1 },
  date: {
    fontSize: TYPO.body,
    color: COLORS.accent,
    fontWeight: '600',
    marginBottom: 4,
  },
  title: { fontSize: TYPO.h1, fontWeight: '800', color: COLORS.text },
  contentCard: {
    backgroundColor: COLORS.surface,
    padding: SPACE.xl,
    borderRadius: RADIUS.card,
    borderWidth: 1,
    borderColor: COLORS.border,
    minHeight: 300,
  },
  body: { fontSize: TYPO.title, lineHeight: 28, color: COLORS.text },
  headerLike: { padding: SPACE.s },
  headerLikeText: { fontSize: 24 },
  center: { flex: 1, justifyContent: 'center', alignItems: 'center' },
  errorText: { color: COLORS.muted, fontSize: TYPO.body },
});