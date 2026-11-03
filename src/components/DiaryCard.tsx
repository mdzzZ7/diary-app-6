import React from 'react';
import { View, Text, Pressable, StyleSheet } from 'react-native';
import { COLORS, SPACE, RADIUS, TYPO } from '../styles/tokens';

type Props = {
  title: string;
  date: string;
  preview: string;
  mood: string;
  liked: boolean;
  onPress: () => void;
  onToggleLike: () => void;
};

export default function DiaryCard({
  title,
  date,
  preview,
  mood,
  liked,
  onPress,
  onToggleLike,
}: Props) {
  return (
    <Pressable
      onPress={onPress}
      style={({ pressed }) => [
        styles.card,
        pressed && styles.cardPressed,
      ]}
    >
      <View style={styles.main}>
        <View style={styles.moodContainer}>
          <Text style={styles.mood}>{mood}</Text>
        </View>
        <View style={styles.content}>
          <Text style={styles.title} numberOfLines={1}>
            {title}
          </Text>
          <Text style={styles.date}>{date}</Text>
          <Text style={styles.preview} numberOfLines={2}>
            {preview}
          </Text>
        </View>
        <Pressable
          onPress={onToggleLike}
          hitSlop={15}
          style={[styles.likeButton, liked && styles.likeButtonActive]}
        >
          <Text style={styles.like}>{liked ? '❤️' : '🤍'}</Text>
        </Pressable>
      </View>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: COLORS.surface,
    borderRadius: RADIUS.card,
    borderWidth: 1,
    borderColor: COLORS.border,
    padding: SPACE.m,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 4,
    elevation: 2,
  },
  cardPressed: {
    opacity: 0.8,
    transform: [{ scale: 0.98 }],
  },
  main: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: SPACE.m,
  },
  moodContainer: {
    width: 50,
    height: 50,
    borderRadius: RADIUS.m,
    backgroundColor: COLORS.background,
    justifyContent: 'center',
    alignItems: 'center',
  },
  mood: {
    fontSize: 28,
  },
  content: {
    flex: 1,
  },
  title: {
    fontSize: TYPO.title,
    fontWeight: '700',
    color: COLORS.text,
    marginBottom: 2,
  },
  date: {
    fontSize: TYPO.caption,
    color: COLORS.muted,
    marginBottom: SPACE.s,
    fontWeight: '500',
  },
  preview: {
    fontSize: TYPO.body,
    color: COLORS.muted,
    lineHeight: 20,
  },
  likeButton: {
    padding: SPACE.s,
    borderRadius: RADIUS.pill,
    backgroundColor: COLORS.background,
  },
  likeButtonActive: {
    backgroundColor: COLORS.dangerLight,
  },
  like: {
    fontSize: 20,
  },
});