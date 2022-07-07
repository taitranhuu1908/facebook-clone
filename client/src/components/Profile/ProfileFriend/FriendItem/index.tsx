import React from 'react';
import {ButtonBase, Typography, Grid} from "@mui/material";
import {IUserFull} from "../../../../app/models/User";
import {Link} from 'react-router-dom'

interface Props {
    friend: IUserFull;
}

const FriendItem: React.FC<Props> = ({friend}) => {
    return (
        <Grid item xs={4}>
            <ButtonBase>
                <img style={{borderRadius: '5px'}}
                     width="145px"
                     height="145px"
                     src={friend.userInfo.avatar || ""}
                     alt=""/>

            </ButtonBase>
            <Link to={`/profile/${friend.userInfo.slug}-${friend.id}`} style={{textDecoration: 'none'}}>
                <Typography
                    sx={{fontSize: '.75rem', fontWeight: '600', color: '#050505', whiteSpace: 'nowrap', overflow: 'hidden', marginTop: '5px'}}>
                    {`${friend.userInfo.firstName} ${friend.userInfo.lastName}`}
                </Typography>
            </Link>
        </Grid>
    )
}

export default FriendItem;