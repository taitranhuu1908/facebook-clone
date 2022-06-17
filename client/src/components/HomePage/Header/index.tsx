import React from 'react';
import styles from './header.module.scss';
import {Box} from "@mui/material";
import InputSearch from "./InputSearch";
import ButtonCircle from "../../Button/Circle";
import AvatarWithName from "../../Avatar/AvatarWithName";

interface IProps {
}

const Header: React.FC<IProps> = () => {
    return <Box className={styles.root}>
        <Box className={styles.headerRight}>
            <Box className={styles.logo}>
                <img src="/images/logo.svg" alt=""/>
            </Box>
            <Box>
                <InputSearch/>
            </Box>
        </Box>
        <Box className={styles.headerMid}></Box>
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