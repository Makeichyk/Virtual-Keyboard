const saveLang = function saveLang(savedLang) {
    window.localStorage.setItem("lang", savedLang);
};

const loadLang = function loadLang() {
    const result = window.localStorage.getItem("lang");

    if (["eng", "rus"].includes(result)) {
        return result;
    }

    return undefined;
};

export { saveLang, loadLang };
