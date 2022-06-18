import React from 'react';
import Header from "../../components/HomePage/Header";
import NotFound from "../../components/NotFound/404";

interface IProps {

}

const MarketplacePage: React.FC<IProps> = () => {
    return <>
        <Header/>
        <NotFound/>
    </>
}
export default MarketplacePage;