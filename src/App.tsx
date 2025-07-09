import React from 'react';
import { useTodos } from './hooks/useTodos';
import AddTodo from './components/AddTodo';
import TodoList from './components/TodoList';
import styles from './App.module.css';

const App: React.FC = () => {
  const {
    todos,
    loading,
    error,
    addTodo,
    toggleTodo,
    deleteTodo,
    refreshTodos
  } = useTodos();

  return (
    <div className={styles.container}>
      <header className={styles.header}>
        <h1 className={styles.title}>📝 To-Do List</h1>
        <p className={styles.subtitle}>Manage your tasks efficiently</p>
      </header>
      
      <main className={styles.main}>
        <AddTodo onAdd={addTodo} />
        <TodoList 
          todos={todos} 
          loading={loading}
          error={error}
          onToggle={toggleTodo} 
          onDelete={deleteTodo}
          onRefresh={refreshTodos}
        />
      </main>
      
      <footer className={styles.footer}>
        <p>
          💡 This app uses localStorage for data persistence. 
          {' '}
          <span className={styles.highlight}>
            Ready to connect to AWS Amplify backend!
          </span>
        </p>
      </footer>
    </div>
  );
};

export default App;
