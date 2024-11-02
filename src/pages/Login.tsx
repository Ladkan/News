import { createSignal } from "solid-js";
import {  useNavigate } from "@solidjs/router";
import styles from './Login.module.css';
import { Auth, pb } from "../assets/services/pb";


export default function Login(){

    const [name, setName] = createSignal('');
    const [passwd, setPasswd] = createSignal('');
    const navigate = useNavigate();
    const handleSubmit = async (event: Event): Promise<void> =>{
        event.preventDefault();
        const data = await Auth(name(), passwd());
        if(data){
            navigate('/', {replace: true});
        }
      }

      return(
          <section class={styles.container}>
              <div class={styles.flex}>
                <form class={styles.form} onsubmit={handleSubmit}>
                <h1>Login</h1>
                <label for="name">Name:</label>
                  <input type="text" id="name" onchange={(e) => setName(e.target.value)}/>
                <label for="img">Password:</label>
                  <input type="password" id="img" onchange={(e) => setPasswd(e.target.value)} />
              <br />
                <input style="cursor: pointer" type="submit" value="Submit" />
              </form>
              </div>
          </section>
      )

}