const { ObjectId } = require("mongodb");
class FlowBookService {
    constructor(client) {
        this.FlowBook = client.db().collection("theodoimuonsach");
        this.Book = client.db().collection("sach");
        this.Reader = client.db().collection("docgia");
        this.Employee = client.db().collection("nhanvien");
    }
// Định nghĩa các phương thức truy xuất CSDL sử dụng mongodb API

    extractConactData(payload) {
        const data = {
            ngaymuon: payload.ngaymuon,
            madocgia: payload.madocgia,
            masach: payload.masach,
            manhanvien: payload.manhanvien,
            ngaytra: payload.ngaytra,
        };
        // Remove undefined fields
        data.ngaytra = data.ngaytra ? data.ngaytra : "0-0-0";
        return data;
    }

    async create(payload) {
        
        const book = await this.Book.findOne({_id: payload.masach});
        const reader = await this.Reader.findOne({_id : payload.madocgia});
        const employee = await this.Employee.findOne({_id : payload.manhanvien});

        if (book && reader && employee) {
            const data = this.extractConactData(payload);
            const result = await this.FlowBook.insertOne(
                data,
                { returnDocument: "after", upsert: true }
            );
            return "Them du lieu thanh cong";
        }
    }

    async find(filter) {
        const cursor = await this.FlowBook.find(filter);
            return await cursor.toArray();
    }

    async findById(id) {
        return await this.FlowBook.findOne({
            _id: ObjectId.isValid(id) ? new ObjectId(id) : null,
        });
    }

    async update(id, payload) {

        const book = await this.Book.findOne({_id: payload.masach});
        const reader = await this.Reader.findOne({_id : payload.madocgia});
        const employee = await this.Employee.findOne({_id : payload.manhanvien});

        if (book && reader && employee) {
            const filter = {
                _id: ObjectId.isValid(id) ? new ObjectId(id) : null,
            };
            const update = this.extractConactData(payload);
            const result = await this.FlowBook.findOneAndUpdate(
                filter,
                { $set: update },
                { returnDocument: "after" }
            );
            return result;
        }

    }

    async delete(id) {
        const result = await this.FlowBook.findOneAndDelete({
            _id: ObjectId.isValid(id) ? new ObjectId(id) : null,
        });
        return result;
    }

    async deleteAll() {
        const result = await this.FlowBook.deleteMany({});
        return result.deletedCount;
    }
}
module.exports = FlowBookService;
