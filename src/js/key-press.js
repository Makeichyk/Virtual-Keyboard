import { KEYS_CONFIG } from "./keyboard";
import { switchLangEventHandler } from "./language-switch";
import { isLetter } from "./keyboard";

let isCapsLockActive = false;
const activateCapsLock = () => {
    if (isCapsLockActive) {
        return;
    }
    isCapsLockActive = true;
    keyboard.dataset.capsLock = true;
    document.querySelector(".CapsLock").classList.add("active");
};
const deactivateCapsLock = () => {
    if (!isCapsLockActive) {
        return;
    }
    isCapsLockActive = false;
    keyboard.dataset.capsLock = false;
    document.querySelector(".CapsLock").classList.remove("active");
};

const printValue = (value) => {
    const textarea = document.getElementById("textarea");
    textarea.focus();

    const start = textarea.selectionStart;
    const end = textarea.selectionEnd;
    const result = textarea.value;

    textarea.value = result.slice(0, start) + value + result.slice(end);
    textarea.setSelectionRange(start + value.length, start + value.length);
};

const backspaceValue = () => {
    const textarea = document.getElementById("textarea");
    const start = textarea.selectionStart;
    const end = textarea.selectionEnd;
    const result = textarea.value;

    if (start === end) {
        textarea.value = result.slice(0, start - 1) + result.slice(end);
        textarea.setSelectionRange(start - 1, start - 1);
    } else {
        textarea.value = result.slice(0, start) + result.slice(end);
        textarea.setSelectionRange(start, start);
    }
};

const deleteValue = () => {
    const textarea = document.getElementById("textarea");
    const start = textarea.selectionStart;
    const end = textarea.selectionEnd;
    const result = textarea.value;

    if (start === end) {
        textarea.value = result.slice(0, start) + result.slice(end + 1);
        textarea.setSelectionRange(start, start);
    } else {
        textarea.value = result.slice(0, start) + result.slice(end);
        textarea.setSelectionRange(start, start);
    }
};

const initListeners = () => {
    const keyboard = document.getElementById("keyboard");

    const handleKeyboardEvent = (keyboardEvent) => {
        const { lang, letterCase } = keyboard.dataset;
        const { code, shiftKey } = keyboardEvent;

        keyboard.dataset.shift = shiftKey === true;

        const animateCapsLockButton = () => {
            if (keyboardEvent.repeat) {
                return;
            }

            if (isCapsLockActive) {
                document.querySelector(".CapsLock").classList.add("active");
            } else {
                document.querySelector(".CapsLock").classList.remove("active");
            }
        };

        const keyConfig = KEYS_CONFIG[code];
        switch (code) {
            case KEYS_CONFIG.Backspace.keyId:
                backspaceValue();
                break;

            case KEYS_CONFIG.Delete.keyId:
                deleteValue();
                break;

            case KEYS_CONFIG.CapsLock.keyId:
                if (keyboardEvent.repeat) {
                    return;
                }

                if (isCapsLockActive) {
                    deactivateCapsLock();
                } else {
                    activateCapsLock();
                }
                break;

            case KEYS_CONFIG.Space.keyId:
            case KEYS_CONFIG.Tab.keyId:
            case KEYS_CONFIG.Enter.keyId:
                printValue(keyConfig.specialSymbol);
                break;
            case KEYS_CONFIG.ShiftLeft.keyId:
            case KEYS_CONFIG.ShiftRight.keyId:
            case KEYS_CONFIG.MetaLeft.keyId:
                break;

            case KEYS_CONFIG.ControlLeft.keyId:
            case KEYS_CONFIG.ControlRight.keyId:
            case KEYS_CONFIG.AltLeft.keyId:
            case KEYS_CONFIG.AltRight.keyId:
                switchLangEventHandler(keyboardEvent);
                break;
            default: {
                if (!keyConfig) {
                    return;
                }

                const isShift = keyboardEvent.shiftKey;

                if (!isCapsLockActive && !isShift) {
                    printValue(keyConfig[lang].value);
                }
                if (!isCapsLockActive && isShift) {
                    printValue(keyConfig[lang].alt);
                }
                if (isCapsLockActive && !isShift) {
                    printValue(
                        isLetter(lang, keyboardEvent.code)
                            ? keyConfig[lang].alt
                            : keyConfig[lang].value
                    );
                }
                if (isCapsLockActive && isShift) {
                    printValue(
                        isLetter(lang, keyboardEvent.code)
                            ? keyConfig[lang].value
                            : keyConfig[lang].alt
                    );
                }

                break;
            }
        }
    };

    document.addEventListener("keyup", (keyboardEvent) => {
        keyboardEvent.stopPropagation();
        keyboardEvent.preventDefault();

        const { shiftKey } = keyboardEvent;
        keyboard.dataset.shift = shiftKey === true;

        if (keyboardEvent.code === KEYS_CONFIG.CapsLock.keyId) {
            return;
        }
        document.querySelector(`.${keyboardEvent.code}`) &&
            document.querySelector(`.${keyboardEvent.code}`).classList.remove("active");
    });

    document.addEventListener("keydown", (keyboardEvent) => {
        keyboardEvent.stopPropagation();
        keyboardEvent.preventDefault();

        handleKeyboardEvent(keyboardEvent);

        if (keyboardEvent.repeat) {
            return;
        }

        if (keyboardEvent.code === KEYS_CONFIG.CapsLock.keyId) {
            return;
        }
        document.querySelector(`.${keyboardEvent.code}`) &&
            document.querySelector(`.${keyboardEvent.code}`).classList.add("active");
    });

    // {
    //     let pressedKey;

    //     document.addEventListener('mousedown', function (mouseEvent) {
    //         const keyTargetElement = mouseEvent.path.find(
    //             (targetElement) =>
    //                 targetElement.classList && targetElement.classList.contains('key')
    //         );

    //         if (!keyTargetElement) {
    //             return;
    //         }

    //         pressedKey = keyTargetElement;

    //         document.dispatchEvent(
    //             new KeyboardEvent('keydown', {
    //                 code: pressedKey.dataset.keyCode,
    //             })
    //         );

    //         handleKeyDown();

    //         const textarea = document.getElementById('textarea');

    //         switch (pressedKey.dataset.keyCode) {
    //             case 'Backspace':
    //                 // textareaValue > 0 &&
    //                 //     textareaValue <= e.length &&
    //                 //     ((e = e.slice(0, textareaValue - 1) + e.slice(textareaValue, e.length)),
    //                 //     (this.textarea.value = e),
    //                 //     (this.textarea.selectionStart = textareaValue - 1),
    //                 //     (this.textarea.selectionEnd = textareaValue - 1));
    //                 break;
    //             default:
    //                 textarea.value = textarea.value + keyboardEvent.key;
    //                 break;
    //         }
    //     });

    //     document.addEventListener('mouseup', function () {
    //         if (!pressedKey) {
    //             return;
    //         }

    //         document.dispatchEvent(
    //             new KeyboardEvent('keyup', {
    //                 code: pressedKey.dataset.keyCode,
    //             })
    //         );
    //     });
    // }
};

export { initListeners };
