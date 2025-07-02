import React, { useState } from 'react';
import { Todo } from './types';
import AddTodo from './components/AddTodo';
import TodoList from './components/TodoList';
import styles from './App.module.css';

const App: React.FC = () => {
  const [todos, setTodos] = useState<Todo[]>([]);

  const addTodo = (title: string) => {
    setTodos(prev => [
      ...prev,
      { id: Date.now().toString(), title, completed: false },
    ]);
  };

  const toggleTodo = (id: string) => {
    setTodos(prev =>
      prev.map(todo =>
        todo.id === id ? { ...todo, completed: !todo.completed } : todo
      )
    );
  };

  const deleteTodo = (id: string) => {
    setTodos(prev => prev.filter(todo => todo.id !== id));
  };

  return (
    <div className={styles.container}>
      <h1 className={styles.title}>To-Do List</h1>
      <AddTodo onAdd={addTodo} />
      <TodoList todos={todos} onToggle={toggleTodo} onDelete={deleteTodo} />
    </div>
  );
};

export default App;
