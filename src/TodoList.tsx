import './TodoList.css';
import React from 'react';
import { TaskList } from './components/TaskList';
import { CurrentDate } from './components/CurrentDate';
import { TaskForm } from './components/TaskForm';

const TodoApp: React.FC = () => {
  return (
    <>
      <h1>Just do it!</h1>
      <CurrentDate />
      <TaskForm />
      <TaskList />
    </>
  );
};

export default TodoApp;
