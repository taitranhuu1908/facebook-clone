import React from 'react';
import {List} from "@mui/material";
import styled from "@emotion/styled";

interface IProps {
    children: React.ReactNode
}

const ListPost: React.FC<IProps> = ({children}) => {
    return (
        <ListStyled>
            {children}
        </ListStyled>
    )
}

const ListStyled = styled(List)`
    width: 100%;
`

export default ListPost;