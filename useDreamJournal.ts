
import { useState, useEffect, useCallback } from 'react';
import type { Dream, Interpretation } from '../types';

const STORAGE_KEY = 'dreamScribeJournal';

export const useDreamJournal = () => {
  const [dreams, setDreams] = useState<Dream[]>([]);
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    try {
      const storedDreams = localStorage.getItem(STORAGE_KEY);
      if (storedDreams) {
        setDreams(JSON.parse(storedDreams));
      }
    } catch (error) {
      console.error("Failed to load dreams from localStorage", error);
    }
    setIsLoaded(true);
  }, []);

  useEffect(() => {
    if (isLoaded) {
      try {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(dreams));
      } catch (error) {
        console.error("Failed to save dreams to localStorage", error);
      }
    }
  }, [dreams, isLoaded]);

  const addDream = useCallback((dream: Omit<Dream, 'id' | 'date' | 'interpretation'>) => {
    const newDream: Dream = {
      ...dream,
      id: new Date().toISOString(),
      date: new Date().toISOString(),
      interpretation: null,
    };
    setDreams(prevDreams => [newDream, ...prevDreams]);
    return newDream;
  }, []);

  const updateDream = useCallback((id: string, updates: Partial<Dream>) => {
    setDreams(prevDreams =>
      prevDreams.map(dream => (dream.id === id ? { ...dream, ...updates } : dream))
    );
  }, []);
  
  const getDreamById = useCallback((id: string) => {
      return dreams.find(dream => dream.id === id);
  }, [dreams]);

  const deleteDream = useCallback((id: string) => {
    setDreams(prevDreams => prevDreams.filter(dream => dream.id !== id));
  }, []);

  return { dreams, addDream, updateDream, deleteDream, getDreamById, isLoaded };
};
