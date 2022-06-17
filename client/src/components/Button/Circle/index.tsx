import React from 'react';
import {IconButton, Tooltip} from "@mui/material";
import styled from "@emotion/styled";

interface IProps {
    children: React.ReactNode;
    onClick?: () => void;
    title?: string;
}

const ButtonCircle: React.FC<IProps> = ({title = '', onClick, children}) => {
    return <>
        <Tooltip title={title}>
            <IconButtonCustom onClick={onClick}>
                {children}
            </IconButtonCustom>
        </Tooltip>
    </>
}

const IconButtonCustom = styled(IconButton)`
  background-color: #d8dadf;

  &:hover {
    background-color: #cbccd0;
  }

  width: 40px;
  height: 40px;
`

export default ButtonCircle;