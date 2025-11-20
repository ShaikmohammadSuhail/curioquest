import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useStore } from '../../lib/store';
import { Button } from '../../components/ui/Button';
import { Card } from '../../components/ui/Card';
import { Users, ArrowRight, CheckCircle } from 'lucide-react';
import { motion } from 'framer-motion';

export default function HostGame() {
    const navigate = useNavigate();
    const { gameState, quizzes, reset, endGame } = useStore((state) => state);
    const [timeLeft, setTimeLeft] = useState(30);
    const [showResults, setShowResults] = useState(false);

    const currentQuiz = quizzes.find(q => q.id === 'demo-quiz') || quizzes[0];
    const currentQuestion = currentQuiz?.questions[gameState.currentQuestionIndex];

    useEffect(() => {
        if (!gameState.roomCode) {
            navigate('/host/dashboard');
        }
    }, [gameState.roomCode, navigate]);

    useEffect(() => {
        if (timeLeft > 0 && !showResults) {
            const timer = setInterval(() => setTimeLeft(t => t - 1), 1000);
            return () => clearInterval(timer);
        } else if (timeLeft === 0 && !showResults) {
            setShowResults(true);
        }
    }, [timeLeft, showResults]);

    const handleNext = () => {
        if (showResults) {
            if (gameState.currentQuestionIndex < currentQuiz.questions.length - 1) {
                setShowResults(false);
                setTimeLeft(30);
            } else {
                endGame();
                navigate('/host/results');
            }
        } else {
            setShowResults(true);
        }
    };

    if (!currentQuestion) return <div>Loading...</div>;

    const answeredCount = gameState.submittedAnswers?.length || Math.floor(gameState.players.length * 0.8);

    return (
        <div className="min-h-screen bg-brand-light flex flex-col">
            <div className="bg-white p-4 flex justify-between items-center shadow-sm">
                <div className="font-bold text-xl text-brand-purple">{currentQuiz.title}</div>
                <div className="flex items-center gap-4">
                    <div className="flex items-center gap-2 font-bold text-brand-dark bg-gray-100 px-4 py-2 rounded-full">
                        <Users className="w-5 h-5" />
                        <span>{gameState.players.length} Players</span>
                    </div>
                    <div className="flex items-center gap-2 font-bold text-brand-green bg-green-100 px-4 py-2 rounded-full">
                        <span>✓ {answeredCount} Answered</span>
                    </div>
                    <Button variant="danger" size="sm" onClick={() => { reset(); navigate('/host/dashboard'); }}>End Game</Button>
                </div>
            </div>

            <div className="flex-1 flex flex-col items-center justify-center p-8 gap-8">
                <Card className="w-full max-w-4xl text-center p-12 bg-white shadow-[0_8px_30px_rgba(0,0,0,0.12)]">
                    <h2 className="text-4xl font-black text-brand-dark mb-8">{currentQuestion.text}</h2>
                    {!showResults && (
                        <div className="flex justify-center mb-8">
                            <div className={`w-24 h-24 rounded-full flex items-center justify-center text-4xl font-black border-8 ${timeLeft < 10 ? 'border-brand-red text-brand-red animate-pulse' : 'border-brand-purple text-brand-purple'}`}>
                                {timeLeft}
                            </div>
                        </div>
                    )}
                </Card>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 w-full max-w-4xl">
                    {currentQuestion.options.map((option, index) => (
                        <motion.div
                            key={index}
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: index * 0.1 }}
                            className={`p-8 rounded-2xl text-2xl font-bold text-white shadow-[0_6px_0_rgba(0,0,0,0.2)] flex justify-between items-center
                ${index === 0 ? 'bg-brand-red' : ''}
                ${index === 1 ? 'bg-brand-blue' : ''}
                ${index === 2 ? 'bg-brand-yellow' : ''}
                ${index === 3 ? 'bg-brand-green' : ''}
                ${showResults && index !== currentQuestion.correctAnswer ? 'opacity-30' : ''}
                ${showResults && index === currentQuestion.correctAnswer ? 'ring-4 ring-offset-4 ring-brand-green scale-105' : ''}
              `}
                        >
                            <span>{option}</span>
                            {showResults && index === currentQuestion.correctAnswer && (
                                <CheckCircle className="w-8 h-8" />
                            )}
                        </motion.div>
                    ))}
                </div>

                <div className="fixed bottom-8 right-8">
                    <Button size="lg" onClick={handleNext} className="shadow-[0_10px_0_rgba(0,0,0,0.2)]">
                        {showResults ? (
                            <>Next Question <ArrowRight className="ml-2" /></>
                        ) : (
                            <>Skip Timer <ArrowRight className="ml-2" /></>
                        )}
                    </Button>
                </div>
            </div>
        </div>
    );
}
