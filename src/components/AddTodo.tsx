import React, { useState } from 'react';
import styles from './AddTodo.module.css';

interface AddTodoProps {
  onAdd: (title: string) => void;
}

const AddTodo: React.FC<AddTodoProps> = ({ onAdd }) => {
  const [title, setTitle] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (title.trim()) {
      onAdd(title.trim());
      setTitle('');
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
      />
      <button type="submit" className={styles.button}>Add</button>
    </form>
  );
};

export default AddTodo; 