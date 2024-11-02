import { A, useNavigate } from '@solidjs/router';
import styles from './Header.module.css';
import { createEffect, createSignal, Show } from 'solid-js';
import { isLoggin, logout, pb } from '../assets/services/pb';
import hasPermission, { action, user_role } from '../assets/services/permissions';
import { alertsystem } from '../assets/services/alertsystem';


export default function Header(){
  const navigate = useNavigate();
  const [user, setUser] = createSignal();

  createEffect(() => {
    setUser(isLoggin())
  })
  
  const onLogout = async () => {
    const data = await logout();
    if(!data){
      setUser(data)
      alertsystem('success', 'Loggout', 4)
      navigate('/', {replace: true});
    }
  };

  return (
    <>
      <header class={styles.header}>
        <nav class={styles.nav}>
            <A href='/'>Home</A>
            <A href='/articles'>Articles</A>
            <Show when={user()} fallback={<A href='/login'>Login</A>}>
              <Show when={hasPermission(user_role(), action.CREATE_ARTICLE)}>
                <A href='/aricles-list'>My Articles</A>
              </Show>
              <A href='/proflile'>Profile</A>
              <a onclick={onLogout} style="cursor: pointer;">Logout</a>
            </Show>
        </nav>
      </header>
    </>
  );
};
