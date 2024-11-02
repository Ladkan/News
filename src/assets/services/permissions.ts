import { createSignal } from "solid-js";
import { pb } from "./pb";

const mapping = new Map();
const [user_role, setRole] = createSignal();

const action = {
    CREATE_ARTICLE: "CREATE_ARTICLE",
    UPDATE_ARTICLE: "UPDATE_ARTICLE",
    DELETE_ARTICLE: "DELETE_ARTICLE",
    VIEW_ARTICLE: "VIEW_ARTICLE"
}

const roles = {
    ADMIN: "ADMIN",
    EDITOR: "EDITOR",
    USER: "USER",
    GUEST: "GUEST"
}

const reloadRole = () => {
    if(!pb.authStore.model){
        setRole(roles.GUEST)
    } else if(pb.authStore.model.type === 'ADMIN'){
        setRole(roles.ADMIN)
    } else if(pb.authStore.model.type === 'USER'){
      setRole(roles.USER)
    } else if(pb.authStore.model.type === 'EDITOR'){
        setRole(roles.EDITOR)
    }  
}

function hasPermission(role:any, action:string){
    if(!role) return false

    if(mapping.has(action)) return mapping.get(action).includes(role)

    return false
    
}

mapping.set(action.CREATE_ARTICLE, [roles.ADMIN, roles.EDITOR])
mapping.set(action.DELETE_ARTICLE, [roles.ADMIN])
mapping.set(action.UPDATE_ARTICLE, [roles.ADMIN, roles.EDITOR])
mapping.set(action.VIEW_ARTICLE, [roles.ADMIN, roles.EDITOR, roles.GUEST, roles.USER])

export default hasPermission
export {hasPermission, action, roles, user_role, setRole, reloadRole}