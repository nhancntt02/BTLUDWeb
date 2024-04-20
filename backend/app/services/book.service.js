const { ObjectId } = require("mongodb");
class BookService {
    constructor(client) {
        this.Book = client.db().collection("sach");
        this.Publiser = client.db().collection("nhaxuatban");
    }

    extractConnactData(payload) {
        const book = {
            _id: payload._id,
            tensach: payload.tensach,
            dongia: payload.dongia,
            soquyen: payload.soquyen,
            namxb: payload.name,
            manxb: payload.manxb,
            tacgia: payload.tacgia,
            
        };
        Object.keys(book).forEach(
            (key) => book[key] === undefined && delete book[key]
        );
        return book;
    }

    async create(payload) {
        const book = this.extractConnactData(payload);
        
        const publiser = await this.Publiser.findOne({ _id : book.manxb });

        if(publiser){
            const result = await this.Book.insertOne(
                book,
                { returnDocument: "after", upsert: true }
            );
            return "Thêm thành công";
        }
        
        
    }

    async find(filter) {
        const cursor = await this.Book.find(filter);
            return await cursor.toArray();
    }
    
    async findByName(name) {
        return await this.find({
            name: { $regex: new RegExp(name), $options: "i" },
        });
    }

    async findById(id) {
        return await this.Book.findOne({
            _id: id,
        });
    }

    async update(id, payload) {
        
        const publiser = await this.Publiser.findOne({ _id : payload.manxb });
        if(publiser) {
            const filter = {
                _id: ObjectId.isValid(id) ? new ObjectId(id) : id,
            };
            const update = this.extractConnactData(payload);
            const result = await this.Book.findOneAndUpdate(
                filter,
                { $set: update },
                { returnDocument: "after" }
            );
            return result;
        }
    }

    async delete(id) {
        const result = await this.Book.findOneAndDelete({
            _id: ObjectId.isValid(id) ? new ObjectId(id) : id,
        });
        return result;
    }



    async deleteAll() {
        const result = await this.Book.deleteMany({});
        return result.deletedCount;
    }
}
module.exports = BookService;
