import React from 'react';
import {List, ListSubheader} from "@mui/material";

interface IProps {
    subheader?: React.ReactNode;
    children?: React.ReactNode;
}

const NavList: React.FC<IProps> = ({subheader, children}) => {

    return <>
        <List subheader={
            <ListSubheader sx={{background:'transparent',position: 'relative', marginBottom: '10px'}} component={'div'}>
                {subheader}
            </ListSubheader>
        }>
            {children}
        </List>
    </>
}

export default NavList;