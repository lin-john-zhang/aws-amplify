import { Todo } from '../types';
import { client } from './amplify';
import { graphqlQueries } from './todoAPI';

// AWS service implementation for real GraphQL API
export const awsDataService = {
  // Check if AWS is configured
  isConfigured(): boolean {
    try {
      // Check for window.amplifyOutputs (set when real config is loaded)
      const windowConfig = (window as any).amplifyOutputs;
      if (windowConfig && windowConfig.aws_appsync_graphqlEndpoint) {
        return true;
      }
      
      // Check for global amplifyConfig
      const globalConfig = (globalThis as any).amplifyConfig;
      if (globalConfig && globalConfig.aws_appsync_graphqlEndpoint) {
        return true;
      }
      
      // If we only have mock config, return false
      const mockEndpoint = 'https://mock-endpoint.appsync-api.us-east-1.amazonaws.com/graphql';
      if (globalConfig && globalConfig.aws_appsync_graphqlEndpoint === mockEndpoint) {
        return false;
      }
      
      return false;
    } catch (error) {
      console.warn('AWS configuration check failed:', error);
      return false;
    }
  },

  // Get all todos
  async getAllTodos(): Promise<Todo[]> {
    if (!this.isConfigured()) {
      throw new Error('AWS Amplify not configured. Please set up AWS credentials and deploy the backend.');
    }
    
    try {
      const result = await client.graphql({ 
        query: graphqlQueries.listTodos 
      }) as any;
      return result.data.listTodos.items;
    } catch (error) {
      console.error('Failed to fetch todos from AWS:', error);
      throw new Error('Failed to load todos from AWS. Please check your connection.');
    }
  },

  // Create a new todo
  async createTodo(title: string): Promise<Todo> {
    if (!this.isConfigured()) {
      throw new Error('AWS Amplify not configured. Please set up AWS credentials and deploy the backend.');
    }
    
    try {
      const result = await client.graphql({
        query: graphqlQueries.createTodo,
        variables: { input: { title, completed: false } }
      }) as any;
      return result.data.createTodo;
    } catch (error) {
      console.error('Failed to create todo in AWS:', error);
      throw new Error('Failed to create todo. Please check your connection.');
    }
  },

  // Update a todo
  async updateTodo(id: string, updates: Partial<Omit<Todo, 'id'>>): Promise<Todo> {
    if (!this.isConfigured()) {
      throw new Error('AWS Amplify not configured. Please set up AWS credentials and deploy the backend.');
    }
    
    try {
      const result = await client.graphql({
        query: graphqlQueries.updateTodo,
        variables: { input: { id, ...updates } }
      }) as any;
      return result.data.updateTodo;
    } catch (error) {
      console.error('Failed to update todo in AWS:', error);
      throw new Error('Failed to update todo. Please check your connection.');
    }
  },

  // Delete a todo
  async deleteTodo(id: string): Promise<void> {
    if (!this.isConfigured()) {
      throw new Error('AWS Amplify not configured. Please set up AWS credentials and deploy the backend.');
    }
    
    try {
      await client.graphql({
        query: graphqlQueries.deleteTodo,
        variables: { input: { id } }
      });
    } catch (error) {
      console.error('Failed to delete todo in AWS:', error);
      throw new Error('Failed to delete todo. Please check your connection.');
    }
  },

  // Toggle todo completion
  async toggleTodo(id: string): Promise<Todo> {
    const todos = await this.getAllTodos();
    const todo = todos.find(t => t.id === id);
    if (!todo) {
      throw new Error('Todo not found');
    }
    
    return this.updateTodo(id, { completed: !todo.completed });
  },

  // Test connection
  async testConnection(): Promise<boolean> {
    try {
      if (!this.isConfigured()) {
        return false;
      }
      
      // Try to fetch todos to test the connection
      await this.getAllTodos();
      return true;
    } catch (error) {
      console.warn('AWS connection test failed:', error);
      return false;
    }
  },

  // Subscribe to todo creations (real-time)
  subscribeToCreations(callback: (todo: Todo) => void): { unsubscribe: () => void } {
    if (!this.isConfigured()) {
      console.warn('AWS not configured - subscriptions not available');
      return { unsubscribe: () => {} };
    }

    try {
      const subscription = (client.graphql({
        query: graphqlQueries.onCreateTodo
      }) as any).subscribe({
        next: ({ data }: any) => {
          if (data?.onCreateTodo) {
            callback(data.onCreateTodo);
          }
        },
        error: (err: any) => console.error('Create subscription error:', err)
      });

      return { unsubscribe: () => subscription.unsubscribe() };
    } catch (error) {
      console.error('Failed to set up create subscription:', error);
      return { unsubscribe: () => {} };
    }
  },

  // Subscribe to todo updates (real-time)
  subscribeToUpdates(callback: (todo: Todo) => void): { unsubscribe: () => void } {
    if (!this.isConfigured()) {
      console.warn('AWS not configured - subscriptions not available');
      return { unsubscribe: () => {} };
    }

    try {
      const subscription = (client.graphql({
        query: graphqlQueries.onUpdateTodo
      }) as any).subscribe({
        next: ({ data }: any) => {
          if (data?.onUpdateTodo) {
            callback(data.onUpdateTodo);
          }
        },
        error: (err: any) => console.error('Update subscription error:', err)
      });

      return { unsubscribe: () => subscription.unsubscribe() };
    } catch (error) {
      console.error('Failed to set up update subscription:', error);
      return { unsubscribe: () => {} };
    }
  },

  // Subscribe to todo deletions (real-time)
  subscribeToDeletes(callback: (todo: { id: string }) => void): { unsubscribe: () => void } {
    if (!this.isConfigured()) {
      console.warn('AWS not configured - subscriptions not available');
      return { unsubscribe: () => {} };
    }

    try {
      const subscription = (client.graphql({
        query: graphqlQueries.onDeleteTodo
      }) as any).subscribe({
        next: ({ data }: any) => {
          if (data?.onDeleteTodo) {
            callback(data.onDeleteTodo);
          }
        },
        error: (err: any) => console.error('Delete subscription error:', err)
      });

      return { unsubscribe: () => subscription.unsubscribe() };
    } catch (error) {
      console.error('Failed to set up delete subscription:', error);
      return { unsubscribe: () => {} };
    }
  }
};
