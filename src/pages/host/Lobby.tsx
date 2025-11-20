import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useStore } from '../../lib/store';
import { Button } from '../../components/ui/Button';
import { Users, Play, Copy } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

export default function HostLobby() {
    const navigate = useNavigate();
    const { gameState, startGame } = useStore((state) => state);

    useEffect(() => {
        if (!gameState.roomCode) {
            navigate('/host/dashboard');
        }
    }, [gameState.roomCode, navigate]);

    const handleStart = () => {
        startGame();
        navigate('/host/game');
    };

    const copyCode = () => {
        if (gameState.roomCode) {
            navigator.clipboard.writeText(gameState.roomCode);
        }
    };

    return (
        <div className="min-h-screen bg-brand-purple flex flex-col items-center justify-center p-8 relative overflow-hidden">
            {/* Background Blobs */}
            <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none">
                <div className="absolute top-[-10%] left-[-10%] w-[50%] h-[50%] bg-brand-yellow rounded-full blur-[100px] opacity-30 animate-bounce-slow" />
                <div className="absolute bottom-[-10%] right-[-10%] w-[50%] h-[50%] bg-brand-blue rounded-full blur-[100px] opacity-30 animate-bounce-slow" style={{ animationDelay: '1s' }} />
            </div>

            <div className="z-10 w-full max-w-6xl flex flex-col items-center gap-12">
                {/* Header */}
                <div className="text-center space-y-4">
                    <h2 className="text-white/80 text-2xl font-bold uppercase tracking-widest">Join at curioquest.com</h2>
                    <div
                        onClick={copyCode}
                        className="bg-white text-brand-dark text-8xl font-black py-8 px-16 rounded-3xl shadow-[0_10px_0_rgba(0,0,0,0.2)] cursor-pointer hover:scale-105 active:scale-95 transition-transform flex items-center gap-6"
                    >
                        {gameState.roomCode}
                        <Copy className="w-8 h-8 text-gray-400" />
                    </div>
                </div>

                {/* Players Grid */}
                <div className="w-full bg-white/10 backdrop-blur-md rounded-3xl p-8 min-h-[300px] border-2 border-white/20">
                    <div className="flex justify-between items-center mb-8 text-white">
                        <div className="flex items-center gap-3">
                            <Users className="w-8 h-8" />
                            <h3 className="text-3xl font-bold">{gameState.players.length} Players Joined</h3>
                        </div>
                        <div className="text-xl font-medium opacity-80">Waiting for players...</div>
                    </div>

                    <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-4">
                        <AnimatePresence>
                            {gameState.players.map((player) => (
                                <motion.div
                                    key={player.id}
                                    initial={{ scale: 0, opacity: 0 }}
                                    animate={{ scale: 1, opacity: 1 }}
                                    exit={{ scale: 0, opacity: 0 }}
                                    className="bg-white text-brand-dark font-bold py-3 px-6 rounded-xl shadow-lg flex items-center justify-center text-lg animate-wiggle"
                                    style={{ animationDelay: `${Math.random()}s` }}
                                >
                                    {player.name}
                                </motion.div>
                            ))}
                        </AnimatePresence>
                    </div>
                </div>

                {/* Start Button */}
                <Button
                    onClick={handleStart}
                    disabled={gameState.players.length === 0}
                    className="text-2xl py-8 px-16 shadow-[0_10px_0_#059669] disabled:opacity-50 disabled:cursor-not-allowed"
                    variant="success"
                >
                    <Play className="w-8 h-8 mr-4" /> Start Quiz
                </Button>
            </div>
        </div>
    );
}
