import {Box, IconButton, List, Paper, Typography} from '@mui/material';
import React, {useEffect} from 'react';
import styles from './menu.module.scss'
import {createPortal} from "react-dom";
import MoreHorizIcon from '@mui/icons-material/MoreHoriz';
import MenuItemWithAvatar from "../MenuItemWithAvatar";

interface IProps {
    anchorEl: HTMLElement | null;
    handleClose: () => void;
    title: string;
    children: React.ReactNode;
}

const Menu: React.FC<IProps> = ({children,anchorEl, handleClose, title}) => {

    useEffect(() => {
        document.addEventListener('click', (event) => {
            if (anchorEl && !anchorEl.contains(event.target as Node)) {
                handleClose();
            }
        });
    }, [anchorEl, handleClose]);

    if (!anchorEl) {
        return null;
    }

    return createPortal(
        <>
            <Paper elevation={2} className={styles.root}>
                <Box className={styles.header}>
                    <Typography fontWeight={'bold'} fontSize={'x-large'}>{title}</Typography>
                    <IconButton>
                        <MoreHorizIcon/>
                    </IconButton>
                </Box>
                <List>
                    {children}
                </List>
            </Paper>
        </>,
        anchorEl);
}

export default Menu;