
export type Emotion = 'joy' | 'sadness' | 'fear' | 'anger' | 'surprise' | 'neutral';

export interface Interpretation {
  title: string;
  summary: string;
  themes: string[];
  symbols: {
    symbol: string;
    meaning: string;
    psychology: string;
  }[];
  emotions: {
    emotion: string;
    analysis: string;
  }[];
  interpretation: string;
}

export interface Dream {
  id: string;
  date: string;
  content: string;
  emotion: Emotion;
  interpretation: Interpretation | null;
  imageUrl?: string;
}
