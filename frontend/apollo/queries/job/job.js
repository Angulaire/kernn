import gql from "graphql-tag";

const JOB_QUERY = gql`  
  query Job($id: ID!) {
    navigation {
      header
      footer
    }
    job(id: $id) {
      id
      created_at
      title
      location_town
      contract
      company_description
      profil_description
      mission_description
      salary
      experience
      job_category {
        name
      }
    }
  }
`;

export default JOB_QUERY;