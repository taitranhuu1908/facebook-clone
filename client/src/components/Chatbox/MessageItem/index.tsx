import React from 'react';
import {Avatar, Box, Typography} from "@mui/material";
import styles from "./styles.module.scss";

interface IProps {
    owner: boolean;
    text?: string;
}

const MessageItem: React.FC<IProps> = ({owner, text}) => {
    return <>
        <Box className={`${styles.message} ${owner ? styles.messageRight : styles.messageLeft}`}>
            <Avatar sx={{width: '30px', height: '30px'}}/>
            <Box className={`${owner ? styles.right : styles.left}`}>
                <Typography className={styles.text}>@Nguyễn Trương Anh Kiệt Anh Kiệt Anh Kiệt</Typography>
                <Typography className={styles.text}>@Nguyễn Trương Anh Kiệt Anh Kiệt Anh Kiệt</Typography>
                <Typography className={styles.text}>@Nguyễn Trương Anh Kiệt Anh Kiệt Anh Kiệt</Typography>
                <Typography className={styles.text}>@Nguyễn Trương Anh Kiệt Anh Kiệt Anh Kiệt</Typography>
                <img className={styles.image} src="https://scontent.fsgn2-5.fna.fbcdn.net/v/t39.30808-6/287682609_5071402476290958_8239100455644975051_n.jpg?_nc_cat=102&ccb=1-7&_nc_sid=0debeb&_nc_ohc=RUTHUgwiidYAX_KGYCs&_nc_ht=scontent.fsgn2-5.fna&oh=00_AT_LViTou9e6P3LWK4iPMX7BukmweNHRhqw2ZsVSH-gRQg&oe=62B5757E" alt=""/>
            </Box>
        </Box>
    </>
}
export default MessageItem;