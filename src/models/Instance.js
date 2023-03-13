export default class Instance {
    constructor(
        hostName,
        application,
        homePageUrl,
        statusPageUrl,
        healthCheckUrl,
        ipAddress,
        port,
        vipAddress,
        status,
        leaseInfo,
        lastUpdatedTimestamp,
        lastDirtyTimestamp,
        actionType,
        overriddenStatus,
        countryId,
        instanceId,
    ) {
        this._hostName = hostName;
        this._application = application;
        this._homePageUrl = homePageUrl;
        this._statusPageUrl = statusPageUrl;
        this._healthCheckUrl = healthCheckUrl;
        this._ipAddress = ipAddress;
        this._port = port;
        this._vipAddress = vipAddress;
        this._status = status;
        this._leaseInfo = leaseInfo;
        this._lastUpdatedTimestamp = lastUpdatedTimestamp;
        this._lastDirtyTimestamp = lastDirtyTimestamp;
        this._actionType = actionType;
        this._overriddenStatus = overriddenStatus;
        this._countryId = countryId;
        this._instanceId = instanceId;
    }

    static fromPayload(payload) {
        return new Instance(
            payload.hostName,
            payload.app,
            payload.homePageUrl,
            payload.statusPageUrl,
            payload.healthCheckUrl,
            payload.ipAddr,
            payload.port?.["$"],
            payload.vipAddress,
            payload.status,
            payload.leaseInfo,
            payload.lastUpdatedTimestamp,
            payload.lastDirtyTimestamp,
            payload.actionType,
            payload.overriddenStatus,
            payload.countryId,
            payload.instanceId,
        );
    }

    get instanceId() {
        return this._instanceId
    }

    get hostName() {
        return this._hostName;
    }

    get application() {
        return this._application;
    }

    get homePageUrl() {
        return this._homePageUrl;
    }

    get statusPageUrl() {
        return this._statusPageUrl;
    }

    get healthCheckUrl() {
        return this._healthCheckUrl;
    }

    get ipAddress() {
        return this._ipAddress;
    }

    get port() {
        return this._port;
    }

    get vipAddress() {
        return this._vipAddress;
    }

    get status() {
        return this._status;
    }

    get leaseInfo() {
        return this._leaseInfo;
    }

    get lastUpdatedTimestamp() {
        return this._lastUpdatedTimestamp;
    }

    get lastDirtyTimestamp() {
        return this._lastDirtyTimestamp;
    }

    get actionType() {
        return this._actionType;
    }

    get overriddenStatus() {
        return this._overriddenStatus;
    }

    set overriddenStatus(status) {
        this._overriddenStatus = status;
    }

    get countryId() {
        return this._countryId;
    }

    get displayName() {
        return `${this._instanceId?.toLowerCase() ?? this._hostName} (${this._ipAddress}:${this._port})`;
    }

    get activeStatus() {
        return (this._overriddenStatus == null || this._overriddenStatus === "UNKNOWN")
            ? this._status
            : this._overriddenStatus;
    }
}