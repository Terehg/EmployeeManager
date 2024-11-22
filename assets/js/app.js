import EmployeeModel from '../../models/EmployeeModel.js';
import EmployeeView from '../../views/EmployeeView.js';
import EmployeeController from '../../controllers/EmployeeController.js';

document.addEventListener('DOMContentLoaded', () => {
    const model = new EmployeeModel();
    const view = new EmployeeView();
    const controller = new EmployeeController(model, view);

    controller.init();
});