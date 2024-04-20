const ApiError = require("../api-error");
const MongoDB = require("../utils/mongodb.util");
const FlowBookService = require("../services/flowbook.service");

exports.create = async (req, res, next) => {
    if (!req.body?.ngaymuon) {
        return next(new ApiError(400, "Day can not be empty"));
    } 

    try {
        const flowbookService = new FlowBookService(MongoDB.client);
        const document = await flowbookService.create(req.body);
        if(!document){
            return next(
                new ApiError(500, "Error  when creating a record")
            );
        }
        return res.send(document);
    } catch (error) {
        return next(
            new ApiError(500, "An error occurred while creating the data")
        );
    }
};

exports.findAll = async (req, res, next) => {
    let documents = [];

    try {
        const flowbookService = new FlowBookService(MongoDB.client);
        documents = await flowbookService.find({});
        
    } catch (error) {
        return next(
            new  ApiError(500, "An error occurred while retrieving  datas")
        );
    }
    return res.send(documents);
};

exports.findOne = async (req, res, next) => {
    try {
        console.log("ID: ", req.params.id);
        const flowbookService = new FlowBookService(MongoDB.client);
        const document = await flowbookService.findById(req.params.id);
        if(!document){
            return next(new ApiError(404,"Data not found"));
        }
        return res.send(document);
    } catch (error) {
        return next(
            new ApiError(500, `Error retrieving data with id=${req.params.id}`)
        );
    }
};

exports.update = async (req, res, next) => {
    if (Object.keys(req.body).length === 0) {
        return next(new ApiError(400,'Data to update can not be empty'));
    }

    try {
        const flowbookService = new FlowBookService(MongoDB.client);
        const document = await flowbookService.update(req.params.id, req.body);

        if(!document) {
            return next(new ApiError(404, 'Data not found'));
        }
        return res.send({message: "Data was update successfully"});
    } catch (error) {
        return next (
            new ApiError(500,  `Error  updating data with id=${req.params.id}` )
        );
    }
};

exports.delete = async (req, res, next) => {
    try {
        const flowbookService = new FlowBookService(MongoDB.client);
        const document = await flowbookService.delete(req.params.id);
        if (!document) {
            return next(new ApiError(404, 'Data not found'));
        }
        return res.send({message: "Data was deleted successfully"});
    } catch (error) {
        return next(new ApiError(500, `Could not delete data with id= ${req.params.id}`));
    }
}

exports.deleteAll = async (_req, res, next) => {
    try {
        const datasService = new FlowBookService(MongoDB.client);
        const deleteCount = await datasService.deleteAll();
        return res.send({
            message : `${deleteCount} datas were deleted`
        });
    } catch (error) {
        return next (
            new ApiError(500, "An error occurred while removing all datas")
        );
    }
};
