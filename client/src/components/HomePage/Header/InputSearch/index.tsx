import React, {useEffect, useRef} from 'react';
import styles from './input.module.scss'
import {InputBase} from "@mui/material";
import SearchIcon from '@mui/icons-material/Search';

interface IProps {}



const InputSearch: React.FC<IProps> = () => {
    const [isFocus, setIsFocus] = React.useState(false);
    const inputRef = useRef<HTMLInputElement>(null);

    useEffect(() => {
        document.addEventListener('click', (event) => {
            if (inputRef.current && !inputRef.current.contains(event.target as Node)) {
                setIsFocus(false);
            }
        });
    }, []);


    const onFocusSearch = () => {
        setIsFocus(true)
    }


    return <form className={styles.root}>
        {!isFocus && <span>
            <SearchIcon sx={{color: '#65676b'}}/>
        </span>}
        <InputBase type="text"
                   ref={inputRef}
                   onFocus={onFocusSearch}
                   className={styles.inputSearch}
                   placeholder="Tìm kiếm trên Facebook"
        />
    </form>
}

export default InputSearch;