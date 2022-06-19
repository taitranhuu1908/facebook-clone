import React from 'react';
import {ListItem, ListItemButton, ListItemIcon, ListItemText, Typography} from "@mui/material";

interface IProps {
    Icon: React.ReactNode
    title: string;
    onClick?: () => void;
}

const NavItemButton: React.FC<IProps> = ({Icon, onClick, title}) => {
    return <>
        <ListItem disablePadding>
            <ListItemButton onClick={onClick} sx={{borderRadius: '6px'}}>
                <ListItemIcon>
                    {Icon}
                </ListItemIcon>
                <ListItemText primary={
                    <Typography fontWeight={'bold'} fontSize={'medium'}>{title}</Typography>
                }/>
            </ListItemButton>
        </ListItem>
    </>
}
export default NavItemButton;