export type PostCategory = {
	node: {
		name: string;
		uri: string;
	};
};

export type FeaturedImage = {
	node: {
		altText: string;
		sourceUrl: string;
	};
};

export type PostListItem = {
	title: string;
	excerpt: string;
	slug: string;
	featuredImage?: FeaturedImage;
	date: Date;
	categories?: {
		edges: PostCategory[];
	};
	author?: {};
	error?: any;
	postCustomFields?: any;
};
