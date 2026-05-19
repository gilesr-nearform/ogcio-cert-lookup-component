import { Navigate, Route, Routes } from 'react-router-dom';
import { AppShell } from './components/AppShell';
import { DebugStart } from './pages/DebugStart';
import { JourneyPage } from './pages/journey/JourneyPage';

export default function App() {
  return (
    <Routes>
      <Route
        path="/"
        element={
          <AppShell>
            <DebugStart />
          </AppShell>
        }
      />
      <Route path="/:certType" element={<JourneyPage />} />
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
}
