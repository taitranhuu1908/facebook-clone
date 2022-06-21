import {Route, Routes} from 'react-router-dom';
import HomePage from './pages/Home';
import LoginPage from './pages/Login';
<<<<<<< HEAD
import NotFound from "./components/Not Found/404";
import Test from "./pages/test";
function App() {
    return (
        <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/login" element={<LoginPage />} />
            <Route path="/test" element={<Test />} />
            <Route path="/*" element={<NotFound />} />
=======
import NotFound from "./components/NotFound/404";
import WatchPage from "./pages/Watch";
import GamePage from "./pages/Game";
import MarketplacePage from "./pages/Marketplace";
import GroupPage from "./pages/Group";

function App() {
    return (
        <Routes>
            <Route path="/" element={<HomePage/>}/>
            <Route path="/login" element={<LoginPage/>}/>
            <Route path="/watch" element={<WatchPage/>}/>
            <Route path="/game" element={<GamePage/>}/>
            <Route path="/marketplace" element={<MarketplacePage/>}/>
            <Route path="/group" element={<GroupPage/>}/>
            <Route path="/*" element={<NotFound/>}/>
>>>>>>> 8cc1dd1163921a9faf0f8b661a500f7ded0f5452
        </Routes>
    );
}

export default App;
