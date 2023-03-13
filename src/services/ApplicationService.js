import axios from "axios";
import Application from "../models/Application.js";

class ApplicationService {
    constructor() {
        this._httpClient = axios.create({
            baseURL: import.meta.env.VITE_API_URL + "/eureka",
            responseType: "json"
        });
    }

    async getAll() {
        const response = await this._httpClient.get("/apps");
        return response.data?.applications?.application
            .map((app) => Application.fromPayload(app)) || [];
    }

    async sendInstanceHeartbeat(instance) {
        const instanceId = this._getInstanceIdentifier(instance);
        await this._httpClient.put(`/apps/${instance.application}/${instanceId}`);
    }

    async updateInstanceStatus(instance, status) {
        const instanceId = this._getInstanceIdentifier(instance);
        await this._httpClient.put(`/apps/${instance.application}/${instanceId}/status?value=${status}`);
    }

    async deleteInstance(instance) {
        const instanceId = this._getInstanceIdentifier(instance);
        await this._httpClient.delete(`/apps/${instance.application}/${instanceId}`);
    }

    _getInstanceIdentifier = (instance) => instance.instanceId ?? instance.hostName;
}

export default new ApplicationService();