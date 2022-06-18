import {Box, IconButton, Paper, Typography} from '@mui/material';
import React, {useEffect} from 'react';
import styles from './menu.module.scss'
import {createPortal} from "react-dom";
import MoreHorizIcon from '@mui/icons-material/MoreHoriz';

interface IProps {
    anchorEl: HTMLElement | null;
    handleClose: () => void;
}

const Menu: React.FC<IProps> = ({anchorEl, handleClose}) => {

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
                    <Typography fontWeight={'bold'} fontSize={'x-large'}>Thông báo</Typography>
                    <IconButton>
                        <MoreHorizIcon/>
                    </IconButton>
                </Box>
            </Paper>
        </>,
        anchorEl);
}

export default Menu;