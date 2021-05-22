import { useEffect } from 'react';

const clickedOutside = (ref: any, callback: () => void, customDeps: any) => {
	useEffect(() => {
		const handleClickOutside = (event: MouseEvent) => {
			if (ref.current && !ref.current.contains(event.target)) {
				callback();
			}
		};
		document.addEventListener('mousedown', handleClickOutside);
		return () => {
			document.removeEventListener('mousedown', handleClickOutside);
		};
	}, [ref, customDeps]);
};

export default clickedOutside;
