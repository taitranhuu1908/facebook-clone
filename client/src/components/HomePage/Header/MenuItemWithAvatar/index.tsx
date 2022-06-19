import React from 'react';
import {Avatar, ListItemAvatar, ListItemButton, ListItemText, Typography} from "@mui/material";
import {useNavigate} from "react-router-dom";

interface IProps {
    src: string;
    title: string;
    time?: string;
    to: string;
}

const MenuItemWithAvatar: React.FC<IProps> = ({src, title, time, to}) => {
    const navigate = useNavigate();

    const handleClick = () => {
        navigate(to);
    }

    return <>
        <ListItemButton onClick={handleClick} sx={{gap: '10px', padding: '4px 8px', borderRadius: '6px'}}>
            <ListItemAvatar>
                <Avatar src={src} alt={title} sx={{width: '50px', height: '50px'}}/>
            </ListItemAvatar>
            <ListItemText
                primary={<Typography sx={{fontSize: '15px'}} className={'text-limit-line-3'}>{title}</Typography>}
                secondary={<Typography fontWeight={'bold'} sx={{color: '#1b74e4'}} fontSize={'small'}>{time}</Typography>}
            />
        </ListItemButton>
    </>
}

export default MenuItemWithAvatar;