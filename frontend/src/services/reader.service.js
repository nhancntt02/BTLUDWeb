import createApiClient from "./api.service";

class ReaderService {
    constructor(baseUrl = "/api/contacts") {
        this.api = createApiClient(baseUrl);
    }
    async getAll() {
    return (await this.api.get("/reader")).data;
    }
    async create(data) {
    return (await this.api.post("/reader", data)).data;
    }
    async deleteAll() {
    return (await this.api.delete("/reader")).data;
    }
    async get(id) {
    return (await this.api.get(`/reader/${id}`)).data;
    }
    async update(id, data) {
    return (await this.api.put(`/reader/${id}`, data)).data;
    }
    async delete(id) {
    return (await this.api.delete(`/reader/${id}`)).data;
    }
}
export default new ReaderService();