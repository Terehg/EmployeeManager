export default class EmployeeView {
    constructor() {
        this.addButton = document.getElementById('add-employee');
        this.deleteSelectedButton = document.getElementById('delete-selected');
        this.employeesList = document.getElementById('employees-list');
        this.modal = document.getElementById('modal');
        this.employeeForm = document.getElementById('employee-form');
        this.selectAllCheckbox = document.getElementById('select-all');
        this.closeModalButton = document.querySelector('.close-modal');
       this.bindCloseModal();
        this.initializeFormListener();
        this.handleIndividualSelect();
    }

    renderEmployees(employees) {
        this.employeesList.innerHTML = employees.map(employee => this.createEmployeeRow(employee)).join('');
    }

    createEmployeeRow(employee) {
        return   `
            <tr data-id="${employee.id}">
                <td><input type="checkbox" class="employee-select"></td>
                <td>${employee.name}</td>
                <td>${employee.surname}</td>
                <td>${employee.email}</td>
                <td>${employee.dateOfBirth}</td>
                <td>${this.getRoleName(employee.roleId)}</td>
                <td>
                    <button class="edit-employee">Editar</button>
                    <button class="delete-employee">Eliminar</button>
                </td>
            </tr>
          `;
    }

    getRoleName(roleId) {
        const roles = {
            1: 'Desarrollador',
            2: 'Team Leader',
            3: 'CTO'
        };
        return roles[roleId] || 'Desconocido';
    }

    bindCloseModal() {
        this.closeModalButton.addEventListener('click', () => this.hideModal());
    }

    showModal(title, employee = null) {
        this.modal.style.display = 'block';
        document.getElementById('modal-title').textContent = title;
        this.renderForm(employee);
        this.closeModalButton.style.display = 'block';
    }

    hideModal() {
        this.modal.style.display = 'none';
       this.employeeForm.reset();
    }

 
    renderForm(employee = null) {
        this.employeeForm.innerHTML = `  
            <input type="text" id="name" name="name" placeholder="Nombre" required maxlength="100" value="${employee ? employee.name : ''}">
            <input type="text" id="surname" name="surname" placeholder="Apellido" value="${employee ? employee.surname : ''}">
            <input type="email" id="email" name="email" placeholder="Email" required value="${employee ? employee.email : ''}">
            <input type="date" id="dateOfBirth" name="dateOfBirth" required value="${employee ? employee.dateOfBirth : ''}">
            <select id="roleId" name="roleId" required>
                <option value="">Seleccione un rol</option>
                <option value="1" ${employee && employee.roleId === 1 ? 'selected' : ''}>Desarrollador</option>
                <option value="2" ${employee && employee.roleId === 2 ? 'selected' : ''}>Team Leader</option>
                <option value="3" ${employee && employee.roleId === 3 ? 'selected' : ''}>CTO</option>
            </select>
            <button type="submit">${employee ? 'Actualizar' : 'Agregar'}</button>
          `;
    }

    bindAddEmployee(handler) {
        this.addButton.addEventListener('click', () => {
            this.showModal('Agregar Empleado');
            this.bindSubmitForm(handler);
        });
    }

    bindEditEmployee(handler) {
        this.employeesList.addEventListener('click', (e) => {
            if (e.target.classList.contains('edit-employee')) {
                const employeeId = e.target.closest('tr').dataset.id;
                handler(employeeId);
            }
        });
    }

    bindDeleteEmployee(handler) {
        this.employeesList.addEventListener('click', (e) => {
            if (e.target.classList.contains('delete-employee')) {
                const employeeId = e.target.closest('tr').dataset.id;
                if (confirm('¿Está seguro de que desea eliminar este empleado?')) {
                    handler(employeeId);
                }
            }
        });
    }

    initializeFormListener() {
        this.employeeForm.addEventListener('submit', (e) => {
            e.preventDefault();
            if (this.currentSubmitHandler) {
                const formData = new FormData(e.target);
                const employee = Object.fromEntries(formData.entries());
                employee.roleId = parseInt(employee.roleId);
                this.currentSubmitHandler(employee);
                this.hideModal();
            }
        });
    }
    
    bindSubmitForm(handler) {
        this.currentSubmitHandler = handler;
    }

    bindSelectAll(handler) {
        this.selectAllCheckbox.addEventListener('change', (e) => {
            const isChecked = e.target.checked;
            const checkboxes = document.querySelectorAll('.employee-select');
            checkboxes.forEach(checkbox => {
                checkbox.checked = isChecked;
            });
            this.updateDeleteSelectedButton(isChecked);
        });
    }
    handleIndividualSelect() {
        this.employeesList.addEventListener('change', (e) => {
            if (e.target.classList.contains('employee-select')) {
                const checkboxes = document.querySelectorAll('.employee-select');
                const anyChecked = Array.from(checkboxes).some(cb => cb.checked);
                this.updateDeleteSelectedButton(anyChecked);
            }
        });
    }

    bindDeleteSelected(handler) {
        this.deleteSelectedButton.addEventListener('click', () => {
            const selectedIds = Array.from(document.querySelectorAll('.employee-select:checked'))
                .map(checkbox => checkbox.closest('tr').dataset.id);
            
            if (selectedIds.length > 0 && confirm('¿Está seguro de que desea eliminar los empleados seleccionados?')) {
                handler(selectedIds);
                this.selectAllCheckbox.checked = false;
                this.updateDeleteSelectedButton(false);
            }
        });
    }

    updateDeleteSelectedButton(enableButton) {
        this.deleteSelectedButton.disabled = !enableButton;
    }
}