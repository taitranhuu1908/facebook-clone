import React from 'react';
import {Avatar, Button, Grid, Box} from "@mui/material";
import styles from "../StoryItem/story-item.module.scss";

interface Props {
    user: {
        name: string;
        avatar: string;
    },
    story: {
        image: string;
    }
}

const StoryItem: React.FC<Props> = (props) => {
    return (
        <Grid item xs={2.25} className={styles.storyListItem}>
            <Button className={styles.item}>
                <Box className={styles.avatarBox}>
                    <Avatar className={styles.avatar}>
                        <img src={props.user.avatar} alt={props.user.name}/>
                    </Avatar>
                </Box>
                <img className={styles.imgStory} src={props.story.image} alt=""/>
                <span className={styles.name}>{props.user.name}</span>
            </Button>
        </Grid>
    );
}

export default StoryItem;