import { motion } from 'framer-motion';
import ApperIcon from '@/components/ApperIcon';

const Empty = ({ 
  title = "No data available", 
  description = "There's nothing to show right now.",
  icon = "Inbox",
  action
}) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="flex flex-col items-center justify-center p-12 text-center"
    >
      <div className="w-20 h-20 mb-6 rounded-full bg-gradient-to-br from-primary/20 to-accent/20 flex items-center justify-center">
        <ApperIcon name={icon} size={32} className="text-primary" />
      </div>
      
      <h3 className="text-xl font-semibold mb-3 text-white">{title}</h3>
      <p className="text-slate-400 mb-8 max-w-md leading-relaxed">{description}</p>
      
      {action && (
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={action.onClick}
          className="px-6 py-3 gradient-bg text-white rounded-lg font-medium transition-all duration-200 flex items-center gap-2 shadow-lg hover:shadow-glow"
        >
          <ApperIcon name={action.icon || "Plus"} size={18} />
          {action.label}
        </motion.button>
      )}
    </motion.div>
  );
};

export default Empty;