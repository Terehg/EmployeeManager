export default class ApiService {
    constructor() {
        this.employees = JSON.parse(localStorage.getItem('employees')) || [];
    }

    async getAll() {
        return new Promise(resolve => {
            setTimeout(() => resolve([...this.employees]), 300);
        });
    }

    async create(employee) {
        return new Promise(resolve => {
            setTimeout(() => {
                const newEmployee = { ...employee, id: Date.now().toString() };
                this.employees.push(newEmployee);
                this.saveToLocalStorage();
                resolve(newEmployee);
            }, 300);
        });
    }

    async update(id, updatedEmployee) {
        return new Promise((resolve, reject) => {
            setTimeout(() => {
                const index = this.employees.findIndex(emp => emp.id === id);
                if (index !== -1) {
                    this.employees[index] = { ...this.employees[index], ...updatedEmployee };
                    this.saveToLocalStorage();
                    resolve(this.employees[index]);
                } else {
                    reject(new Error('Employee not found'));
                }
            }, 300);
        });
    }

    async delete(id) {
        return new Promise((resolve, reject) => {
            setTimeout(() => {
                const index = this.employees.findIndex(emp => emp.id === id);
                if (index !== -1) {
                    this.employees.splice(index, 1);
                    this.saveToLocalStorage();
                    resolve();
                } else {
                    reject(new Error('Employee not found'));
                }
            }, 300);
        });
    }

    saveToLocalStorage() {
        localStorage.setItem('employees', JSON.stringify(this.employees));
    }
}