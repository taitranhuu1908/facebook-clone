import React from 'react';
import styles from './loading-circle.module.scss';

const LoadingCircle = () => {
    return (
        <div >
            <span className={styles.loader}/>
        </div>
    )
}

export default LoadingCircle;