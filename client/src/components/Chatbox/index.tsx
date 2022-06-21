import React, {useCallback, useEffect, useRef, useState} from 'react';
import styles from './styles.module.scss'
import {Avatar, Box, ButtonBase, IconButton, InputBase, Tooltip, Typography} from "@mui/material";
import RemoveIcon from '@mui/icons-material/Remove';
import CloseIcon from '@mui/icons-material/Close';
import ImageIcon from '@mui/icons-material/Image';
import styled from "@emotion/styled";
import {LikeIcon, SmileIcon} from "../Icons";
import MessageItem from "./MessageItem";

interface IProps {
    title: string;
}

const Chatbox: React.FC<IProps> = ({title}) => {
    const elementRef = useRef<HTMLElement>(null);
    const [elementActive, setElementActive] = useState(false)

    const checkActive = useCallback((e: any) => {
        if (elementRef.current && !elementRef.current.contains(e.target as Node)) {
            setElementActive(false);
        }
    }, []);


    useEffect(() => {
        document.addEventListener('mousedown', checkActive);

        return () => {
            document.removeEventListener('mousedown', checkActive);
        }
    }, [checkActive])


    const handleFocus = () => {
        setElementActive(true);
    }

    return (
        <Box className={styles.root} ref={elementRef} onClick={handleFocus}>
            <Box className={styles.header}>
                <ButtonBase className={styles.headerTitle}>
                    <Avatar sx={{width: '35px', height: '35px'}}/>
                    <Typography sx={{fontSize: '14px'}} fontWeight={'bold'}>{title}</Typography>
                </ButtonBase>
                <Box className={styles.headerActions}>
                    <Tooltip placement={'top'} title={'Thu nhỏ đoạn chat'}>
                        <IconButton><RemoveIcon className={elementActive ? 'color-active' : ''}/></IconButton>
                    </Tooltip>
                    <Tooltip placement={'top'} title={'Đóng đoạn chat'}>
                        <IconButton><CloseIcon className={elementActive ? 'color-active' : ''}/></IconButton>
                    </Tooltip>
                </Box>
            </Box>

            <Box className={styles.body}>
                <Box className={styles.bodyMessages}>
                   <MessageItem  owner={true} text={'Xin chào mọi người'}/>
                   <MessageItem  owner={false} text={'Xin chào mọi người'}/>
                </Box>
            </Box>
            <Box className={styles.footer}>
                <Tooltip title={'Đính kèm file'}>
                    <IconButton>
                        <ImageIcon className={elementActive ? 'color-active' : ''}/>
                    </IconButton>
                </Tooltip>
                <InputStyled endAdornment={<IconButton><SmileIcon active={elementActive}/></IconButton>}
                             placeholder={'Aa'}/>
                <IconButton>
                    <LikeIcon active={elementActive}/>
                </IconButton>
            </Box>
        </Box>
    )
}

const InputStyled = styled(InputBase)`
  width: 100%;
  background: var(--background-gray);
  border-radius: 32px;
  padding-left: 10px;
`

export default Chatbox;