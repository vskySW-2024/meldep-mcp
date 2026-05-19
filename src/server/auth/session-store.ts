// @ts-nocheck
class SessionStore {
    constructor() {
        this.data = {};
    }
    set(key, value) {
        this.data[key] = value;
    }
    get(key) {
        return this.data[key];
    }
    getProjectId() {
        return this.get('projectId');
    }
    getUserId() {
        return this.get('userId');
    }
    getAccessToken() {
        return this.get('accessToken');
    }
    clear() {
        this.data = {};
    }
}
export const sessionStore = new SessionStore();
