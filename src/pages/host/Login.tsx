import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '../../components/ui/Button';
import { Card } from '../../components/ui/Card';
import { useStore } from '../../lib/store';

export default function Login() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();
    const login = useStore((state) => state.loginAsTeacher);

    const handleLogin = (e: React.FormEvent) => {
        e.preventDefault();
        // Hardcoded check for demo as requested
        if (email === 'pra3737@gmail.com' && password === 'Pranay@100x') {
            login('Pranay');
            navigate('/host/dashboard');
        } else {
            alert('Invalid credentials! Try pra3737@gmail.com / Pranay@100x');
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-brand-light p-4">
            <Card className="w-full max-w-md">
                <h2 className="text-3xl font-bold mb-6 text-center">Teacher Login</h2>
                <form onSubmit={handleLogin} className="space-y-4">
                    <div>
                        <label className="block text-sm font-bold mb-1">Email</label>
                        <input
                            type="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            className="w-full p-3 rounded-xl border-2 border-gray-200 focus:border-brand-purple outline-none transition-colors font-medium"
                            placeholder="pra3737@gmail.com"
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-bold mb-1">Password</label>
                        <input
                            type="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            className="w-full p-3 rounded-xl border-2 border-gray-200 focus:border-brand-purple outline-none transition-colors font-medium"
                            placeholder="Pranay@100x"
                        />
                    </div>
                    <Button type="submit" className="w-full" size="lg">
                        Login to Dashboard
                    </Button>
                </form>
            </Card>
        </div>
    );
}
