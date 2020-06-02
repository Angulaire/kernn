import gql from "graphql-tag";

const PAGE_QUERY = gql`  
  query Page($slug: String!){
    navigation {
      header
      footer
    }
    pages(where: { slug: $slug} ) {
      slug
      content {
        __typename
        ... on ComponentHeroSideForm {
          title
          description
          content
        }
      }
    }
  }
`;

export default PAGE_QUERY;