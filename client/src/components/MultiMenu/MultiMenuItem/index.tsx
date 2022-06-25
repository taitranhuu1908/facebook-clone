import React from 'react';
import {IconButton, ListItem, ListItemButton, ListItemIcon, ListItemText, Typography} from "@mui/material";
import ChevronRightIcon from '@mui/icons-material/ChevronRight';

interface IProps {
    icon: React.ReactNode;
    text: string;
    arrowIcon?: boolean;
}

const MultiMenuItem: React.FC<IProps> = ({icon, arrowIcon = false, text}) => {
    return <>
        <ListItem disablePadding secondaryAction={
            arrowIcon && (
                <IconButton>
                    <ChevronRightIcon/>
                </IconButton>
            )
        }>
            <ListItemButton sx={{borderRadius: '6px'}}>
                <ListItemIcon>
                    {icon}
                </ListItemIcon>
                <ListItemText
                    primary={<Typography fontWeight={'bold'}>
                        {text}
                    </Typography>}
                />
            </ListItemButton>
        </ListItem>
    </>
}
export default MultiMenuItem;