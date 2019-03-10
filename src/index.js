import React from "react";
import ReactDOM from "react-dom";
import {Route, Switch} from "react-router-dom";
import {HashRouter} from 'react-router-dom';
import "./assets/css/material-dashboard-react.css?v=1.5.0";
import ReactGA from 'react-ga';


import indexRoutes from "./routes/index.jsx";

ReactDOM.render(
        <HashRouter>
            <Switch>
                {indexRoutes.map((prop, key) => {
                    return <Route path={prop.path} component={prop.component} key={key}/>;
                })}
            </Switch>
        </HashRouter>,
    document.getElementById("root")
);

function initializeReactGA() {
    ReactGA.initialize('');
    ReactGA.pageview(window.location.pathname + window.location.search);
}

initializeReactGA();