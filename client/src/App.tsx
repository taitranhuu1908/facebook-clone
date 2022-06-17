import { Route, Routes } from 'react-router-dom';
import HomePage from './pages/home';
import LoginPage from './pages/Login';
import NotFound from "./components/Not Found/404";
import Test from "./pages/test";
function App() {
    return (
        <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/login" element={<LoginPage />} />
            <Route path="/test" element={<Test />} />
            <Route path="/*" element={<NotFound />} />
        </Routes>
    );
}


export default App;
