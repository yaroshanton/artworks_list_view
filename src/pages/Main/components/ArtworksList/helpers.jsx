import React from 'react';
// utils
import dayjs from 'dayjs';
import {ASC} from 'utils/constants';
// icons
import {ReactComponent as EyeIcon} from '../../../../assets/icons/eye.svg';
import {ReactComponent as EyeCloseIcon} from '../../../../assets/icons/eye-close.svg';
import {ReactComponent as DocksIcon} from '../../../../assets/icons/docks.svg';
import {ReactComponent as StrokeIcon} from '../../../../assets/icons/stroke.svg';
import {ReactComponent as StrokeActiveIcon} from '../../../../assets/icons/stroke-active.svg';
// styles
import styles from './ArtworksList.module.scss';

export const screenBreakpoints = [
	{display: 'max', size: 320},
	{display: 'max', size: 768},
	{display: 'max', size: 1024},
	{display: 'max', size: 1440},
	{display: 'max', size: 1920},
	{display: 'min', size: 2560},
];

export const sortItems = (items, field, direction) => {
	return [...items].sort((a, b) => {
		const isAsc = direction === ASC;

		if (typeof a[field] === 'string') {
			return isAsc ? a[field].localeCompare(b[field]) : b[field].localeCompare(a[field]);
		}

		if (typeof a[field] === 'number') {
			return isAsc ? a[field] - b[field] : b[field] - a[field];
		}

		if (dayjs(a[field]).isValid() && dayjs(b[field]).isValid()) {
			const dateA = dayjs(a[field]);
			const dateB = dayjs(b[field]);
			return isAsc ? dateA.valueOf() - dateB.valueOf() : dateB.valueOf() - dateA.valueOf();
		}

		return 0;
	});
};

export const renderSortIcon = (field, sortField, sortDirection, ASC = 'asc') => {
	if (sortField === field) {
		return sortDirection === ASC ? <StrokeIcon /> : <StrokeActiveIcon width="12px" height="12px" />;
	}
	return <StrokeIcon />;
};

export const renderStatus = (status) => {
	switch (status) {
		case 'draft':
			return <span className={styles.draft}>Draft</span>;
		case 'on_sale':
			return <span className={styles.onSale}>On Sale</span>;
		case 'on_digitalization':
			return <span className={styles.onDigitalization}>On Digitalization</span>;
		case 'ready_for_verification':
			return <span className={styles.readyForVerification}>Ready for Verification</span>;
		case 'published':
			return <span className={styles.published}>Published</span>;
		default:
			return <span className={styles.unknown}>Unknown</span>;
	}
};

export const renderVisibility = (visibility) => {
	switch (visibility) {
		case 'visible':
			return (
				<span className={styles.visible}>
					<EyeIcon /> Visible
				</span>
			);
		case 'hidden':
			return (
				<span className={styles.hidden}>
					<EyeCloseIcon /> Hidden
				</span>
			);
		default:
			return <span className={styles.unknownVisibility}>Unknown</span>;
	}
};

export const renderDocuments = (documentsNumber) => {
	if (documentsNumber > 0) {
		return (
			<span className={styles.documentsAvailable}>
				<DocksIcon />
				{documentsNumber}
			</span>
		);
	}
	return <span className={styles.noDocuments}>No Docs</span>;
};

export const renderPictureSources = (transformations) => {
	return screenBreakpoints.map(({display, size}, index) => {
		const transformation = transformations[index];

		return (
			<source
				key={index}
				srcSet={`images/${transformation.filename_disk}`}
				media={`(${display}-width: ${size}px)`}
				sizes={`${transformation.width}px`}
				type="image/webp"
			/>
		);
	});
};
