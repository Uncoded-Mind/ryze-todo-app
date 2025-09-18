
import { CREDENTIALS_STORAGE_KEY, VALID_PASSWORD, VALID_USERNAME } from "../../helper/constants";
import { Credentials } from "../../types/types";

//could also use interface if we want to extend it later, e.g. role = 'admin'


export class AuthService {


    login(creds: Credentials): boolean {
        if (creds.username === VALID_USERNAME && creds.password === VALID_PASSWORD) {
            localStorage.setItem(CREDENTIALS_STORAGE_KEY, JSON.stringify({ username: creds.username, loggedAt: Date.now() }));
            return true;
        }
        return false;
    }

    logout() {
        localStorage.removeItem(CREDENTIALS_STORAGE_KEY);
    }

    isLoggedIn() {
        return localStorage.getItem(CREDENTIALS_STORAGE_KEY) !== null;
    }

    getUser(): string | null {
        const localStorageKey = localStorage.getItem(CREDENTIALS_STORAGE_KEY);
        if (!localStorageKey) return null;

        //check for key corruption
        try {
            return JSON.parse(localStorageKey).username;
        } catch {
            return null;
        }
    }
}