import createApiClient from "./api.service";

class FlowBookService {
    constructor(baseUrl = "/api/contacts") {
        this.api = createApiClient(baseUrl);
    }
    async getAll() {
    return (await this.api.get("/flowbook")).data;
    }
    async create(data) {
    return (await this.api.post("/flowbook", data)).data;
    }
    async deleteAll() {
    return (await this.api.delete("/flowbook")).data;
    }
    async get(id) {
    return (await this.api.get(`/flowbook/${id}`)).data;
    }
    async update(id, data) {
    return (await this.api.put(`/flowbook/${id}`, data)).data;
    }
    async delete(id) {
    return (await this.api.delete(`/flowbook/${id}`)).data;
    }
}
export default new FlowBookService();