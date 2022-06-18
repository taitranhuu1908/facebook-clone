import React from 'react';
import styled from "@emotion/styled";
import {ButtonBase} from "@mui/material";
import {Link} from "react-router-dom";

interface IProps {
    children: React.ReactNode;
    to: string;
    active: boolean;
}

const NavigateItem: React.FC<IProps> = ({to, children, active}) => {

    return <>
        <Link to={to} className={active ? 'navigate-active' : ''}>
            <ButtonStyled>
                {children}
            </ButtonStyled>
        </Link>
    </>
}

const ButtonStyled = styled(ButtonBase)`
  min-width: 50px;
  height: 100%;
  padding: 10px 25px;
  border-radius: 6px;

  &:hover {
    background-color: rgba(0, 0, 0, 0.1);
  }
`


export default NavigateItem;