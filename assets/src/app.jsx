import React from "react";
import ReactDOM from "react-dom";
import promise from "redux-promise";
import { Provider } from "react-redux";
import { createStore, applyMiddleware } from "redux";
// route
import { HashRouter, Route, Switch } from "react-router-dom";
import indexRoutes from "routes/index.jsx";
// redux
import reducers from "./reducers/index.jsx";
const createStoreWithMiddleware = applyMiddleware(promise)(createStore);

import "bootstrap/dist/css/bootstrap.min.css";
import "../styles/main.css";

ReactDOM.render(
    <Provider store={createStoreWithMiddleware(reducers)}>
        <HashRouter>
            <Switch>
                {indexRoutes.map((prop, key) => {
                    return <Route to={prop.path} component={prop.component} key={key} />;
                })}
            </Switch>
        </HashRouter>
    </Provider>,
    document.getElementById("app")
);
