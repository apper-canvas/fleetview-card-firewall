import { motion } from 'framer-motion';
import Input from '@/components/atoms/Input';
import ApperIcon from '@/components/ApperIcon';

const SearchBar = ({ 
  value, 
  onChange, 
  placeholder = "Search...", 
  onClear,
  className = '' 
}) => {
  return (
    <div className={`relative ${className}`}>
      <Input
        type="text"
        placeholder={placeholder}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        icon="Search"
        className="w-full"
      />
      
      {value && (
        <motion.button
          initial={{ opacity: 0, scale: 0 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0 }}
          onClick={onClear}
          className="absolute right-3 top-9 p-1 hover:bg-slate-700 rounded-full transition-colors duration-200"
        >
          <ApperIcon name="X" size={14} className="text-slate-400 hover:text-white" />
        </motion.button>
      )}
    </div>
  );
};

export default SearchBar;