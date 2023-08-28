import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import "./styles.css";


const layoutStyles = {
     display: "flex",
     flexDirection: "column",
     justifyContent: "center",
     alignItems: "center",
     minHeight: "100vh",
     padding: "0%",
};

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
     <React.StrictMode>
          <div style={layoutStyles}>
               <App />
          </div>
     </React.StrictMode>,

);
