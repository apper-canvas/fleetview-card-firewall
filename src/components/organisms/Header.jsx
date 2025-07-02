import { motion } from 'framer-motion';
import ApperIcon from '@/components/ApperIcon';
import Button from '@/components/atoms/Button';

const Header = ({ title, subtitle }) => {
  return (
    <motion.header
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-surface/50 backdrop-blur border-b border-slate-600 px-6 py-4"
    >
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-white mb-1">{title}</h1>
          {subtitle && (
            <p className="text-slate-400">{subtitle}</p>
          )}
        </div>
        
        <div className="flex items-center gap-4">
          {/* Connection Status */}
          <div className="flex items-center gap-2 bg-surface border border-slate-600 rounded-lg px-3 py-2">
            <div className="w-2 h-2 bg-accent rounded-full animate-pulse" />
            <span className="text-sm text-white">Live</span>
          </div>
          
          {/* Notifications */}
          <Button variant="ghost" size="sm">
            <ApperIcon name="Bell" size={18} />
          </Button>
          
          {/* Profile */}
          <div className="flex items-center gap-2 bg-surface border border-slate-600 rounded-lg px-3 py-2">
            <div className="w-8 h-8 gradient-bg rounded-full flex items-center justify-center">
              <ApperIcon name="User" size={16} className="text-white" />
            </div>
            <span className="text-sm text-white hidden sm:block">Dispatcher</span>
          </div>
        </div>
      </div>
    </motion.header>
  );
};

export default Header;