const { ObjectId } = require("mongodb");
class ReaderService {
    constructor(client) {
        this.Reader = client.db().collection("docgia");
    }

    extractConactData(payload) {
        const contact = {
           _id: payload._id,
           holot: payload.holot,
           ten: payload.ten,
           ngaysinh: payload.ngaysinh,
           phai: payload.phai,
           diachi: payload.diachi,
           dienthoai: payload.dienthoai
        };
        Object.keys(contact).forEach(
            (key) => contact[key] === undefined && delete contact[key]
        );
        return contact;
    }

    async create(payload) {
        const contact = this.extractConactData(payload);
        const result = await this.Reader.insertOne(
            contact,
            { returnDocument: "after", upsert: true }
        );
        return "Them doc gia thanh cong";
    }

    async find(filter) {
        const cursor = await this.Reader.find(filter);
            return await cursor.toArray();
    }
    
    async findByName(ten) {
        return await this.find({
            ten: { $regex: new RegExp(ten), $options: "i" },
        });
    }

    async findById(id) {
        return await this.Reader.findOne({
            _id: ObjectId.isValid(id) ? new ObjectId(id) : id,
        });
    }

    async update(id, payload) {
        const filter = {
            _id: ObjectId.isValid(id) ? new ObjectId(id) : id,
        };
        const update = this.extractConactData(payload);
        const result = await this.Reader.findOneAndUpdate(
            filter,
            { $set: update },
            { returnDocument: "after" }
        );
        return result;
    }

    async delete(id) {
        const result = await this.Reader.findOneAndDelete({
            _id: ObjectId.isValid(id) ? new ObjectId(id) : id,
        });
        return result;
    }

    async deleteAll() {
        const result = await this.Reader.deleteMany({});
        return result.deletedCount;
    }
}
module.exports = ReaderService;
