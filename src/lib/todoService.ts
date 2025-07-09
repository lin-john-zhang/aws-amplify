import { Todo } from '../types';

// Mock data service that simulates backend calls
// This can be replaced with actual GraphQL calls when AWS credentials are ready
export const todoService = {
  // Simulate API delay
  delay: (ms: number) => new Promise(resolve => setTimeout(resolve, ms)),

  // Get all todos
  async getAllTodos(): Promise<Todo[]> {
    await this.delay(500); // Simulate network delay
    const stored = localStorage.getItem('todos');
    return stored ? JSON.parse(stored) : [];
  },

  // Create a new todo
  async createTodo(title: string): Promise<Todo> {
    await this.delay(300);
    const newTodo: Todo = {
      id: Date.now().toString(),
      title,
      completed: false,
    };
    
    const todos = await this.getAllTodos();
    const updatedTodos = [...todos, newTodo];
    localStorage.setItem('todos', JSON.stringify(updatedTodos));
    
    return newTodo;
  },

  // Update a todo
  async updateTodo(id: string, updates: Partial<Omit<Todo, 'id'>>): Promise<Todo> {
    await this.delay(300);
    const todos = await this.getAllTodos();
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
  async deleteTodo(id: string): Promise<void> {
    await this.delay(300);
    const todos = await this.getAllTodos();
    const filteredTodos = todos.filter(t => t.id !== id);
    localStorage.setItem('todos', JSON.stringify(filteredTodos));
  },

  // Toggle todo completion
  async toggleTodo(id: string): Promise<Todo> {
    const todos = await this.getAllTodos();
    const todo = todos.find(t => t.id === id);
    if (!todo) {
      throw new Error('Todo not found');
    }
    
    return this.updateTodo(id, { completed: !todo.completed });
  }
};
