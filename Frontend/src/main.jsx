import React from "react"
import ReactDOM from "react-dom/client"
import App from "./App"
import "./styles/global.css"
import "./styles/index.css"
import { AuthProvider } from "./context/auth.context.jsx"
import { Provider } from "react-redux"
import store from "./redux/store.js"

const root = ReactDOM.createRoot(document.getElementById('root'))
root.render(
  <Provider store={store}>
  <AuthProvider>
    <App/>
  </AuthProvider>
  </Provider>
)
