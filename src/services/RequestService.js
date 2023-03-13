import axios from "axios";

class RequestService {
    constructor() {
        this._httpClient = axios.create({
            baseURL: import.meta.env.VITE_API_URL,
            responseType: "json",
            timeout: 60000,
            validateStatus: function (status) {
                return status === 200; // default
            }
        });
    }

    validate(request) {
        let errors = [];

        if (this._isEmpty(request.app)) {
            errors.push("Service name must be provided");
        }

        if (this._isEmpty(request.instanceId)) {
            errors.push("Service instance ID must be provided");
        }

        if (this._isEmpty(request.method)) {
            errors.push("Request method must be provided");
        }

        if (this._isEmpty(request.path)) {
            errors.push("Request path must be provided");
        } else if (!request.path.startsWith("/")) {
            errors.push("The request path must start with '/'");
        }

        return errors;
    }

    async send(request) {
        return await this._httpClient.post("/request", request);
    }

    _isEmpty(text) {
        return !text || text.length === 0;
    }
}

export default new RequestService();