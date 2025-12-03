import { Hero } from './components/Hero';
import { Features } from './components/Features';
import { HowItWorks } from './components/HowItWorks';
import { Benefits } from './components/Benefits';
import { CTA } from './components/CTA';
import { Navigation } from './components/Navigation';
import { Pricing } from './components/Pricing';
import { PlanDetail } from './components/PlanDetail';
import { Login } from './components/Login';
import { Signup } from './components/Signup';
import { ContactUs } from './components/ContactUs';
import { Payment } from './components/Payment';
import { Dashboard } from './components/Dashboard';
import { CustomerMenu } from './components/CustomerMenu';
import { CustomerCheckout } from './components/CustomerCheckout';
import { useState, useEffect } from 'react';
import { supabase } from './utils/supabase/client';

type PageType = 'home' | 'pricing' | 'plan-detail' | 'login' | 'signup' | 'contact' | 'payment' | 'dashboard' | 'customer-menu' | 'customer-checkout';

interface UserSession {
  id: string;
  email: string;
  accessToken: string;
}

interface CartItem {
  id: string;
  name: string;
  description: string;
  price: number;
  category: string;
  available: boolean;
  imageUrl: string;
  quantity: number;
}

export default function App() {
  const [currentPage, setCurrentPage] = useState<PageType>('home');
  const [selectedPlan, setSelectedPlan] = useState<string>('Professional');
  const [billingCycle, setBillingCycle] = useState<'monthly' | 'yearly'>('monthly');
  const [userSession, setUserSession] = useState<UserSession | null>(null);
  const [pendingNavigation, setPendingNavigation] = useState<{ page: PageType; plan?: string; cycle?: 'monthly' | 'yearly' } | null>(null);
  const [tableNumber, setTableNumber] = useState<string>('');
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [isInitializing, setIsInitializing] = useState(true);

  // Check for existing session on mount and handle routing
  useEffect(() => {
    console.log('=== App Initializing ===');
    console.log('Current URL:', window.location.href);
    console.log('Hash:', window.location.hash);
    console.log('Pathname:', window.location.pathname);
    
    checkExistingSession();
    
    // Function to extract and handle menu routing
    const handleMenuRouting = () => {
      // Check hash first (for QR codes with hash routing)
      const hash = window.location.hash.slice(1);
      // Check pathname as fallback
      const pathname = window.location.pathname;
      
      console.log('Routing - Hash:', hash);
      console.log('Routing - Pathname:', pathname);
      
      // Try to match menu route from hash or pathname
      const menuMatch = hash.match(/\/menu\/(.+)/) || pathname.match(/\/menu\/(.+)/);
      
      if (menuMatch) {
        const table = menuMatch[1];
        console.log('Menu route detected! Table:', table);
        setTableNumber(table);
        setCurrentPage('customer-menu');
        
        // Ensure hash is set for consistency
        if (!hash.startsWith('/menu/')) {
          window.history.replaceState(null, '', `#/menu/${table}`);
        }
        return true;
      }
      return false;
    };
    
    // Handle routing on initial load
    handleMenuRouting();
    
    // Listen for hash changes
    const handleHashChange = () => {
      const hashPath = window.location.hash.slice(1);
      console.log('Hash changed to:', hashPath);
      const hashMenuMatch = hashPath.match(/\/menu\/(.+)/);
      
      if (hashMenuMatch) {
        const table = hashMenuMatch[1];
        console.log('Hash menu match! Table:', table);
        setTableNumber(table);
        setCurrentPage('customer-menu');
      }
    };
    
    window.addEventListener('hashchange', handleHashChange);
    return () => window.removeEventListener('hashchange', handleHashChange);
  }, []);

  const checkExistingSession = async () => {
    try {
      const { data: { session } } = await supabase.auth.getSession();
      
      if (session?.user && session?.access_token) {
        setUserSession({
          id: session.user.id,
          email: session.user.email || '',
          accessToken: session.access_token
        });
      }
    } catch (error) {
      console.error('Error checking session:', error);
    } finally {
      setIsInitializing(false);
    }
  };

  const handleLogin = (session: UserSession) => {
    setUserSession(session);
    
    // If there was a pending navigation (user tried to view plan before login), go there
    if (pendingNavigation) {
      if (pendingNavigation.page === 'payment') {
        setSelectedPlan(pendingNavigation.plan || 'Professional');
        setBillingCycle(pendingNavigation.cycle || 'monthly');
      }
      setCurrentPage(pendingNavigation.page);
      setPendingNavigation(null);
    } else {
      // After login, redirect to dashboard
      setCurrentPage('dashboard');
    }
  };

  const handleLogout = async () => {
    try {
      await supabase.auth.signOut();
      setUserSession(null);
      setCurrentPage('home');
    } catch (error) {
      console.error('Error logging out:', error);
    }
  };

  const handleNavigate = (page: PageType, planName?: string, cycle?: 'monthly' | 'yearly') => {
    // If navigating to payment page, check if user is logged in
    if (page === 'payment') {
      if (!userSession) {
        // Store the intended navigation and redirect to login
        setPendingNavigation({ page: 'payment', plan: planName, cycle });
        setCurrentPage('login');
        return;
      }
      // User is logged in, proceed to payment
      if (planName) {
        setSelectedPlan(planName);
      }
      if (cycle) {
        setBillingCycle(cycle);
      }
    }
    
    setCurrentPage(page);
    if (planName && page !== 'payment') {
      setSelectedPlan(planName);
    }
  };

  const handleProceedToCheckout = (cart: CartItem[], table: string) => {
    setCartItems(cart);
    setTableNumber(table);
    setCurrentPage('customer-checkout');
  };

  const handleBackToMenu = () => {
    setCurrentPage('customer-menu');
  };

  const handleOrderComplete = () => {
    setCartItems([]);
    setCurrentPage('customer-menu');
  };

  return (
    <div className="min-h-screen bg-white">
      {currentPage !== 'dashboard' && currentPage !== 'customer-menu' && currentPage !== 'customer-checkout' && (
        <Navigation 
          currentPage={currentPage} 
          onNavigate={handleNavigate}
          userSession={userSession}
          onLogout={handleLogout}
        />
      )}
      {currentPage === 'home' ? (
        <>
          <Hero onNavigate={handleNavigate} />
          <Features />
          <HowItWorks />
          <Benefits />
          <CTA onNavigate={handleNavigate} />
        </>
      ) : currentPage === 'pricing' ? (
        <Pricing onNavigate={handleNavigate} />
      ) : currentPage === 'plan-detail' ? (
        <PlanDetail onNavigate={handleNavigate} planName={selectedPlan} />
      ) : currentPage === 'login' ? (
        <Login onNavigate={handleNavigate} onLogin={handleLogin} pendingNavigation={pendingNavigation} />
      ) : currentPage === 'signup' ? (
        <Signup onNavigate={handleNavigate} />
      ) : currentPage === 'contact' ? (
        <ContactUs onNavigate={handleNavigate} />
      ) : currentPage === 'dashboard' ? (
        <Dashboard 
          userEmail={userSession?.email || ''}
          onLogout={handleLogout}
        />
      ) : currentPage === 'customer-menu' ? (
        <CustomerMenu 
          tableNumber={tableNumber}
          onProceedToCheckout={handleProceedToCheckout}
        />
      ) : currentPage === 'customer-checkout' ? (
        <CustomerCheckout 
          cartItems={cartItems}
          tableNumber={tableNumber}
          onBack={handleBackToMenu}
          onOrderComplete={handleOrderComplete}
        />
      ) : (
        <Payment 
          onNavigate={handleNavigate} 
          planName={selectedPlan}
          billingCycle={billingCycle}
          userSession={userSession}
        />
      )}
    </div>
  );
}