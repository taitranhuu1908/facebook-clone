import {Box, List, Paper, Typography} from '@mui/material';
import React, {useCallback, useEffect} from 'react';
import styles from './menu.module.scss'
import {createPortal} from "react-dom";
import MoreHorizIcon from '@mui/icons-material/MoreHoriz';

interface IProps {
    anchorEl: HTMLElement | null;
    handleClose: () => void;
    title?: string;
    children?: React.ReactNode;
}

const Menu: React.FC<IProps> = ({children, anchorEl, handleClose, title}) => {

    const handleCloseEl = useCallback(
        (event: MouseEvent) => {
            if (anchorEl && !anchorEl.contains(event.target as Node)) {
                handleClose();
            }
        },
        [anchorEl, handleClose]);

    useEffect(() => {
        document.addEventListener('mousedown', handleCloseEl);

        return () => {
            document.removeEventListener('mousedown', handleCloseEl);
        }
    }, [handleCloseEl]);

    return anchorEl && createPortal(
        <>
            <Paper elevation={2} className={styles.root}>
                <Box className={styles.header}>
                    <Typography fontWeight={'bold'} fontSize={'x-large'}>{title}</Typography>
                    <span>
                        <MoreHorizIcon/>
                    </span>
                </Box>
                <List>
                    {children}
                </List>
            </Paper>
        </>,
        anchorEl);
}

export default Menu;