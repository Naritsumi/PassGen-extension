const lengthSlider = document.querySelector(".pass-length input");
const options = document.querySelectorAll(".option input");
const copyIcon = document.querySelector(".input-box span");
const passwordInput = document.querySelector(".input-box input");
const passIndicator = document.querySelector(".pass-indicator");
const generateBtn = document.querySelector(".generate-btn");
const checkAll = document.getElementById("check-all");
const readable = document.getElementById("readable");
const uppercaseOption = document.getElementById("uppercase");
const numbersOption = document.getElementById("numbers");
const symbolsOption = document.getElementById("symbols");

const characters = {
    lowercase: "abcdefghijklmnopqrstuvwxyz",
    uppercase: "ABCDEFGHIJKLMNOPQRSTUVWXYZ",
    numbers: "0123456789",
    symbols: "!$%&|[](){}:;.,*+-#@<>~"
}

const generatePassword = () => {
    let staticPassword = "",
        passLength = lengthSlider.value;
    var randPassword = "",
        randomCapitaliseString = "";

    if (readable.checked == true) {
        randPassword = GPW.pronounceable(passLength);
        if (uppercaseOption.checked == true) {
            randomCapitaliseString = [...randPassword].map(c => Math.random() < .6 ? c : c.toUpperCase()).join('');
            randPassword = randomCapitaliseString;
        }
        if (numbersOption.checked == true) {
            randPassword = randPassword.substring(0, randPassword.length - 1);
            randPassword += Math.floor(Math.random() * 10);
        }
        if (symbolsOption.checked == true) {    
            if(hasNumbers(randPassword)){
                var letr = randPassword.match(/[a-zA-Z]+/g);
                var num = randPassword.match(/\d+/g);
                randPassword = letr[0].substring(0, letr[0].length - 1) + num;
            }
            var rnum = Math.floor(Math.random() * characters["symbols"].length);
            randPassword += characters["symbols"].substring(rnum,rnum+1);
        }
    } else {
        options.forEach(option => {
            if (option.checked) {
                staticPassword += characters[option.id];
            }
        });
        for (let i = 0; i < passLength; i++) {
            randPassword += new Array(passLength).fill(0).map(x => (function (chars) { let umax = Math.pow(2, 32), r = new Uint32Array(1), max = umax - (umax % chars.length); do { crypto.getRandomValues(r); } while (r[0] > max); return chars[r[0] % chars.length]; })(staticPassword)).join('');
        }
    }
    passwordInput.value = randPassword;
}

function hasNumbers(t) {
    var regex = /\d/g;
    return regex.test(t);
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

const checkAllUpdate = () => {
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
checkAll.addEventListener("click", checkAllUpdate);
