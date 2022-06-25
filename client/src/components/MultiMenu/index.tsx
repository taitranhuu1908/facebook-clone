import React, {useCallback, useEffect} from 'react';
import {createPortal} from "react-dom";
import {Paper} from "@mui/material";
import styles from './styles.module.scss'

interface IProps {
    anchorEl: null | HTMLElement;
    handleClose: () => void;
    children: React.ReactNode;
}

const MultiMenu: React.FC<IProps> = (props) => {
    const {anchorEl, handleClose, children} = props;

    const handleCloseEl = useCallback((e: any) => {
        if (anchorEl && !anchorEl.contains(e.target as Node)) {
            handleClose();
        }
    }, [anchorEl, handleClose]);


    useEffect(() => {

        document.addEventListener('click', handleCloseEl);

        return () => {
            document.removeEventListener('click', handleCloseEl);
        }

    }, [handleCloseEl])


    return anchorEl && (
        createPortal(<>
            <Paper className={styles.root}>
                {children}
            </Paper>
        </>, anchorEl)
    )
}
export default MultiMenu;