import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { SurveyProvider, useSurvey } from './context/SurveyContext';
import { AuthProvider } from './context/AuthContext';
import { ThemeProvider } from './context/ThemeContext';
import Header from './components/layout/Header';
import ProfilePage from './pages/ProfilePage';
import SurveyPage from './pages/SurveyPage';
import ResultsPage from './pages/ResultsPage';
import ThankYouPage from './pages/ThankYouPage';
import { DIMENSIONS } from './data/dimensions';
import AdminQuestionsPage from './pages/AdminQuestionsPage';

// Guards a wizard route: if the person hasn't picked a role yet, send them
// back to the profile step instead of letting them land mid-survey via URL.
function StepGuard({ requireRole, children }) {
    const { state } = useSurvey();
    if (requireRole && !state.roleId) {
        return <Navigate to="/" replace />;
    }
    return children;
}

function AppShell() {
    return (
        <div className="min-h-screen bg-slate-50">
            <Header />
            <main>
                <Routes>
                    <Route path="/" element={<ProfilePage />} />
                    {DIMENSIONS.map((dim) => (
                        <Route
                            key={dim.key}
                            path={`/survey/${dim.key}`}
                            element={
                                <StepGuard requireRole>
                                    <SurveyPage dimensionKey={dim.key} />
                                </StepGuard>
                            }
                        />
                    ))}
                    <Route
                        path="/results"
                        element={
                            <StepGuard requireRole>
                                <ResultsPage />
                            </StepGuard>
                        }
                    />
                    <Route path="/thank-you" element={<ThankYouPage />} />
                    <Route path="/admin/questions" element={<AdminQuestionsPage />} />
                    <Route path="*" element={<Navigate to="/" replace />} />
                </Routes>
            </main>
        </div>
    );
}

export default function App() {
    return (
        <ThemeProvider>
            <AuthProvider>
                <BrowserRouter>
                    <SurveyProvider>
                        <AppShell />
                    </SurveyProvider>
                </BrowserRouter>
            </AuthProvider>
        </ThemeProvider>
    );
}
