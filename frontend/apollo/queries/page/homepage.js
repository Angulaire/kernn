import gql from "graphql-tag";

const HOMEPAGE_QUERY = gql`  
  query Homepage {
    jobsCount
    navigation {
      header
      footer
    }
    jobs(limit: 8) {
      title
      contract
      location_town
    }
    jobCategories(limit: 4) {
      name
      description
      icon {
        url
      }
    }
    articles(sort: "published_at:desc", limit: 3) {
      slug
      title
      description
      published_at
      image {
        alt
        media {
          provider_metadata
          ext
        }
      }
      content
      category {
        name
        color
      }
      user {
        username
        avatar {
          alt
          media {
            url
          }
        }
      }
    }
    homepage {
      content {
        __typename
        ... on ComponentHero {
          titleHero: title
          description
        }
        ... on ComponentCategories {
          title
          job_categories {
            name
            description
            icon {
              url
            }
          }
        }
        ... on ComponentJobs {
          titleJobs: title
        }
        ... on ComponentCta {
          ctaTitle: title
          categoriesList
          button {
            text
            type
            size
            url
          }
        }
        ... on ComponentTestimonials {
          testimonial {
            title
            description
            videoUrl
            imageThumbnail {
              url
            }
          }
        }
      }
    }
  }
`;

export default HOMEPAGE_QUERY;