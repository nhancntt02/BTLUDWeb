import createApiClient from "./api.service";

class EmployeeService {
    constructor(baseUrl = "/api/contacts") {
        this.api = createApiClient(baseUrl);
    }
    async getAll() {
    return (await this.api.get("/staff")).data;
    }
    async create(data) {
        return (await this.api.post("/staff", data)).data;
        }
    async get(id) {
    return (await this.api.get(`/staff/${id}`)).data;
    }
    async login(data) {
    return (await this.api.post("/login", data)).data;
    }

}
export default new EmployeeService();