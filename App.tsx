
import React, { useState, useCallback } from 'react';
import { useDreamJournal } from './hooks/useDreamJournal';
import { getDreamInterpretation, generateDreamImage } from './services/geminiService';
import type { Dream, Interpretation } from './types';
import Header from './components/Header';
import DreamInput from './components/DreamInput';
import DreamJournal from './components/DreamJournal';
import Modal from './components/Modal';
import InterpretationView from './components/InterpretationView';
import ThemeTracker from './components/ThemeTracker';

const App: React.FC = () => {
    const { dreams, addDream, updateDream, deleteDream, isLoaded } = useDreamJournal();
    const [selectedDream, setSelectedDream] = useState<Dream | null>(null);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [processingDreamId, setProcessingDreamId] = useState<string | null>(null);
    const [isVisualizing, setIsVisualizing] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const handleAddDream = useCallback(async (newDreamData: Omit<Dream, 'id' | 'date' | 'interpretation'>) => {
        const newDream = addDream(newDreamData);
        setProcessingDreamId(newDream.id);
        setError(null);
        try {
            const interpretation = await getDreamInterpretation(newDream.content);
            updateDream(newDream.id, { interpretation });
        } catch (err: any) {
            setError(err.message || 'An unknown error occurred.');
            // Optionally remove dream if interpretation fails, or leave it
        } finally {
            setProcessingDreamId(null);
        }
    }, [addDream, updateDream]);

    const handleViewDream = useCallback((dream: Dream) => {
        setSelectedDream(dream);
        setIsModalOpen(true);
    }, []);
    
    const handleDeleteDream = useCallback((id: string) => {
       if (window.confirm("Are you sure you want to delete this dream? This action cannot be undone.")) {
            deleteDream(id);
       }
    }, [deleteDream]);

    const handleVisualize = useCallback(async () => {
        if (!selectedDream || !selectedDream.interpretation) return;
        setIsVisualizing(true);
        setError(null);
        try {
            const prompt = `A dream about: ${selectedDream.interpretation.title}. Key elements: ${selectedDream.interpretation.themes.join(', ')}.`;
            const imageUrl = await generateDreamImage(prompt);
            const updatedDream = { ...selectedDream, imageUrl };
            setSelectedDream(updatedDream);
            updateDream(selectedDream.id, { imageUrl });
        } catch (err: any) {
            setError(err.message);
        } finally {
            setIsVisualizing(false);
        }
    }, [selectedDream, updateDream]);

    const closeModal = () => {
        setIsModalOpen(false);
        setSelectedDream(null);
        setError(null);
    }

    if (!isLoaded) {
        return (
            <div className="min-h-screen bg-gray-900 flex items-center justify-center">
                <h1 className="text-white text-2xl">Loading Journal...</h1>
            </div>
        )
    }

    return (
        <div className="min-h-screen bg-gray-900 text-white font-sans">
            <div className="container mx-auto max-w-4xl p-4 sm:p-6">
                <Header />
                <main>
                    <DreamInput 
                        onAddDream={handleAddDream} 
                        isInterpreting={!!processingDreamId}
                    />
                    {error && (
                         <div className="bg-red-900 border border-red-500 text-red-200 px-4 py-3 rounded-lg relative mb-6" role="alert">
                            <strong className="font-bold">Error: </strong>
                            <span className="block sm:inline">{error}</span>
                            <span className="absolute top-0 bottom-0 right-0 px-4 py-3" onClick={() => setError(null)}>
                                <svg className="fill-current h-6 w-6 text-red-200" role="button" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"><title>Close</title><path d="M14.348 14.849a1.2 1.2 0 0 1-1.697 0L10 11.819l-2.651 3.029a1.2 1.2 0 1 1-1.697-1.697l2.758-3.15-2.759-3.152a1.2 1.2 0 1 1 1.697-1.697L10 8.183l2.651-3.031a1.2 1.2 0 1 1 1.697 1.697l-2.758 3.152 2.758 3.15a1.2 1.2 0 0 1 0 1.698z"/></svg>
                            </span>
                        </div>
                    )}
                    <ThemeTracker dreams={dreams} />
                    <div className="mt-8">
                      <DreamJournal 
                          dreams={dreams} 
                          onViewDream={handleViewDream}
                          onDeleteDream={handleDeleteDream}
                          processingDreamId={processingDreamId}
                      />
                    </div>
                </main>
            </div>
            <Modal isOpen={isModalOpen} onClose={closeModal} title={selectedDream?.interpretation?.title || 'Dream Details'}>
                {selectedDream && (
                    <InterpretationView 
                        interpretation={selectedDream.interpretation}
                        isLoading={!selectedDream.interpretation}
                        onVisualize={handleVisualize}
                        isVisualizing={isVisualizing}
                        imageUrl={selectedDream.imageUrl}
                    />
                )}
                {error && <p className="text-red-400 mt-4">{error}</p>}
            </Modal>
        </div>
    );
};

export default App;
