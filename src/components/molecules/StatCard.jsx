import { motion } from 'framer-motion';
import ApperIcon from '@/components/ApperIcon';

const StatCard = ({ title, value, icon, trend, trendValue, color = 'primary' }) => {
  const colorClasses = {
    primary: 'text-primary bg-primary/20',
    accent: 'text-accent bg-accent/20',
    warning: 'text-warning bg-warning/20',
    error: 'text-error bg-error/20'
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      whileHover={{ y: -4, scale: 1.02 }}
      className="bg-surface border border-slate-600 rounded-lg p-6 card-hover"
    >
      <div className="flex items-center justify-between">
        <div className="flex-1">
          <p className="text-slate-400 text-sm font-medium">{title}</p>
          <p className="text-2xl font-bold text-white mt-1">{value}</p>
          
          {trend && (
            <div className="flex items-center gap-1 mt-2">
              <ApperIcon 
                name={trend === 'up' ? 'TrendingUp' : 'TrendingDown'} 
                size={14} 
                className={trend === 'up' ? 'text-accent' : 'text-error'} 
              />
              <span className={`text-sm ${trend === 'up' ? 'text-accent' : 'text-error'}`}>
                {trendValue}
              </span>
            </div>
          )}
        </div>
        
        <div className={`w-12 h-12 rounded-lg flex items-center justify-center ${colorClasses[color]}`}>
          <ApperIcon name={icon} size={24} />
        </div>
      </div>
    </motion.div>
  );
};

export default StatCard;