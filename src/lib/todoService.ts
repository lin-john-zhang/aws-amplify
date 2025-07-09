import { Todo } from '../types';
import { DataMode, DEFAULT_MODE, MODE_STORAGE_KEY } from '../config/dataModes';
import { mockDataService } from './mockDataService';
import { awsDataService } from './awsDataService';

// Local storage service
const localStorageService = {
  // Simulate API delay
  delay: (ms: number = 300) => new Promise(resolve => setTimeout(resolve, ms)),

  // Get all todos
  async getAllTodos(): Promise<Todo[]> {
    await this.delay();
    const stored = localStorage.getItem('todos');
    return stored ? JSON.parse(stored) : [];
  },

  // Create a new todo
  async createTodo(title: string): Promise<Todo> {
    await this.delay();
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
    await this.delay();
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
    await this.delay();
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

// Service registry
const services = {
  localStorage: localStorageService,
  mock: mockDataService,
  aws: awsDataService,
};

// Get current data mode
export const getCurrentMode = (): DataMode => {
  const stored = localStorage.getItem(MODE_STORAGE_KEY);
  return (stored as DataMode) || DEFAULT_MODE;
};

// Set data mode
export const setDataMode = (mode: DataMode): void => {
  localStorage.setItem(MODE_STORAGE_KEY, mode);
};

// Get current service based on mode
const getCurrentService = () => {
  const mode = getCurrentMode();
  return services[mode];
};

// Main todo service that delegates to the appropriate implementation
export const todoService = {
  // Get current mode
  getCurrentMode,
  
  // Set data mode
  setDataMode,

  // Get all todos
  async getAllTodos(): Promise<Todo[]> {
    const service = getCurrentService();
    return service.getAllTodos();
  },

  // Create a new todo
  async createTodo(title: string): Promise<Todo> {
    const service = getCurrentService();
    return service.createTodo(title);
  },

  // Update a todo
  async updateTodo(id: string, updates: Partial<Omit<Todo, 'id'>>): Promise<Todo> {
    const service = getCurrentService();
    return service.updateTodo(id, updates);
  },

  // Delete a todo
  async deleteTodo(id: string): Promise<void> {
    const service = getCurrentService();
    return service.deleteTodo(id);
  },

  // Toggle todo completion
  async toggleTodo(id: string): Promise<Todo> {
    const service = getCurrentService();
    return service.toggleTodo(id);
  },

  // Additional methods for specific services
  async resetMockData(): Promise<void> {
    if (getCurrentMode() === 'mock') {
      return mockDataService.resetData();
    }
  },

  async testAwsConnection(): Promise<boolean> {
    if (getCurrentMode() === 'aws') {
      return awsDataService.testConnection();
    }
    return false;
  }
};
