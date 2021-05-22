export const QUERY_SINGPLE_POST = `
  query SinglePost($id: ID!) {
    post(id: $id, idType: SLUG) {
      slug
      title
      excerpt
      content
      featuredImage {
        node {
          altText
          sourceUrl(size: _1536X1536)
        }
      }
      date
      categories {
        edges {
          node {
            name
            uri
          }
        }
      }
      author {
        node {
          name
          uri
        }
      }
    }
  }
`;

export const QUERY_ALL_POSTS_CATEGORY_SLUG = `
  query allPostCategorySlug {
    categories {
      nodes {
        slug
      }
    }
  }
`;

export const QUERY_ALL_POSTS_BY_CATEGORY = `
  query postsByCategory($id: ID!) {
    category(id: $id, idType: NAME) {
      posts(first: 1000) {
        nodes {
          title
          slug
          featuredImage {
            node {
              sourceUrl(size: _1536X1536)
              altText
            }
          }
          excerpt
          date
          categories {
            edges {
              node {
                name
                uri
              }
            }
          }
          author {
            node {
              name
              uri
            }
          }
        }
      }
    }
  }
`;

export const QUERY_ALL_POSTS_SLUG = `
  query AllPostsSlug {
    posts {
      edges {
        node {
          slug
        }
      }
    }
  }
`;

export const QUERY_ALL_POSTS = `
  query AllPostFeaturedPost {
    posts(first: 1000, where: { orderby: { field: DATE, order: DESC } }) {
      nodes {
        slug
        title
        postCustomFields {
          featuredPost
        }
        author {
          node {
            name
            uri
          }
        }
        categories {
          edges {
            node {
              name
              uri
            }
          }
        }
        date
        excerpt
        featuredImage {
          node {
            altText
            sourceUrl(size: _1536X1536)
          }
        }
      }
    }
  }
`;
