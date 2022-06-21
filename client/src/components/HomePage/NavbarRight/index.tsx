import React, {useMemo} from 'react';
import NavList from "./NavList";
import styles from './styles.module.scss'
import {Box, Typography} from "@mui/material";
import {LIST_FRIEND} from "../../../constants";
import NavItemButton from "../NavItemButton";
import AvatarOnline from "../../Avatar/AvatarOnline";
import NavItemLink from "../NavItemLink";
import CakeIcon from '@mui/icons-material/Cake';
import AddCircleIcon from '@mui/icons-material/AddCircle';
interface IProps {

}

const NavbarRight: React.FC<IProps> = () => {

    const renderList = useMemo(() => {
        if (LIST_FRIEND.length !== 0) {
            return LIST_FRIEND.map((item: any, index: number) => {
                return <NavItemButton key={index} title={item.title} Icon={<AvatarOnline
                    src={item.src} online={true}/>}/>
            })
        }
        return null;
    }, [])


    return <>
        <Box className={styles.root}>
            <NavList subheader={
                <Box>
                    <Typography fontSize={'medium'} fontWeight={'bold'}>Sinh nhật</Typography>
                </Box>
            }>
                <NavItemLink title={'Hôm nay là sinh nhật của Anh Kiệt'} Icon={<CakeIcon sx={{width: '40px', height: '40px'}}/>}
                             to={'/profile/anh-kiet'}/>
            </NavList>

            <NavList
                subheader={
                    <Box>
                        <Typography fontSize={'medium'} fontWeight={'bold'}>Người liên hệ</Typography>
                    </Box>
                }
            >
                {renderList}
            </NavList>

            <NavList subheader={
                <Box>
                    <Typography fontSize={'medium'} fontWeight={'bold'}>Cuộc trò chuyện nhóm</Typography>
                </Box>
            }>
                <NavItemButton title={'Tạo nhóm mới'} Icon={<AddCircleIcon sx={{width: '35px', height: '35px'}}/>}/>
            </NavList>

        </Box>
    </>
}
export default NavbarRight;