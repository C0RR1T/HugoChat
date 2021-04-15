import React from "react";
import Chat from "./chat/Chat";
import {BrowserRouter, Route, Redirect} from "react-router-dom";

const App = () => {
    return (
        <BrowserRouter>
            <Route exact path="/">
                <Redirect to="00000000-0000-0000-0000-000000000000"/>
            </Route>
            <Route path="/:roomId">
                <Chat/>
            </Route>
        </BrowserRouter>
    )
}

export default App;