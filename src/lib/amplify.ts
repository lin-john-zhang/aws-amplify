import { Amplify } from 'aws-amplify';
import { generateClient } from 'aws-amplify/api';

// Mock configuration for development (replace with actual amplify_outputs.json when available)
const mockConfig = {
  aws_project_region: 'us-east-1',
  aws_appsync_graphqlEndpoint: 'https://mock-endpoint.appsync-api.us-east-1.amazonaws.com/graphql',
  aws_appsync_region: 'us-east-1',
  aws_appsync_authenticationType: 'API_KEY',
  aws_appsync_apiKey: 'mock-api-key'
};

// Try to import actual config, fall back to mock
let amplifyConfig = mockConfig;
try {
  // This will be available once AWS backend is deployed
  // const outputs = require('../amplify_outputs.json');
  // amplifyConfig = outputs;
} catch (e) {
  console.log('Using mock configuration - AWS backend not yet deployed');
}

// Configure Amplify
Amplify.configure(amplifyConfig);

// Create the GraphQL client
export const client = generateClient();
