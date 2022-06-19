import React, {useMemo} from 'react';
import styles from './styles.module.scss';
import {Avatar, Box, List} from "@mui/material";
import NavItem from "./NavItem";
import {LIST_ITEM_NAVBAR} from "../../../constants";

interface IProps {

}

const NavbarLeft: React.FC<IProps> = () => {

    const renderNavItems = useMemo(() => {
        return LIST_ITEM_NAVBAR.map((item, index) => {
            return <NavItem key={index} to={item.to} Icon={<img src={item.src} alt=""/>} title={item.title} />
        })
    }, [])

    return <>
        <Box className={styles.root}>
            <List sx={{ padding: '4px 8px' }}>
                <NavItem to={'/profile'} Icon={<Avatar/>} title={'Hữu Tài'}/>
                {renderNavItems}
            </List>
        </Box>
    </>
}
export default NavbarLeft;