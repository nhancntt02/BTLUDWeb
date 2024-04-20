const ApiError = require("../api-error");
const MongoDB = require("../utils/mongodb.util");
const EmployeeService = require("../services/employee.service");

exports.create = async (req, res, next) => {
    if (!req.body?.hoten) {
        return next(new ApiError(400, "Name can not be empty"));
    } 

    try {
        const employeeService = new EmployeeService(MongoDB.client);
        const document = await employeeService.create(req.body);
        return res.send(document);
    } catch (error) {
        return next(
            new ApiError(500, "An error occurred while creating the employee")
        );
    }
};

exports.login = async (req, res, next) => {
    try {
        const employeeService = new EmployeeService(MongoDB.client);
        const user = await employeeService.findById(req.body.username);
        if(!user){
            return next(
                new ApiError(405, `Tên đăng nhập không đúng.`)
            );
        }
        const document = await employeeService.login(user._id,req.body.password);
        if(document){
            return res.send(document);
        }
        else
        {
            return next(
                new ApiError(400, `Mật khẩu không đúng.`)
            );
        }
    } catch (error) {
        return next(
            new ApiError(500, `Error when login`)
        );
    }
};

exports.findAll = async (req, res, next) => {
    let documents = [];

    try {
        const employeeService = new EmployeeService(MongoDB.client);
        
        
        
            documents = await employeeService.find({});
        
    } catch (error) {
        return next(
            new  ApiError(500, "An error occurred while retrieving  employee")
        );
    }
    return res.send(documents);
};

exports.findOne = async (req, res, next) => {
    try {
        const employeeService = new EmployeeService(MongoDB.client);
        const document = await employeeService.findById(req.params.id);
        if(!document){
            return next(new ApiError(404,"Employee not found"));
        }
        return res.send(document);
    } catch (error) {
        return next(
            new ApiError(500, `Error retrieving employee with id=${req.params.id}`)
        );
    }
};

exports.update = async (req, res, next) => {
    if (Object.keys(req.body).length === 0) {
        return next(new ApiError(400,'Data to update can not be empty'));
    }

    try {
        const employeeService = new EmployeeService(MongoDB.client);
        const document = await employeeService.update(req.params.id, req.body);

        if(!document) {
            return next(new ApiError(404, 'Employee not found'));
        }
        return res.send({message: "Employee was update successfully"});
    } catch (error) {
        return next (
            new ApiError(500,  `Error  updating employee with id=${req.params.id}` )
        );
    }
};

exports.delete = async (req, res, next) => {
    try {
        const employeeService = new EmployeeService(MongoDB.client);
        const document = await employeeService.delete(req.params.id);
        if (!document) {
            return next(new ApiError(404, 'Employee not found'));
        }
        return res.send({message: "Employee was deleted successfully"});
    } catch (error) {
        return next(new ApiError(500, `Could not delete employee with id= ${req.params.id}`));
    }
}

exports.deleteAll = async (_req, res, next) => {
    try {
        const employeesService = new EmployeeService(MongoDB.client);
        const deleteCount = await employeesService.deleteAll();
        return res.send({
            message : `${deleteCount} employees were deleted`
        });
    } catch (error) {
        return next (
            new ApiError(500, "An error occurred while removing all employee")
        );
    }
};


