// src/components/ui/Modal.jsx
import { motion, AnimatePresence } from 'framer-motion';
import { X, CheckCircle } from 'lucide-react';
import Card from './Card';
import Button from './Button';

const Modal = ({ isOpen, onClose, title, children }) => {
  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center p-4 z-50"
        >
          <motion.div
            initial={{ scale: 0.9, opacity: 0, y: 50 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 0.9, opacity: 0, y: 50 }}
            onClick={(e) => e.stopPropagation()} // Prevent closing modal when clicking inside
            className="bg-bg-main rounded-2xl shadow-soft w-full max-w-md p-6 relative"
          >
            <div className="flex items-center gap-3 mb-4">
              <CheckCircle className="text-green-500" size={28} />
              <h2 className="text-2xl font-bold text-text-primary">{title}</h2>
            </div>
            
            <div className="text-text-secondary space-y-3">
              {children}
            </div>

            <div className="mt-6 text-center">
              <Button onClick={onClose}>
                Got it!
              </Button>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default Modal;