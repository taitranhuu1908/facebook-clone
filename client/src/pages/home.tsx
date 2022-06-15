import React from 'react'
import { Link } from 'react-router-dom';

const HomePage: React.FC = () => {
    return (
        <div>
            <Link to="/test">Test</Link>
        </div>
    )
}

export default HomePage;