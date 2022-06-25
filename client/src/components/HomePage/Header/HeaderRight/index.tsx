import React, {useMemo} from 'react';
import {Avatar, Box, Divider, IconButton, InputBase, List, Typography} from "@mui/material";
import styles from "../header.module.scss";
import ButtonCircle from "../../../Button/Circle";
import Menu from "../Menu";
import MenuItemWithAvatar from "../MenuItemWithAvatar";
import MenuChatItem from "../MenuChatItem";
import AvatarCircle from "../../../Avatar/AvatarCircle";
import styled from "@emotion/styled";
import {useAppDispatch, useAppSelector} from "../../../../app/hook";
import {IUser} from "../../../../app/models/User";
import {createChatBox} from "../../../../app/features/ChatBoxSlice";
import MultiMenu from "../../../MultiMenu";
import {Link} from "react-router-dom";
import MultiMenuItem from "../../../MultiMenu/MultiMenuItem";
import SettingsIcon from '@mui/icons-material/Settings';

const PROFILE_LINK = '/profile';

interface IProps {

}

const HeaderRight: React.FC<IProps> = () => {
    const {user, friends} = useAppSelector(state => state.userSlice)
    const dispatch = useAppDispatch();
    const [anchorEl, setAnchorEl] = React.useState<{
        notify: null | HTMLElement;
        messenger: null | HTMLElement;
        settings: null | HTMLElement;
    }>({
        notify: null,
        messenger: null,
        settings: null,
    });
    const openMenu = (event: React.MouseEvent<HTMLButtonElement, MouseEvent>, title: any) => {
        switch (title) {
            case 'notify':
                setAnchorEl(({notify}) => {
                    return {
                        messenger: null,
                        settings: null,
                        notify: notify ? null : event.currentTarget,
                    }
                });
                break;
            case 'messenger':
                setAnchorEl(({messenger}) => {
                    return {
                        messenger: messenger ? null : event.currentTarget,
                        settings: null,
                        notify: null,
                    }
                })
                break;
            case 'settings':
                setAnchorEl(({settings}) => {
                    return {
                        messenger: null,
                        notify: null,
                        settings: settings ? null : event.currentTarget
                    }
                })
                break;
            default:
                break;
        }
    }

    const renderMenuChat = useMemo(() => {
        return friends.map((item: IUser, index) => {
            return <MenuChatItem key={index}
                                 onClick={() => {
                                     dispatch(createChatBox(item))
                                 }}
                                 user={item} src={item.picture} title={`${item.firstName} ${item.lastName}`}
                                 description={'Xin chào mọi người'}/>
        })
    }, [friends, dispatch])

    const handleClose = () => {
        setAnchorEl({
            messenger: null,
            notify: null,
            settings: null
        })
    }

    return <>
        <Box className={styles.headerRight}>
            <ButtonCircle title={'Menu'}>
                <img src="/images/button/icon-button-bar.svg" alt=""/>
            </ButtonCircle>
            <ButtonCircle title={'Messenger'}
                          onClick={(event) => openMenu(event, 'messenger')}>
                <img src="/images/button/icon-button-message.svg" alt=""/>
            </ButtonCircle>
            <ButtonCircle color={'error'} number={4} title={'Thông báo'}
                          onClick={(event) => openMenu(event, 'notify')}>
                <img src="/images/button/icon-button-notify.svg" alt=""/>
            </ButtonCircle>
            <Menu title={'Thông  báo'} handleClose={handleClose}
                  anchorEl={anchorEl['notify']}>
                <MenuItemWithAvatar time={'Khoảng 1 tháng trước'} src={''} to={'/'}
                                    title={'𝐋𝐨𝐚 𝐦𝐚́𝐲 𝐭𝐢́𝐧𝐡 𝐒𝐩𝐞𝐚𝐤𝐞𝐫 𝐄-𝟏𝟎𝟏𝟒 được thiết kế đẹp mắt, sang trọng.\n' +
                                        'Thích hợp để bạn sử dụng trong không gian phòng nhỏ và ấm áp\n' +
                                        'Sản phẩm bảo hành 06 Tháng\n' +
                                        '⏰ Bảo hành 06 tháng'}/>
            </Menu>
            <Menu title={'Chat'} anchorEl={anchorEl['messenger']}
                  handleClose={handleClose}
            >
                <InputSearchMessenger placeholder={'Tìm kiếm trên Messenger'}/>
                {renderMenuChat}
            </Menu>
            <IconButton onClick={(event) => openMenu(event, 'settings')}>
                <AvatarCircle
                    src={user.picture}
                    title={'Trang cá nhân của bạn'}/>
            </IconButton>
            <MultiMenu anchorEl={anchorEl['settings']} handleClose={handleClose}>
                <MultiMenuHeader>
                    <Box sx={{display: 'flex', alignItems: 'center', gap: '15px', width: '100%'}}>
                        <Avatar src={user.picture} sx={{width: '50px', height: '50px'}}/>
                        <Typography fontWeight={'bold'}>{`${user.firstName} ${user.lastName}`}</Typography>
                    </Box>
                    <Divider sx={{width: '90%', backgroundColor: "#e4e6eb", margin: '0 auto'}}/>
                    <Link to={PROFILE_LINK} className={'text-decoration-none'}>
                        <Typography fontWeight={'bold'} className={'text-color-link'}>Xem tất cả trang cá
                            nhân</Typography>
                    </Link>
                </MultiMenuHeader>

                <List>
                    <MultiMenuItem arrowIcon={true} icon={<SettingsIcon/>} text={'Cài đặt'}/>
                </List>
            </MultiMenu>
        </Box>
    </>
}

const InputSearchMessenger = styled(InputBase)`
  width: 100%;
  border-radius: 30px;
  background-color: #f5f5f5;
  padding: 5px 15px;
  font-size: 16px;
  margin-bottom: 10px;
`

const MultiMenuHeader = styled(Box)`
  box-shadow: 0 2px 12px rgba(0, 0, 0, 0.2);
  padding: 10px 20px;
  border-radius: 8px;
  display: flex;
  flex-direction: column;
  gap: 15px;
  align-items: flex-start;
`


export default HeaderRight;