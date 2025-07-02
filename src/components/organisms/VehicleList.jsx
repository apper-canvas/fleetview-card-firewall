import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import VehicleCard from '@/components/molecules/VehicleCard';
import SearchBar from '@/components/molecules/SearchBar';
import Button from '@/components/atoms/Button';
import StatusBadge from '@/components/atoms/StatusBadge';
import Loading from '@/components/ui/Loading';
import Error from '@/components/ui/Error';
import Empty from '@/components/ui/Empty';
import ApperIcon from '@/components/ApperIcon';
import { vehicleService } from '@/services/api/vehicleService';

const VehicleList = ({ selectedVehicle, onVehicleSelect, onTaskDrop }) => {
  const [vehicles, setVehicles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [isCollapsed, setIsCollapsed] = useState(false);

  useEffect(() => {
    loadVehicles();
  }, []);

  const loadVehicles = async () => {
    try {
      setLoading(true);
      setError('');
      const data = await vehicleService.getAll();
      setVehicles(data);
    } catch (err) {
      setError(err.message || 'Failed to load vehicles');
    } finally {
      setLoading(false);
    }
  };

  const filteredVehicles = vehicles.filter(vehicle => {
    const matchesSearch = vehicle.driverName.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         vehicle.plateNumber.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter === 'all' || vehicle.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  const statusCounts = vehicles.reduce((acc, vehicle) => {
    acc[vehicle.status] = (acc[vehicle.status] || 0) + 1;
    return acc;
  }, {});

  const handleDragOver = (e) => {
    e.preventDefault();
  };

  const handleDrop = (e, vehicle) => {
    e.preventDefault();
    try {
      const taskData = JSON.parse(e.dataTransfer.getData('application/json'));
      if (onTaskDrop) {
        onTaskDrop(taskData, vehicle);
      }
    } catch (error) {
      console.error('Error handling task drop:', error);
    }
  };

  if (loading) return <Loading type="vehicles" />;
  if (error) return <Error message={error} onRetry={loadVehicles} />;

  return (
    <div className="h-full flex flex-col bg-surface border-l border-slate-600">
      {/* Header */}
      <div className="p-4 border-b border-slate-600">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-lg font-semibold text-white flex items-center gap-2">
            <ApperIcon name="Truck" size={20} className="text-primary" />
            Fleet Status
          </h2>
          <Button
            variant="ghost"
            size="sm"
            onClick={() => setIsCollapsed(!isCollapsed)}
            className="lg:hidden"
          >
            <ApperIcon name={isCollapsed ? "ChevronRight" : "ChevronLeft"} size={16} />
          </Button>
        </div>

        <AnimatePresence>
          {!isCollapsed && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              className="space-y-4"
            >
              <SearchBar
                value={searchTerm}
                onChange={setSearchTerm}
                onClear={() => setSearchTerm('')}
                placeholder="Search vehicles..."
              />

              {/* Status Filter */}
              <div className="flex flex-wrap gap-2">
                <Button
                  variant={statusFilter === 'all' ? 'primary' : 'ghost'}
                  size="sm"
                  onClick={() => setStatusFilter('all')}
                >
                  All ({vehicles.length})
                </Button>
                {Object.entries(statusCounts).map(([status, count]) => (
                  <Button
                    key={status}
                    variant={statusFilter === status ? 'primary' : 'ghost'}
                    size="sm"
                    onClick={() => setStatusFilter(status)}
                  >
                    <StatusBadge status={status} showIcon={false} />
                    <span className="ml-1">({count})</span>
                  </Button>
                ))}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Vehicle List */}
      <div className="flex-1 overflow-y-auto p-4">
        <AnimatePresence>
          {!isCollapsed && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="space-y-3"
            >
              {filteredVehicles.length === 0 ? (
                <Empty
                  title="No vehicles found"
                  description="Try adjusting your search or filter criteria."
                  icon="Truck"
                />
              ) : (
                filteredVehicles.map((vehicle) => (
                  <div
                    key={vehicle.Id}
                    onDragOver={handleDragOver}
                    onDrop={(e) => handleDrop(e, vehicle)}
                  >
                    <VehicleCard
                      vehicle={vehicle}
                      onClick={onVehicleSelect}
                      isSelected={selectedVehicle?.Id === vehicle.Id}
                    />
                  </div>
                ))
              )}
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Quick Actions */}
      <AnimatePresence>
        {!isCollapsed && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 20 }}
            className="p-4 border-t border-slate-600"
          >
            <Button
              variant="accent"
              size="sm"
              className="w-full"
              onClick={loadVehicles}
              icon="RefreshCw"
            >
              Refresh Fleet
            </Button>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default VehicleList;