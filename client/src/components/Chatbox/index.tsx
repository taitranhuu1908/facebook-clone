import React, {useCallback, useEffect, useRef, useState} from 'react';
import styles from './styles.module.scss'
import {
    Avatar,
    Box,
    ButtonBase,
    Divider,
    IconButton,
    InputBase,
    ListItemIcon,
    Menu,
    MenuItem,
    Tooltip,
    Typography
} from "@mui/material";
import RemoveIcon from '@mui/icons-material/Remove';
import CloseIcon from '@mui/icons-material/Close';
import ImageIcon from '@mui/icons-material/Image';
import styled from "@emotion/styled";
import {LikeIcon, SmileIcon} from "../Icons";
import MessageItem from "./MessageItem";
import {Logout} from "@mui/icons-material";
import ModeEditOutlinedIcon from '@mui/icons-material/ModeEditOutlined';
import ImageOutlinedIcon from '@mui/icons-material/ImageOutlined';
import GroupAddOutlinedIcon from '@mui/icons-material/GroupAddOutlined';
import GroupsOutlinedIcon from '@mui/icons-material/GroupsOutlined';
import {IUser} from "../../app/models/User";
import {useAppDispatch} from "../../app/hook";
import {closeChatBox} from "../../app/features/ChatBoxSlice";

interface IProps {
    chatbox: IUser;
    position: 'chatbox-one' | 'chatbox-two' | 'chatbox-three';
}

const Chatbox: React.FC<IProps> = ({chatbox, position}) => {
    const elementRef = useRef<HTMLElement>(null);
    const [elementActive, setElementActive] = useState(false)
    const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
    const open = Boolean(anchorEl);
    const [information, setInformation] = useState({
        name: '',
        avatar: ''
    })
    const dispatch = useAppDispatch();

    useEffect(() => {
        setInformation((information) => {
            return {
                ...information,
                name: `${chatbox.firstName} ${chatbox.lastName}`,
                avatar: chatbox.picture
            }
        })
    }, [chatbox]);


    const handleClick = (event: React.MouseEvent<HTMLElement>) => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };

    const checkActive = useCallback((e: any) => {
        if (elementRef.current && !elementRef.current.contains(e.target as Node)) {
            setElementActive(false);
        }
    }, []);

    useEffect(() => {
        document.addEventListener('mousedown', checkActive);

        return () => {
            document.removeEventListener('mousedown', checkActive);
        }
    }, [checkActive])


    const handleFocus = () => {
        setElementActive(true);
    }

    return (
        <Box className={`${styles.root} ${position}`} ref={elementRef} onClick={handleFocus}>
            <Box className={styles.header}>
                <ButtonBase className={styles.headerTitle} onClick={handleClick}>
                    <Avatar src={information.avatar} sx={{width: '35px', height: '35px'}}/>
                    <Typography sx={{fontSize: '14px'}} fontWeight={'bold'}>{information.name}</Typography>
                </ButtonBase>

                <Menu
                    anchorEl={anchorEl}
                    id="account-menu"
                    open={open}
                    onClose={handleClose}
                    onClick={handleClose}
                    PaperProps={paperProps}
                    transformOrigin={{horizontal: 'right', vertical: 'top'}}
                    anchorOrigin={{horizontal: 'right', vertical: 'bottom'}}
                >
                    <MenuItem>
                        <Avatar src={information.avatar}/> Xem trang cá nhân
                    </MenuItem>
                    <Divider/>
                    <MenuItem>
                        <ListItemIcon>
                            <ImageOutlinedIcon fontSize={'small'}/>
                        </ListItemIcon>
                        Thay đổi ảnh
                    </MenuItem>
                    <MenuItem>
                        <ListItemIcon>
                            <ModeEditOutlinedIcon fontSize={'small'}/>
                        </ListItemIcon>
                        Đổi tên cuộc trò chuyện
                    </MenuItem>
                    <MenuItem>
                        <ListItemIcon>
                            <GroupsOutlinedIcon fontSize={'small'}/>
                        </ListItemIcon>
                        Thành viên
                    </MenuItem>
                    <MenuItem>
                        <ListItemIcon>
                            <GroupAddOutlinedIcon fontSize={'small'}/>
                        </ListItemIcon>
                        Thêm người
                    </MenuItem>
                    <MenuItem>
                        <ListItemIcon>
                            <Logout fontSize="small"/>
                        </ListItemIcon>
                        Rời khỏi cuộc trò chuyện
                    </MenuItem>
                </Menu>

                <Box className={styles.headerActions}>
                    <Tooltip placement={'top'} title={'Thu nhỏ đoạn chat'}>
                        <IconButton><RemoveIcon className={elementActive ? 'color-active' : ''}/></IconButton>
                    </Tooltip>
                    <Tooltip placement={'top'} title={'Đóng đoạn chat'}>
                        <IconButton onClick={() => {
                            dispatch(closeChatBox(chatbox))
                        }}><CloseIcon className={elementActive ? 'color-active' : ''}/></IconButton>
                    </Tooltip>
                </Box>
            </Box>

            <Box className={styles.body}>
                <Box className={styles.bodyMessages}>
                    <MessageItem owner={true} text={'Xin chào mọi người'}/>
                    <MessageItem owner={false} text={'Xin chào mọi người'}/>
                </Box>
            </Box>
            <Box className={styles.footer}>
                <Tooltip title={'Đính kèm file'}>
                    <IconButton>
                        <ImageIcon className={elementActive ? 'color-active' : ''}/>
                        <label htmlFor="file" className='wrapper-ab'></label>
                    </IconButton>
                </Tooltip>
                <input type="file" hidden id="file"/>
                <InputStyled endAdornment={<IconButton><SmileIcon active={elementActive}/></IconButton>}
                             placeholder={'Aa'}/>
                <IconButton>
                    <LikeIcon active={elementActive}/>
                </IconButton>
            </Box>
        </Box>
    )
}

const InputStyled = styled(InputBase)`
  width: 100%;
  background: var(--background-gray);
  border-radius: 32px;
  padding-left: 10px;
`

const paperProps = {
    elevation: 0,
    sx: {
        overflow: 'visible',
        filter: 'drop-shadow(0px 2px 8px rgba(0,0,0,0.32))',
        mt: 1.5,
        '& .MuiAvatar-root': {
            width: 32,
            height: 32,
            ml: -0.5,
            mr: 1,
        },
        '&:before': {
            content: '""',
            display: 'block',
            position: 'absolute',
            top: 0,
            right: 14,
            width: 10,
            height: 10,
            bgcolor: 'background.paper',
            transform: 'translateY(-50%) rotate(45deg)',
            zIndex: 0,
        },
    },
}

export default Chatbox;