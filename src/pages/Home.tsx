import { Link } from 'react-router-dom';
import { Button } from '../components/ui/Button';
import { Mascot } from '../components/ui/Mascot';
import { motion } from 'framer-motion';

export default function Home() {
    return (
        <div className="h-screen flex flex-col items-center justify-center p-4 relative overflow-hidden">
            {/* Background Blobs */}
            <div className="absolute top-[-10%] left-[-10%] w-96 h-96 bg-brand-purple/20 rounded-full blur-3xl animate-bounce-slow" />
            <div className="absolute bottom-[-10%] right-[-10%] w-96 h-96 bg-brand-yellow/20 rounded-full blur-3xl animate-bounce-slow delay-1000" />

            <motion.div
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                className="z-10 flex flex-col items-center gap-8 text-center"
            >
                <Mascot size={180} />

                <div className="space-y-2">
                    <h1 className="text-6xl font-black tracking-tight text-brand-dark">
                        Curio<span className="text-brand-purple">Quest</span>
                    </h1>
                    <p className="text-xl text-gray-600 font-medium max-w-md">
                        The most alive quizzing platform for your classroom.
                    </p>
                </div>

                <div className="flex gap-4 mt-8">
                    <Link to="/host/login">
                        <Button size="xl" variant="primary">
                            I'm a Teacher
                        </Button>
                    </Link>
                    <Link to="/play">
                        <Button size="xl" variant="secondary">
                            I'm a Student
                        </Button>
                    </Link>
                </div>
            </motion.div>
        </div>
    );
}
