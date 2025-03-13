import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter as Router } from "react-router-dom";

// CSS
import "./custom.css";
// import "./all.min.css";
import "./index.css";
import "./style.css";
// import "./Css/components/button.css";
import "./Css/components/google.css";
import "./Css/components/alert.css";
import "./Css/components/loading.css";
import "../node_modules/react-loading-skeleton/dist/skeleton.css";
import "./Pages/Auth/AuthOperations/Auth.css";
// import "bootstrap/dist/css/bootstrap.min.css";

// App
import App from "./App";

// Context
import MenuContext from "./Context/MenuContext";
import WindowContext from "./Context/WindowContext";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <WindowContext>
    <MenuContext>
      <Router>
        <App />
      </Router>
    </MenuContext>
  </WindowContext>
);
