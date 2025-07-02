import { useState } from 'react';
import { motion } from 'framer-motion';
import { toast } from 'react-toastify';
import Button from '@/components/atoms/Button';
import Input from '@/components/atoms/Input';
import ApperIcon from '@/components/ApperIcon';

const SettingsPage = () => {
  const [settings, setSettings] = useState({
    updateInterval: '5',
    mapZoom: '12',
    notifications: true,
    autoAssign: false,
    speedLimit: '80',
    idleTimeout: '10'
  });

  const handleSave = () => {
    toast.success('Settings saved successfully!');
  };

  const handleReset = () => {
    setSettings({
      updateInterval: '5',
      mapZoom: '12',
      notifications: true,
      autoAssign: false,
      speedLimit: '80',
      idleTimeout: '10'
    });
    toast.info('Settings reset to defaults');
  };

  return (
    <div className="p-6 h-full overflow-y-auto">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="max-w-4xl mx-auto space-y-6"
      >
        {/* Header */}
        <div>
          <h1 className="text-2xl font-bold text-white mb-2">Settings</h1>
          <p className="text-slate-400">Configure your FleetView Pro experience</p>
        </div>

        {/* Real-time Settings */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="bg-surface border border-slate-600 rounded-lg p-6"
        >
          <div className="flex items-center gap-2 mb-4">
            <ApperIcon name="Radio" size={20} className="text-primary" />
            <h2 className="text-lg font-semibold text-white">Real-time Tracking</h2>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Input
              label="Update Interval (seconds)"
              type="number"
              value={settings.updateInterval}
              onChange={(e) => setSettings({...settings, updateInterval: e.target.value})}
              icon="Clock"
            />
            
            <Input
              label="Default Map Zoom Level"
              type="number"
              value={settings.mapZoom}
              onChange={(e) => setSettings({...settings, mapZoom: e.target.value})}
              icon="ZoomIn"
            />
          </div>
        </motion.div>

        {/* Notification Settings */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="bg-surface border border-slate-600 rounded-lg p-6"
        >
          <div className="flex items-center gap-2 mb-4">
            <ApperIcon name="Bell" size={20} className="text-accent" />
            <h2 className="text-lg font-semibold text-white">Notifications</h2>
          </div>
          
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-white font-medium">Push Notifications</h3>
                <p className="text-slate-400 text-sm">Receive alerts for important fleet events</p>
              </div>
              <Button
                variant={settings.notifications ? 'accent' : 'ghost'}
                size="sm"
                onClick={() => setSettings({...settings, notifications: !settings.notifications})}
              >
                {settings.notifications ? 'Enabled' : 'Disabled'}
              </Button>
            </div>
            
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-white font-medium">Auto-assign Tasks</h3>
                <p className="text-slate-400 text-sm">Automatically assign tasks to available vehicles</p>
              </div>
              <Button
                variant={settings.autoAssign ? 'accent' : 'ghost'}
                size="sm"
                onClick={() => setSettings({...settings, autoAssign: !settings.autoAssign})}
              >
                {settings.autoAssign ? 'Enabled' : 'Disabled'}
              </Button>
            </div>
          </div>
        </motion.div>

        {/* Performance Settings */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="bg-surface border border-slate-600 rounded-lg p-6"
        >
          <div className="flex items-center gap-2 mb-4">
            <ApperIcon name="Gauge" size={20} className="text-warning" />
            <h2 className="text-lg font-semibold text-white">Performance Monitoring</h2>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Input
              label="Speed Limit Alert (km/h)"
              type="number"
              value={settings.speedLimit}
              onChange={(e) => setSettings({...settings, speedLimit: e.target.value})}
              icon="AlertTriangle"
            />
            
            <Input
              label="Idle Timeout (minutes)"
              type="number"
              value={settings.idleTimeout}
              onChange={(e) => setSettings({...settings, idleTimeout: e.target.value})}
              icon="Clock"
            />
          </div>
        </motion.div>

        {/* System Information */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="bg-surface border border-slate-600 rounded-lg p-6"
        >
          <div className="flex items-center gap-2 mb-4">
            <ApperIcon name="Info" size={20} className="text-info" />
            <h2 className="text-lg font-semibold text-white">System Information</h2>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-sm">
            <div className="space-y-2">
              <div className="flex justify-between">
                <span className="text-slate-400">Version:</span>
                <span className="text-white">v2.1.0</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-400">Last Update:</span>
                <span className="text-white">2024-01-15</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-400">Database:</span>
                <span className="text-accent">Connected</span>
              </div>
            </div>
            
            <div className="space-y-2">
              <div className="flex justify-between">
                <span className="text-slate-400">API Status:</span>
                <span className="text-accent">Online</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-400">Data Sync:</span>
                <span className="text-accent">Active</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-400">Uptime:</span>
                <span className="text-white">99.9%</span>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Action Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="flex flex-col sm:flex-row gap-4 justify-end"
        >
          <Button variant="secondary" onClick={handleReset} icon="RotateCcw">
            Reset to Defaults
          </Button>
          <Button variant="accent" onClick={handleSave} icon="Save">
            Save Settings
          </Button>
        </motion.div>
      </motion.div>
    </div>
  );
};

export default SettingsPage;