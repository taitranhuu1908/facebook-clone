import React, {useMemo} from 'react';
import Header from "../../components/HomePage/Header";
import styled from "@emotion/styled";
import NavbarRight from "../../components/HomePage/NavbarRight";
import NavbarLeft from "../../components/HomePage/NavbarLeft";
import {Box} from "@mui/material";
import Chatbox from "../../components/Chatbox";
import {useAppSelector} from "../../app/hook";
import {IUser} from "../../app/models/User";

interface IProps {
    children: React.ReactNode;
}

const HomeLayout: React.FC<IProps> = ({children}) => {

    const {chatbox} = useAppSelector(state => state.chatBoxSlice);

    const renderChatBox = useMemo(() => {
        return chatbox.slice(0, 2).map((item: IUser, index) => {
            return <Chatbox key={index} position={index === 0 ? 'chatbox-one' : 'chatbox-two'} chatbox={item}/>
        })
    }, [chatbox]);

    return <>
        <Header/>
        <WrapperContentStyled>
            <Box>
                <NavbarLeft/>
            </Box>
            <ContentStyled>
                {children}
            </ContentStyled>
            <Box>
                <NavbarRight/>
            </Box>
            {renderChatBox}
        </WrapperContentStyled>
    </>
}

const WrapperContentStyled = styled.main`
  margin-top: var(--header-height);
  display: flex;
  background-color: var(--background-home);
  height: 100%;
`

const ContentStyled = styled.div`
  margin-right: var(--navbar-width);
  margin-left: var(--navbar-width);
  width: 100%;
  display: flex;
  justify-content: center;
`

export default HomeLayout;