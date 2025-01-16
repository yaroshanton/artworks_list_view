import React from 'react';
//components
import Layout from 'shared/Layout';
import ArtworksList from './components/ArtworksList';
//styles
import styles from './Main.module.scss';

const Main = () => {
	return (
		<Layout>
			<div className={styles.wrapper}>
				<ArtworksList />
			</div>
		</Layout>
	);
};

export default Main;
