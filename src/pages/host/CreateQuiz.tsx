import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useStore, type Question } from '../../lib/store';
import { Button } from '../../components/ui/Button';
import { Card } from '../../components/ui/Card';
import { Plus, Trash2, Save, ArrowLeft, CheckCircle2 } from 'lucide-react';
import { v4 as uuidv4 } from 'uuid';

export default function CreateQuiz() {
    const navigate = useNavigate();
    const addQuiz = useStore((state) => state.addQuiz);

    const [title, setTitle] = useState('Untitled Quiz');
    const [questions, setQuestions] = useState<Question[]>([
        {
            id: uuidv4(),
            type: 'MCQ',
            text: '',
            options: ['', '', '', ''],
            correctAnswer: 0,
            timeLimit: 30
        }
    ]);

    const handleAddQuestion = () => {
        setQuestions([
            ...questions,
            {
                id: uuidv4(),
                type: 'MCQ',
                text: '',
                options: ['', '', '', ''],
                correctAnswer: 0,
                timeLimit: 30
            }
        ]);
    };

    const handleRemoveQuestion = (id: string) => {
        if (questions.length > 1) {
            setQuestions(questions.filter(q => q.id !== id));
        }
    };

    const updateQuestion = (id: string, field: keyof Question, value: any) => {
        setQuestions(questions.map(q =>
            q.id === id ? { ...q, [field]: value } : q
        ));
    };

    const updateOption = (qId: string, optIndex: number, value: string) => {
        setQuestions(questions.map(q => {
            if (q.id === qId) {
                const newOptions = [...q.options];
                newOptions[optIndex] = value;
                return { ...q, options: newOptions };
            }
            return q;
        }));
    };

    const handleSave = () => {
        if (!title.trim()) return alert('Please enter a quiz title');
        if (questions.some(q => !q.text.trim())) return alert('Please fill in all questions');

        addQuiz({
            id: uuidv4(),
            title,
            questions,
            createdAt: Date.now()
        });

        navigate('/host/dashboard');
    };

    return (
        <div className="min-h-screen bg-brand-light p-8 pb-32">
            <div className="max-w-4xl mx-auto space-y-8">
                {/* Header */}
                <div className="flex items-center justify-between sticky top-0 bg-brand-light z-10 py-4">
                    <div className="flex items-center gap-4">
                        <Button variant="outline" size="sm" onClick={() => navigate(-1)}>
                            <ArrowLeft className="w-4 h-4" />
                        </Button>
                        <input
                            type="text"
                            value={title}
                            onChange={(e) => setTitle(e.target.value)}
                            className="text-3xl font-black bg-transparent border-b-2 border-transparent focus:border-brand-purple outline-none px-2"
                            placeholder="Enter Quiz Title..."
                        />
                    </div>
                    <Button variant="success" onClick={handleSave}>
                        <Save className="w-4 h-4" /> Save Quiz
                    </Button>
                </div>

                {/* Questions List */}
                <div className="space-y-6">
                    {questions.map((q, index) => (
                        <Card key={q.id} className="relative group">
                            <div className="absolute top-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity">
                                <Button variant="danger" size="sm" onClick={() => handleRemoveQuestion(q.id)}>
                                    <Trash2 className="w-4 h-4" />
                                </Button>
                            </div>

                            <div className="flex gap-4 mb-6">
                                <div className="bg-brand-dark text-white w-8 h-8 rounded-full flex items-center justify-center font-bold shrink-0">
                                    {index + 1}
                                </div>
                                <div className="flex-1">
                                    <input
                                        type="text"
                                        value={q.text}
                                        onChange={(e) => updateQuestion(q.id, 'text', e.target.value)}
                                        className="w-full text-xl font-bold bg-transparent border-b-2 border-gray-200 focus:border-brand-purple outline-none p-2"
                                        placeholder="Type your question here..."
                                    />
                                </div>
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pl-12">
                                {q.options.map((opt, optIndex) => (
                                    <div
                                        key={optIndex}
                                        className={`flex items-center gap-2 p-2 rounded-xl border-2 transition-colors ${q.correctAnswer === optIndex
                                            ? 'border-brand-green bg-brand-green/10'
                                            : 'border-gray-200'
                                            }`}
                                    >
                                        <button
                                            onClick={() => updateQuestion(q.id, 'correctAnswer', optIndex)}
                                            className={`w-6 h-6 rounded-full border-2 flex items-center justify-center shrink-0 ${q.correctAnswer === optIndex
                                                ? 'border-brand-green bg-brand-green text-white'
                                                : 'border-gray-300 text-transparent hover:border-brand-green'
                                                }`}
                                        >
                                            <CheckCircle2 className="w-4 h-4" />
                                        </button>
                                        <input
                                            type="text"
                                            value={opt}
                                            onChange={(e) => updateOption(q.id, optIndex, e.target.value)}
                                            className="flex-1 bg-transparent outline-none font-medium"
                                            placeholder={`Option ${optIndex + 1}`}
                                        />
                                    </div>
                                ))}
                            </div>
                        </Card>
                    ))}
                </div>

                {/* Add Question Button */}
                <div className="flex justify-center">
                    <Button onClick={handleAddQuestion} variant="secondary" size="lg" className="w-full max-w-md">
                        <Plus className="w-5 h-5" /> Add Question
                    </Button>
                </div>
            </div>
        </div>
    );
}
