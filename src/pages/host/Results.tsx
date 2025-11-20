import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useStore } from '../../lib/store';
import { Button } from '../../components/ui/Button';
import { Trophy, Home } from 'lucide-react';
import { motion } from 'framer-motion';

export default function HostResults() {
    const navigate = useNavigate();
    const { gameState, reset } = useStore((state) => state);

    useEffect(() => {
        if (gameState.status !== 'results' && !gameState.roomCode) {
            navigate('/host/dashboard');
        }
    }, [gameState.status, gameState.roomCode, navigate]);

    const handleHome = () => {
        reset();
        navigate('/host/dashboard');
    };

    // Generate realistic mock scores
    const leaderboard = gameState.players.map((p, i) => {
        const baseScore = 1000;
        const questionBonus = Math.floor(Math.random() * 500);
        const accuracy = i < 3 ? 1.0 : Math.random() * 0.8 + 0.2;

        return {
            ...p,
            score: Math.floor((baseScore + questionBonus) * accuracy)
        };
    }).sort((a, b) => b.score - a.score);

    return (
        <div className="min-h-screen bg-brand-purple flex flex-col items-center justify-center p-8 overflow-hidden relative">
            {/* Confetti Background */}
            <div className="absolute inset-0 pointer-events-none">
                {[...Array(50)].map((_, i) => (
                    <div
                        key={i}
                        className="absolute w-2 h-2 bg-brand-yellow rounded-full animate-bounce-slow"
                        style={{
                            left: `${Math.random() * 100}%`,
                            top: `${Math.random() * 100}%`,
                            animationDelay: `${Math.random() * 2}s`,
                            backgroundColor: ['#FBBF24', '#EF4444', '#3B82F6', '#10B981'][Math.floor(Math.random() * 4)]
                        }}
                    />
                ))}
            </div>

            <div className="z-10 text-center space-y-8 w-full max-w-4xl">
                <h1 className="text-6xl font-black text-white uppercase tracking-widest animate-bounce">
                    🎉 Game Over! 🎉
                </h1>

                {/* Podium */}
                <div className="flex justify-center items-end gap-4 h-64">
                    {leaderboard[1] && (
                        <motion.div
                            initial={{ height: 0 }} animate={{ height: '60%' }}
                            className="w-32 bg-brand-blue rounded-t-2xl flex flex-col items-center justify-end p-4 text-white"
                        >
                            <div className="font-bold text-xl mb-2">{leaderboard[1].name}</div>
                            <div className="text-sm mb-1">{leaderboard[1].score} pts</div>
                            <div className="text-3xl font-black">2nd</div>
                        </motion.div>
                    )}

                    {leaderboard[0] && (
                        <motion.div
                            initial={{ height: 0 }} animate={{ height: '100%' }}
                            className="w-32 bg-brand-yellow rounded-t-2xl flex flex-col items-center justify-end p-4 text-brand-dark relative"
                        >
                            <Trophy className="w-12 h-12 absolute -top-16 text-brand-yellow animate-bounce" />
                            <div className="font-bold text-xl mb-2">{leaderboard[0].name}</div>
                            <div className="text-sm mb-1">{leaderboard[0].score} pts</div>
                            <div className="text-4xl font-black">1st</div>
                        </motion.div>
                    )}

                    {leaderboard[2] && (
                        <motion.div
                            initial={{ height: 0 }} animate={{ height: '40%' }}
                            className="w-32 bg-brand-red rounded-t-2xl flex flex-col items-center justify-end p-4 text-white"
                        >
                            <div className="font-bold text-xl mb-2">{leaderboard[2].name}</div>
                            <div className="text-sm mb-1">{leaderboard[2].score} pts</div>
                            <div className="text-3xl font-black">3rd</div>
                        </motion.div>
                    )}
                </div>

                {/* Remaining Players */}
                {leaderboard.length > 3 && (
                    <div className="mt-8 w-full max-w-2xl space-y-2">
                        {leaderboard.slice(3).map((player, idx) => (
                            <motion.div
                                key={player.id}
                                initial={{ opacity: 0, x: -20 }}
                                animate={{ opacity: 1, x: 0 }}
                                transition={{ delay: (idx + 3) * 0.1 }}
                                className="bg-white/20 backdrop-blur-md rounded-xl p-4 flex justify-between items-center text-white"
                            >
                                <span className="font-bold text-lg">{idx + 4}. {player.name}</span>
                                <span className="text-2xl font-black">{player.score} pts</span>
                            </motion.div>
                        ))}
                    </div>
                )}

                <Button onClick={handleHome} size="lg" variant="secondary" className="mt-12">
                    <Home className="w-5 h-5 mr-2" /> Back to Dashboard
                </Button>
            </div>
        </div>
    );
}
