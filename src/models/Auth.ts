
export default class Auth {
    id: string;
    username: string;
    role: string;
    token: string;

    constructor(id: string, username: string, role: string, token: string) {
        this.id = id;
        this.username = username;
        this.role = role;
        this.token = token;
    }
}