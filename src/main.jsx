import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import './index.css'
import App from './App.jsx'
import Login from './pages/Login.jsx'
import Signup from './pages/Signup.jsx'
import ForgotPassword from './pages/ForgotPassword.jsx'
import Pricing from './pages/Pricing.jsx'
import ResetPassword from './pages/ResetPassword.jsx'
import DashboardLayout from './components/dashboard/DashboardLayout.jsx'
import Overview from './pages/dashboard/Overview.jsx'
import SearchPage from './pages/dashboard/SearchPage.jsx'
import Memos from './pages/dashboard/Memos.jsx'
import Library from './pages/dashboard/Library.jsx'
import Settings from './pages/dashboard/Settings.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<App />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/forgot-password" element={<ForgotPassword />} />
        <Route path="/reset-password" element={<ResetPassword />} />
        <Route path="/pricing" element={<Pricing />} />
        <Route path="/dashboard" element={<DashboardLayout />}>
          <Route index element={<Overview />} />
          <Route path="search" element={<SearchPage />} />
          <Route path="memos" element={<Memos />} />
          <Route path="library" element={<Library />} />
          <Route path="settings" element={<Settings />} />
        </Route>
      </Routes>
    </BrowserRouter>
  </StrictMode>,
)
