import "./style.css";
import { initKeyboard } from "./js/keyboard";
import { loadLang } from "./js/lang-storage";
import { initTextArea } from "./js/text-area";
import { initListeners as initKeyPressListeners } from "./js/key-press";

document.getElementById("main").innerHTML = `
    <div class="wrapper">
        ${initTextArea()}
        ${initKeyboard(loadLang())}
        <p>Keyboard created in Windows operating system</p>
        <p>Key combination to switch language [CTRL] + [ALT]</p>
    </div>
`;

initKeyPressListeners();
