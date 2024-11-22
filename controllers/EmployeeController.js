export default class EmployeeController {
    constructor(model, view) {
        this.model = model;
        this.view = view;
    }

    async init() {
        await this.loadEmployees();
        this.bindEvents();
    }

    async loadEmployees() {
        const employees = await this.model.getEmployees();
        this.view.renderEmployees(employees);
    }

    bindEvents() {
        this.view.bindAddEmployee(this.handleAddEmployee.bind(this));
        this.view.bindEditEmployee(this.handleEditEmployee.bind(this));
        this.view.bindDeleteEmployee(this.handleDeleteEmployee.bind(this));
        this.view.bindSelectAll(this.handleSelectAll.bind(this));
        this.view.bindDeleteSelected(this.handleDeleteSelected.bind(this));
    }

    async handleAddEmployee(employee) {
        await this.model.addEmployee(employee);
        await this.loadEmployees();
    }

    async handleEditEmployee(id) {
        const employee = this.model.employees.find(emp => emp.id === id);
        if (employee) {
            this.view.showModal('Editar Empleado', employee);
            this.view.bindSubmitForm(async (updatedEmployee) => {
                await this.model.updateEmployee(id, updatedEmployee);
                await this.loadEmployees();
            });
        }
    }

    async handleDeleteEmployee(id) {
        await this.model.deleteEmployee(id);
        await this.loadEmployees();
    }

    handleSelectAll(isChecked) {
        this.view.updateDeleteSelectedButton(isChecked);
    }

    async handleDeleteSelected(ids) {
        await this.model.deleteMultipleEmployees(ids);
        await this.loadEmployees();
    }
}