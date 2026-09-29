import ReactDOM from 'react-dom/client';
import App from './App';
import { TaskProvider } from './context/TaskProvider';
import '@fontsource-variable/quicksand';
import '@fontsource-variable/bricolage-grotesque';
import './main.css';

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <TaskProvider>
    <App />
  </TaskProvider>,
);
