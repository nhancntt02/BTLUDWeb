import createApiClient from "./api.service";

class BookService {
    constructor(baseUrl = "/api/contacts") {
        this.api = createApiClient(baseUrl);
    }
    async getAll() {
    return (await this.api.get("/books")).data;
    }
    async create(data) {
    return (await this.api.post("/books", data)).data;
    }
    async deleteAll() {
    return (await this.api.delete("/books")).data;
    }
    async get(id) {
    return (await this.api.get(`/books/${id}`)).data;
    }
    async update(id, data) {
    return (await this.api.put(`/books/${id}`, data)).data;
    }
    async delete(id) {
    return (await this.api.delete(`/books/${id}`)).data;
    }
}
export default new BookService();