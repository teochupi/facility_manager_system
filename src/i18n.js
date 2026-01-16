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
        aboutUs: "About Us",
        addBuilding: "Add Building",
        addFloor: "Add Floor",
        addOffice: "Add Office",
        buildingName: "Building Name",
        floorNumber: "Floor Number",
        officeNumber: "Office Number",
        submitAdd: "Add",
        // Problem Types
        cleaning: "Cleaning",
        other: "Other",
        interiorRepair: "Interior Repair",
        // Statuses
        status_hld: "Pending",
        status_cmp: "Completed",
        status_open: "Open",
        you: "You",
        system: "System"
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
        aboutUs: "За нас",
        addBuilding: "Добави Сграда",
        addFloor: "Добави Етаж",
        addOffice: "Добави Офис/Стая",
        buildingName: "Име на сграда",
        floorNumber: "Номер на етаж",
        officeNumber: "Номер на офис",
        submitAdd: "Добави",
        // Problem Types
        cleaning: "Почистване",
        other: "Друго",
        interiorRepair: "Вътрешен ремонт",
        // Statuses
        status_hld: "Изчакваща",
        status_cmp: "Завършена",
        status_open: "Отворена",
        you: "Вие",
        system: "Система"
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
        if (!key) return "";
        const lang = this.getLang();
        // Try exact key, then lowercase, then CamelCase to lowercase mapping
        const processedKey = key.toString().replace(/\s+/g, '');
        const finalKey = processedKey.charAt(0).toLowerCase() + processedKey.slice(1);

        return translations[lang][key] ||
            translations[lang][key.toLowerCase()] ||
            translations[lang][finalKey] ||
            translations[lang]['status_' + key.toLowerCase()] ||
            key;
    }
}
