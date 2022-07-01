import React from 'react';
import {Avatar, ListItem, ListItemButton, ListItemIcon, ListItemText} from "@mui/material";
import {IUserFull} from "../../../app/models/User";

interface IProps {
    user: IUserFull
}

const StoryItem: React.FC<IProps> = ({user}) => {

    return <>
        <ListItem>
            <ListItemButton>
                <ListItemIcon>
                    <Avatar src={user.userInfo.avatar || ""}/>
                </ListItemIcon>
                <ListItemText primary={`${user.userInfo.firstName} ${user.userInfo.lastName}`}/>
            </ListItemButton>
        </ListItem>
    </>
}


export default StoryItem;