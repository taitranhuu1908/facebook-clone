import React, {useState} from 'react';
import styles from './styles.module.scss'
import {Box, IconButton, InputBase} from "@mui/material";
import styled from "@emotion/styled";
import AvatarOnline from "../../Avatar/AvatarOnline";
import CameraAltOutlinedIcon from '@mui/icons-material/CameraAltOutlined';
import {useAppSelector} from "../../../app/hook";
import {useSendCommentByPostMutation} from "../../../app/services/PostService";
import {ICommentFull} from "../../../app/models/Comment";
import CommentItem from "./CommentItem";
import moment from "moment";

interface IProps {
    postId: number;
}

const Comment: React.FC<IProps> = ({postId}) => {
    const {user} = useAppSelector(state => state.authSlice);
    const [comment, setComment] = useState<string>('');
    const [sendCommentApi] = useSendCommentByPostMutation();
    const [commentList, setCommentList] = useState<ICommentFull[]>([])

    const handleSubmit = (e: React.SyntheticEvent) => {
        e.preventDefault();
        const request = {
            postId,
            comment
        }
        sendCommentApi(request).then((response: any) => {
            setCommentList([...response.data.data.commentPosts,...commentList])
        })
        setComment("");
    }

    return (
        <>
            <Box className={styles.root}>
                <form onSubmit={handleSubmit} className={styles.header}>
                    <AvatarOnline src={user.userInfo.avatar || ""} online={true}/>
                    <InputStyled value={comment} onChange={(e) => setComment(e.target.value)}
                                 placeholder={'Viết bình luận'}/>
                    <button type={`submit`} hidden></button>
                    <Box className={styles.headerActions}>
                        <IconButton>
                            <CameraAltOutlinedIcon/>
                        </IconButton>
                    </Box>
                </form>
                <Box>
                    {commentList.map((comment: ICommentFull) => {
                        return (
                            <CommentItem
                                key={comment.id}
                                time={moment(comment.createdAt).fromNow()}
                                commentId={comment.id}
                                image={comment.image}
                                title={`${comment.user.userInfo.firstName} ${comment.user.userInfo.lastName}`}
                                content={comment.comment}
                                src={comment.user.userInfo.avatar || ""}/>
                        )
                    })}
                </Box>
            </Box>
        </>
    )
}

const InputStyled = styled(InputBase)`
  width: 100%;
  border-radius: 18px;
  background-color: #F0F2F5;
  padding: 0 10px;
`

export default Comment;