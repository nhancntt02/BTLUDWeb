const ApiError = require("../api-error");
const MongoDB = require("../utils/mongodb.util");
const PubliserService = require("../services/nxb.service");

exports.create = async (req, res, next) => {
    if (!req.body?.tennxb) {
        return next(new ApiError(400, "Name can not be empty"));
    } 

    try {
        const publiserService = new PubliserService(MongoDB.client);
        const document = await publiserService.create(req.body);
        
        return res.send(document);
    } catch (error) {
        return next(
            new ApiError(500, "An error occurred while creating the publiser")
        );
    }
};

exports.findAll = async (req, res, next) => {
    let documents = [];

    try {
        const publiserService = new PubliserService(MongoDB.client);
        documents = await publiserService.find({});
    } catch (error) {
        return next(
            new  ApiError(500, "An error occurred while retrieving  publiser")
        );
    }
    return res.send(documents);
};

exports.findOne = async (req, res, next) => {
    try {
        const publiserService = new PubliserService(MongoDB.client);
        const document = await publiserService.findById(req.params.id);
        if(!document){
            return next(new ApiError(404,"Publiser not found"));
        }
        return res.send(document);
    } catch (error) {
        return next(
            new ApiError(500, `Error retrieving publiser with id=${req.params.id}`)
        );
    }
};

exports.findOneId = async (req, res) => {
    const publiserService = new PubliserService(MongoDB.client);
    const document = await publiserService.findById(req.params.id);
    if(!document){
        return false;
    }
    return true;
}

exports.update = async (req, res, next) => {
    if (Object.keys(req.body).length === 0) {
        return next(new ApiError(400,'Data to update can not be empty'));
    }

    try {
        const publiserService = new PubliserService(MongoDB.client);
        const document = await publiserService.update(req.params.id, req.body);

        if(!document) {
            return next(new ApiError(404, 'Publiser not found'));
        }
        return res.send({message: "Publiser was update successfully"});
    } catch (error) {
        return next (
            new ApiError(500,  `Error  updating publiser with id=${req.params.id}` )
        );
    }
};

exports.delete = async (req, res, next) => {
    try {
        const publiserService = new PubliserService(MongoDB.client);
        const document = await publiserService.delete(req.params.id);
        if (!document) {
            return next(new ApiError(404, 'Publiser not found'));
        }
        return res.send({message: "Publiser was deleted successfully"});
    } catch (error) {
        return next(new ApiError(500, `Could not delete publiser with id= ${req.params.id}`));
    }
}

exports.deleteAll = async (_req, res, next) => {
    try {
        const publiserService = new PubliserService(MongoDB.client);
        const deleteCount = await publiserService.deleteAll();
        return res.send({
            message : `${deleteCount} publiser were deleted`
        });
    } catch (error) {
        return next (
            new ApiError(500, "An error occurred while removing all publiser")
        );
    }
};
