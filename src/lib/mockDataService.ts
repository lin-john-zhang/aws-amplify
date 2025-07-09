import { Todo } from '../types';

// Sample mock todos
const MOCK_TODOS: Todo[] = [
  {
    id: '1',
    title: 'Learn AWS Amplify',
    completed: false,
  },
  {
    id: '2',
    title: 'Build a todo app',
    completed: true,
  },
  {
    id: '3',
    title: 'Deploy to the cloud',
    completed: false,
  },
  {
    id: '4',
    title: 'Write documentation',
    completed: false,
  },
  {
    id: '5',
    title: 'Set up CI/CD pipeline',
    completed: false,
  },
];

// In-memory storage for mock data
let mockTodos: Todo[] = [...MOCK_TODOS];

export const mockDataService = {
  // Simulate API delay
  delay: (ms: number = 800) => new Promise(resolve => setTimeout(resolve, ms)),

  // Get all todos
  async getAllTodos(): Promise<Todo[]> {
    await this.delay(600);
    return [...mockTodos];
  },

  // Create a new todo
  async createTodo(title: string): Promise<Todo> {
    await this.delay(500);
    const newTodo: Todo = {
      id: (Date.now() + Math.random()).toString(),
      title,
      completed: false,
    };
    
    mockTodos = [...mockTodos, newTodo];
    return newTodo;
  },

  // Update a todo
  async updateTodo(id: string, updates: Partial<Omit<Todo, 'id'>>): Promise<Todo> {
    await this.delay(400);
    const todoIndex = mockTodos.findIndex(t => t.id === id);
    
    if (todoIndex === -1) {
      throw new Error('Todo not found');
    }
    
    const updatedTodo = { ...mockTodos[todoIndex], ...updates };
    mockTodos = mockTodos.map((todo, index) => 
      index === todoIndex ? updatedTodo : todo
    );
    
    return updatedTodo;
  },

  // Delete a todo
  async deleteTodo(id: string): Promise<void> {
    await this.delay(400);
    const todoExists = mockTodos.some(t => t.id === id);
    if (!todoExists) {
      throw new Error('Todo not found');
    }
    
    mockTodos = mockTodos.filter(t => t.id !== id);
  },

  // Toggle todo completion
  async toggleTodo(id: string): Promise<Todo> {
    const todo = mockTodos.find(t => t.id === id);
    if (!todo) {
      throw new Error('Todo not found');
    }
    
    return this.updateTodo(id, { completed: !todo.completed });
  },

  // Reset to initial mock data
  async resetData(): Promise<void> {
    await this.delay(300);
    mockTodos = [...MOCK_TODOS];
  },

  // Get statistics
  async getStats(): Promise<{ total: number; completed: number; active: number }> {
    await this.delay(200);
    const total = mockTodos.length;
    const completed = mockTodos.filter(t => t.completed).length;
    const active = total - completed;
    
    return { total, completed, active };
  }
};
