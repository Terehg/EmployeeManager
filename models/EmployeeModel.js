import ApiService from '../services/ApiService.js';

export default class EmployeeModel {
    constructor() {
        this.employees = [];
        this.apiService = new ApiService();
    }

    async getEmployees() {
        this.employees = await this.apiService.getAll();
        return this.employees;
    }

    async addEmployee(employee) {
        const newEmployee = await this.apiService.create(employee);
        this.employees.push(newEmployee);
        return newEmployee;
    }

    async updateEmployee(id, updatedEmployee) {
        const employee = await this.apiService.update(id, updatedEmployee);
        const index = this.employees.findIndex(emp => emp.id === id);
        if (index !== -1) {
            this.employees[index] = employee;
        }
        return employee;
    }

    async deleteEmployee(id) {
        await this.apiService.delete(id);
        this.employees = this.employees.filter(emp => emp.id !== id);
    }

    async deleteMultipleEmployees(ids) {
        await Promise.all(ids.map(id => this.apiService.delete(id)));
        this.employees = this.employees.filter(emp => !ids.includes(emp.id));
    }
}