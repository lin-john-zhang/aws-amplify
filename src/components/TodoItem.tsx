import React, { useState } from 'react';
import { Todo } from '../types';
import styles from './TodoItem.module.css';

interface TodoItemProps {
  todo: Todo;
  onToggle: (id: string) => Promise<void>;
  onDelete: (id: string) => Promise<void>;
}

const TodoItem: React.FC<TodoItemProps> = ({ todo, onToggle, onDelete }) => {
  const [isToggling, setIsToggling] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);

  const handleToggle = async () => {
    try {
      setIsToggling(true);
      await onToggle(todo.id);
    } catch (error) {
      console.error('Failed to toggle todo:', error);
    } finally {
      setIsToggling(false);
    }
  };

  const handleDelete = async () => {
    try {
      setIsDeleting(true);
      await onDelete(todo.id);
    } catch (error) {
      console.error('Failed to delete todo:', error);
      setIsDeleting(false);
    }
  };

  return (
    <li className={`${styles.item} ${isDeleting ? styles.deleting : ''}`}>
      <div className={styles.content}>
        <input
          type="checkbox"
          checked={todo.completed}
          onChange={handleToggle}
          disabled={isToggling}
          className={styles.checkbox}
        />
        <span
          className={`${styles.text} ${todo.completed ? styles.completed : ''}`}
        >
          {todo.title}
        </span>
        {isToggling && <span className={styles.spinner}></span>}
      </div>
      <button 
        onClick={handleDelete} 
        disabled={isDeleting || isToggling}
        className={styles.deleteButton}
      >
        {isDeleting ? '⏳' : '🗑️'}
      </button>
    </li>
  );
};

export default TodoItem; 