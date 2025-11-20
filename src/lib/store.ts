import { create } from 'zustand';

export type UserRole = 'teacher' | 'student' | null;

interface User {
    name: string;
    role: UserRole;
    id: string;
}

interface GameState {
    status: 'idle' | 'lobby' | 'playing' | 'results';
    currentQuestionIndex: number;
    roomCode: string | null;
    players: User[];
    submittedAnswers: string[]; // Array of player IDs who have submitted answers
}

export type QuestionType = 'MCQ' | 'TRUE_FALSE';

export interface Question {
    id: string;
    type: QuestionType;
    text: string;
    options: string[];
    correctAnswer: number; // Index of the correct option
    timeLimit: number;
}

export interface Quiz {
    id: string;
    title: string;
    questions: Question[];
    createdAt: number;
}

interface AppStore {
    currentUser: User | null;
    gameState: GameState;
    quizzes: Quiz[]; // Local storage of quizzes

    // Actions
    loginAsTeacher: (name: string) => void;
    joinAsStudent: (name: string, code: string) => void;
    createRoom: (quizId: string) => void;
    startGame: () => void;
    endGame: () => void;
    reset: () => void;

    // Quiz Actions
    addQuiz: (quiz: Quiz) => void;
    deleteQuiz: (id: string) => void;
    simulateAnswer: (playerId: string) => void; // Simulate a student answering
}

export const useStore = create<AppStore>((set) => ({
    currentUser: null,
    gameState: {
        status: 'idle',
        currentQuestionIndex: 0,
        roomCode: null,
        players: [],
        submittedAnswers: []
    },
    quizzes: [
        {
            id: 'demo-quiz',
            title: 'Science Quiz 101',
            createdAt: Date.now(),
            questions: [
                {
                    id: 'q1',
                    type: 'MCQ',
                    text: 'What is the powerhouse of the cell?',
                    options: ['Nucleus', 'Mitochondria', 'Ribosome', 'Golgi Body'],
                    correctAnswer: 1,
                    timeLimit: 30
                },
                {
                    id: 'q2',
                    type: 'MCQ',
                    text: 'Which planet is known as the Red Planet?',
                    options: ['Venus', 'Mars', 'Jupiter', 'Saturn'],
                    correctAnswer: 1,
                    timeLimit: 30
                }
            ]
        }
    ],

    loginAsTeacher: (name) => set({
        currentUser: { name, role: 'teacher', id: 'host' }
    }),

    joinAsStudent: (name, code) => set((state) => ({
        currentUser: { name, role: 'student', id: Math.random().toString(36).substr(2, 9) },
        gameState: {
            ...state.gameState,
            roomCode: code,
            players: [...state.gameState.players, { name, role: 'student', id: Math.random().toString(36).substr(2, 9) }]
        }
    })),

    createRoom: (_quizId) => set((state) => {
        // Create mock students for demo
        const mockNames = ['Emma', 'Mike', 'Sarah', 'Alex', 'James'];
        const mockPlayers = mockNames.map(name => ({
            name,
            role: 'student' as UserRole,
            id: Math.random().toString(36).substr(2, 9)
        }));

        return {
            gameState: {
                ...state.gameState,
                status: 'lobby',
                roomCode: Math.floor(100000 + Math.random() * 900000).toString(),
                players: mockPlayers
            }
        };
    }),

    startGame: () => set((state) => ({
        gameState: {
            ...state.gameState,
            status: 'playing',
            submittedAnswers: [] // Reset answers when game starts
        }
    })),

    endGame: () => set((state) => ({
        gameState: { ...state.gameState, status: 'results' }
    })),

    reset: () => set({
        gameState: {
            status: 'idle',
            currentQuestionIndex: 0,
            roomCode: null,
            players: [],
            submittedAnswers: []
        }
    }),

    addQuiz: (quiz) => set((state) => ({
        quizzes: [...state.quizzes, quiz]
    })),

    deleteQuiz: (id) => set((state) => ({
        quizzes: state.quizzes.filter(q => q.id !== id)
    })),

    simulateAnswer: (playerId) => set((state) => ({
        gameState: {
            ...state.gameState,
            submittedAnswers: [...state.gameState.submittedAnswers, playerId]
        }
    }))
}));

// Persist quizzes to localStorage
useStore.subscribe((state) => {
    localStorage.setItem('curioquest-quizzes', JSON.stringify(state.quizzes));
});

// Load quizzes from localStorage on init
const savedQuizzes = localStorage.getItem('curioquest-quizzes');
if (savedQuizzes) {
    try {
        const parsed = JSON.parse(savedQuizzes);
        useStore.setState({ quizzes: parsed });
    } catch (e) {
        console.error('Failed to load saved quizzes:', e);
    }
}
