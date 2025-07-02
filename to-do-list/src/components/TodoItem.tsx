import React from 'react';
import { Todo } from '../types';
import styles from './TodoItem.module.css';

interface TodoItemProps {
  todo: Todo;
  onToggle: (id: string) => void;
  onDelete: (id: string) => void;
}

const TodoItem: React.FC<TodoItemProps> = ({ todo, onToggle, onDelete }) => {
  return (
    <li className={styles.item}>
      <input
        type="checkbox"
        checked={todo.completed}
        onChange={() => onToggle(todo.id)}
      />
      <span
        className={todo.completed ? `${styles.text} ${styles.completed}` : styles.text}
      >
        {todo.title}
      </span>
      <button onClick={() => onDelete(todo.id)} className={styles.deleteButton}>Delete</button>
    </li>
  );
};

export default TodoItem; 