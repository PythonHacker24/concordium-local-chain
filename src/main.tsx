import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import "./styles.css";

const layoutStyles = {
  display: "flex",
  flexDirection: "column",
  justifyContent: "center",
  alignItems: "center",
  padding: "0%",
  minHeight: "100vh",
};

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <React.StrictMode>
    <div className="" style={layoutStyles as React.CSSProperties}>
      <App />
    </div>
  </React.StrictMode>
);
