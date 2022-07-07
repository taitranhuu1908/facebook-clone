import React from 'react';
import {Box, Button, Grid, Typography} from "@mui/material";
import styles from './profile-friend.module.scss';
import FriendItem from "./FriendItem";
import {useAppSelector} from "../../../app/hook";
import {Link} from 'react-router-dom'

const ProfileFriend = () => {
    const {friends} = useAppSelector(state => state.friendSlice);

    return (
        <Box className={styles.profileFriend}>
            <Box sx={{display: 'flex', justifyContent: 'space-between'}}>
                <Typography sx={{
                    fontSize: '1.25rem',
                    fontWeight: '700',
                    color: '#050505',
                    padding: '10px 0px 4px 10px'
                }}>Bạn bè</Typography>
                <Button sx={{textTransform: 'none'}}>
                    <Link to='/friend'
                          className={`text-color-link`}
                          style={{textDecoration: 'none', alignSelf: 'center', fontSize: '1rem', fontWeight: '400'}}>Xem tất cả bạn bè</Link>
                </Button>
            </Box>
            <Typography sx={{
                fontSize: '1rem',
                fontWeight: '400',
                color: '#65676B',
                padding: '0px 0px 4px 10px'
            }}>
                2.506 người bạn
            </Typography>
            <Box className={styles.listFriend}>
                <Grid container spacing={1}>
                    {friends.map((item, index) => {
                        const {friend} = item;
                        return <FriendItem friend={friend} key={index}/>
                    })}
                </Grid>
            </Box>
        </Box>
    )
}

export default ProfileFriend;