import { useState, useEffect } from 'react'
import { Routes, Route, Link, useLocation, Navigate } from 'react-router-dom'
import Cart from './components/Cart'
import { FaShieldAlt } from 'react-icons/fa'
import { AuthProvider, useAuth } from './context/AuthContext'
import DashboardLayout from './components/layout/DashboardLayout'
import AdminDashboardLayout from './components/layout/AdminDashboardLayout'

// Pages
import HomePage from './pages/HomePage'
import ShopPage from './pages/ShopPage'
import LoginPage from './pages/LoginPage'
import AdminLoginPage from './pages/AdminLoginPage'
import RegisterPage from './pages/RegisterPage'
import ServicesPage from './pages/ServicesPage'
import MarketPage from './pages/MarketPage'
import TasksPage from './pages/TasksPage'
import AiVetPage from './pages/AiVetPage'
import AdminOverviewPage from './pages/AdminOverviewPage'

// Protected Route Wrapper for Client/Employee
const PrivateRoute = ({ children }) => {
   const { user, loading } = useAuth();

   if (loading) return <div>Loading...</div>; // Or a spinner

   if (!user) {
      return <Navigate to="/login" replace />;
   }

   // Optional: Redirect admin to admin dashboard if they try to access client dashboard
   // if (user.role === 'admin') {
   //    return <Navigate to="/admin/dashboard" replace />;
   // }

   return children;
};

// Protected Route Wrapper for Admin
const AdminRoute = ({ children }) => {
   const { user, loading } = useAuth();

   if (loading) return <div>Loading...</div>;

   // Simple check: user must exist. 
   // In a real app, also check user.role === 'admin'
   // For now, let's assume if they logged in via admin page they are admin 
   // OR strictly check role if backend supports it.
   // Let's assume user object has a role property for safety.

   if (!user) { // || user.role !== 'admin'
      // If not logged in, go to admin login
      return <Navigate to="/admin/login" replace />;
   }

   // If we had role check:
   // if (user.role !== 'admin') return <Navigate to="/dashboard" replace />;

   return children;
};

// Public Navbar (Existing)
function PublicNavbar() {
   const [scrolled, setScrolled] = useState(false);
   const location = useLocation();
   const { user, logout } = useAuth();

   useEffect(() => {
      const handleScroll = () => {
         setScrolled(window.scrollY > 10);
      };
      window.addEventListener('scroll', handleScroll);
      return () => window.removeEventListener('scroll', handleScroll);
   }, []);

   const isHome = location.pathname === '/';
   const navbarClass = scrolled || !isHome
      ? 'bg-white/90 backdrop-blur-xl border-slate-200 py-3 shadow-sm'
      : 'bg-transparent border-transparent py-6';

   const navTextClass = scrolled || !isHome ? 'text-slate-600' : 'text-white/90';
   const logoTextClass = scrolled || !isHome ? 'text-slate-900' : 'text-white';
   const logoIconClass = scrolled || !isHome ? 'bg-primary/5 text-primary' : 'bg-white/10 text-white backdrop-blur-md';

   return (
      <header className={`fixed w-full z-50 transition-all duration-500 ease-out border-b ${navbarClass}`}>
         <div className="container mx-auto px-6 max-w-7xl flex justify-between items-center">
            <Link to="/" className="flex items-center gap-3 group cursor-pointer">
               <img src="/logo.png" alt="EkanaVet Logo" className="w-10 h-10 object-contain" />
               <h1 className={`text-xl font-bold tracking-tight transition-colors duration-300 ${logoTextClass}`}>
                  Ekana<span className={scrolled || !isHome ? 'text-primary' : 'text-emerald-300'}>Vet</span>
               </h1>
            </Link>

            <nav className="hidden md:block">
               <ul className={`flex gap-10 text-sm font-medium transition-colors duration-300 ${navTextClass}`}>
                  <li>
                     <Link to="/" className="hover:text-primary transition-colors py-1">Home</Link>
                  </li>
                  <li>
                     <Link to="/services" className="hover:text-primary transition-colors py-1">Services</Link>
                  </li>
               </ul>
            </nav>

            <div className="flex items-center gap-6">
               <Cart scrolled={scrolled || !isHome} />

               {user ? (
                  <Link to={user.role === 'admin' ? "/admin/dashboard" : "/dashboard"} className={`px-6 py-2.5 rounded-lg text-sm font-semibold transition-all duration-300 ${scrolled || !isHome
                     ? 'bg-slate-900 text-white hover:bg-slate-800'
                     : 'bg-white text-primary hover:bg-emerald-50'
                     }`}>
                     Go to Dashboard
                  </Link>
               ) : (
                  <Link to="/login" className={`px-6 py-2.5 rounded-lg text-sm font-semibold transition-all duration-300 ${scrolled || !isHome
                     ? 'bg-slate-900 text-white hover:bg-slate-800'
                     : 'bg-white text-primary hover:bg-emerald-50'
                     }`}>
                     Portal Login
                  </Link>
               )}
            </div>
         </div>
      </header>
   )
}

function PublicFooter() {
   return (
      <footer className="bg-white border-t border-slate-200 py-12 mt-auto">
         <div className="container mx-auto px-6 max-w-7xl flex flex-col md:flex-row justify-between items-center gap-6">
            <div className="flex items-center gap-2 text-slate-900">
               <img src="/logo.png" alt="EkanaVet" className="w-8 h-8 object-contain" />
               <span className="font-bold tracking-tight">EkanaVet Enterprise</span>
            </div>
            <div className="flex gap-6 text-sm text-slate-500">
               <Link to="/login" className="hover:text-primary">Partner Portal</Link>
               {['localhost', '127.0.0.1'].includes(window.location.hostname) && (
                  <Link to="/admin/login" className="hover:text-primary">Admin Access</Link>
               )}
               <a href="#" className="hover:text-primary">Legal</a>
            </div>
            <p className="text-slate-400 text-sm">
               © 2025 EkanaVet. Licensed Pharmaceutical Distributor.
            </p>
         </div>
      </footer>
   );
}

const PublicLayout = ({ children }) => (
   <div className="min-h-screen bg-slate-50 font-sans text-slate-800 flex flex-col">
      <PublicNavbar />
      <div className="flex-grow">
         {children}
      </div>
      <PublicFooter />
   </div>
);

function App() {
   return (
      <AuthProvider>
         <Routes>
            {/* Public Routes */}
            <Route path="/" element={<PublicLayout><HomePage /></PublicLayout>} />
            <Route path="/shop" element={<PublicLayout><ShopPage /></PublicLayout>} />
            <Route path="/services" element={<PublicLayout><ServicesPage /></PublicLayout>} />
            <Route path="/login" element={<PublicLayout><LoginPage /></PublicLayout>} />
            <Route path="/admin/login" element={<PublicLayout><AdminLoginPage /></PublicLayout>} />
            <Route path="/register" element={<PublicLayout><RegisterPage /></PublicLayout>} />

            {/* Private Dashboard Routes - Client/Employee */}
            <Route path="/dashboard" element={
               <PrivateRoute>
                  <DashboardLayout><MarketPage /></DashboardLayout>
               </PrivateRoute>
            } />
            <Route path="/market" element={
               <PrivateRoute>
                  <DashboardLayout><MarketPage /></DashboardLayout>
               </PrivateRoute>
            } />
            <Route path="/tasks" element={
               <PrivateRoute>
                  <DashboardLayout><TasksPage /></DashboardLayout>
               </PrivateRoute>
            } />
            <Route path="/ai-vet" element={
               <PrivateRoute>
                  <DashboardLayout><AiVetPage /></DashboardLayout>
               </PrivateRoute>
            } />

            {/* Admin Routes */}
            <Route path="/admin/dashboard" element={
               <AdminRoute>
                  <AdminDashboardLayout><AdminOverviewPage /></AdminDashboardLayout>
               </AdminRoute>
            } />
            {/* Add more admin routes here as we build them */}
            <Route path="/admin/*" element={
               <AdminRoute>
                  <AdminDashboardLayout><AdminOverviewPage /></AdminDashboardLayout>
               </AdminRoute>
            } />

         </Routes>
      </AuthProvider>
   )
}

export default App
