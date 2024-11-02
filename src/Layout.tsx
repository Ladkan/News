import { A } from '@solidjs/router';
import styles from './Layout.module.css';
import { onMount } from 'solid-js';

const Layout = (props: { children: any; }) => {

  return (
    <>
      <header class={styles.header}>
        <nav class={styles.nav}>
            <A href='/'>Home</A>
        </nav>
      </header>
      {props.children}
    </>
  );
};

export default Layout;
