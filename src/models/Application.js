import Instance from "./Instance.js";

export default class Application {
    constructor(name, instances) {
        this._name = name;
        this._instances = instances ?? [];
    }

    static fromPayload(payload) {
        const instances = payload?.instance
            .map(instance => Instance.fromPayload(instance));
        return new Application(payload.name, instances);
    }

    get name() {
        return this._name;
    }

    get displayName() {
        return this._name
            .trim()
            .replace(/ {1,}/g, " ")
            .toLowerCase()
            .split("-")
            .map(word => word[0].toUpperCase() + word.slice(1))
            .join(" ");
    }

    get instances() {
        return this._instances;
    }

    set instances(instances) {
        this._instances = instances;
    }
}