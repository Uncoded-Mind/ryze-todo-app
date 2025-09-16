export const VALID_USERNAME = 'RYZE_TESTUSER';
export const VALID_PASSWORD = 'W9CL1Pv3aW0p';

//could also use interface if we want to extend it later, e.g. role = 'admin'
export type Credentials = { username: string; password: string };
export const STORAGE_KEY = 'ryzeTodo_credentials';

export class AuthService {


    login(creds: Credentials): boolean {
        if (creds.username === VALID_USERNAME && creds.password === VALID_PASSWORD) {
            localStorage.setItem(STORAGE_KEY, JSON.stringify({ username: creds.username, loggedAt: Date.now() }));
            return true;
        }
        return false;
    }

    logout() {
        localStorage.removeItem(STORAGE_KEY);
    }

    isLoggedIn() {
        return localStorage.getItem(STORAGE_KEY) !== null;
    }

    getUser(): string | null {
        const localStorageKey = localStorage.getItem(STORAGE_KEY);
        if (!localStorageKey) return null;

        //check for key corruption
        try {
            return JSON.parse(localStorageKey).username;
        } catch {
            return null;
        }
    }
}