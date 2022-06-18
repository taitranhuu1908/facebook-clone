import React, {useMemo} from 'react';
import styles from './header.module.scss';
import {Box} from "@mui/material";
import InputSearch from "./InputSearch";
import ButtonCircle from "../../Button/Circle";
import AvatarWithName from "../../Avatar/AvatarWithName";
import NavigateItem from "./NavigateItem";
import {NAVIGATE_LIST} from "../../../constants";
import {useLocation} from 'react-router-dom';

interface IProps {
}

const Header: React.FC<IProps> = () => {
    const {pathname} = useLocation();

    const renderNavigate = useMemo(() => {
        return NAVIGATE_LIST.map((item, index) => {
            const {Icon} = item;
            return <NavigateItem title={item.title} key={index} to={item.to} active={pathname === item.to}>
                <Icon active={pathname === item.to}/>
            </NavigateItem>
        })
    }, [pathname]);


    return <Box className={styles.root}>
        <Box className={styles.headerRight}>
            <Box className={styles.logo}>
                <img src="/images/logo.svg" alt=""/>
            </Box>
            <Box>
                <InputSearch/>
            </Box>
        </Box>
        <Box className={styles.headerMid}>
            {renderNavigate}
        </Box>
        <Box className={styles.headerRight}>
            <AvatarWithName src={""} title={"Hữu Tài TRần"}/>
            <ButtonCircle title={'Menu'}>
                <img src="/images/button/icon-button-bar.svg" alt=""/>
            </ButtonCircle>
            <ButtonCircle title={'Messenger'}>
                <img src="/images/button/icon-button-message.svg" alt=""/>
            </ButtonCircle>
            <ButtonCircle title={'Thông báo'}>
                <img src="/images/button/icon-button-notify.svg" alt=""/>
            </ButtonCircle>
            <ButtonCircle title={'Trang cá nhân của bạn'}>
                <img src="/images/button/icon-button-down.svg" alt=""/>
            </ButtonCircle>
        </Box>

    </Box>
}
export default Header;