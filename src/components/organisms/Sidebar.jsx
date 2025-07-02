import { useState } from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import ApperIcon from '@/components/ApperIcon';

const Sidebar = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const location = useLocation();

  const menuItems = [
    { path: '/', icon: 'MapPin', label: 'Live Tracking' },
    { path: '/analytics', icon: 'BarChart3', label: 'Analytics' },
    { path: '/tasks', icon: 'ClipboardList', label: 'Tasks' },
    { path: '/vehicles', icon: 'Truck', label: 'Vehicles' },
    { path: '/settings', icon: 'Settings', label: 'Settings' }
  ];

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  // Desktop Sidebar
  const DesktopSidebar = () => (
    <div className="hidden lg:block w-64 bg-surface border-r border-slate-600 h-full">
      <div className="p-6 border-b border-slate-600">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 gradient-bg rounded-lg flex items-center justify-center">
            <ApperIcon name="Truck" size={24} className="text-white" />
          </div>
          <div>
            <h1 className="text-xl font-bold text-white">FleetView Pro</h1>
            <p className="text-sm text-slate-400">Fleet Management</p>
          </div>
        </div>
      </div>
      
      <nav className="p-4">
        <ul className="space-y-2">
          {menuItems.map((item) => (
            <li key={item.path}>
              <NavLink
                to={item.path}
                className={({ isActive }) =>
                  `flex items-center gap-3 px-4 py-3 rounded-lg transition-all duration-200 ${
                    isActive
                      ? 'bg-primary text-white shadow-glow'
                      : 'text-slate-300 hover:bg-slate-700 hover:text-white'
                  }`
                }
              >
                <ApperIcon name={item.icon} size={20} />
                <span className="font-medium">{item.label}</span>
              </NavLink>
            </li>
          ))}
        </ul>
      </nav>
      
      <div className="absolute bottom-4 left-4 right-4">
        <div className="bg-slate-800 border border-slate-600 rounded-lg p-4">
          <div className="flex items-center gap-2 mb-2">
            <div className="w-2 h-2 bg-accent rounded-full animate-pulse" />
            <span className="text-sm text-white">System Status</span>
          </div>
          <p className="text-xs text-slate-400">All systems operational</p>
        </div>
      </div>
    </div>
  );

  // Mobile Sidebar
  const MobileSidebar = () => (
    <>
      {/* Mobile Menu Button */}
      <div className="lg:hidden fixed top-4 left-4 z-50">
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={toggleMobileMenu}
          className="p-3 bg-surface border border-slate-600 rounded-lg shadow-lg"
        >
          <ApperIcon 
            name={isMobileMenuOpen ? "X" : "Menu"} 
            size={20} 
            className="text-white" 
          />
        </motion.button>
      </div>

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="lg:hidden fixed inset-0 bg-black/50 z-40"
              onClick={toggleMobileMenu}
            />
            
            <motion.div
              initial={{ x: -300 }}
              animate={{ x: 0 }}
              exit={{ x: -300 }}
              transition={{ type: "spring", damping: 25, stiffness: 120 }}
              className="lg:hidden fixed left-0 top-0 h-full w-80 bg-surface border-r border-slate-600 z-50"
            >
              <div className="p-6 border-b border-slate-600">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 gradient-bg rounded-lg flex items-center justify-center">
                    <ApperIcon name="Truck" size={24} className="text-white" />
                  </div>
                  <div>
                    <h1 className="text-xl font-bold text-white">FleetView Pro</h1>
                    <p className="text-sm text-slate-400">Fleet Management</p>
                  </div>
                </div>
              </div>
              
              <nav className="p-4">
                <ul className="space-y-2">
                  {menuItems.map((item) => (
                    <li key={item.path}>
                      <NavLink
                        to={item.path}
                        onClick={toggleMobileMenu}
                        className={({ isActive }) =>
                          `flex items-center gap-3 px-4 py-3 rounded-lg transition-all duration-200 ${
                            isActive
                              ? 'bg-primary text-white shadow-glow'
                              : 'text-slate-300 hover:bg-slate-700 hover:text-white'
                          }`
                        }
                      >
                        <ApperIcon name={item.icon} size={20} />
                        <span className="font-medium">{item.label}</span>
                      </NavLink>
                    </li>
                  ))}
                </ul>
              </nav>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );

  return (
    <>
      <DesktopSidebar />
      <MobileSidebar />
    </>
  );
};

export default Sidebar;