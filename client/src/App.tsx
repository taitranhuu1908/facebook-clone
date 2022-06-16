import { Route, Routes } from 'react-router-dom';
import HomePage from './pages/home';
import TestPage from './pages/test';
import LoginPage from './pages/Login';

function App() {
    return (
        <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/login" element={<LoginPage />} />
            <Route path="/test" element={<TestPage />} />
        </Routes>
    );
}


export default App;
