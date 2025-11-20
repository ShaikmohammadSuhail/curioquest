import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import TeacherLogin from './pages/host/Login';
import TeacherDashboard from './pages/host/Dashboard';
import StudentJoin from './pages/player/Join';
import StudentLobby from './pages/player/Lobby';

import TeacherCreateQuiz from './pages/host/CreateQuiz';
import HostLobby from './pages/host/Lobby';
import HostGame from './pages/host/Game';
import StudentGame from './pages/player/Game';

import HostResults from './pages/host/Results';
import StudentResults from './pages/player/Results';

function App() {
  return (
    <BrowserRouter>
      <div className="min-h-screen bg-surface-background text-brand-dark overflow-hidden">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/host/login" element={<TeacherLogin />} />
          <Route path="/host/dashboard" element={<TeacherDashboard />} />
          <Route path="/host/create" element={<TeacherCreateQuiz />} />
          <Route path="/host/lobby" element={<HostLobby />} />
          <Route path="/host/game" element={<HostGame />} />
          <Route path="/host/results" element={<HostResults />} />
          <Route path="/play" element={<StudentJoin />} />
          <Route path="/play/lobby" element={<StudentLobby />} />
          <Route path="/play/game" element={<StudentGame />} />
          <Route path="/play/results" element={<StudentResults />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
