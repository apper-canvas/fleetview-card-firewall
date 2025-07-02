import { motion } from 'framer-motion';
import ApperIcon from '@/components/ApperIcon';

const Error = ({ message = "Something went wrong", onRetry }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="flex flex-col items-center justify-center p-8 text-center"
    >
      <div className="w-16 h-16 mb-4 rounded-full bg-error/20 flex items-center justify-center">
        <ApperIcon name="AlertTriangle" size={24} className="text-error" />
      </div>
      
      <h3 className="text-lg font-semibold mb-2 text-white">Oops! Something went wrong</h3>
      <p className="text-slate-400 mb-6 max-w-md">{message}</p>
      
      {onRetry && (
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={onRetry}
          className="px-6 py-2 bg-primary hover:bg-primary/90 text-white rounded-lg font-medium transition-colors duration-200 flex items-center gap-2"
        >
          <ApperIcon name="RefreshCw" size={16} />
          Try Again
        </motion.button>
      )}
    </motion.div>
  );
};

export default Error;