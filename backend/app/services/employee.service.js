const { ObjectId } = require("mongodb");
class EmployeeService {
    constructor(client) {
        this.Employee = client.db().collection("nhanvien");
    }

    extractConnactData(payload) {
        const employee = {
            _id: payload._id,
            hoten: payload.hoten,
            password: payload.password,
            chucvu: payload.chucvu,
            diachi: payload.diachi,
            sdt: payload.sdt,

        };
        Object.keys(employee).forEach(
            (key) => employee[key] === undefined && delete employee[key]
        );
        return employee;
    }

    async create(payload) {
        const employee = this.extractConnactData(payload);
        const result = await this.Employee.insertOne(
            employee,
            { returnDocument: "after", upsert: true }
        );
        return "Thêm nhân viên thành công";
    }

    async login(username,password) {
        const user = await this.Employee.findOne({_id:username});
        if(user.password == password){
            return "Dang nhap thanh cong";
        }
        return null;
    }

    async find(filter) {
        const cursor = await this.Employee.find(filter);
            return await cursor.toArray();
    }
    
    async findByName(hoten) {
        return await this.find({
            hoten: { $regex: new RegExp(hoten), $options: "i" },
        }).toArray();
    }

    async findById(id) {
        return await this.Employee.findOne({
            _id: ObjectId.isValid(id) ? new ObjectId(id) : id,
        });
    }

    async update(id, payload) {
        const filter = {
            _id: ObjectId.isValid(id) ? new ObjectId(id) : id,
        };
        const update = this.extractConnactData(payload);
        const result = await this.Employee.findOneAndUpdate(
            filter,
            { $set: update },
            { returnDocument: "after" }
        );
        return result;
    }

    async delete(id) {
        const result = await this.Employee.findOneAndDelete({
            _id: ObjectId.isValid(id) ? new ObjectId(id) : id,
        });
        return result;
    }

    async deleteAll() {
        const result = await this.Employee.deleteMany({});
        return result.deletedCount;
    }
}
module.exports = EmployeeService;
