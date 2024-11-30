import ReactDOM from 'react-dom/client'
import { Provider } from "react-redux"
import App from './App.tsx'
import "./app.css"
import './index.css'
import { store } from './redux/store.ts'
import { BrowserRouter } from 'react-router-dom'

ReactDOM.createRoot(document.getElementById('root')!).render(
  
    <Provider store={store}>
      <BrowserRouter>
      <App />
      </BrowserRouter>
    </Provider>
 
)
