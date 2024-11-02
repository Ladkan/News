import PocketBase from 'pocketbase';
import { alertsystem } from './alertsystem';
import { reloadRole } from './permissions';
export const pb = new PocketBase("https://ladkan-news.pockethost.io/");

export async function Auth(name:string, psswd: string){
    try{
        await pb.collection('users').authWithPassword(name, psswd);
        alertsystem('success', `User ${pb.authStore.model.name} was loggin`, 4);
        reloadRole()
        return pb.authStore.model
    } catch(e){
        alertsystem('error', `User ${e} was loggin`, 4); 
    }
}

export async function logout() {
    pb.authStore.clear();
    return pb.authStore.isValid
}

export function isLoggin(){
    return pb.authStore.isValid
}