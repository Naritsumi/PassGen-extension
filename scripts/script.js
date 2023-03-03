const lengthSlider = document.querySelector(".pass-length input");
const options = document.querySelectorAll(".option input");
const copyIcon = document.querySelector(".input-box span");
const passwordInput = document.querySelector(".input-box input");
const passIndicator = document.querySelector(".pass-indicator");
const generateBtn = document.querySelector(".generate-btn");
const checkAll = document.getElementById("check-all");

const characters = {
    lowercase: "abcdefghijklmnopqrstuvwxyz",
    uppercase: "ABCDEFGHIJKLMNOPQRSTUVWXYZ",
    numbers: "0123456789",
    symbols: "!$%&|[](){}:;.,*+-#@<>~"
}

const generatePassword = () => {
    let staticPassword = "",
        passLength = lengthSlider.value;
    var randPassword = "";

    options.forEach(option => {
        if (option.checked) {
            staticPassword += characters[option.id];
        }
    });

    for (let i = 0; i < passLength; i++) {
        randPassword += new Array(passLength).fill(0).map(x => (function(chars) { let umax = Math.pow(2, 32), r = new Uint32Array(1), max = umax - (umax % chars.length); do { crypto.getRandomValues(r); } while(r[0] > max); return chars[r[0] % chars.length]; })(staticPassword)).join('');
    }
    passwordInput.value = randPassword;
}

const updatePassIndicator = () => {
    passIndicator.id = lengthSlider.value <= 7 ? "veryweak" : lengthSlider.value <= 10 ? "weak" : lengthSlider.value <= 14 ? "medium" : "strong";
}

const updateSlider = () => {
    document.querySelector(".pass-length span").innerText = lengthSlider.value;
    generatePassword();
    updatePassIndicator();
}
updateSlider();

const copyPassword = () => {
    navigator.clipboard.writeText(passwordInput.value);
    copyIcon.innerText = "check";
    setTimeout(() => {
        copyIcon.innerText = "copy_all";
    }, 1500);
}

const updateCheckbox = () => {
    if (checkAll.checked) {
        document.getElementById("lowercase").checked = true;
        document.getElementById("uppercase").checked = true;
        document.getElementById("numbers").checked = true;
        document.getElementById("symbols").checked = true;
    } else {
        document.getElementById("lowercase").checked = false;
        document.getElementById("uppercase").checked = false;
        document.getElementById("numbers").checked = false;
        document.getElementById("symbols").checked = false;
    }
}

copyIcon.addEventListener("click", copyPassword);
lengthSlider.addEventListener("input", updateSlider);
generateBtn.addEventListener("click", generatePassword);
checkAll.addEventListener("click", updateCheckbox);