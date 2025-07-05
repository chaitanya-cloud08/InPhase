// src/App.jsx

import React, { useState, useMemo } from 'react';
import useLocalStorage from './hooks/useLocalStorage';
import { getTodayDateString, generateSmartTips } from './utils/helpers';
import { calculateCyclePhase } from './utils/cyclelogic';
import EntryTips from './components/EntryTips';
import Header from './components/Header';
import TrackerForm from './components/TrackerForm';
import CyclePhaseDisplay from './components/CyclePhaseDisplay';
import SmartTips from './components/SmartTips';
import Dashboard from './components/Dashboard';
import HistoryList from './components/HistoryList';
import Modal from './components/ui/Modal'; // --- Import the new Modal component
import { Calendar } from 'lucide-react';

function App() {
  const [entries, setEntries] = useLocalStorage('pcod-entries', []);
  const [currentView, setCurrentView] = useState('tracker');
  const [selectedDate, setSelectedDate] = useState(getTodayDateString());

  // --- NEW: State for controlling the modal ---
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalTips, setModalTips] = useState([]);

  const handleGoToToday = () => {
    setCurrentView('tracker');
    setSelectedDate(getTodayDateString());
  };

  const entryForDate = entries.find(e => e.date === selectedDate);
  // NEW, CORRECTED LINE
const cycleInfo = useMemo(() => calculateCyclePhase(entries, selectedDate), [entries, selectedDate]);
  
  // --- UPDATED: The handleSaveEntry function now triggers the modal ---
  const handleSaveEntry = (entryData) => {
    setEntries(prevEntries => {
      const existingIndex = prevEntries.findIndex(e => e.date === entryData.date);
      if (existingIndex > -1) {
        const updatedEntries = [...prevEntries];
        updatedEntries[existingIndex] = entryData;
        return updatedEntries;
      } else {
        return [...prevEntries, entryData];
      }
    });

    // Generate personalized tips based on the just-submitted data
    // const tipsForModal = generateSmartTips(entryData);
    // setModalTips(tipsForModal);

    // Open the modal
    setIsModalOpen(true);
  };
  
  const closeModal = () => setIsModalOpen(false);

  const handleEdit = (entry) => {
    setSelectedDate(entry.date);
    setCurrentView('tracker');
  };

  const handleDelete = (date) => {
    setEntries(prev => prev.filter(entry => entry.date !== date));
  };
  
  const renderView = () => {
    switch(currentView) {
      case 'dashboard':
        return <Dashboard entries={entries} />;
      case 'history':
        return <HistoryList entries={entries} onEdit={handleEdit} onDelete={handleDelete} />;
      case 'tracker':
      default:
        return (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start">
            <div className="lg:col-span-2 order-2 lg:order-1">
              <TrackerForm 
                key={selectedDate}
                onSave={handleSaveEntry} 
                existingEntry={entryForDate}
                currentDate={selectedDate}
              />
            </div>
            <div className="lg:col-span-1 space-y-6 order-1 lg:order-2">
              <CyclePhaseDisplay cycleInfo={cycleInfo} />
              {/* --- UPDATED: SmartTips no longer needs entry-based tips passed to it --- */}
              <SmartTips cyclePhaseInfo={cycleInfo} />
                <EntryTips entry={entryForDate} />
            </div>
          </div>
        );
    }
  }

  return (
    <div className="min-h-screen">
      <Header
        currentView={currentView}
        setCurrentView={setCurrentView}
        onGoToToday={handleGoToToday}
      />
      <main className="container mx-auto p-4 sm:p-6 md:p-8">
        {currentView === 'tracker' && (
           <div className="mb-6 bg-white p-4 rounded-xl shadow-soft flex flex-wrap items-center gap-4">
             <Calendar className="text-brand-primary" />
             <label htmlFor="date-picker" className="font-semibold text-text-secondary shrink-0">
               Viewing entry for:
             </label>
             <input
               type="date"
               id="date-picker"
               value={selectedDate}
               onChange={(e) => setSelectedDate(e.target.value)}
               className="border-gray-300 rounded-lg focus:ring-brand-primary focus:border-brand-primary"
             />
           </div>
        )}
        {renderView()}
      </main>
      <footer className="text-center py-4 text-text-secondary text-sm">
        <p>Made with ❤️ for a better wellness journey.</p>
      </footer>

      {/* --- NEW: Render the Modal component here --- */}
      <Modal 
        isOpen={isModalOpen} 
        onClose={closeModal} 
        title="Entry Saved Successfully!"
      >
        {modalTips.length > 0 ? (
          <>
            <p className="font-semibold mb-2">Here are some tips based on your entry:</p>
            <ul className="list-disc list-inside space-y-1">
              {modalTips.map((tip, index) => <li key={index}>{tip}</li>)}
            </ul>
          </>
        ) : (
          <p>Your entry has been logged. Keep up the great work tracking your wellness journey!</p>
        )}
      </Modal>
    </div>
  );
}

export default App;