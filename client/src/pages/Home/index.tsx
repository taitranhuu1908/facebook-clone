import React from 'react'
import HomeLayout from "../../layouts/HomeLayout";
import ListPost from "../../components/Post/ListPost";
import {Box} from "@mui/material";

const HomePage: React.FC = () => {
    return (
        <HomeLayout>
            <Box sx={{ maxWidth: '680px', width: '680px' }}>
                <ListPost>
                    asd
                </ListPost>
            </Box>
        </HomeLayout>
    )
}

export default HomePage;