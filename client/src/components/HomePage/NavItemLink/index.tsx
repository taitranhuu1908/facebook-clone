import React from 'react';
import {ListItem, ListItemButton, ListItemIcon, ListItemText, Typography} from "@mui/material";
import {useNavigate} from "react-router-dom";

interface IProps {
    Icon: React.ReactNode;
    title: string;
    to: string;
}

const NavItem: React.FC<IProps> = ({Icon, title, to}) => {
    const navigate = useNavigate();

    const handleRedirect = async () => {
        await navigate(to)
    }

    return <>
        <ListItem disablePadding>
            <ListItemButton sx={{borderRadius: '6px'}} onClick={handleRedirect}>
                <ListItemIcon>
                    {Icon}
                </ListItemIcon>
                <ListItemText primary={
                    <Typography>{title}</Typography>
                }/>
            </ListItemButton>
        </ListItem>
    </>
}
export default NavItem;