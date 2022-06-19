import React from 'react';
import Header from "../../components/HomePage/Header";
import styled from "@emotion/styled";
import NavbarRight from "../../components/HomePage/Header/NavbarRight";
import NavbarLeft from "../../components/HomePage/NavbarLeft";
import {Box} from "@mui/material";

interface IProps {
    children: React.ReactNode;
}

const HomeLayout: React.FC<IProps> = ({children}) => {

    return <>
        <Header/>
        <WrapperContentStyled>
            <Box sx={{flexShrink: 1}}>
                <NavbarLeft/>
            </Box>
            <Box sx={{flexGrow: 1}}>
                {children}
            </Box>
            <Box sx={{flexShrink: 1}}>
                <NavbarRight/>
            </Box>
        </WrapperContentStyled>
    </>
}

const WrapperContentStyled = styled.main`
  margin-top: var(--header-height);
  display: flex;
  background-color: var(--background-home);
  max-height: 100vh;
  height: 100%;
  
`

export default HomeLayout;