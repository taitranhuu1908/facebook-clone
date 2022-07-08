import React from 'react';
import {Box, Button, ButtonBase, Container, Grid, IconButton, Typography} from "@mui/material";
import styles from './friend-list.module.scss';
import MoreHorizIcon from '@mui/icons-material/MoreHoriz';
import {useAppSelector} from "../../../../app/hook";
import {IUserFull} from "../../../../app/models/User";

interface IProps {
    friend: IUserFull
}

const AboutFriendList = () => {
    const {friends} = useAppSelector(state => state.friendSlice);

    return (
        <Box className={styles.friendList}>
            <Box sx={{display: 'flex', justify: 'space-between', width: '100%', marginBottom: '10px'}}>
                <Typography sx={{fontSize: '1.25rem', fontWeight: 'bold', padding: '0px 0px 10px 10px'}}>
                    Bạn bè
                </Typography>
                <Box sx={{marginLeft: 'auto'}}>
                    <Button sx={{textTransform: 'none'}}>
                        <Typography sx={{color: '#1877F2', fontSize: '.875rem', fontWeight: '600'}}>Lời mời kết bạn</Typography>
                    </Button>
                    <Button sx={{textTransform: 'none'}}>
                        <Typography sx={{color: '#1877F2', fontSize: '.875rem', fontWeight: '600'}}>Tìm bạn bè</Typography>
                    </Button>
                    <ButtonBase className={styles.moreButton}>
                        <MoreHorizIcon/>
                    </ButtonBase>
                </Box>
            </Box>
            <Container sx={{padding: '0', flexGrow: 1}}>
                <Grid container sx={{height: `100%`}}>
                    {friends.length > 0 ? friends.map((item, index) => {
                        return (
                            <FriendItem key={index} friend={item.friend}/>
                        )
                    }) : (
                        <Box sx={{display: `flex`, alignItems: `center`, justifyContent: `center`, width: `100%`, height: `100%`}}>
                            <Typography className={`text-color-gray`} fontWeight={`bold`} fontSize={`large`}>Chưa có bạn bè nào</Typography>
                        </Box>
                    )}
                </Grid>
            </Container>
            <Button className={styles.editButton}>
                <Typography sx={{
                    color: '#050505',
                    fontSize: '.875rem',
                    fontWeight: '600'
                }}>Xem tất cả</Typography>
            </Button>
        </Box>
    )
}

const FriendItem: React.FC<IProps> = ({friend}) => {
    return (
        <Grid item xs={5.85} className={styles.friendItem}>
            <img src={friend.userInfo.avatar || ""} alt="" className={styles.image}/>
            <Box className={styles.friendInfo}>
                <Box>
                    <Typography className={styles.name}>{`${friend.userInfo.firstName} ${friend.userInfo.lastName}`}</Typography>
                    <Typography className={styles.mutualFriend}>51 bạn chung</Typography>
                </Box>
                <IconButton className={styles.button}>
                    <MoreHorizIcon/>
                </IconButton>
            </Box>
        </Grid>
    )
}

export default AboutFriendList;