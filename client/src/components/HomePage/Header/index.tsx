import React from 'react';
import styles from './header.module.scss';

interface IProps {

}

const Header: React.FC<IProps> = () => {
    return <div className={styles.root}>Header</div>
}
export default Header;