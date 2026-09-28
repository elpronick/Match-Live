import { useCallback, useState } from 'react';
import { getSavedProperties, removeSavedProperty } from '../api/savedApi';

export interface SavedPropertyItem {
  id: string;
  property_id: string;
  userId?: string;
  roomId?: string;
}

export function useSavedProperties() {
  const [saved, setSaved] = useState<SavedPropertyItem[]>([]);

  const loadSaved = useCallback(async () => {
    try {
      const data = await getSavedProperties();
      setSaved(data);
    } catch (err) {
      console.error('Error al cargar propiedades guardadas:', err);
    }
  }, []);

  const removeSaved = async (propertyId: string) => {
    try {
      await removeSavedProperty(propertyId);
      setSaved((prev) => prev.filter((item) => item.property_id !== propertyId));
    } catch (err) {
      console.error('Error al eliminar propiedad guardada:', err);
    }
  };

  return { saved, loadSaved, removeSaved };
}
