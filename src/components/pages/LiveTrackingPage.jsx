import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { toast } from 'react-toastify';
import FleetMap from '@/components/organisms/FleetMap';
import VehicleList from '@/components/organisms/VehicleList';
import StatCard from '@/components/molecules/StatCard';
import Loading from '@/components/ui/Loading';
import Error from '@/components/ui/Error';
import { vehicleService } from '@/services/api/vehicleService';
import { taskService } from '@/services/api/taskService';

const LiveTrackingPage = () => {
  const [vehicles, setVehicles] = useState([]);
  const [tasks, setTasks] = useState([]);
  const [selectedVehicle, setSelectedVehicle] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    Promise.all([loadVehicles(), loadTasks()]);
    
    // Set up real-time updates
    const interval = setInterval(() => {
      loadVehicles();
    }, 5000);
    
    return () => clearInterval(interval);
  }, []);

  const loadVehicles = async () => {
    try {
      setError('');
      const data = await vehicleService.getAll();
      setVehicles(data);
    } catch (err) {
      setError(err.message || 'Failed to load vehicles');
    } finally {
      setLoading(false);
    }
  };

  const loadTasks = async () => {
    try {
      const data = await taskService.getAll();
      setTasks(data);
    } catch (err) {
      console.error('Failed to load tasks:', err);
    }
  };

  const handleTaskDrop = async (task, vehicle) => {
    try {
      const updatedTask = {
        ...task,
        assignedVehicle: vehicle.Id,
        status: 'assigned'
      };
      
      await taskService.update(task.Id, updatedTask);
      await loadTasks();
      
      toast.success(`Task assigned to ${vehicle.plateNumber}`);
    } catch (error) {
      toast.error('Failed to assign task');
    }
  };

  const stats = {
    total: vehicles.length,
    online: vehicles.filter(v => v.status === 'online').length,
    idle: vehicles.filter(v => v.status === 'idle').length,
    offline: vehicles.filter(v => v.status === 'offline').length
  };

  if (loading) return <Loading type="map" />;
  if (error) return <Error message={error} onRetry={() => Promise.all([loadVehicles(), loadTasks()])} />;

  return (
    <div className="h-full flex flex-col">
      {/* Stats Bar */}
      <div className="p-4 bg-surface/30 border-b border-slate-600">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          <StatCard
            title="Total Vehicles"
            value={stats.total}
            icon="Truck"
            color="primary"
          />
          <StatCard
            title="Online"
            value={stats.online}
            icon="CircleCheck"
            color="accent"
          />
          <StatCard
            title="Idle"
            value={stats.idle}
            icon="Clock"
            color="warning"
          />
          <StatCard
            title="Offline"
            value={stats.offline}
            icon="CircleX"
            color="error"
          />
        </div>
      </div>

{/* Main Content */}
      <div className="flex-1 flex overflow-hidden">
        {/* Vehicle List Sidebar */}
        <div className="w-80 lg:w-96">
          <VehicleList
            selectedVehicle={selectedVehicle}
            onVehicleSelect={setSelectedVehicle}
            onTaskDrop={handleTaskDrop}
          />
        </div>

        {/* Map Area */}
        <div className="flex-1 p-4">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="w-full h-full"
          >
            <FleetMap
              vehicles={vehicles}
              selectedVehicle={selectedVehicle}
              onVehicleSelect={setSelectedVehicle}
            />
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default LiveTrackingPage;