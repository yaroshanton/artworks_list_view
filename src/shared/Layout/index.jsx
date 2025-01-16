import React from 'react';
//styles
import styles from './styles.module.scss';

const Layout = ({children}) => {
	return (
		<div className={styles.wrapper}>
			{children}
		</div>
	);
};

export default Layout;
