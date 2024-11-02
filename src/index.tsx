/* @refresh reload */
import { render } from 'solid-js/web';
import { Router, Route, A } from "@solidjs/router";
import './index.css';
import Layout from './Layout';
import { lazy } from 'solid-js';
import App from './App';
import Login from './pages/Login';
//const Home = lazy(() => import("./pages/Home"));

const root = document.getElementById('root');

if (import.meta.env.DEV && !(root instanceof HTMLElement)) {
  throw new Error(
    'Root element not found. Did you forget to add it to your index.html? Or maybe the id attribute got misspelled?',
  );
}

render(() => (
  <Router>
      <App />
  </Router>
), root!);
