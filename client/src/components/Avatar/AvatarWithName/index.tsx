import React from 'react';
import styled from "@emotion/styled";
import {Avatar, ButtonBase, Tooltip, Typography} from "@mui/material";

interface IProps {
    src: string;
    title: string;
}

const AvatarWithName: React.FC<IProps> = ({src, title}) => {
    return <>
        <Tooltip title={title}>
            <AvatarWithNameStyled>
                <Avatar src={""} sx={{width: '35px', height: '35px'}}/>
                <UsernameText>{title}</UsernameText>
            </AvatarWithNameStyled>
        </Tooltip>
    </>
}

const AvatarWithNameStyled = styled(ButtonBase)`
  display: flex;
  align-items: center;
  gap: 10px;
  border-radius: 30px;
  padding: 4px 6px;

  &:hover {
    background-color: #f3f3f3;
  }
`

const UsernameText = styled(Typography)`
  font-size: 16px;
  max-width: 100px;
  overflow: hidden;
  word-break: break-word;
  text-overflow: ellipsis;
  white-space: nowrap;
  -webkit-line-clamp: 1; 
  -webkit-box-orient: vertical;
`

export default AvatarWithName;