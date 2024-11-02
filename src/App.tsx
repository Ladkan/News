import { Route, Router } from "@solidjs/router"
import Home from "./pages/Home"
import Login from "./pages/Login"
import { onMount } from "solid-js"
import { reloadRole } from "./assets/services/permissions"

function App() {

    onMount(() => {
        reloadRole()
    })

    return (
        <>
            <Route>
                <Route path="/" component={Home}  />
                <Route path="/login" component={Login} />
            </Route>
        </>
    )
}

export default App