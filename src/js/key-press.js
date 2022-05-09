import { KEYS_CONFIG } from "./keyboard";
import { switchLangEventHandler } from "./language-switch";

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

const initListeners = () => {
    const textarea = document.getElementById("textarea");
    const keyboard = document.getElementById("keyboard");

    const handleKeyboardEvent = (keyboardEvent) => {
        const { lang, letterCase } = keyboard.dataset;

        const { code, shiftKey } = keyboardEvent;
        keyboard.dataset.shift = shiftKey === true;

        textarea.focus();

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

        switch (code) {
            case KEYS_CONFIG.Backquote.keyId:
            case KEYS_CONFIG.Backspace.keyId:
            case KEYS_CONFIG.Tab.keyId:
            case KEYS_CONFIG.Delete.keyId:
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

            case KEYS_CONFIG.Enter.keyId:
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
                const keyConfig = KEYS_CONFIG[code];
                if (!keyConfig) {
                    return;
                }

                console.error({
                    lang,
                    isCapsLockActive,
                    isShift: keyboardEvent.shiftKey,
                });

                textarea.value += keyConfig[lang].value;

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
