import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useStore } from '../../lib/store';
import { Button } from '../../components/ui/Button';
import { Card } from '../../components/ui/Card';
import { Mascot } from '../../components/ui/Mascot';

export default function Join() {
    const [name, setName] = useState('');
    const [code, setCode] = useState('');
    const navigate = useNavigate();
    const joinAsStudent = useStore((state) => state.joinAsStudent);

    const handleJoin = (e: React.FormEvent) => {
        e.preventDefault();
        if (name.trim() && code.trim()) {
            joinAsStudent(name, code);
            navigate('/play/lobby');
        }
    };

    return (
        <div className="min-h-screen flex flex-col items-center justify-center bg-brand-purple p-4">
            <div className="mb-8">
                <Mascot size={120} />
            </div>

            <Card className="w-full max-w-md transform rotate-1 hover:rotate-0 transition-transform duration-300">
                <h2 className="text-3xl font-black text-center mb-2">Join the Quest!</h2>
                <p className="text-center text-gray-500 mb-6 font-medium">Enter your name to start.</p>

                <form onSubmit={handleJoin} className="space-y-4">
                    <div>
                        <label className="block text-sm font-bold mb-1 uppercase tracking-wider text-gray-500">Room Code</label>
                        <input
                            type="text"
                            value={code}
                            onChange={(e) => setCode(e.target.value)}
                            className="w-full p-4 rounded-xl border-4 border-gray-200 focus:border-brand-yellow outline-none transition-colors font-mono text-2xl font-bold text-center tracking-widest uppercase"
                            placeholder="123456"
                            maxLength={6}
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-bold mb-1 uppercase tracking-wider text-gray-500">Your Name</label>
                        <input
                            type="text"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            className="w-full p-4 rounded-xl border-4 border-gray-200 focus:border-brand-purple outline-none transition-colors font-bold text-xl text-center"
                            placeholder="Super Student"
                        />
                    </div>

                    <Button type="submit" className="w-full text-xl py-4" variant="secondary">
                        Enter Lobby
                    </Button>
                </form>
            </Card>
        </div>
    );
}
