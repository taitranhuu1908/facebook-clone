import React from 'react';
import {Badge, IconButton, Tooltip} from "@mui/material";
import styled from "@emotion/styled";

interface IProps {
    children: React.ReactNode;
    onClick?: (e: any) => void;
    title?: string;
    number?: number;
}

const ButtonCircle: React.FC<IProps> = ({title = '', onClick, children, number}) => {
    return <>
        <Tooltip title={title}>
            <Badge badgeContent={number || null} color='error'>
                <IconButtonCustom onClick={onClick}>
                    {children}
                </IconButtonCustom>
            </Badge>
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