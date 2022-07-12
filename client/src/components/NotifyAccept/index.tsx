import React, {useState} from 'react';
import {Avatar, Box, ButtonBase, ListItem, ListItemIcon, ListItemText, Typography} from "@mui/material";
import styled from "@emotion/styled";
import {Link} from "react-router-dom";
import {IUserFull} from "../../app/models/User";
import {useAcceptFriendMutation} from "../../app/services/UserService";
import {IAcceptFriend} from "../../app/models/Friend";
import {FRIEND_STATUS} from "../../constants";

interface IProps {
    userTarget: IUserFull
}

const NotifyAccept: React.FC<IProps> = ({userTarget}) => {
    const [acceptFriendApi] = useAcceptFriendMutation();
    const [friendStatus, setFriendStatus] = useState("");

    const handleAccept = () => {
        const request: IAcceptFriend = {
            status: FRIEND_STATUS.ACCEPTED,
            emailTarget: userTarget.email
        }
        acceptFriendApi(request).then((response: any) => {
            if (response.data.status === 200) {
                setFriendStatus(`Đã chấp nhận lời mời kết bạn`)
            }
        })
    }

    return <>
        <Item>
            <Link to={`/profile/${userTarget.userInfo.slug}-${userTarget.id}`} className={`text-decoration-none`}
                  style={{color: `#333`}}>
                <Box sx={{display: `flex`, alignItems: `center`, gap: '10px'}}>
                    <ListItemIcon>
                        <Avatar sx={{height: `50px`, width: `50px`}} src={userTarget.userInfo.avatar || ""}/>
                    </ListItemIcon>
                    <Box>
                        <ListItemText primary={<Typography>
                            <Typography component={`span`}
                                        fontWeight={`bold`}>{`${userTarget.userInfo.firstName} ${userTarget.userInfo.lastName} `}</Typography>
                            đã gửi lời mời kết bạn</Typography>}
                                      secondary={<Typography variant={`caption`}>vài giây trước</Typography>}
                        />
                    </Box>
                </Box>
            </Link>
            {friendStatus ? <Typography fontSize={`small`} sx={{color: `#606770`}}>{friendStatus}</Typography> : (
                <Box sx={{display: `flex`, gap: 2, zIndex: 100}}>
                    <ButtonStyled onClick={handleAccept}
                                  sx={{backgroundColor: `#216fdb`, color: `white`}}>Xác nhận</ButtonStyled>
                    <ButtonStyled onClick={() => setFriendStatus(`Đã xoá lời mời kết bạn`)}
                                  sx={{backgroundColor: `rgba(0, 0, 0, 0.05)`}}>Xoá</ButtonStyled>
                </Box>
            )}
        </Item>
    </>
}

const Item = styled(ListItem)`
  flex-direction: column;
  border-radius: 6px;
  transition: background-color 0.1s linear;
  padding: 5px 10px;

  &:hover {
    background-color: rgba(0, 0, 0, 0.1);
    transition: background-color 0.1s linear;
  }
`

const ButtonStyled = styled(ButtonBase)`
  padding: 10px 15px;
  border-radius: 4px;
  font-weight: bold;
`


export default NotifyAccept;