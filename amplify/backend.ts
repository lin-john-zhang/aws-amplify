import { defineBackend } from "@aws-amplify/backend";
import { defineData } from "@aws-amplify/backend";

// Define the data schema
const data = defineData({
  schema: `
    type Todo @model {
      id: ID!
      title: String!
      completed: Boolean!
      createdAt: AWSDateTime!
      updatedAt: AWSDateTime!
    }
  `,
  authorizationModes: {
    defaultAuthorizationMode: "apiKey",
  },
});

export const backend = defineBackend({
  data,
  // Add other resources here (e.g., auth, storage)
});