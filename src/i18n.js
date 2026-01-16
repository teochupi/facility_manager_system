export const translations = {
    en: {
        dashboard: "Dashboard",
        newRequest: "New Request",
        history: "History",
        disinfection: "Disinfection",
        furniture: "Furniture",
        trashRemoval: "Trash Removal",
        urgentCleanup: "Urgent Cleanup",
        electrical: "Electrical",
        hvac: "HVAC",
        interiorLights: "Interior Lights",
        plumbing: "Plumbing",
        systemConfig: "System Config",
        logout: "Logout",
        welcome: "Welcome",
        ordersNeedingAttention: "Orders Needing Attention",
        myOpenOrders: "My Open Orders",
        recentlyEnteredRequests: "Recently Entered Requests",
        viewHistory: "View History",
        woNumber: "WO Number",
        dateEntered: "Date Entered",
        building: "Building",
        description: "Problem Description",
        status: "Status",
        requestor: "Requestor",
        floor: "Floor",
        office: "Office/Area",
        submit: "Submit Request",
        selectBuilding: "Select Building",
        selectFloor: "Select Floor",
        selectOffice: "Select Office",
        problemType: "Problem Type",
        login: "Login",
        register: "Register",
        username: "Username",
        email: "Email",
        password: "Password",
        confirmPassword: "Confirm Password",
        signInAccount: "Sign in to your account",
        createAccount: "Create a new account",
        alreadyHaveAccount: "Already have an account? Login",
        noAccount: "Don't have an account? Register",
        searchHistory: "Search by WO or Building...",
        configuration: "Configuration",
        aboutUs: "About Us"
    },
    bg: {
        dashboard: "Табло",
        newRequest: "Нова Заявка",
        history: "История",
        disinfection: "Дезинфекция",
        furniture: "Мебели",
        trashRemoval: "Смитопочистване",
        urgentCleanup: "Спешно почистване",
        electrical: "Електрозахранване",
        hvac: "Отопление и Вентилация",
        interiorLights: "Осветление",
        plumbing: "ВиК",
        systemConfig: "Системна Конфигурация",
        logout: "Изход",
        welcome: "Добре дошли",
        ordersNeedingAttention: "Поръчки, изискващи внимание",
        myOpenOrders: "Моите отворени поръчки",
        recentlyEnteredRequests: "Последни заявки",
        viewHistory: "Виж историята",
        woNumber: "Номер на поръчка",
        dateEntered: "Дата на въвеждане",
        building: "Сграда",
        description: "Описание на проблема",
        status: "Статус",
        requestor: "Заявител",
        floor: "Етаж",
        office: "Офис/Зона",
        submit: "Изпрати заявка",
        selectBuilding: "Избери сграда",
        selectFloor: "Избери етаж",
        selectOffice: "Избери офис",
        problemType: "Тип проблем",
        login: "Вход",
        register: "Регистрация",
        username: "Потребителско име",
        email: "Имейл",
        password: "Парола",
        confirmPassword: "Потвърди парола",
        signInAccount: "Влезте в акаунта си",
        createAccount: "Създай нов акаунт",
        alreadyHaveAccount: "Вече имате акаунт? Вход",
        noAccount: "Нямате акаунт? Регистрация",
        searchHistory: "Търси по номер или сграда...",
        configuration: "Конфигурация",
        aboutUs: "За нас"
    }
};

export class I18n {
    static getLang() {
        return localStorage.getItem('fm_lang') || 'en';
    }

    static setLang(lang) {
        localStorage.setItem('fm_lang', lang);
        window.location.reload();
    }

    static t(key) {
        const lang = this.getLang();
        return translations[lang][key] || key;
    }
}
