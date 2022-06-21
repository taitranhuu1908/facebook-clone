import React, {useMemo} from 'react';
import styles from './header.module.scss';
import {Box, InputBase} from "@mui/material";
import InputSearch from "./InputSearch";
import ButtonCircle from "../../Button/Circle";
import NavigateItem from "./NavigateItem";
import {NAVIGATE_LIST} from "../../../constants";
import {useLocation} from 'react-router-dom';
import AvatarCircle from "../../Avatar/AvatarCircle";
import Menu from "./Menu";
import MenuItemWithAvatar from "./MenuItemWithAvatar";
import styled from "@emotion/styled";
import MenuChatItem from "./MenuChatItem";

interface IProps {
}

const Header: React.FC<IProps> = () => {
    const {pathname} = useLocation();
    const [anchorEl, setAnchorEl] = React.useState<{
        notify: null | HTMLElement;
        messenger: null | HTMLElement;
    }>({
        notify: null,
        messenger: null
    });

    const renderNavigate = useMemo(() => {
        return NAVIGATE_LIST.map((item, index) => {
            const {Icon} = item;
            return <NavigateItem title={item.title} key={index} to={item.to} active={pathname === item.to}>
                <Icon active={pathname === item.to}/>
            </NavigateItem>
        })
    }, [pathname]);

    const openMenu = (event: React.MouseEvent<HTMLButtonElement, MouseEvent>, title: any) => {
        switch (title) {
            case 'notify':
                setAnchorEl(({notify}) => {
                    return {
                        messenger: null,
                        notify: notify ? null : event.currentTarget,
                    }
                });
                break;
            case 'messenger':
                setAnchorEl(({messenger}) => {
                    return {
                        messenger: messenger ? null : event.currentTarget,
                        notify: null,
                    }
                })
                break;
            default:
                break;
        }

    }

    const handleClose = () => {
        setAnchorEl({
            messenger: null,
            notify: null
        })
    }


    return <Box className={styles.root}>
        <Box className={styles.headerRight}>
            <Box className={styles.logo}>
                <img src="/images/logo.svg" alt=""/>
            </Box>
            <Box>
                <InputSearch/>
            </Box>
        </Box>
        <Box className={styles.headerMid}>
            {renderNavigate}
        </Box>
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
                <InputSearchMessenger placeholder={'Tìm kiếm trên Messenger'} />
                <MenuChatItem src={''} title={'Hữu Tài'} to={'/'} description={'\'𝐋𝐨𝐚 𝐦𝐚́𝐲 𝐭𝐢́𝐧𝐡 𝐒𝐩𝐞𝐚𝐤𝐞𝐫 𝐄-𝟏𝟎𝟏𝟒 được thiết kế đẹp mắt, sang trọng.\\n\' +\n' +
                    '                                        \'Thích hợp để bạn sử dụng trong không gian phòng nhỏ và ấm áp\\n\' +\n' +
                    '                                        \'Sản phẩm bảo hành 06 Tháng\\n\' +\n' +
                    '                                        \'⏰ Bảo hành 06 tháng'}/>
            </Menu>
            <AvatarCircle
                src={'https://scontent.fsgn2-2.fna.fbcdn.net/v/t1.18169-9/18556006_104946380091976_9183765241575257849_n.jpg?_nc_cat=103&ccb=1-7&_nc_sid=09cbfe&_nc_ohc=ABFvsFoX_lwAX-zdp_y&_nc_ht=scontent.fsgn2-2.fna&oh=00_AT9uahBdcXjjXX6nSy_4PRWkuRdvpm94vMcBuTqh_9lz4g&oe=62D468C7'}
                title={'Trang cá nhân của bạn'}/>
        </Box>

    </Box>
}

const InputSearchMessenger = styled(InputBase)`
  width: 100%;
  border-radius: 30px;
  background-color: #f5f5f5;
  padding: 5px 15px;
  font-size: 16px;
  margin-bottom: 10px;
`

export default Header;