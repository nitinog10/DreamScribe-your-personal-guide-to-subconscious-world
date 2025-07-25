
import { GoogleGenAI, Type, GenerateContentResponse } from "@google/genai";
import type { Interpretation } from '../types';

if (!process.env.API_KEY) {
  throw new Error("API_KEY environment variable is not set.");
}

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

const interpretationSchema = {
  type: Type.OBJECT,
  properties: {
    title: { type: Type.STRING, description: "A creative, short title for the dream." },
    summary: { type: Type.STRING, description: "A concise one-paragraph summary of the dream." },
    themes: {
      type: Type.ARRAY,
      description: "A list of 2-4 main themes found in the dream (e.g., 'loss of control', 'freedom').",
      items: { type: Type.STRING }
    },
    symbols: {
      type: Type.ARRAY,
      description: "Analysis of key symbols in the dream.",
      items: {
        type: Type.OBJECT,
        properties: {
          symbol: { type: Type.STRING, description: "The symbol identified (e.g., 'water', 'flying')." },
          meaning: { type: Type.STRING, description: "The potential meaning of this symbol in the dream's context." },
          psychology: { type: Type.STRING, description: "A brief psychological interpretation (e.g., from Freudian, Jungian, or Archetypal perspectives)." }
        },
        required: ["symbol", "meaning", "psychology"]
      }
    },
    emotions: {
      type: Type.ARRAY,
      description: "Analysis of the emotional landscape of the dream.",
      items: {
        type: Type.OBJECT,
        properties: {
          emotion: { type: Type.STRING, description: "The dominant emotion detected." },
          analysis: { type: Type.STRING, description: "How this emotion manifests and what it might signify." }
        },
        required: ["emotion", "analysis"]
      }
    },
    interpretation: {
      type: Type.STRING,
      description: "A comprehensive interpretation of the dream, weaving together themes, symbols, and emotions into a cohesive narrative for self-reflection."
    },
  },
  required: ["title", "summary", "themes", "symbols", "emotions", "interpretation"]
};

export const getDreamInterpretation = async (dreamText: string): Promise<Interpretation> => {
  try {
    const response: GenerateContentResponse = await ai.models.generateContent({
      model: 'gemini-2.5-flash',
      contents: `Analyze the following dream. Provide a detailed interpretation based on common psychological frameworks (Jungian, Freudian, Archetypal) and modern dream analysis. Identify key symbols, emotions, and themes. Dream: "${dreamText}"`,
      config: {
        responseMimeType: "application/json",
        responseSchema: interpretationSchema,
      }
    });

    const jsonText = response.text.trim();
    return JSON.parse(jsonText) as Interpretation;
  } catch (error) {
    console.error("Error getting dream interpretation:", error);
    throw new Error("Failed to interpret the dream. Please try again.");
  }
};

export const generateDreamImage = async (prompt: string): Promise<string> => {
  try {
    const descriptivePrompt = `A surreal, ethereal, and dreamlike digital painting of: ${prompt}. Use a calming color palette with navy, violet, and soft blues.`;
    const response = await ai.models.generateImages({
        model: 'imagen-3.0-generate-002',
        prompt: descriptivePrompt,
        config: {
            numberOfImages: 1,
            outputMimeType: 'image/jpeg',
            aspectRatio: '1:1',
        },
    });

    const base64ImageBytes: string = response.generatedImages[0].image.imageBytes;
    return `data:image/jpeg;base64,${base64ImageBytes}`;
  } catch (error) {
    console.error("Error generating dream image:", error);
    throw new Error("Failed to visualize the dream. The image generation service may be unavailable.");
  }
};
