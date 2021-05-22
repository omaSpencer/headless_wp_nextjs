export const QUERY_SINGPLE_PAGE = `
  query SinglePage($id: ID!) {
    page(id: $id, idType: URI) {
      title
      content,
      date
    }
  }
`;

export const QUERY_ALL_PAGES = `
  query AllPages {
    pages {
      edges {
        node {
          uri
        }
      }
    }
  }
`;
