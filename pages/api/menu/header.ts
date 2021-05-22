import { QUERY_HEADER_MENUS } from '../../../lib/queries/header';

export default async (req, res) => {
	const result = await fetch(process.env.WORDPRESS_API_URL, {
		headers: { 'Content-Type': 'application/json' },
		method: 'POST',
		body: JSON.stringify({
			query: QUERY_HEADER_MENUS,
			variables: { id: 'Short' },
		}),
	});

	const { data } = await result.json();

	res.json(data);
};
