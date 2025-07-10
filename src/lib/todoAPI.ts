// GraphQL API service for AWS Amplify
// This is a placeholder implementation that will work once AWS credentials are available

import { Todo } from '../types';

// Mock implementation that simulates GraphQL API
// Replace with actual GraphQL client calls when AWS backend is ready
export const todoAPI = {
  // Fetch all todos
  async listTodos(): Promise<Todo[]> {
    // TODO: Replace with actual GraphQL query when AWS backend is deployed
    // const result = await client.graphql({ query: queries.listTodos });
    // return result.data.listTodos.items;
    
    console.log('TodoAPI: listTodos called - using localStorage fallback');
    const stored = localStorage.getItem('todos');
    return stored ? JSON.parse(stored) : [];
  },

  // Get a specific todo
  async getTodo(id: string): Promise<Todo | null> {
    // TODO: Replace with actual GraphQL query
    // const result = await client.graphql({ query: queries.getTodo, variables: { id } });
    // return result.data.getTodo;
    
    console.log('TodoAPI: getTodo called - using localStorage fallback');
    const todos = await this.listTodos();
    return todos.find(todo => todo.id === id) || null;
  },

  // Create a new todo
  async createTodo(title: string): Promise<Todo> {
    // TODO: Replace with actual GraphQL mutation
    // const result = await client.graphql({
    //   query: mutations.createTodo,
    //   variables: { input: { title, completed: false } }
    // });
    // return result.data.createTodo;
    
    console.log('TodoAPI: createTodo called - using localStorage fallback');
    const newTodo: Todo = {
      id: Date.now().toString(),
      title,
      completed: false,
    };
    
    const todos = await this.listTodos();
    const updatedTodos = [...todos, newTodo];
    localStorage.setItem('todos', JSON.stringify(updatedTodos));
    
    return newTodo;
  },

  // Update a todo
  async updateTodo(id: string, updates: { title?: string; completed?: boolean }): Promise<Todo> {
    // TODO: Replace with actual GraphQL mutation
    // const result = await client.graphql({
    //   query: mutations.updateTodo,
    //   variables: { input: { id, ...updates } }
    // });
    // return result.data.updateTodo;
    
    console.log('TodoAPI: updateTodo called - using localStorage fallback');
    const todos = await this.listTodos();
    const todoIndex = todos.findIndex(t => t.id === id);
    
    if (todoIndex === -1) {
      throw new Error('Todo not found');
    }
    
    const updatedTodo = { ...todos[todoIndex], ...updates };
    todos[todoIndex] = updatedTodo;
    localStorage.setItem('todos', JSON.stringify(todos));
    
    return updatedTodo;
  },

  // Delete a todo
  async deleteTodo(id: string): Promise<{ id: string }> {
    // TODO: Replace with actual GraphQL mutation
    // const result = await client.graphql({
    //   query: mutations.deleteTodo,
    //   variables: { input: { id } }
    // });
    // return result.data.deleteTodo;
    
    console.log('TodoAPI: deleteTodo called - using localStorage fallback');
    const todos = await this.listTodos();
    const filteredTodos = todos.filter(t => t.id !== id);
    localStorage.setItem('todos', JSON.stringify(filteredTodos));
    
    return { id };
  },

  // Subscribe to todo creations (placeholder)
  subscribeToCreations(callback: (todo: Todo) => void): { unsubscribe: () => void } {
    // TODO: Implement real-time subscriptions when AWS backend is ready
    console.log('TodoAPI: subscribeToCreations called - no real-time updates available');
    return {
      unsubscribe: () => console.log('Unsubscribed from todo creations')
    };
  },

  // Subscribe to todo updates (placeholder)
  subscribeToUpdates(callback: (todo: Todo) => void): { unsubscribe: () => void } {
    // TODO: Implement real-time subscriptions when AWS backend is ready
    console.log('TodoAPI: subscribeToUpdates called - no real-time updates available');
    return {
      unsubscribe: () => console.log('Unsubscribed from todo updates')
    };
  },

  // Subscribe to todo deletions (placeholder)
  subscribeToDeletes(callback: (todo: { id: string }) => void): { unsubscribe: () => void } {
    // TODO: Implement real-time subscriptions when AWS backend is ready
    console.log('TodoAPI: subscribeToDeletes called - no real-time updates available');
    return {
      unsubscribe: () => console.log('Unsubscribed from todo deletions')
    };
  }
};

// GraphQL queries and mutations for reference (to be used when AWS backend is ready)
export const graphqlQueries = {
  listTodos: `
    query ListTodos {
      listTodos {
        items {
          id
          title
          completed
          createdAt
          updatedAt
        }
      }
    }
  `,
  
  getTodo: `
    query GetTodo($id: ID!) {
      getTodo(id: $id) {
        id
        title
        completed
        createdAt
        updatedAt
      }
    }
  `,

  createTodo: `
    mutation CreateTodo($input: CreateTodoInput!) {
      createTodo(input: $input) {
        id
        title
        completed
        createdAt
        updatedAt
      }
    }
  `,
  
  updateTodo: `
    mutation UpdateTodo($input: UpdateTodoInput!) {
      updateTodo(input: $input) {
        id
        title
        completed
        createdAt
        updatedAt
      }
    }
  `,
  
  deleteTodo: `
    mutation DeleteTodo($input: DeleteTodoInput!) {
      deleteTodo(input: $input) {
        id
      }
    }
  `,

  onCreateTodo: `
    subscription OnCreateTodo {
      onCreateTodo {
        id
        title
        completed
        createdAt
        updatedAt
      }
    }
  `,
  
  onUpdateTodo: `
    subscription OnUpdateTodo {
      onUpdateTodo {
        id
        title
        completed
        createdAt
        updatedAt
      }
    }
  `,
  
  onDeleteTodo: `
    subscription OnDeleteTodo {
      onDeleteTodo {
        id
      }
    }
  `
};
