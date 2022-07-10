import React, {useMemo} from 'react';
import {Box} from "@mui/material";
import styles from "../ProfileIntroduce/profile-introduce.module.scss";
import CreatePost from "../../CreatePost";
import ListPost from "../../Post/ListPost";
import PostNormal from "../../Post/PostNormal";
import PostSkeleton from "../../Skeleton/PostSkeleton";
import {useAppSelector} from "../../../app/hook";

interface IProps {
    isLoading: boolean;
}

const ProfilePost: React.FC<IProps> = ({isLoading}) => {
    const {postsMe} = useAppSelector(state => state.postSlice);
    const renderPosts = useMemo(() => {
        if (isLoading) {
            return (
                <>
                    <PostSkeleton/>
                    <PostSkeleton/>
                </>
            )
        }

        if (postsMe.length > 0) {
            return postsMe.map((post, index) => {
                return (
                    <PostNormal
                        key={index}
                        post={post}
                    />
                )
            })
        }
    }, [postsMe, isLoading]);

    return (
        <Box className={styles.post}>
            <CreatePost />
            <ListPost>
                {renderPosts}
            </ListPost>
        </Box>
    )
}

export default ProfilePost;