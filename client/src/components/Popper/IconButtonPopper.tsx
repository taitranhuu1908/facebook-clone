import React from 'react';
import {Fade, IconButton, Paper, Popper, Typography} from "@mui/material";

interface IProps {
    children: React.ReactNode;
    text: string;
    bgrColor?: string;
    textColor?: string;
}

const IconButtonPopper: React.FC<IProps> = ({children, text, bgrColor='white', textColor='#333'}) => {
    const [open, setOpen] = React.useState(false);
    const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);

    const handleClick = (event: React.MouseEvent<HTMLElement>) => {
        setAnchorEl(event.currentTarget);
        setOpen((previousOpen) => !previousOpen);
    };

    return <>
        <Popper sx={{zIndex: 1301}} open={open} anchorEl={anchorEl} placement={'top'} transition>
            {({TransitionProps}) => (
                <Fade {...TransitionProps} timeout={350}>
                    <Paper sx={{backgroundColor: bgrColor, color: textColor, maxWidth: '300px'}}>
                        <Typography fontSize={'small'} sx={{p: 1}}>{text}</Typography>
                    </Paper>
                </Fade>
            )}
        </Popper>
        <IconButton onClick={handleClick}>
            {children}
        </IconButton>
    </>
}
export default IconButtonPopper;