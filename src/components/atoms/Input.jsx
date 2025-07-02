import { motion } from 'framer-motion';
import ApperIcon from '@/components/ApperIcon';

const Input = ({ 
  label, 
  type = 'text', 
  placeholder, 
  value, 
  onChange, 
  error, 
  icon,
  disabled = false,
  className = '',
  ...props 
}) => {
  return (
    <div className={`space-y-2 ${className}`}>
      {label && (
        <label className="block text-sm font-medium text-slate-300">
          {label}
        </label>
      )}
      
      <div className="relative">
        {icon && (
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <ApperIcon name={icon} size={16} className="text-slate-400" />
          </div>
        )}
        
        <motion.input
          whileFocus={{ scale: 1.01 }}
          type={type}
          value={value}
          onChange={onChange}
          placeholder={placeholder}
          disabled={disabled}
          className={`
            block w-full rounded-lg border transition-all duration-200
            ${icon ? 'pl-10' : 'pl-3'} pr-3 py-2.5
            ${error 
              ? 'border-error bg-error/10 text-white placeholder-error/60 focus:border-error focus:ring-1 focus:ring-error' 
              : 'border-slate-600 bg-slate-800/50 text-white placeholder-slate-400 focus:border-primary focus:ring-1 focus:ring-primary'
            }
            ${disabled ? 'opacity-50 cursor-not-allowed' : ''}
          `}
          {...props}
        />
      </div>
      
      {error && (
        <motion.p
          initial={{ opacity: 0, y: -5 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-sm text-error flex items-center gap-1"
        >
          <ApperIcon name="AlertCircle" size={14} />
          {error}
        </motion.p>
      )}
    </div>
  );
};

export default Input;