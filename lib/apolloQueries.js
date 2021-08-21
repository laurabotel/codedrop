import { gql } from '@apollo/client';

export const PROJECT_QUERY = gql`
  query getProject($id: String!) {
    getProject(id: $id) {
      id
      layout
      projectName
    }
  }
`;

export const COMPONENTS_QUERY = gql`
  subscription queryComponent {
    queryComponent {
      id
      containerStyle
      src
      style
      type
      value
    }
  }
`;

export const PROJECTS_QUERY = gql`
  query queryProject {
    queryProject {
      id
      projectName
    }
  }
`;