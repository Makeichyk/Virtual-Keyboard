import { saveLang } from "./lang-storage";

const getLang = function getLang() {
    return keyboard.dataset.lang === "eng" ? "rus" : "eng";
};

const switchLang = () => {
    const keyboard = document.getElementById("keyboard");
    const language = getLang();
    switch (language) {
        case "EN":
        case "ENG":
        case "en":
        case "eng":
            keyboard.dataset.lang = "eng";
            saveLang("eng");
            break;

        case "RU":
        case "RUS":
        case "ru":
        case "rus":
            keyboard.dataset.lang = "rus";
            saveLang("rus");
            break;

        default:
            console.error("Unsupported language", language);
            break;
    }
};

const switchLangEventHandler = (keyboardEvent) => {
    if (keyboardEvent.repeat) {
        return;
    }

    if (keyboardEvent.ctrlKey && keyboardEvent.altKey) {
        switchLang();
    }
};

export { switchLangEventHandler };
