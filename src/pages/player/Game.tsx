import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useStore } from '../../lib/store';
import { Card } from '../../components/ui/Card';
import { motion } from 'framer-motion';
import { CheckCircle2 } from 'lucide-react';

export default function StudentGame() {
    const navigate = useNavigate();
    const { gameState, quizzes } = useStore((state) => state);
    const [selectedOption, setSelectedOption] = useState<number | null>(null);
    const [submitted, setSubmitted] = useState(false);

    // Mock getting current quiz
    const currentQuiz = quizzes.find(q => q.id === 'demo-quiz') || quizzes[0];
    const currentQuestion = currentQuiz?.questions[gameState.currentQuestionIndex];

    useEffect(() => {
        if (!gameState.roomCode) {
            navigate('/');
        }
        if (gameState.status === 'results') {
            navigate('/play/results');
        }
    }, [gameState.roomCode, gameState.status, navigate]);

    // Reset state when question changes
    useEffect(() => {
        setSelectedOption(null);
        setSubmitted(false);
    }, [gameState.currentQuestionIndex]);

    const handleSubmit = (index: number) => {
        if (submitted) return;
        setSelectedOption(index);
        setSubmitted(true);
        // In a real app, we'd send this to the server/store
    };

    if (!currentQuestion) return <div className="p-8 text-center font-bold text-2xl">Loading question...</div>;

    return (
        <div className="min-h-screen bg-brand-blue p-4 flex flex-col items-center justify-center">
            <div className="w-full max-w-md space-y-8">
                {/* Question Text (Simplified for mobile) */}
                <Card className="bg-white p-6 shadow-xl">
                    <h2 className="text-xl font-black text-brand-dark text-center">{currentQuestion.text}</h2>
                </Card>

                {/* Options */}
                <div className="grid grid-cols-1 gap-4">
                    {currentQuestion.options.map((option, index) => (
                        <motion.button
                            key={index}
                            whileTap={{ scale: 0.95 }}
                            onClick={() => handleSubmit(index)}
                            disabled={submitted}
                            className={`
                p-6 rounded-2xl text-xl font-bold text-white shadow-[0_6px_0_rgba(0,0,0,0.2)] text-left relative overflow-hidden transition-all
                ${index === 0 ? 'bg-brand-red' : ''}
                ${index === 1 ? 'bg-brand-blue' : ''}
                ${index === 2 ? 'bg-brand-yellow' : ''}
                ${index === 3 ? 'bg-brand-green' : ''}
                ${submitted && selectedOption !== index ? 'opacity-50 grayscale' : ''}
                ${submitted && selectedOption === index ? 'ring-4 ring-white ring-offset-4 ring-offset-brand-blue' : ''}
              `}
                        >
                            <span className="relative z-10">{option}</span>

                            {/* Feedback Overlay (Mock) */}
                            {submitted && selectedOption === index && (
                                <div className="absolute inset-0 flex items-center justify-end pr-4 bg-black/10">
                                    <CheckCircle2 className="w-8 h-8 text-white" />
                                </div>
                            )}
                        </motion.button>
                    ))}
                </div>

                {/* Status Message */}
                {submitted && (
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="text-center text-white font-bold text-xl animate-pulse"
                    >
                        Answer Submitted! Waiting for others...
                    </motion.div>
                )}
            </div>
        </div>
    );
}
