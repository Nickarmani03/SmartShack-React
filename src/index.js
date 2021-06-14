import React from "react"
import ReactDOM from "react-dom"
import { BrowserRouter as Router } from "react-router-dom"
import { SmartShack } from "./components/SmartShack"
import "./index.css"

ReactDOM.render(
  <React.StrictMode>
    <Router>
    <SmartShack />
    </Router>
  </React.StrictMode>,
  document.getElementById('root')
)