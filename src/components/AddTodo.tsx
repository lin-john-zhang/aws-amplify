import React, { useState } from 'react';
import styles from './AddTodo.module.css';

interface AddTodoProps {
  onAdd: (title: string) => Promise<void>;
}

const AddTodo: React.FC<AddTodoProps> = ({ onAdd }) => {
  const [title, setTitle] = useState('');
  const [isAdding, setIsAdding] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (title.trim() && !isAdding) {
      try {
        setIsAdding(true);
        await onAdd(title.trim());
        setTitle('');
      } catch (error) {
        console.error('Failed to add todo:', error);
      } finally {
        setIsAdding(false);
      }
    }
  };

  return (
    <form onSubmit={handleSubmit} className={styles.form}>
      <input
        type="text"
        value={title}
        onChange={e => setTitle(e.target.value)}
        placeholder="Add a new to-do"
        className={styles.input}
        disabled={isAdding}
      />
      <button 
        type="submit" 
        disabled={isAdding || !title.trim()}
        className={styles.button}
      >
        {isAdding ? '⏳' : '➕'} {isAdding ? 'Adding...' : 'Add'}
      </button>
    </form>
  );
};

export default AddTodo; 