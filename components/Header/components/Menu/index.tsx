import { FC, memo } from 'react';
import Link from 'next/link';
//
import { MenuItem } from '../../../../lib/types/menu';

type Props = {
	items: MenuItem[];
};

const Menu: FC<Props> = ({ items }) => {
	return (
		<nav>
			{items.map((item) => {
				return (
					<Link href={item.path} key={item.label}>
						<a>{item.label}</a>
					</Link>
				);
			})}
		</nav>
	);
};

export default memo(Menu);
