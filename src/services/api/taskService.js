import taskData from '@/services/mockData/tasks.json';

// Helper function to simulate API delay
const delay = (ms) => new Promise(resolve => setTimeout(resolve, ms));

class TaskService {
  constructor() {
    this.tasks = [...taskData];
  }

  async getAll() {
    await delay(250);
    return [...this.tasks];
  }

  async getById(id) {
    await delay(200);
    const task = this.tasks.find(t => t.Id === parseInt(id));
    if (!task) {
      throw new Error('Task not found');
    }
    return task;
  }

  async create(taskData) {
    await delay(400);
    const maxId = Math.max(...this.tasks.map(t => t.Id));
    const newTask = {
      ...taskData,
      Id: maxId + 1,
      status: 'pending'
    };
    this.tasks.push(newTask);
    return newTask;
  }

  async update(id, updateData) {
    await delay(300);
    const index = this.tasks.findIndex(t => t.Id === parseInt(id));
    if (index === -1) {
      throw new Error('Task not found');
    }
    this.tasks[index] = { ...this.tasks[index], ...updateData };
    return this.tasks[index];
  }

  async delete(id) {
    await delay(250);
    const index = this.tasks.findIndex(t => t.Id === parseInt(id));
    if (index === -1) {
      throw new Error('Task not found');
    }
    const deleted = this.tasks.splice(index, 1)[0];
    return deleted;
  }
}

export const taskService = new TaskService();