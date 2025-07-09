import React from 'react';
import { useTodos } from './hooks/useTodos';
import AddTodo from './components/AddTodo';
import TodoList from './components/TodoList';
import DataModeSelector from './components/DataModeSelector';
import { DATA_MODES } from './config/dataModes';
import styles from './App.module.css';

const App: React.FC = () => {
  const {
    todos,
    loading,
    error,
    currentMode,
    addTodo,
    toggleTodo,
    deleteTodo,
    refreshTodos,
    changeMode
  } = useTodos();

  const currentModeConfig = DATA_MODES[currentMode];

  return (
    <div className={styles.container}>
      <header className={styles.header}>
        <h1 className={styles.title}>📝 To-Do List</h1>
        <p className={styles.subtitle}>Manage your tasks efficiently</p>
      </header>
      
      <div className={styles.controls}>
        <DataModeSelector 
          currentMode={currentMode}
          onModeChange={changeMode}
        />
      </div>
      
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
          💡 Currently using: {currentModeConfig.label}
          {' '}
          <span className={styles.highlight}>
            {currentModeConfig.description}
          </span>
        </p>
      </footer>
    </div>
  );
};

export default App;
