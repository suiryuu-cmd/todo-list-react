import ReactDOM from 'react-dom/client';
import TodoApp from './TodoList';
import { TaskProvider } from './context/TaskProvider';
import '@fontsource-variable/quicksand';
import './main.css';

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <TaskProvider>
    <TodoApp />
  </TaskProvider>
);
