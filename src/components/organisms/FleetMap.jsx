import { motion } from 'framer-motion';
import { useState, useEffect } from 'react';
import ApperIcon from '@/components/ApperIcon';
import Button from '@/components/atoms/Button';

const FleetMap = ({ vehicles, selectedVehicle, onVehicleSelect, routes = [] }) => {
  const [mapCenter, setMapCenter] = useState({ lat: 40.7128, lng: -74.0060 });
  const [zoomLevel, setZoomLevel] = useState(12);

  // Simulate map controls
  const handleZoomIn = () => setZoomLevel(prev => Math.min(prev + 1, 18));
  const handleZoomOut = () => setZoomLevel(prev => Math.max(prev - 1, 1));

  const getVehicleIcon = (status) => {
    const icons = {
      online: 'Truck',
      idle: 'Clock',
      offline: 'TruckOff'
    };
    return icons[status] || 'Truck';
  };

  const getVehicleColor = (status) => {
    const colors = {
      online: 'text-accent',
      idle: 'text-warning',
      offline: 'text-slate-500'
    };
    return colors[status] || 'text-slate-500';
  };

  return (
    <div className="relative w-full h-full bg-slate-800 rounded-lg overflow-hidden">
      {/* Map Background */}
      <div className="absolute inset-0 bg-gradient-to-br from-slate-700 via-slate-800 to-slate-900">
        <div className="absolute inset-0 opacity-10">
          <svg className="w-full h-full" viewBox="0 0 400 300">
            <defs>
              <pattern id="grid" width="20" height="20" patternUnits="userSpaceOnUse">
                <path d="M 20 0 L 0 0 0 20" fill="none" stroke="currentColor" strokeWidth="1"/>
              </pattern>
            </defs>
            <rect width="100%" height="100%" fill="url(#grid)" />
          </svg>
        </div>
      </div>

      {/* Map Controls */}
      <div className="absolute top-4 right-4 flex flex-col gap-2 z-10">
        <Button variant="secondary" size="sm" onClick={handleZoomIn}>
          <ApperIcon name="Plus" size={16} />
        </Button>
        <Button variant="secondary" size="sm" onClick={handleZoomOut}>
          <ApperIcon name="Minus" size={16} />
        </Button>
        <Button variant="secondary" size="sm">
          <ApperIcon name="RotateCcw" size={16} />
        </Button>
      </div>

      {/* Connection Status */}
      <div className="absolute top-4 left-4 z-10">
        <div className="flex items-center gap-2 bg-surface/90 backdrop-blur border border-slate-600 rounded-lg px-3 py-2">
          <div className="w-2 h-2 bg-accent rounded-full animate-pulse" />
          <span className="text-sm text-white">Live Tracking</span>
        </div>
      </div>

      {/* Vehicle Markers */}
      <div className="absolute inset-0">
        {vehicles.map((vehicle, index) => (
          <motion.div
            key={vehicle.Id}
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ delay: index * 0.1 }}
            className="absolute transform -translate-x-1/2 -translate-y-1/2 cursor-pointer"
            style={{
              left: `${30 + (index % 4) * 20}%`,
              top: `${25 + (index % 3) * 25}%`
            }}
            onClick={() => onVehicleSelect(vehicle)}
          >
            <motion.div
              whileHover={{ scale: 1.2 }}
              className={`
                relative w-10 h-10 rounded-full flex items-center justify-center transition-all duration-200
                ${selectedVehicle?.Id === vehicle.Id 
                  ? 'bg-primary shadow-glow ring-2 ring-primary' 
                  : 'bg-surface border-2 border-slate-600 hover:border-slate-400'
                }
              `}
            >
              <ApperIcon 
                name={getVehicleIcon(vehicle.status)} 
                size={18} 
                className={selectedVehicle?.Id === vehicle.Id ? 'text-white' : getVehicleColor(vehicle.status)}
              />
              
              {/* Speed indicator */}
              {vehicle.status === 'online' && vehicle.speed > 0 && (
                <div className="absolute -top-2 -right-2 bg-accent text-white text-xs rounded-full w-5 h-5 flex items-center justify-center font-semibold">
                  {vehicle.speed}
                </div>
              )}
            </motion.div>
            
            {/* Vehicle label */}
            <div className="absolute top-12 left-1/2 transform -translate-x-1/2 bg-surface/90 backdrop-blur border border-slate-600 rounded px-2 py-1 text-xs text-white whitespace-nowrap">
              {vehicle.plateNumber}
            </div>
          </motion.div>
        ))}
      </div>

      {/* Routes */}
      {routes.map((route, index) => (
        <svg
          key={route.vehicleId}
          className="absolute inset-0 w-full h-full pointer-events-none"
          style={{ zIndex: 5 }}
        >
          <motion.path
            initial={{ pathLength: 0 }}
            animate={{ pathLength: 1 }}
            transition={{ duration: 2, delay: index * 0.5 }}
            d={`M ${100 + index * 50} 100 Q ${200 + index * 30} ${150 + index * 20} ${300 + index * 40} ${200 + index * 30}`}
            stroke="#0EA5E9"
            strokeWidth="3"
            strokeDasharray="5,5"
            fill="none"
            opacity="0.7"
          />
        </svg>
      ))}

      {/* Map Legend */}
      <div className="absolute bottom-4 left-4 bg-surface/90 backdrop-blur border border-slate-600 rounded-lg p-3 z-10">
        <div className="space-y-2">
          <div className="flex items-center gap-2 text-sm">
            <div className="w-3 h-3 bg-accent rounded-full" />
            <span className="text-white">Online</span>
          </div>
          <div className="flex items-center gap-2 text-sm">
            <div className="w-3 h-3 bg-warning rounded-full" />
            <span className="text-white">Idle</span>
          </div>
          <div className="flex items-center gap-2 text-sm">
            <div className="w-3 h-3 bg-slate-500 rounded-full" />
            <span className="text-white">Offline</span>
          </div>
        </div>
      </div>

      {/* Selected Vehicle Info */}
      {selectedVehicle && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="absolute bottom-4 right-4 bg-surface/95 backdrop-blur border border-slate-600 rounded-lg p-4 min-w-64 z-10"
        >
          <div className="flex items-center justify-between mb-3">
            <h4 className="font-semibold text-white">{selectedVehicle.plateNumber}</h4>
            <Button 
              variant="ghost" 
              size="sm" 
              onClick={() => onVehicleSelect(null)}
            >
              <ApperIcon name="X" size={14} />
            </Button>
          </div>
          
          <div className="space-y-2 text-sm">
            <div className="flex justify-between">
              <span className="text-slate-400">Driver:</span>
              <span className="text-white">{selectedVehicle.driverName}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-slate-400">Speed:</span>
              <span className="text-white">{selectedVehicle.speed} km/h</span>
            </div>
            <div className="flex justify-between">
              <span className="text-slate-400">Deliveries:</span>
              <span className="text-white">{selectedVehicle.todayDeliveries}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-slate-400">Distance:</span>
              <span className="text-white">{selectedVehicle.todayDistance.toFixed(1)} km</span>
            </div>
          </div>
        </motion.div>
      )}
    </div>
  );
};

export default FleetMap;