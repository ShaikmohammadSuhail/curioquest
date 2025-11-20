import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useStore } from '../../lib/store';
import { Button } from '../../components/ui/Button';
import { Home, Star } from 'lucide-react';
import { motion } from 'framer-motion';

export default function StudentResults() {
    const navigate = useNavigate();
    const { gameState } = useStore((state) => state);

    useEffect(() => {
        if (gameState.status !== 'results' && !gameState.roomCode) {
            navigate('/');
        }
    }, [gameState.status, gameState.roomCode, navigate]);

    const handleHome = () => {
        // For student, just go back to join page
        navigate('/');
    };

    return (
        <div className="min-h-screen bg-brand-purple flex flex-col items-center justify-center p-8">
            <motion.div
                initial={{ scale: 0.5, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                className="bg-white p-8 rounded-3xl shadow-2xl text-center max-w-md w-full space-y-8"
            >
                <div className="w-24 h-24 bg-brand-yellow rounded-full mx-auto flex items-center justify-center">
                    <Star className="w-12 h-12 text-brand-dark" />
                </div>

                <div>
                    <h1 className="text-4xl font-black text-brand-dark mb-2">Great Job!</h1>
                    <p className="text-gray-500 text-lg">You completed the quiz.</p>
                </div>

                <div className="bg-brand-light p-6 rounded-2xl">
                    <div className="text-sm font-bold text-gray-400 uppercase tracking-widest mb-2">Your Score</div>
                    <div className="text-5xl font-black text-brand-purple">850</div>
                </div>

                <Button onClick={handleHome} className="w-full" size="lg">
                    <Home className="w-5 h-5 mr-2" /> Play Again
                </Button>
            </motion.div>
        </div>
    );
}
