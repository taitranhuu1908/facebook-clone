import React, {useMemo} from 'react';
import styles from './header.module.scss';
import {Box} from "@mui/material";
import InputSearch from "./InputSearch";
import ButtonCircle from "../../Button/Circle";
import NavigateItem from "./NavigateItem";
import {NAVIGATE_LIST} from "../../../constants";
import {useLocation} from 'react-router-dom';
import AvatarCircle from "../../Avatar/AvatarCircle";
import Menu from "./Menu";

interface IProps {
}

const Header: React.FC<IProps> = () => {
    const {pathname} = useLocation();
    const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);

    const handleClose = () => {
        setAnchorEl(null);
    }

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
            <ButtonCircle title={'Menu'}>
                <img src="/images/button/icon-button-bar.svg" alt=""/>
            </ButtonCircle>
            <ButtonCircle title={'Messenger'}>
                <img src="/images/button/icon-button-message.svg" alt=""/>
            </ButtonCircle>
            <ButtonCircle number={4} title={'Thông báo'} onClick={(e: any) => setAnchorEl(e.currentTarget)}>
                <img src="/images/button/icon-button-notify.svg" alt=""/>
            </ButtonCircle>
            <Menu handleClose={handleClose} anchorEl={anchorEl}/>
            <AvatarCircle
                src={'https://scontent.fsgn2-2.fna.fbcdn.net/v/t1.18169-9/18556006_104946380091976_9183765241575257849_n.jpg?_nc_cat=103&ccb=1-7&_nc_sid=09cbfe&_nc_ohc=ABFvsFoX_lwAX-zdp_y&_nc_ht=scontent.fsgn2-2.fna&oh=00_AT9uahBdcXjjXX6nSy_4PRWkuRdvpm94vMcBuTqh_9lz4g&oe=62D468C7'}
                title={'Trang cá nhân của bạn'}/>
        </Box>

    </Box>
}

export default Header;