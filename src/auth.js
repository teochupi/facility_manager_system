export class Auth {
    static login(username, password) {
        if (username === 'demo' && password === 'demo123') {
            const user = { id: 1, name: 'Demo User', role: 'user' };
            localStorage.setItem('fm_user', JSON.stringify(user));
            return { success: true, user };
        }
        if (username === 'admin' && password === 'demo123') {
            const user = { id: 0, name: 'Administrator', role: 'admin' };
            localStorage.setItem('fm_user', JSON.stringify(user));
            return { success: true, user };
        }
        return { success: false, message: 'Invalid credentials' };
    }

    static logout() {
        localStorage.removeItem('fm_user');
        window.location.href = '/login.html';
    }

    static getUser() {
        const userStr = localStorage.getItem('fm_user');
        return userStr ? JSON.parse(userStr) : null;
    }

    static checkAuth() {
        const user = this.getUser();
        if (!user && !window.location.pathname.includes('login.html')) {
            window.location.href = '/login.html';
        }
        return user;
    }
}
