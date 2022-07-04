import React, {useEffect} from 'react';
import {useParams} from "react-router-dom";
import HomeLayout from "../../../layouts/HomeLayout";
import {Box} from "@mui/material";

interface IProps {

}

const PostDetail: React.FC<IProps> = () => {
    const {id} = useParams();

    useEffect(() => {
        console.log(id)
    }, [id]);

    return <HomeLayout isNavbarLeft={false} isNavbarRight={false}>
        <Box>
            qwe
        </Box>
    </HomeLayout>
}


export default PostDetail;