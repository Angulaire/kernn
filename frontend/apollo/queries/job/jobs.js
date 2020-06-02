import gql from "graphql-tag";

const JOB_QUERY = gql`  
  query Jobs {
    jobsCount
    navigation {
      header
      footer
    }
    jobsIndex {
      hero {
        title
        description
        image {
          url
        }
      }
      cta {
        title
        categoriesList
        button {
          text
          type
          size
          url
        }
      }
    }
    jobs {
      id
    }
  }
`;

export default JOB_QUERY;