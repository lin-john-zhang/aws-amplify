import { Amplify } from 'aws-amplify';
import { generateClient } from 'aws-amplify/api';

// Function to dynamically load configuration
const loadAmplifyConfig = () => {
  try {
    // Try to dynamically import the config at runtime
    // This avoids build-time errors when the file doesn't exist
    const outputs = (window as any).amplifyOutputs || null;
    if (outputs) {
      console.log('✅ Using real AWS configuration from window.amplifyOutputs');
      return outputs;
    }
  } catch (e) {
    // Silent fail - try next option
  }

  try {
    // Try to access config from global scope (set by amplify_outputs.json script)
    const outputs = (globalThis as any).amplifyConfig;
    if (outputs && outputs.aws_appsync_graphqlEndpoint) {
      console.log('✅ Using real AWS configuration from global scope');
      return outputs;
    }
  } catch (e) {
    // Silent fail - use mock
  }

  // Mock configuration for development when backend is not deployed
  console.log('⚠️  Using mock configuration - AWS backend not yet deployed');
  return {
    aws_project_region: 'us-east-1',
    aws_appsync_graphqlEndpoint: 'https://mock-endpoint.appsync-api.us-east-1.amazonaws.com/graphql',
    aws_appsync_region: 'us-east-1',
    aws_appsync_authenticationType: 'API_KEY',
    aws_appsync_apiKey: 'mock-api-key'
  };
};

// Load configuration
const amplifyConfig = loadAmplifyConfig();

// Configure Amplify
Amplify.configure(amplifyConfig);

// Create the GraphQL client
export const client = generateClient();
