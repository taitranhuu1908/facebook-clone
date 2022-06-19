import React from 'react';
import NotFound from "../../components/NotFound/404";
import HomeLayout from "../../layouts/HomeLayout";

interface IProps {

}

const GamePage: React.FC<IProps> = () => {
    return <>
        <HomeLayout>
            <NotFound/>
        </HomeLayout>
    </>
}
export default GamePage;