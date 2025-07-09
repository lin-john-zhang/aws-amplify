import { useState, useEffect, useCallback } from 'react';
import { Todo } from '../types';
import { todoService } from '../lib/todoService';
import { DataMode } from '../config/dataModes';

interface UseTodosReturn {
  todos: Todo[];
  loading: boolean;
  error: string | null;
  currentMode: DataMode;
  addTodo: (title: string) => Promise<void>;
  updateTodo: (id: string, updates: Partial<Omit<Todo, 'id'>>) => Promise<void>;
  deleteTodo: (id: string) => Promise<void>;
  toggleTodo: (id: string) => Promise<void>;
  refreshTodos: () => Promise<void>;
  changeMode: (mode: DataMode) => Promise<void>;
}

export const useTodos = (): UseTodosReturn => {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [currentMode, setCurrentMode] = useState<DataMode>(() => todoService.getCurrentMode());

  // Load todos from storage/backend
  const loadTodos = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);
      const fetchedTodos = await todoService.getAllTodos();
      setTodos(fetchedTodos);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to load todos');
    } finally {
      setLoading(false);
    }
  }, []);

  // Change data mode
  const changeMode = useCallback(async (mode: DataMode) => {
    try {
      setError(null);
      todoService.setDataMode(mode);
      setCurrentMode(mode);
      // Reload todos from the new data source
      await loadTodos();
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to change data mode');
      throw err;
    }
  }, [loadTodos]);

  // Add a new todo
  const addTodo = useCallback(async (title: string) => {
    try {
      setError(null);
      const newTodo = await todoService.createTodo(title);
      setTodos(prev => [...prev, newTodo]);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to add todo');
      throw err;
    }
  }, []);

  // Update an existing todo
  const updateTodo = useCallback(async (id: string, updates: Partial<Omit<Todo, 'id'>>) => {
    try {
      setError(null);
      const updatedTodo = await todoService.updateTodo(id, updates);
      setTodos(prev => prev.map(todo => 
        todo.id === id ? updatedTodo : todo
      ));
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to update todo');
      throw err;
    }
  }, []);

  // Delete a todo
  const deleteTodo = useCallback(async (id: string) => {
    try {
      setError(null);
      await todoService.deleteTodo(id);
      setTodos(prev => prev.filter(todo => todo.id !== id));
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to delete todo');
      throw err;
    }
  }, []);

  // Toggle todo completion
  const toggleTodo = useCallback(async (id: string) => {
    try {
      setError(null);
      const updatedTodo = await todoService.toggleTodo(id);
      setTodos(prev => prev.map(todo => 
        todo.id === id ? updatedTodo : todo
      ));
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to toggle todo');
      throw err;
    }
  }, []);

  // Refresh todos
  const refreshTodos = useCallback(async () => {
    await loadTodos();
  }, [loadTodos]);

  // Load todos on mount
  useEffect(() => {
    loadTodos();
  }, [loadTodos]);

  return {
    todos,
    loading,
    error,
    currentMode,
    addTodo,
    updateTodo,
    deleteTodo,
    toggleTodo,
    refreshTodos,
    changeMode
  };
};
