import React from 'react';
import Header from "../../components/HomePage/Header";
import {
    Avatar,
    Box, ButtonBase,
    Divider,
    List,
    ListItem,
    ListItemButton,
    ListItemIcon,
    ListItemText,
    Paper,
    Typography
} from "@mui/material";
import styles from './styles.module.scss'
import CommentBankIcon from '@mui/icons-material/CommentBank';
import PeopleAltIcon from '@mui/icons-material/PeopleAlt';
import ImageIcon from '@mui/icons-material/Image';
import styled from "@emotion/styled";
import {Link} from "react-router-dom";

interface IProps {

}

const SearchPage: React.FC<IProps> = () => {

    return <>
        <Header/>
        <Box className={styles.navbar}>
            <Typography fontWeight={`bold`} fontSize={`x-large`}>Kết quả tìm kiếm</Typography>
            <Divider sx={{margin: "10px 0"}}/>
            <List
                subheader={<Typography variant="subtitle1" fontWeight={`bold`}>Bộ lọc</Typography>}
                disablePadding
            >
                <ListItem sx={{padding: 0}}>
                    <ListItemButton>
                        <ListItemIcon>
                            <CommentBankIcon/>
                        </ListItemIcon>
                        <ListItemText primary={<Typography fontWeight={`bold`}>Bài viết</Typography>}/>
                    </ListItemButton>
                </ListItem>
                <ListItem sx={{padding: 0}}>
                    <ListItemButton>
                        <ListItemIcon>
                            <PeopleAltIcon/>
                        </ListItemIcon>
                        <ListItemText primary={<Typography fontWeight={`bold`}>Mọi người</Typography>}/>
                    </ListItemButton>
                </ListItem>
                <ListItem sx={{padding: 0}}>
                    <ListItemButton>
                        <ListItemIcon>
                            <ImageIcon/>
                        </ListItemIcon>
                        <ListItemText primary={<Typography fontWeight={`bold`}>Ảnh</Typography>}/>
                    </ListItemButton>
                </ListItem>
            </List>
        </Box>
        <Wrapper>
            <Paper className={styles.wrapperContent}>
                <Typography fontWeight={`bold`} fontSize={`large`}>
                    Mọi người
                </Typography>
                <List>
                    <ListItem
                        secondaryAction={
                            <>
                                <ButtonActionStyled>
                                    Thêm bạn bè
                                </ButtonActionStyled>
                            </>
                        }
                    >
                        <ListItemIcon>
                            <Avatar/>
                        </ListItemIcon>
                        <ListItemText
                            primary={
                                <Link to={`/`} className={`text-decoration-none`}>
                                    <Typography fontWeight={`bold`}>Trần Hữu Tài</Typography>
                                </Link>
                            }
                        />
                    </ListItem>
                </List>
            </Paper>
        </Wrapper>
    </>
}

const Wrapper = styled(Box)`
  margin-top: var(--header-height);
  margin-left: var(--navbar-width);
  display: flex;
  flex-direction: column;
  align-items: center;
  padding-top: 30px;
  height: 100vh;
`

const ButtonActionStyled = styled(ButtonBase)`

`


export default SearchPage;