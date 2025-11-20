import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useStore } from '../../lib/store';
import { Mascot } from '../../components/ui/Mascot';
import { motion } from 'framer-motion';

export default function Lobby() {
    const navigate = useNavigate();
    const { currentUser, gameState } = useStore((state) => state);

    useEffect(() => {
        if (gameState.status === 'playing') {
            navigate('/play/game');
        }
    }, [gameState.status, navigate]);

    return (
        <div className="min-h-screen bg-brand-yellow flex flex-col items-center justify-center p-4 overflow-hidden">
            <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                className="text-center space-y-6"
            >
                <div className="bg-white p-8 rounded-full border-4 border-brand-dark shadow-[8px_8px_0_0_rgb(31,41,55)] inline-block">
                    <Mascot size={150} />
                </div>

                <div className="space-y-2">
                    <h1 className="text-4xl font-black text-brand-dark">You're in, {currentUser?.name}!</h1>
                    <p className="text-xl font-bold text-brand-dark/60">
                        Waiting for host to start...
                    </p>
                </div>

                {/* Mini-game / Interactive Elements */}
                <div className="mt-12 grid grid-cols-3 gap-4 max-w-sm mx-auto opacity-50">
                    {[...Array(9)].map((_, i) => (
                        <motion.div
                            key={i}
                            className="w-16 h-16 bg-white rounded-xl border-2 border-brand-dark"
                            whileHover={{ scale: 1.2, rotate: Math.random() * 20 - 10 }}
                            whileTap={{ scale: 0.8 }}
                        />
                    ))}
                </div>
                <p className="text-sm font-bold text-brand-dark/40 uppercase tracking-widest">
                    Pop the bubbles while you wait!
                </p>
            </motion.div>
        </div>
    );
}
