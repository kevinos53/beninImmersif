import { createPinia } from 'pinia';

// Créer une instance de Pinia à exporter
export const pinia = createPinia();

// Fonction pour obtenir un store initialisé avec cette instance de Pinia
export function useStore(useStoreFunc) {
  return useStoreFunc(pinia);
}