import React, {useEffect, useState} from 'react';
import Navbar from "../../components/Stories/Navbar";
import styles from './styles.module.scss'
import {Box} from "@mui/material";
import HeaderRight from "../../components/HomePage/Header/HeaderRight";
import {useLocation} from "react-router-dom";

interface IProps {
    children: React.ReactNode;
}

const StoriesLayout: React.FC<IProps> = ({children}) => {
    const location = useLocation();
    const [bgr, setBgr] = useState('#e4e6eb');

    useEffect(() => {
        switch (location.pathname) {
            case '/stories':
                setBgr('#000');
                break;
            case '/stories/create':
                setBgr('#e4e6eb');
                break;
            default:
                setBgr('#e4e6eb');
                break;
        }
    }, [location]);


    return <>
        <Box className={styles.root} sx={{backgroundColor: bgr}}>
            <Navbar/>
            <Box className={styles.wrapperContent}>
                <Box className={styles.header}>
                    <HeaderRight/>
                </Box>
                <Box className={styles.content}>
                    {children}
                </Box>
            </Box>
        </Box>
    </>
}


export default StoriesLayout;