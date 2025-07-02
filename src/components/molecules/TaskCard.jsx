import { motion } from 'framer-motion';
import StatusBadge from '@/components/atoms/StatusBadge';
import ApperIcon from '@/components/ApperIcon';

const TaskCard = ({ task, onAssign, isDragging = false }) => {
  const priorityColors = {
    high: 'text-error',
    medium: 'text-warning',
    low: 'text-slate-400'
  };

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      whileHover={{ scale: 1.02 }}
      className={`
        bg-surface border border-slate-600 rounded-lg p-4 cursor-move transition-all duration-200
        ${isDragging ? 'shadow-glow rotate-3' : 'hover:border-slate-500'}
      `}
      draggable
      onDragStart={(e) => {
        e.dataTransfer.setData('application/json', JSON.stringify(task));
      }}
    >
      <div className="flex items-center justify-between mb-3">
        <div className="flex items-center gap-2">
          <ApperIcon name="Package" size={16} className="text-accent" />
          <span className="font-semibold text-white">{task.type}</span>
        </div>
        <div className="flex items-center gap-2">
          <ApperIcon 
            name="Flag" 
            size={14} 
            className={priorityColors[task.priority]} 
          />
          <StatusBadge status={task.status} size="sm" />
        </div>
      </div>
      
      <div className="space-y-2 text-sm text-slate-300">
        <div className="flex items-start gap-2">
          <ApperIcon name="MapPin" size={14} className="text-primary mt-0.5" />
          <div>
            <div className="font-medium">Pickup</div>
            <div className="text-slate-400">{task.pickupLocation.address}</div>
          </div>
        </div>
        
        <div className="flex items-start gap-2">
          <ApperIcon name="Target" size={14} className="text-accent mt-0.5" />
          <div>
            <div className="font-medium">Delivery</div>
            <div className="text-slate-400">{task.deliveryLocation.address}</div>
          </div>
        </div>
        
        <div className="flex items-center gap-2 text-slate-400">
          <ApperIcon name="Clock" size={14} />
          <span>Est. {task.estimatedDuration} min</span>
        </div>
      </div>
      
      {!task.assignedVehicle && (
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => onAssign(task)}
          className="w-full mt-3 px-3 py-2 bg-primary hover:bg-primary/90 text-white rounded text-sm font-medium transition-colors duration-200"
        >
          Assign Vehicle
        </motion.button>
      )}
    </motion.div>
  );
};

export default TaskCard;