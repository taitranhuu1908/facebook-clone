import styled from '@emotion/styled';
import { Avatar, Box, ListItem, ListItemButton, ListItemIcon, ListItemText, Typography } from "@mui/material";
import React from 'react';
import { IStoryFull } from '../../../app/models/Story';

interface IProps {
    story: IStoryFull
}

const StoryItem: React.FC<IProps> = ({ story }) => {

    return <>
        <ListItem>
            <ListItemButton onClick={() => {
                console.log(story.slug)
            }} sx={{ display: "flex", gap: "10px", borderRadius: '8px' }}>
                <ListItemIcon>
                    <WrapperAvatar>
                        <Avatar src={story.user.userInfo.avatar || ""} sx={{ width: "50px", height: "50px" }} />
                    </WrapperAvatar>
                </ListItemIcon>
                <ListItemText primary={
                    <Typography fontWeight={`bold`}>{`${story.user.userInfo.firstName} ${story.user.userInfo.lastName}`}</Typography>
                }
                    secondary={
                        <Typography>10 giờ trước</Typography>
                    }
                />
            </ListItemButton>
        </ListItem>
    </>
}



const WrapperAvatar = styled(Box)`
    border: 3px solid #ced0d4;
    border-radius: 50%;
`


export default StoryItem;