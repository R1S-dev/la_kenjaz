import React from "react";
import { createRoot } from "react-dom/client";
import App from "./App";
import "./style.css";
class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { failed: false };
  }
  static getDerivedStateFromError() {
    return { failed: true };
  }
  render() {
    return this.state.failed ? (
      <main className="error-page">
        <h1>Trenutak slabosti.</h1>
        <p>Analiza nije uspela. Osveži stranicu i pokušaj ponovo.</p>
        <button className="primary" onClick={() => location.reload()}>
          POKUŠAJ PONOVO
        </button>
      </main>
    ) : (
      this.props.children
    );
  }
}
createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <ErrorBoundary>
      <App />
    </ErrorBoundary>
  </React.StrictMode>,
);
