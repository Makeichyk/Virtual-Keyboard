const ENGLISH_KEYS = document.querySelectorAll('.eng');
const RUSSIAN_KEYS = document.querySelectorAll('.rus');

function changeEnglish() {
    if (isHiddenEng()) {
        showEnglish();
    } else hideEnglish();
}

function hideEnglish() {
    ENGLISH_KEYS.forEach((item) => item.classList.add('hidden'));
}

function showEnglish() {
    ENGLISH_KEYS.forEach((item) => item.classList.remove('hidden'));
}

function isHiddenEng() {
    return document.querySelector('.eng').classList.contains('hidden');
}



function changeRussian() {
    if (isHiddenRus()) {
        showRussian();
    } else hideRussian();
}

function isHiddenRus() {
    return document.querySelector('.rus').classList.contains('hidden');
}

function hideRussian() {
    RUSSIAN_KEYS.forEach((item) => item.classList.add('hidden'));
}

function showRussian() {
    RUSSIAN_KEYS.forEach((item) => item.classList.remove('hidden'));
}