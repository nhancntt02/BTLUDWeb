import createApiClient from "./api.service";

class PubliserService {
    constructor(baseUrl = "/api/contacts") {
        this.api = createApiClient(baseUrl);
    }
    async getAll() {
    return (await this.api.get("/publiser")).data;
    }
    async create(data) {
    return (await this.api.post("/publiser", data)).data;
    }
    async deleteAll() {
    return (await this.api.delete("/publiser")).data;
    }
    async get(id) {
    return (await this.api.get(`/publiser/${id}`)).data;
    }
    async update(id, data) {
    return (await this.api.put(`/publiser/${id}`, data)).data;
    }
    async delete(id) {
    return (await this.api.delete(`/publiser/${id}`)).data;
    }
}
export default new PubliserService();