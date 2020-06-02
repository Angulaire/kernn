import gql from "graphql-tag";

const PAGES_QUERY = gql`  
  query Pages {
    pages {
      slug
    }
  }
`;

export default PAGES_QUERY;