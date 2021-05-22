export const QUERY_HEADER_MENUS = `
  query getMenu($id: ID!) {
    menu(id: $id, idType: NAME) {
      menuItems {
        nodes {
          path
          label
        }
      }
    }
  }
`;
