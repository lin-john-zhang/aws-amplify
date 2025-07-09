import React, { useState } from 'react';
import { Todo } from '../types';
import TodoItem from './TodoItem';
import styles from './TodoList.module.css';

interface TodoListProps {
  todos: Todo[];
  loading: boolean;
  error: string | null;
  onToggle: (id: string) => Promise<void>;
  onDelete: (id: string) => Promise<void>;
  onRefresh: () => Promise<void>;
}

type FilterType = 'all' | 'active' | 'completed';

const TodoList: React.FC<TodoListProps> = ({ 
  todos, 
  loading, 
  error, 
  onToggle, 
  onDelete,
  onRefresh 
}) => {
  const [filter, setFilter] = useState<FilterType>('all');

  // Filter todos based on current filter
  const filteredTodos = todos.filter(todo => {
    switch (filter) {
      case 'active':
        return !todo.completed;
      case 'completed':
        return todo.completed;
      default:
        return true;
    }
  });

  // Get counts for each filter
  const counts = {
    all: todos.length,
    active: todos.filter(t => !t.completed).length,
    completed: todos.filter(t => t.completed).length
  };

  if (loading) {
    return (
      <div className={styles.container}>
        <div className={styles.loading}>
          <div className={styles.spinner}></div>
          <p>Loading todos...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className={styles.container}>
        <div className={styles.error}>
          <p className={styles.errorMessage}>Error: {error}</p>
          <button onClick={onRefresh} className={styles.retryButton}>
            Retry
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className={styles.container}>
      {/* Filter tabs */}
      <div className={styles.filterTabs}>
        <button 
          className={`${styles.filterTab} ${filter === 'all' ? styles.active : ''}`}
          onClick={() => setFilter('all')}
        >
          All ({counts.all})
        </button>
        <button 
          className={`${styles.filterTab} ${filter === 'active' ? styles.active : ''}`}
          onClick={() => setFilter('active')}
        >
          Active ({counts.active})
        </button>
        <button 
          className={`${styles.filterTab} ${filter === 'completed' ? styles.active : ''}`}
          onClick={() => setFilter('completed')}
        >
          Completed ({counts.completed})
        </button>
      </div>

      {/* Refresh button */}
      <div className={styles.actions}>
        <button onClick={onRefresh} className={styles.refreshButton}>
          🔄 Refresh
        </button>
      </div>

      {/* Todo list */}
      {filteredTodos.length === 0 ? (
        <div className={styles.empty}>
          <p>
            {filter === 'all' 
              ? 'No todos yet! Add one above.' 
              : `No ${filter} todos.`
            }
          </p>
        </div>
      ) : (
        <ul className={styles.list}>
          {filteredTodos.map(todo => (
            <TodoItem 
              key={todo.id} 
              todo={todo} 
              onToggle={onToggle} 
              onDelete={onDelete} 
            />
          ))}
        </ul>
      )}

      {/* Summary */}
      {todos.length > 0 && (
        <div className={styles.summary}>
          <p>
            {counts.completed} of {counts.all} completed
            {counts.active > 0 && (
              <span className={styles.remaining}>
                {' '}• {counts.active} remaining
              </span>
            )}
          </p>
        </div>
      )}
    </div>
  );
};

export default TodoList; 