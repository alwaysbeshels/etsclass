import React from "react";
import ReactDOM from "react-dom";
import {Provider} from "react-redux";
import {createBrowserHistory} from "history";
// eslint-disable-next-line
import {Router, Route, Switch} from "react-router-dom";
import {HashRouter} from 'react-router-dom';
import "./assets/css/material-dashboard-react.css?v=1.5.0";

import indexRoutes from "./routes/index.jsx";
import store from "./store";

const hist = createBrowserHistory();

ReactDOM.render(
    <Provider store={store}>
        <HashRouter history={hist}>
            <Switch>
                {indexRoutes.map((prop, key) => {
                    return <Route path={prop.path} component={prop.component} key={key}/>;
                })}
            </Switch>
        </HashRouter>
    </Provider>,
    document.getElementById("root")
);
