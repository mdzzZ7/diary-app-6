import { useEffect, useMemo, useState } from 'react';
import { DiaryEntry } from '../context/DiaryContext';

export function useDiarySearch(entries: DiaryEntry[]) {
  const [query, setQuery] = useState('');
  const [debouncedQuery, setDebouncedQuery] = useState('');
  const [activeMood, setActiveMood] = useState<string | null>(null);

  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedQuery(query);
    }, 350);

    return () => clearTimeout(timer);
  }, [query]);

  const filteredEntries = useMemo(() => {
    let result = entries;

    if (activeMood) {
      result = result.filter((entry) => entry.mood === activeMood);
    }

    const q = debouncedQuery.trim().toLowerCase();
    if (q) {
      result = result.filter(
        (entry) =>
          entry.title.toLowerCase().includes(q) ||
          entry.preview.toLowerCase().includes(q) ||
          entry.date.toLowerCase().includes(q)
      );
    }

    return result;
  }, [entries, debouncedQuery, activeMood]);

  const resetFilters = () => {
    setQuery('');
    setActiveMood(null);
  };

  return {
    query,
    setQuery,
    activeMood,
    setActiveMood,
    filteredEntries,
    resultCount: filteredEntries.length,
    resetFilters,
  };
}