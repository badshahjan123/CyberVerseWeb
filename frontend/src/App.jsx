import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import { AppProvider } from './contexts/app-context'
import Navbar from './components/navbar'
import Footer from './components/footer'
import { Suspense, lazy } from 'react'
import './App.css'

// Lazy load pages for better performance
const Home = lazy(() => import('./pages/Home'))
const Labs = lazy(() => import('./pages/Labs'))
const LabDetail = lazy(() => import('./pages/LabDetail'))
const Dashboard = lazy(() => import('./pages/Dashboard'))
const Premium = lazy(() => import('./pages/Premium'))
const Checkout = lazy(() => import('./pages/Checkout'))
const PaymentSuccess = lazy(() => import('./pages/PaymentSuccess'))
const Certificates = lazy(() => import('./pages/Certificates'))
const Login = lazy(() => import('./pages/Login'))
const Register = lazy(() => import('./pages/Register'))
const VerifyEmail = lazy(() => import('./pages/VerifyEmail'))
const VerifyOTP = lazy(() => import('./pages/VerifyOTP'))
const EmailVerificationPending = lazy(() => import('./pages/EmailVerificationPending'))
const Rooms = lazy(() => import('./pages/Rooms'))
const RoomDetail = lazy(() => import('./pages/RoomDetail'))
const Leaderboard = lazy(() => import('./pages/Leaderboard'))
const Profile = lazy(() => import('./pages/Profile'))
const Settings = lazy(() => import('./pages/Settings'))
const SecureAdminLogin = lazy(() => import('./pages/SecureAdminLogin'))
const SecureAdminDashboard = lazy(() => import('./pages/SecureAdminDashboard'))



// Loading component
const PageLoader = () => (
  <div className="min-h-screen flex items-center justify-center bg-slate-950">
    <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-500"></div>
  </div>
)

function App() {
  const isAdminRoute = window.location.pathname.startsWith('/secure-admin')
  
  return (
    <Router>
      <AppProvider>
        <Suspense fallback={<PageLoader />}>
          {isAdminRoute ? (
            <Routes>
              <Route path="/secure-admin-login" element={<SecureAdminLogin />} />
              <Route path="/secure-admin-dashboard" element={<SecureAdminDashboard />} />
            </Routes>
          ) : (
            <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 flex flex-col">
              <Navbar />
              <main className="flex-1">
                <Routes>
                  <Route path="/" element={<Home />} />
                  <Route path="/labs" element={<Labs />} />
                  <Route path="/labs/:id" element={<LabDetail />} />
                  <Route path="/dashboard" element={<Dashboard />} />
                  <Route path="/premium" element={<Premium />} />
                  <Route path="/checkout" element={<Checkout />} />
                  <Route path="/payment-success" element={<PaymentSuccess />} />
                  <Route path="/certificates" element={<Certificates />} />
                  <Route path="/login" element={<Login />} />
                  <Route path="/register" element={<Register />} />
                  <Route path="/verify-email" element={<VerifyEmail />} />
                  <Route path="/verify-otp" element={<VerifyOTP />} />
                  <Route path="/email-verification-pending" element={<EmailVerificationPending />} />
                  <Route path="/rooms" element={<Rooms />} />
                  <Route path="/rooms/:id" element={<RoomDetail />} />
                  <Route path="/leaderboard" element={<Leaderboard />} />
                  <Route path="/profile" element={<Profile />} />
                  <Route path="/settings" element={<Settings />} />
                </Routes>
              </main>
              <Footer />
            </div>
          )}
        </Suspense>
      </AppProvider>
    </Router>
  )
}

export default App