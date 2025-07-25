
import React from 'react';
import type { Emotion } from './types';

export const EMOTION_OPTIONS: { value: Emotion; label: string; emoji: string; color: string }[] = [
  { value: 'joy', label: 'Joyful', emoji: '😊', color: 'text-yellow-400' },
  { value: 'sadness', label: 'Sad', emoji: '😢', color: 'text-blue-400' },
  { value: 'fear', label: 'Fearful', emoji: '😨', color: 'text-purple-400' },
  { value: 'anger', label: 'Angry', emoji: '😠', color: 'text-red-400' },
  { value: 'surprise', label: 'Surprising', emoji: '😮', color: 'text-teal-400' },
  { value: 'neutral', label: 'Neutral', emoji: '😐', color: 'text-gray-400' },
];

export const getEmotionData = (emotion: Emotion) => {
    return EMOTION_OPTIONS.find(e => e.value === emotion) || EMOTION_OPTIONS.find(e => e.value === 'neutral')!;
};
