import { QrCode, Menu, ArrowLeft, User, LogOut, LayoutDashboard } from 'lucide-react';

type PageType = 'home' | 'pricing' | 'plan-detail' | 'login' | 'signup' | 'contact' | 'payment' | 'dashboard';

interface UserSession {
  id: string;
  email: string;
  accessToken: string;
}

interface NavigationProps {
  currentPage: PageType;
  onNavigate: (page: PageType) => void;
  userSession: UserSession | null;
  onLogout: () => void;
}

export function Navigation({ currentPage, onNavigate, userSession, onLogout }: NavigationProps) {
  return (
    <nav className="fixed top-0 w-full bg-gradient-to-r from-amber-50/95 to-orange-50/95 backdrop-blur-md border-b-2 border-amber-200 z-50 shadow-md">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-20">
          <div className="flex items-center gap-3">
            {(currentPage === 'pricing' || currentPage === 'plan-detail' || currentPage === 'login' || currentPage === 'signup' || currentPage === 'contact') && (
              <button
                onClick={() => {
                  if (currentPage === 'plan-detail') {
                    onNavigate('pricing');
                  } else if (currentPage === 'login' || currentPage === 'signup' || currentPage === 'contact') {
                    onNavigate('home');
                  } else {
                    onNavigate('home');
                  }
                }}
                className="mr-4 text-amber-800 hover:text-amber-900 transition-colors flex items-center gap-2"
              >
                <ArrowLeft className="w-5 h-5" />
                <span className="hidden sm:inline">Back</span>
              </button>
            )}
            <button onClick={() => onNavigate('home')} className="flex items-center gap-3">
              <div className="w-12 h-12 bg-gradient-to-br from-amber-600 to-orange-600 rounded-xl flex items-center justify-center shadow-lg">
                <QrCode className="w-7 h-7 text-white" />
              </div>
              <div>
                <span className="text-2xl text-amber-900 block">QueueLess</span>
                <span className="text-xs text-amber-700">Smart Ordering System</span>
              </div>
            </button>
          </div>
          <div className="hidden md:flex items-center gap-8">
            {currentPage === 'home' ? (
              <>
                <a href="#features" className="text-amber-800 hover:text-amber-900 transition-colors relative group">
                  Features
                  <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-amber-600 group-hover:w-full transition-all"></span>
                </a>
                <a href="#how-it-works" className="text-amber-800 hover:text-amber-900 transition-colors relative group">
                  How It Works
                  <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-amber-600 group-hover:w-full transition-all"></span>
                </a>
                <a href="#benefits" className="text-amber-800 hover:text-amber-900 transition-colors relative group">
                  Benefits
                  <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-amber-600 group-hover:w-full transition-all"></span>
                </a>
              </>
            ) : null}
            <button 
              onClick={() => onNavigate('contact')}
              className="text-amber-800 hover:text-amber-900 transition-colors relative group">
              Contact
              <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-amber-600 group-hover:w-full transition-all"></span>
            </button>
            {userSession ? (
              <div className="flex items-center gap-4">
                <button
                  onClick={() => onNavigate('dashboard')}
                  className="flex items-center gap-2 px-4 py-2 bg-amber-100 rounded-lg hover:bg-amber-200 transition-colors"
                >
                  <LayoutDashboard className="w-4 h-4 text-amber-700" />
                  <span className="text-sm text-amber-900">Dashboard</span>
                </button>
                <div className="flex items-center gap-2 px-4 py-2 bg-amber-100 rounded-lg">
                  <User className="w-4 h-4 text-amber-700" />
                  <span className="text-sm text-amber-900 max-w-32 truncate">{userSession.email}</span>
                </div>
                <button
                  onClick={onLogout}
                  className="px-6 py-3 bg-gradient-to-r from-amber-600 to-orange-600 text-white rounded-xl hover:from-amber-700 hover:to-orange-700 transition-all shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 flex items-center gap-2"
                >
                  <LogOut className="w-4 h-4" />
                  <span>Logout</span>
                </button>
              </div>
            ) : (
              <button 
                onClick={() => onNavigate('login')}
                className="px-8 py-3 bg-gradient-to-r from-amber-600 to-orange-600 text-white rounded-xl hover:from-amber-700 hover:to-orange-700 transition-all shadow-lg hover:shadow-xl transform hover:-translate-y-0.5">
                Login
              </button>
            )}
          </div>
          <button className="md:hidden text-amber-900">
            <Menu className="w-6 h-6" />
          </button>
        </div>
      </div>
    </nav>
  );
}