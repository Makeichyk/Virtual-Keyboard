// caseUp caseDown shiftCaps caps

// casedown

const CASE_UP = document.querySelectorAll('.caseUp');
const CASE_DOWN = document.querySelectorAll('.caseDown');
const SHIFT_CAPS = document.querySelectorAll('.shiftCaps');
const CAPS = document.querySelectorAll('.caps');

function hideCaseUp() {
    CASE_UP.forEach((item) => item.classList.add('hidden'));
}
function showCaseUp() {
    CASE_UP.forEach((item) => item.classList.remove('hidden'));
}

function hideCaseDown() {
    CASE_DOWN.forEach((item) => item.classList.add('hidden'));
}
function showCaseDown() {
    CASE_DOWN.forEach((item) => item.classList.remove('hidden'));
}

function hideShiftCaps() {
    SHIFT_CAPS.forEach((item) => item.classList.add('hidden'));
}
function showShiftCaps() {
    SHIFT_CAPS.forEach((item) => item.classList.remove('hidden'));
}

function hideCaps() {
    CAPS.forEach((item) => item.classList.add('hidden'));
}
function showCaps() {
    CAPS.forEach((item) => item.classList.remove('hidden'));
}
