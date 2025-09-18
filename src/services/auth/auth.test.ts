import { CREDENTIALS_STORAGE_KEY, VALID_PASSWORD, VALID_USERNAME } from "../../helper/constants";
import { AuthService } from "./auth";


const VALID_CREDENTIALS = { username: VALID_USERNAME, password: VALID_PASSWORD };

function loginValidUser(auth: AuthService) {
    return auth.login(VALID_CREDENTIALS);
}

function expectLoggedIn(auth: AuthService) {
    expect(auth.isLoggedIn()).toBe(true);
}

function expectUserToBeNull(auth: AuthService) {
    expect(auth.getUser()).toBeNull();
}

function expectLoggedOut(auth: AuthService) {
    expect(auth.isLoggedIn()).toBe(false);
}

describe('AuthService', () => {
    let auth: AuthService;

    beforeEach(() => {
        localStorage.removeItem(CREDENTIALS_STORAGE_KEY);
        auth = new AuthService();
    });

    it('loggs in the user with correct credentials', () => {
        const result = loginValidUser(auth);
        expect(result).toBe(true);
        expectLoggedIn(auth);
        expect(auth.getUser()).toBe(VALID_USERNAME);
        expect(localStorage.getItem(CREDENTIALS_STORAGE_KEY)).not.toBeNull();
    });

    it('fails to login the user with wrong username', () => {
        const result = auth.login({ username: 'wrong', password: VALID_PASSWORD });
        expect(result).toBe(false);
        expectLoggedOut(auth);
        expectUserToBeNull(auth)
    });

    it('fails to login the user with wrong password', () => {
        const result = auth.login({ username: VALID_USERNAME, password: 'wrong' });
        expect(result).toBe(false);
        expectLoggedOut(auth);
        expectUserToBeNull(auth)
    });

    it('clears the stored session after logging out', () => {
        loginValidUser(auth);
        expectLoggedIn(auth);
        auth.logout();
        expectLoggedOut(auth);
        expectUserToBeNull(auth)
    });
});