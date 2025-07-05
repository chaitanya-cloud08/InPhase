// src/components/Header.jsx
import { Calendar, LayoutDashboard, List, Droplet } from 'lucide-react';

const Header = ({ currentView, setCurrentView }) => {
  const NavButton = ({ view, icon: Icon, text }) => (
    <button
      onClick={() => setCurrentView(view)}
      className={`flex items-center gap-2 px-3 py-2 rounded-full transition-colors duration-300 ${
        currentView === view ? 'bg-brand-primary text-white' : 'hover:bg-pastel-pink/50'
      }`}
    >
      <Icon size={20} />
      <span className="hidden sm:inline">{text}</span>
    </button>
  );

  return (
    <header className="bg-white/70 backdrop-blur-lg sticky top-0 z-10 shadow-sm">
      <nav className="container mx-auto px-4 py-3 flex justify-between items-center">
        <div className="flex items-center gap-2 text-brand-primary">
          <Droplet size={28} />
          <h1 className="text-xl font-bold">InPhase - PCOD Symptom Tracker</h1>
        </div>
        <div className="flex items-center gap-2">
          <NavButton view="tracker" icon={Calendar} text="Today" />
          <NavButton view="dashboard" icon={LayoutDashboard} text="Dashboard" />
          <NavButton view="history" icon={List} text="History" />
        </div>
      </nav>
    </header>
  );
};

export default Header;