const { ObjectId } = require("mongodb");
class PubliserService {
    constructor(client) {
        this.Publiser = client.db().collection("nhaxuatban");
    }
// Định nghĩa các phương thức truy xuất CSDL sử dụng mongodb API

    extractConactData(payload) {
        const publisher = {
            _id: payload._id,
            tennxb: payload.tennxb,
            diachi: payload.diachi,
        };
        // Remove undefined fields
        Object.keys(publisher).forEach(
            (key) => publisher[key] === undefined && delete publisher[key]
        );
        return publisher;
    }

    async create(payload) {
        const publisher = this.extractConactData(payload);
        const result = await this.Publiser.insertOne(
            publisher,
        );
        return "Them thanh cong";
    }

    async find(filter) {
        const cursor = await this.Publiser.find(filter);
            return await cursor.toArray();
    }
    
    async findByName(tennxb) {
        return await this.find({
            tennxb: { $regex: new RegExp(tennxb), $options: "i" },
        });
    }

    async findById(id) {
        return await this.Publiser.findOne({
            _id: ObjectId.isValid(id) ? new ObjectId(id) : id,
        });
    }

    async update(id, payload) {
        const filter = {
            _id: ObjectId.isValid(id) ? new ObjectId(id) : id,
        };
        const update = this.extractConactData(payload);
        const result = await this.Publiser.findOneAndUpdate(
            filter,
            { $set: update },
            { returnDocument: "after" }
        );
        return result;
    }

    async delete(id) {
        const result = await this.Publiser.findOneAndDelete({
            _id: ObjectId.isValid(id) ? new ObjectId(id) : id,
        });
        return result;
    }


    async deleteAll() {
        const result = await this.Publiser.deleteMany({});
        return result.deletedCount;
    }
}
module.exports = PubliserService;
