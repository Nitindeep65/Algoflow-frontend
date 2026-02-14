import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Login from './api/auth/Login/login-page-01'
import Signup from './api/auth/Signup/Signup-page-01'
import Dashboard from './dashboard'
import { ThemeProvider } from './components/ui/components/theme-provider'
import Admin from './admin'
import NewProject from './admin/components/newProject'
import CodeEditor from './dashboard/code'


createRoot(document.getElementById('root')).render(
  <BrowserRouter>
  <ThemeProvider defaultTheme='dark' storageKey='vite-ui-theme'>
    <Routes>
      <Route path='/' element={<App/>}/>
      <Route path='/Login' element={<Login/>}/>
      <Route path='/Signup' element={<Signup/>}/>
      <Route path='/Dashboard' element={<Dashboard/>}/>
      <Route path='/CodeEditor/:questionId' element={<CodeEditor/>}/>
      <Route path='/Admin' element={<Admin/>}/>
      <Route path='/newProject' element={<NewProject/>}/>
    </Routes>
    </ThemeProvider>
  </BrowserRouter>,
)
