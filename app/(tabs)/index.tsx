import { useCallback, useRef } from 'react';
import { FlatList, Pressable, StyleSheet, Text, TextInput, View, ScrollView } from 'react-native';
import { useRouter } from 'expo-router';

import { useDiary } from '../../src/context/DiaryContext';
import { useDiarySearch } from '../../src/hooks/useDiarySearch';
import DiaryCard from '../../src/components/DiaryCard';
import { COLORS, SPACE, TYPO, RADIUS } from '../../src/styles/tokens';

const MOOD_FILTERS = ['😊', '🎯', '😌', '🥳', '😢', '😡'];

export default function HomeScreen() {
  const router = useRouter();
  const { entries, likedIds, toggleLike } = useDiary();
  const {
    query,
    setQuery,
    activeMood,
    setActiveMood,
    filteredEntries,
    resultCount,
    resetFilters,
  } = useDiarySearch(entries);

  const searchRef = useRef<React.ElementRef<typeof TextInput>>(null);

  const openDetail = useCallback((id: number) => {
    router.push({ pathname: '/detail/[id]', params: { id: String(id) } });
  }, [router]);

  return (
    <View style={styles.container}>
      <View style={styles.headerContainer}>
        <View style={styles.searchRow}>
          <TextInput
            ref={searchRef}
            value={query}
            onChangeText={setQuery}
            placeholder="Cari momen..."
            placeholderTextColor={COLORS.muted}
            style={styles.search}
          />
          {(query.length > 0 || activeMood) && (
            <Pressable onPress={resetFilters} style={styles.clearButton}>
              <Text style={styles.clearText}>Reset</Text>
            </Pressable>
          )}
        </View>

        <View>
          <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.moodScroll}>
            {MOOD_FILTERS.map((mood) => (
              <Pressable
                key={mood}
                onPress={() => setActiveMood(prev => prev === mood ? null : mood)}
                style={[
                  styles.moodFilter,
                  activeMood === mood && styles.moodFilterActive,
                ]}
              >
                <Text style={styles.moodFilterText}>{mood}</Text>
              </Pressable>
            ))}
          </ScrollView>
        </View>
        <Text style={styles.counter}>{resultCount} entri ditemukan</Text>
      </View>

      <FlatList
        data={filteredEntries}
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
            <Text style={styles.emptyEmoji}>🍃</Text>
            <Text style={styles.emptyTitle}>Kosong</Text>
            <Text style={styles.emptyDesc}>Tidak ada diary yang cocok dengan pencarian.</Text>
          </View>
        }
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: COLORS.background },
  headerContainer: {
    padding: SPACE.l,
    paddingBottom: SPACE.s,
    backgroundColor: COLORS.surface,
    borderBottomWidth: 1,
    borderBottomColor: COLORS.border,
  },
  searchRow: { flexDirection: 'row', gap: SPACE.s, marginBottom: SPACE.m },
  search: {
    flex: 1,
    backgroundColor: COLORS.background,
    borderWidth: 1,
    borderColor: COLORS.border,
    borderRadius: RADIUS.m,
    paddingHorizontal: SPACE.l,
    paddingVertical: SPACE.m,
    fontSize: TYPO.body,
    color: COLORS.text,
  },
  clearButton: {
    justifyContent: 'center',
    paddingHorizontal: SPACE.l,
    backgroundColor: COLORS.accentLight,
    borderRadius: RADIUS.m,
  },
  clearText: { color: COLORS.accent, fontWeight: '600' },
  moodScroll: { gap: SPACE.s, paddingBottom: SPACE.s },
  moodFilter: {
    paddingHorizontal: SPACE.m,
    paddingVertical: SPACE.s,
    backgroundColor: COLORS.background,
    borderRadius: RADIUS.pill,
    borderWidth: 1,
    borderColor: COLORS.border,
  },
  moodFilterActive: {
    backgroundColor: COLORS.accentLight,
    borderColor: COLORS.accent,
  },
  moodFilterText: { fontSize: 20 },
  counter: { color: COLORS.muted, fontSize: TYPO.caption, marginTop: SPACE.s },
  list: { padding: SPACE.l, gap: SPACE.m },
  emptyContainer: { alignItems: 'center', paddingTop: 60 },
  emptyEmoji: { fontSize: 64, marginBottom: SPACE.m },
  emptyTitle: { fontSize: TYPO.h2, fontWeight: '700', color: COLORS.text, marginBottom: SPACE.s },
  emptyDesc: { fontSize: TYPO.body, color: COLORS.muted, textAlign: 'center' },
});