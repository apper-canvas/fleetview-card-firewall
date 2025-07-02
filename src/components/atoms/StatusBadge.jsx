import { motion } from 'framer-motion';
import ApperIcon from '@/components/ApperIcon';

const StatusBadge = ({ status, showIcon = true, size = 'sm' }) => {
  const statusConfig = {
    online: {
      label: 'Online',
      icon: 'Circle',
      className: 'status-online text-white',
      iconColor: 'text-white'
    },
    idle: {
      label: 'Idle',
      icon: 'Clock',
      className: 'status-idle text-white',
      iconColor: 'text-white'
    },
    offline: {
      label: 'Offline',
      icon: 'CircleX',
      className: 'status-offline text-white',
      iconColor: 'text-white'
    },
    assigned: {
      label: 'Assigned',
      icon: 'CheckCircle',
      className: 'bg-info text-white',
      iconColor: 'text-white'
    },
    completed: {
      label: 'Completed',
      icon: 'CheckCircle2',
      className: 'bg-success text-white',
      iconColor: 'text-white'
    },
    pending: {
      label: 'Pending',
      icon: 'Clock',
      className: 'bg-warning text-white',
      iconColor: 'text-white'
    }
  };

  const config = statusConfig[status] || statusConfig.offline;
  const sizeClasses = size === 'sm' ? 'px-2 py-1 text-xs' : 'px-3 py-1.5 text-sm';

  return (
    <motion.span
      initial={{ scale: 0 }}
      animate={{ scale: 1 }}
      className={`inline-flex items-center gap-1 rounded-full font-medium ${config.className} ${sizeClasses}`}
    >
      {showIcon && (
        <ApperIcon 
          name={config.icon} 
          size={size === 'sm' ? 12 : 14} 
          className={config.iconColor}
        />
      )}
      {config.label}
    </motion.span>
  );
};

export default StatusBadge;