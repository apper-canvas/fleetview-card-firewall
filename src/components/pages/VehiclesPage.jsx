import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { toast } from 'react-toastify';
import VehicleCard from '@/components/molecules/VehicleCard';
import SearchBar from '@/components/molecules/SearchBar';
import Button from '@/components/atoms/Button';
import StatusBadge from '@/components/atoms/StatusBadge';
import Loading from '@/components/ui/Loading';
import Error from '@/components/ui/Error';
import Empty from '@/components/ui/Empty';
import ApperIcon from '@/components/ApperIcon';
import { vehicleService } from '@/services/api/vehicleService';

const VehiclesPage = () => {
  const [vehicles, setVehicles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [selectedVehicle, setSelectedVehicle] = useState(null);

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

  if (loading) return <Loading type="vehicles" />;
  if (error) return <Error message={error} onRetry={loadVehicles} />;

  return (
    <div className="p-6 h-full overflow-y-auto">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="space-y-6"
      >
        {/* Header */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
          <div>
            <h1 className="text-2xl font-bold text-white mb-2">Fleet Management</h1>
            <p className="text-slate-400">Monitor and manage your vehicle fleet</p>
          </div>
          
          <div className="flex gap-2">
            <Button variant="secondary" icon="RefreshCw" onClick={loadVehicles}>
              Refresh
            </Button>
            <Button variant="accent" icon="Plus">
              Add Vehicle
            </Button>
          </div>
        </div>

        {/* Search and Filter */}
        <div className="flex flex-col sm:flex-row gap-4">
          <div className="flex-1">
            <SearchBar
              value={searchTerm}
              onChange={setSearchTerm}
              onClear={() => setSearchTerm('')}
              placeholder="Search by driver name or plate number..."
            />
          </div>
          
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
        </div>

        {/* Vehicle Grid */}
        {filteredVehicles.length === 0 ? (
          <Empty
            title="No vehicles found"
            description="Try adjusting your search or filter criteria, or add a new vehicle to your fleet."
            icon="Truck"
            action={{
              label: "Add Vehicle",
              icon: "Plus",
              onClick: () => toast.info("Vehicle registration coming soon!")
            }}
          />
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {filteredVehicles.map((vehicle, index) => (
              <motion.div
                key={vehicle.Id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.05 }}
              >
                <VehicleCard
                  vehicle={vehicle}
                  onClick={setSelectedVehicle}
                  isSelected={selectedVehicle?.Id === vehicle.Id}
                />
              </motion.div>
            ))}
          </div>
        )}

        {/* Fleet Statistics */}
        {vehicles.length > 0 && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
            className="bg-surface border border-slate-600 rounded-lg p-6"
          >
            <div className="flex items-center gap-2 mb-6">
              <ApperIcon name="BarChart3" size={20} className="text-primary" />
              <h3 className="text-lg font-semibold text-white">Fleet Statistics</h3>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              <div className="text-center p-4 bg-slate-800 rounded-lg">
                <div className="text-3xl font-bold text-accent mb-2">
                  {vehicles.reduce((sum, v) => sum + v.todayDeliveries, 0)}
                </div>
                <div className="text-slate-400">Total Deliveries Today</div>
              </div>
              
              <div className="text-center p-4 bg-slate-800 rounded-lg">
                <div className="text-3xl font-bold text-primary mb-2">
                  {vehicles.reduce((sum, v) => sum + v.todayDistance, 0).toFixed(0)}
                </div>
                <div className="text-slate-400">Total Distance (km)</div>
              </div>
              
              <div className="text-center p-4 bg-slate-800 rounded-lg">
                <div className="text-3xl font-bold text-warning mb-2">
                  {vehicles.filter(v => v.speed > 0).length > 0 
                    ? (vehicles.filter(v => v.speed > 0).reduce((sum, v) => sum + v.speed, 0) / vehicles.filter(v => v.speed > 0).length).toFixed(1)
                    : '0'
                  }
                </div>
                <div className="text-slate-400">Avg Speed (km/h)</div>
              </div>
              
              <div className="text-center p-4 bg-slate-800 rounded-lg">
                <div className="text-3xl font-bold text-accent mb-2">
                  {((vehicles.filter(v => v.status === 'online').length / vehicles.length) * 100).toFixed(0)}%
                </div>
                <div className="text-slate-400">Fleet Utilization</div>
              </div>
            </div>
          </motion.div>
        )}
      </motion.div>
    </div>
  );
};

export default VehiclesPage;