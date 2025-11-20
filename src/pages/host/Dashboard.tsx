import { useNavigate } from 'react-router-dom';
import { useStore } from '../../lib/store';
import { Button } from '../../components/ui/Button';
import { Card } from '../../components/ui/Card';
import { Play, Plus } from 'lucide-react';

export default function Dashboard() {
    const navigate = useNavigate();
    const { currentUser, createRoom } = useStore((state) => state);

    return (
        <div className="min-h-screen bg-brand-light p-8">
            <header className="flex justify-between items-center mb-12">
                <div>
                    <h1 className="text-4xl font-black text-brand-dark">Welcome, {currentUser?.name || 'Teacher'}!</h1>
                    <p className="text-gray-600 font-medium mt-2">Ready to spark some curiosity?</p>
                </div>
                <Button variant="outline" size="sm">Log Out</Button>
            </header>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                {/* Create New Quiz Card */}
                <Card
                    hoverEffect
                    onClick={() => navigate('/host/create')}
                    className="cursor-pointer border-dashed border-4 border-gray-300 bg-transparent hover:border-brand-purple hover:bg-brand-purple/5 flex flex-col items-center justify-center h-64 gap-4 group"
                >
                    <div className="w-16 h-16 rounded-full bg-brand-purple/10 flex items-center justify-center group-hover:scale-110 transition-transform">
                        <Plus className="w-8 h-8 text-brand-purple" />
                    </div>
                    <h3 className="text-xl font-bold text-gray-500 group-hover:text-brand-purple">Create New Quiz</h3>
                </Card>

                {/* Active Quiz Card (Demo) */}
                <Card hoverEffect className="flex flex-col justify-between h-64 relative overflow-hidden">
                    <div className="absolute top-0 right-0 p-4 opacity-10">
                        <Play className="w-32 h-32" />
                    </div>
                    <div>
                        <span className="bg-brand-green/10 text-brand-green px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider">Ready to Host</span>
                        <h3 className="text-2xl font-bold mt-4">Science Quiz 101</h3>
                        <p className="text-gray-500 font-medium">5 Questions • Photosynthesis</p>
                    </div>

                    <div className="flex gap-3 mt-4">
                        <Button className="flex-1" onClick={() => {
                            createRoom('demo-quiz');
                            navigate('/host/lobby');
                        }}>
                            <Play className="w-4 h-4" /> Host Live
                        </Button>
                        <Button variant="outline" className="px-3">
                            Edit
                        </Button>
                    </div>
                </Card>
            </div>
        </div>
    );
}
