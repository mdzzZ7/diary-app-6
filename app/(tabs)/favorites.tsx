import { useCallback } from 'react';
import { FlatList, StyleSheet, Text, View } from 'react-native';
import { useRouter } from 'expo-router';

import { useDiary } from '../../src/context/DiaryContext';
import { useLikedEntries } from '../../src/hooks/useLikedEntries';
import DiaryCard from '../../src/components/DiaryCard';
import { COLORS, SPACE, TYPO } from '../../src/styles/tokens';

export default function FavoritesScreen() {
  const router = useRouter();
  const { entries, likedIds, toggleLike } = useDiary();
  const favoriteEntries = useLikedEntries(entries, likedIds);

  const openDetail = useCallback((id: number) => {
    router.push({ pathname: '/detail/[id]', params: { id: String(id) } });
  }, [router]);

  return (
    <View style={styles.container}>
      <FlatList
        data={favoriteEntries}
        keyExtractor={(item) => String(item.id)}
        contentContainerStyle={styles.list}
        renderItem={({ item }) => (
          <DiaryCard
            title={item.title}
            date={item.date}
            preview={item.preview}
            mood={item.mood}
            liked={likedIds.has(item.id)}
            onPress={() => openDetail(item.id)}
            onToggleLike={() => toggleLike(item.id)}
          />
        )}
        ListEmptyComponent={
          <View style={styles.emptyContainer}>
            <Text style={styles.emptyEmoji}>🤍</Text>
            <Text style={styles.emptyDesc}>Belum ada diary yang disukai.</Text>
          </View>
        }
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: COLORS.background },
  list: { padding: SPACE.l, gap: SPACE.m },
  emptyContainer: { alignItems: 'center', paddingTop: 60 },
  emptyEmoji: { fontSize: 64, marginBottom: SPACE.m },
  emptyDesc: { fontSize: TYPO.body, color: COLORS.muted },
});