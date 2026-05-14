import { useCallback, useState } from 'react';
import { getSavedProperties, removeSavedProperty } from '../api/savedApi';

export function useSavedProperties() {
  const [saved, setSaved] = useState([]);

  const loadSaved = useCallback(async () => {
    try {
      const data = await getSavedProperties();
      setSaved(data);
    } catch {}
  }, []);

  const removeSaved = async (propertyId) => {
    try {
      await removeSavedProperty(propertyId);
      setSaved((prev) => prev.filter((item) => item.property_id !== propertyId));
    } catch {}
  };

  return { saved, loadSaved, removeSaved };
}
