import { useEffect, useMemo, useState } from 'react';
import { getProfiles, getRooms, likeProfile } from '../api/marketplaceApi';

export const visibleRoomsLimit = 4;

export function useDeck() {
  const [people, setPeople] = useState([]);
  const [rooms, setRooms] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [likedIds, setLikedIds] = useState(new Set());
  const [passedIds, setPassedIds] = useState(new Set());
  const [actionHistory, setActionHistory] = useState([]);
  const [lastMatchId, setLastMatchId] = useState(null);
  const [showAllRooms, setShowAllRooms] = useState(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    let isMounted = true;

    async function loadDeckData() {
      try {
        setLoading(true);
        setError('');
        const [profiles, availableRooms] = await Promise.all([getProfiles(), getRooms()]);

        if (!isMounted) return;
        setPeople(profiles);
        setRooms(availableRooms);
        setCurrentIndex(0);
      } catch {
        if (isMounted) {
          setError('No hemos podido cargar perfiles y habitaciones.');
        }
      } finally {
        if (isMounted) {
          setLoading(false);
        }
      }
    }

    loadDeckData();

    return () => {
      isMounted = false;
    };
  }, []);

  const current = people[currentIndex];
  const matches = useMemo(
    () => people.filter((person) => likedIds.has(person.id)),
    [likedIds, people]
  );
  const roomsUnlocked = matches.length > 0;
  const currentMatch = matches.find((person) => person.id === lastMatchId) || matches[0];
  const visibleRooms = showAllRooms ? rooms : rooms.slice(0, visibleRoomsLimit);
  const hasHiddenRooms = rooms.length > visibleRoomsLimit;

  const goToNextPerson = () => {
    setCurrentIndex((index) => Math.min(index + 1, people.length));
  };

  const handlePass = () => {
    if (!current) return;

    setPassedIds((prev) => new Set(prev).add(current.id));
    setActionHistory((prev) => [...prev, { personId: current.id, action: 'pass' }]);
    goToNextPerson();
  };

  const handleLike = async () => {
    if (!current) return;

    try {
      await likeProfile(current.id);
      setLikedIds((prev) => new Set(prev).add(current.id));
      setActionHistory((prev) => [...prev, { personId: current.id, action: 'like' }]);
      setLastMatchId(current.id);
      setError('');
      goToNextPerson();
    } catch {
      setError('No hemos podido guardar el like. Intentalo otra vez.');
    }
  };

  const handleBack = () => {
    if (currentIndex === 0) return;

    const lastAction = actionHistory[actionHistory.length - 1];
    if (!lastAction) {
      setCurrentIndex((index) => Math.max(index - 1, 0));
      return;
    }

    setActionHistory((prev) => prev.slice(0, -1));
    if (lastAction.action === 'like') {
      const nextLikedIds = new Set(likedIds);
      nextLikedIds.delete(lastAction.personId);
      const nextMatches = people.filter((person) => nextLikedIds.has(person.id));

      setLikedIds(nextLikedIds);
      setLastMatchId(nextMatches.length > 0 ? nextMatches[nextMatches.length - 1].id : null);
    } else {
      setPassedIds((prev) => {
        const next = new Set(prev);
        next.delete(lastAction.personId);
        return next;
      });
    }
    setCurrentIndex((index) => Math.max(index - 1, 0));
  };

  const restartDemo = () => {
    setCurrentIndex(0);
    setLikedIds(new Set());
    setPassedIds(new Set());
    setActionHistory([]);
    setLastMatchId(null);
    setShowAllRooms(false);
  };

  return {
    people,
    rooms,
    currentIndex,
    likedIds,
    passedIds,
    showAllRooms,
    setShowAllRooms,
    loading,
    error,
    current,
    matches,
    roomsUnlocked,
    currentMatch,
    visibleRooms,
    hasHiddenRooms,
    handlePass,
    handleLike,
    handleBack,
    restartDemo,
  };
}
