import { FC, memo } from 'react';
import Link from 'next/link';
//
import { PostCategory } from '../../lib/types/posts';

type Props = {
	className?: any;
	list: { edges: PostCategory[] };
};

const Categories: FC<Props> = ({ list, className = null }) => {
	return (
		<ul className={className}>
			{list.edges.map(({ node }) => {
				return (
					<li key={node.uri}>
						<Link href={`${node.uri}?page=${1}`}>
							<a>{node.name}</a>
						</Link>
					</li>
				);
			})}
		</ul>
	);
};

export default memo(Categories);
