import vehicleData from '@/services/mockData/vehicles.json';

// Helper function to simulate API delay
const delay = (ms) => new Promise(resolve => setTimeout(resolve, ms));

class VehicleService {
  constructor() {
    this.vehicles = [...vehicleData];
  }

  async getAll() {
    await delay(300);
    // Simulate real-time position updates
    return this.vehicles.map(vehicle => ({
      ...vehicle,
      lastUpdate: new Date().toISOString(),
      // Randomly update speed for online vehicles
      speed: vehicle.status === 'online' ? Math.floor(Math.random() * 60) + 20 : 0,
      // Slightly update today's distance for active vehicles
      todayDistance: vehicle.status === 'online' 
        ? vehicle.todayDistance + (Math.random() * 2) 
        : vehicle.todayDistance
    }));
  }

  async getById(id) {
    await delay(200);
    const vehicle = this.vehicles.find(v => v.Id === parseInt(id));
    if (!vehicle) {
      throw new Error('Vehicle not found');
    }
    return vehicle;
  }

  async create(vehicleData) {
    await delay(400);
    const maxId = Math.max(...this.vehicles.map(v => v.Id));
    const newVehicle = {
      ...vehicleData,
      Id: maxId + 1,
      todayDeliveries: 0,
      todayDistance: 0,
      speed: 0,
      lastUpdate: new Date().toISOString()
    };
    this.vehicles.push(newVehicle);
    return newVehicle;
  }

  async update(id, updateData) {
    await delay(300);
    const index = this.vehicles.findIndex(v => v.Id === parseInt(id));
    if (index === -1) {
      throw new Error('Vehicle not found');
    }
    this.vehicles[index] = { ...this.vehicles[index], ...updateData };
    return this.vehicles[index];
  }

  async delete(id) {
    await delay(250);
    const index = this.vehicles.findIndex(v => v.Id === parseInt(id));
    if (index === -1) {
      throw new Error('Vehicle not found');
    }
    const deleted = this.vehicles.splice(index, 1)[0];
    return deleted;
  }
}

export const vehicleService = new VehicleService();