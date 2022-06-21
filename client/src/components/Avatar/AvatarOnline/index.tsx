import React from 'react';
import {Avatar, Box} from "@mui/material";
import styles from './styles.module.scss'

interface IProps {
    src: string;
    online?: boolean;
}

const AvatarOnline: React.FC<IProps> = ({src, online}) => {
    return <>
        <Box sx={{position: 'relative', minWidth: '40px', height: '40px'}}>
            <Avatar src={src} sx={{width: '100%', height: '100%'}}/>
            {online && <span className={styles.onl}></span>}
        </Box>
    </>
}

export default AvatarOnline;