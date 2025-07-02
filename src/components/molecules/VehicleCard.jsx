import { motion } from 'framer-motion';
import StatusBadge from '@/components/atoms/StatusBadge';
import ApperIcon from '@/components/ApperIcon';
import { formatDistanceToNow } from 'date-fns';

const VehicleCard = ({ vehicle, onClick, isSelected = false }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      whileHover={{ y: -2 }}
      onClick={() => onClick(vehicle)}
      className={`
        bg-surface border rounded-lg p-4 cursor-pointer transition-all duration-200 card-hover
        ${isSelected 
          ? 'border-primary shadow-glow' 
          : 'border-slate-600 hover:border-slate-500'
        }
      `}
    >
      <div className="flex items-center justify-between mb-3">
        <div className="flex items-center gap-2">
          <ApperIcon name="Truck" size={16} className="text-primary" />
          <span className="font-semibold text-white">{vehicle.plateNumber}</span>
        </div>
        <StatusBadge status={vehicle.status} />
      </div>
      
      <div className="space-y-2 text-sm">
        <div className="flex items-center gap-2 text-slate-300">
          <ApperIcon name="User" size={14} />
          <span>{vehicle.driverName}</span>
        </div>
        
        <div className="flex items-center gap-2 text-slate-300">
          <ApperIcon name="Gauge" size={14} />
          <span>{vehicle.speed} km/h</span>
        </div>
        
        <div className="flex items-center gap-2 text-slate-400">
          <ApperIcon name="Clock" size={14} />
          <span>{formatDistanceToNow(new Date(vehicle.lastUpdate), { addSuffix: true })}</span>
        </div>
      </div>
      
      <div className="mt-3 pt-3 border-t border-slate-600 flex justify-between text-xs text-slate-400">
        <span>Deliveries: {vehicle.todayDeliveries}</span>
        <span>Distance: {vehicle.todayDistance.toFixed(1)} km</span>
      </div>
    </motion.div>
  );
};

export default VehicleCard;