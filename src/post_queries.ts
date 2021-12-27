import gql from 'graphql-tag';

export const GET_POSTS_QUERY = gql`
  query GetPosts {
    posts {
      edges {
        node {
          id
          url
          user {
            id
            name
            username
            websiteUrl
            twitterUsername
          }
          website
          name
          tagline
          slug
          thumbnail {
            type
            url
            videoUrl
          }
          description
          reviewsCount
          reviewsRating
          commentsCount
          votesCount
          createdAt
        }
      }
    }
  }
`;
