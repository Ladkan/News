import { createEffect, createResource, For, on, Show, type Component } from 'solid-js';
import styles from './Home.module.css';
import { alertsystem } from '../assets/services/alertsystem';
import Header from '../components/Header';
import { isLoggin } from '../assets/services/pb';

const Home: Component = () => {

  createEffect(() => {
    isLoggin()
  })

  return (
      <>
        <Header/>
        <section>
            <h1>Home</h1>
            <button onclick={() => alertsystem('info','Test',4)}>Test</button>
        </section>
      </>
  );
};

export default Home;
