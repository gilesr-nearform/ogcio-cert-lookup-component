import { Navigate, Route, Routes } from 'react-router-dom';
import { AppShell } from './components/AppShell';
import { DebugStart } from './pages/DebugStart';
import { JourneyPage } from './pages/journey/JourneyPage';

export default function App() {
  return (
    <AppShell>
      <Routes>
        <Route path="/" element={<DebugStart />} />
        <Route path="/:certType" element={<JourneyPage />} />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </AppShell>
  );
}
