
const form = document.getElementById("contactForm");

const nameInput = document.getElementById("name");
const surnameInput = document.getElementById("surname");
const emailInput = document.getElementById("email");
const phoneInput = document.getElementById("phone");
const addressInput = document.getElementById("address");

const q1 = document.getElementById("q1");
const q2 = document.getElementById("q2");
const q3 = document.getElementById("q3");

const sendBtn = document.getElementById("sendBtn");
const clearBtn = document.getElementById("clearBtn");
const result = document.getElementById("result");


// 1. SLANKIKLIŲ SKAIČIŲ RODYMAS

q1.addEventListener("input", function () {
    document.getElementById("q1Value").textContent = q1.value;
});

q2.addEventListener("input", function () {
    document.getElementById("q2Value").textContent = q2.value;
});

q3.addEventListener("input", function () {
    document.getElementById("q3Value").textContent = q3.value;
});


// 2. KLAIDŲ IR SĖKMĖS RODYMAS

function showError(input, message) {
    const error = input.parentElement.querySelector(".error");
    error.textContent = message;

    input.classList.add("invalid");
    input.classList.remove("valid");
}

function showSuccess(input) {
    const error = input.parentElement.querySelector(".error");
    error.textContent = "";

    input.classList.remove("invalid");
    input.classList.add("valid");
}


// 3. VARDO IR PAVARDĖS TIKRINIMAS

function validateName(input, fieldName) {
    const value = input.value.trim();

    if (value === "") {
        showError(input, fieldName + " privalomas");
        return false;
    }

    if (!/^[a-zA-ZąčęėįšųūžĄČĘĖĮŠŲŪŽ]+$/.test(value)) {
        showError(input, "Galima įvesti tik raides");
        return false;
    }

    showSuccess(input);
    return true;
}


// 4. EL. PAŠTO TIKRINIMAS

function validateEmail() {
    const value = emailInput.value.trim();
    const pattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (value === "") {
        showError(emailInput, "El. paštas privalomas");
        return false;
    }

    if (!pattern.test(value)) {
        showError(emailInput, "Neteisingas el. pašto formatas");
        return false;
    }

    showSuccess(emailInput);
    return true;
}


// 5. ADRESO TIKRINIMAS

function validateAddress() {
    if (addressInput.value.trim() === "") {
        showError(addressInput, "Adresas privalomas");
        return false;
    }

    showSuccess(addressInput);
    return true;
}


// 6. TELEFONO NUMERIO FORMATAVIMAS

function formatPhone(value) {
    let digits = value.replace(/\D/g, "");

    if (digits.startsWith("370")) {
        digits = digits.slice(3);
    } else if (digits.startsWith("8")) {
        digits = digits.slice(1);
    }

    digits = digits.slice(0, 8);

    if (digits.length === 0) {
        return "";
    }

    let formatted = "+370 ";

    formatted += digits.slice(0, 3);

    if (digits.length > 3) {
        formatted += " " + digits.slice(3);
    }

    return formatted;
}


// 7. TELEFONO NUMERIO TIKRINIMAS

function validatePhone() {
    const digits = phoneInput.value.replace(/\D/g, "");

    if (!/^3706\d{7}$/.test(digits)) {
        showError(phoneInput, "Įveskite +370 6XX XXXXX numerį");
        return false;
    }

    showSuccess(phoneInput);
    return true;
}

phoneInput.addEventListener("input", function () {
    phoneInput.value = formatPhone(phoneInput.value);
    validatePhone();
    updateSendButton();
});


// 8. VISŲ LAUKŲ TIKRINIMAS

function validateForm() {
    const nameValid = validateName(nameInput, "Vardas");
    const surnameValid = validateName(surnameInput, "Pavardė");
    const emailValid = validateEmail();
    const phoneValid = validatePhone();
    const addressValid = validateAddress();

    return nameValid &&
           surnameValid &&
           emailValid &&
           phoneValid &&
           addressValid;
}


// 9. SIŲSTI MYGTUKO AKTYVAVIMAS

function updateSendButton() {
    sendBtn.disabled = !validateForm();
}

const inputs = [
    nameInput,
    surnameInput,
    emailInput,
    addressInput
];

inputs.forEach(function (input) {
    input.addEventListener("input", updateSendButton);
});


// 10. FORMOS DUOMENŲ SIUNTIMAS IR VIDURKIS

form.addEventListener("submit", function (event) {
    event.preventDefault();

    if (!validateForm()) {
        return;
    }

    const data = {
        vardas: nameInput.value,
        pavarde: surnameInput.value,
        email: emailInput.value,
        telefonas: phoneInput.value,
        adresas: addressInput.value,
        klausimas1: Number(q1.value),
        klausimas2: Number(q2.value),
        klausimas3: Number(q3.value)
    };

    console.log(data);

    const average = (
        data.klausimas1 +
        data.klausimas2 +
        data.klausimas3
    ) / 3;

    result.innerHTML = `
        <h3>Formos duomenys</h3>

        <p><b>Vardas:</b> ${data.vardas}</p>
        <p><b>Pavardė:</b> ${data.pavarde}</p>
        <p><b>El. paštas:</b> ${data.email}</p>
        <p><b>Tel. numeris:</b> ${data.telefonas}</p>
        <p><b>Adresas:</b> ${data.adresas}</p>

        <hr>

        <p><b>${data.vardas} ${data.pavarde}: 
        ${average.toFixed(2)}</b></p>
    `;
});


// 11. FORMOS IŠVALYMAS

clearBtn.addEventListener("click", function () {
    form.reset();

    inputs.forEach(function (input) {
        input.classList.remove("valid", "invalid");
        input.parentElement.querySelector(".error").textContent = "";
    });

    phoneInput.classList.remove("valid", "invalid");
    phoneInput.parentElement.querySelector(".error").textContent = "";

    document.getElementById("q1Value").textContent = q1.value;
    document.getElementById("q2Value").textContent = q2.value;
    document.getElementById("q3Value").textContent = q3.value;

    result.innerHTML = "";

    sendBtn.disabled = true;
});
