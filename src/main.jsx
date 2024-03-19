import ReactDOM from "react-dom/client";
import { Auth0Provider } from "@auth0/auth0-react";
import App from "./App.jsx";
import { Provider } from "react-redux";
import store from "./Redux/store.js";

const AUTH0_DOMAIN = import.meta.env.VITE_APP_AUTH0_DOMAIN;
const AUTH0_CLIENTID = import.meta.env.VITE_APP_AUTH0_CLIENTID;

import "./index.scss";

ReactDOM.createRoot(document.getElementById("root")).render(
    <Auth0Provider
        domain={AUTH0_DOMAIN}
        clientId={AUTH0_CLIENTID}
        authorizationParams={{
            redirect_uri: window.location.origin,
        }}
    >
        <Provider store={store}>
            <App />
        </Provider>
    </Auth0Provider>
);
