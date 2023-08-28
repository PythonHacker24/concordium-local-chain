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
          <div className="bg-gradient-to-b from-ctp-base to-ctp-crust p-6" style={layoutStyles as React.CSSProperties}>
               <App />
          </div>
     </React.StrictMode>,

);
