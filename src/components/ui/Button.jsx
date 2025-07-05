// src/components/ui/Button.jsx
import { motion } from 'framer-motion';

const Button = ({ children, onClick, className = '', type = 'button' }) => {
  return (
    <motion.button
      type={type}
      onClick={onClick}
      className={`px-6 py-2 rounded-full font-semibold text-white bg-brand-primary hover:bg-opacity-90 transition-all duration-300 shadow-md ${className}`}
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
    >
      {children}
    </motion.button>
  );
};

export default Button;