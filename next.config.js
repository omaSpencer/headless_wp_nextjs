module.exports = {
	distDir: 'build',
	env: {
		WORDPRESS_API_URL: 'https://demo-headless-cms.com/graphql', // CMS Graphql endpoint
		WORDPRESS_URL: 'https://demo-headless-cms.com', // CMS Base Url
		BASE_URL: 'http://localhost:3000', // Client URL
		POSTS_PER_PAGE: 6,
		WP_ADMIN_USERNAME: 'admin', // Admin user
		WP_ADMIN_PASSWORD: '-', // Admin pwd
	},
	images: {
		domains: ['demo-headless-cms.com'],
	},
	webpack(config) {
		config.module.rules.push({
			test: /\.svg$/,
			use: ['@svgr/webpack'],
		});

		return config;
	},
};
