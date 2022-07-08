import React, {useCallback, useEffect, useMemo, useState} from 'react';
import {Avatar, ButtonBase, ListItem, ListItemIcon, ListItemText, Typography} from "@mui/material";
import {Link} from "react-router-dom";
import {IUserFull} from "../../../app/models/User";
import styled from "@emotion/styled";
import {useAppSelector} from "../../../app/hook";
import {IAcceptFriend, IFriendFull} from "../../../app/models/Friend";
import {FRIEND_STATUS} from "../../../constants";
import {useAcceptFriendMutation} from "../../../app/services/UserService";

interface IProps {
    userTarget: IUserFull
}

const SearchItem: React.FC<IProps> = ({userTarget}) => {
    const {friends, friendRequest, requestHasSend} = useAppSelector(state => state.friendSlice);
    const [friendStatus, setFriendStatus] = useState<string>("");
    const [acceptFriendApi] = useAcceptFriendMutation();

    useEffect(() => {
        if (friends) {
            const friend = friends.find((item: IFriendFull) => item.friend.id === userTarget.id);
            if (friend) {
                setFriendStatus(FRIEND_STATUS.ACCEPTED);
            }
        }

        if (friendRequest) {
            const friend = friendRequest.find((item: IUserFull) => item.id === userTarget.id);
            if (friend) {
                setFriendStatus(FRIEND_STATUS.PENDING);
            }
        }

        if (requestHasSend) {
            const friend = requestHasSend.find((item: IUserFull) => item.id === userTarget.id);
            if (friend) {
                setFriendStatus(FRIEND_STATUS.REQUESTS);
            }
        }

    }, [friends, userTarget, friendRequest, requestHasSend]);

    const handleAcceptFriend = useCallback(() => {
        const request: IAcceptFriend = {
            status: FRIEND_STATUS.ACCEPTED,
            emailTarget: userTarget.email
        }
        acceptFriendApi(request).then((response: any) => {
            if (response.data.status === 200) {
                setFriendStatus(FRIEND_STATUS.ACCEPTED);
            }
        })

    }, [userTarget, acceptFriendApi])

    const renderButton = useMemo(() => {
        let result = null;
        switch (friendStatus) {
            case FRIEND_STATUS.ACCEPTED:
                result = (
                    <ButtonActionStyled>
                        Bạn bè
                    </ButtonActionStyled>
                );
                break;
            case FRIEND_STATUS.PENDING:
                result = (
                    <ButtonActionStyled onClick={handleAcceptFriend}>
                        Chấp nhận kết bạn
                    </ButtonActionStyled>
                );
                break;
            case FRIEND_STATUS.REQUESTS:
                result = (
                    <ButtonActionStyled>
                        Đã gửi lời mời kết bạn
                    </ButtonActionStyled>
                );
                break;
            default:
                result = (
                    <ButtonActionStyled>
                        Thêm bạn bè
                    </ButtonActionStyled>
                );
                break;
        }
        return result;
    }, [friendStatus, handleAcceptFriend])

    return <>
        <ListItem
            secondaryAction={renderButton}
        >
            <ListItemIcon>
                <Avatar src={userTarget.userInfo.avatar || ""}/>
            </ListItemIcon>
            <ListItemText
                primary={
                    <Link to={`/profile/${userTarget.userInfo.slug}-${userTarget.id}`}
                          className={`text-decoration-none`}>
                        <Typography fontWeight={`bold`} sx={{color: "#333"}}>
                            {`${userTarget.userInfo.firstName} ${userTarget.userInfo.lastName}`}
                        </Typography>
                    </Link>
                }
            />
        </ListItem>
    </>
}

const ButtonActionStyled = styled(ButtonBase)`
  border-radius: 6px;
  padding: 10px 15px;
  background-color: #dbe7f2;
  font-size: 14px;
  font-weight: bold;
  color: #1877F2;
`


export default SearchItem;