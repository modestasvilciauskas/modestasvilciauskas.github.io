
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


let skills = [
    {
        name: "PowerWorld",
        description: "Elektros tinklų modeliavimas ir galios srautų skaičiavimas.",
        status: "planned",
        xp: 25
    },
    {
        name: "Photoshop",
        description: "Nuotraukų redagavimas ir grafinis dizainas.",
        status: "planned",
        xp: 35
    },
    {
        name: "MATLAB",
        description: "Matematiniai skaičiavimai, signalų analizė ir grafikai.",
        status: "learning",
        xp: 80
    },
    {
        name: "KiCad",
        description: "Elektroninių schemų projektavimas ir PCB kūrimas.",
        status: "learning",
        xp: 65
    },
    {
        name: "WordPress/CMS",
        description: "Interneto svetainių kūrimas ir administravimas.",
        status: "learning",
        xp: 50
    },
    {
        name: "HTML",
        description: "Internetinių puslapių struktūros kūrimas.",
        status: "completed",
        xp: 70
    },
    {
        name: "CSS",
        description: "Internetinių puslapių dizaino kūrimas.",
        status: "completed",
        xp: 60
    },
    {
        name: "AutoCAD",
        description: "Techninių brėžinių ir elektros schemų rengimas.",
        status: "completed",
        xp: 55
    }
];


// ==========================================
// 2. ĮGŪDŽIŲ KORTELIŲ GENERAVIMAS
// ==========================================

function renderSkills() {

    const planned = document.getElementById("plannedSkills");
    const learning = document.getElementById("learningSkills");
    const completed = document.getElementById("completedSkills");

    planned.innerHTML = "";
    learning.innerHTML = "";
    completed.innerHTML = "";

    skills.forEach((skill, index) => {

        // Sukuriame kortelę
        const card = document.createElement("div");
        card.className = "skill-card";

        // Įgūdžio pavadinimas
        const title = document.createElement("h4");
        title.textContent = skill.name;

        // Įgūdžio aprašymas
        const description = document.createElement("p");
        description.textContent = skill.description;

        // Patirties taškai
        const xp = document.createElement("span");
        xp.textContent = skill.xp + " XP";

        // Būsenos pasirinkimas
        const select = document.createElement("select");
        select.className = "skill-status";

        select.innerHTML = `
            <option value="planned">Planuojama</option>
            <option value="learning">Mokomasi</option>
            <option value="completed">Atlikta</option>
        `;

        select.value = skill.status;

        // Kai pakeičiama būsena
        select.addEventListener("change", function() {

            skills[index].status = select.value;

            // Atnaujiname visą modulį
            updateAll();

        });

        // Sudedame elementus į kortelę
        card.appendChild(title);
        card.appendChild(description);
        card.appendChild(xp);
        card.appendChild(select);

        // Įdedame kortelę į tinkamą kategoriją
        if (skill.status === "planned") {
            planned.appendChild(card);
        }
        else if (skill.status === "learning") {
            learning.appendChild(card);
        }
        else if (skill.status === "completed") {
            completed.appendChild(card);
        }

    });

}


// ==========================================
// 3. BENDRŲ XP SKAIČIAVIMAS
// ==========================================

function calculateXP() {

    let totalXP = 0;

    skills.forEach(skill => {

        // Skaičiuojame tik atliktus įgūdžius
        if (skill.status === "completed") {
            totalXP += skill.xp;
        }

    });

    return totalXP;

}


// ==========================================
// 4. LYGIO IR RANGO ATNAUJINIMAS
// ==========================================

function updateLevel() {

    const xp = calculateXP();

    let level;
    let rank;

    if (xp < 50) {
        level = 1;
        rank = "Pradedantysis";
    }
    else if (xp < 150) {
        level = 2;
        rank = "Praktikantas";
    }
    else if (xp < 300) {
        level = 3;
        rank = "Specialistas";
    }
    else {
        level = 4;
        rank = "Profesionalas";
    }

    document.getElementById("totalXP").textContent = xp;

    document.getElementById("level").textContent = level;

    document.getElementById("rank").textContent = rank;

}


// ==========================================
// 5. PROGRESO JUOSTOS ATNAUJINIMAS
// ==========================================

function updateProgress() {

    const xp = calculateXP();

    let currentXP;
    let nextXP;
    let progress;

    if (xp < 50) {
        currentXP = 0;
        nextXP = 50;
    }
    else if (xp < 150) {
        currentXP = 50;
        nextXP = 150;
    }
    else if (xp < 300) {
        currentXP = 150;
        nextXP = 300;
    }
    else {
        currentXP = 300;
        nextXP = 300;
    }

    // Maksimalus lygis
    if (xp >= 300) {
        progress = 100;
    }
    else {
        progress = ((xp - currentXP) / (nextXP - currentXP)) * 100;
    }

    document.getElementById("xpFill").style.width =
        progress + "%";

    if (xp >= 300) {
        document.getElementById("xpText").textContent =
            "Pasiektas maksimalus lygis! 300+ XP";
    }
    else {
        document.getElementById("xpText").textContent =
            xp + " / " + nextXP + " XP (" +
            Math.round(progress) + "%)";
    }

}


// ==========================================
// 6. STATISTIKOS ATNAUJINIMAS
// ==========================================

function updateStatistics() {

    // Bendras įgūdžių skaičius
    const allSkills = skills.length;

    // Atliktų įgūdžių skaičius
    const doneSkills = skills.filter(
        skill => skill.status === "completed"
    ).length;

    // Atliktų įgūdžių procentas
    const donePercent = allSkills === 0
        ? 0
        : (doneSkills / allSkills) * 100;

    document.getElementById("allSkills").textContent =
        allSkills;

    document.getElementById("doneSkills").textContent =
        doneSkills;

    document.getElementById("donePercent").textContent =
        donePercent.toFixed(1) + "%";

}


// ==========================================
// 7. DUOMENŲ IŠSAUGOJIMAS (LOCAL STORAGE)
// ==========================================

function saveSkills() {

    localStorage.setItem(
        "skills",
        JSON.stringify(skills)
    );

}


// ==========================================
// 8. DUOMENŲ UŽKROVIMAS (LOCAL STORAGE)
// ==========================================

function loadSkills() {

    const savedSkills = localStorage.getItem("skills");

    if (savedSkills) {

        try {

            const loadedSkills = JSON.parse(savedSkills);

            // Patikriname, ar duomenys tinkami
            if (
                Array.isArray(loadedSkills) &&
                loadedSkills.length === 8 &&
                loadedSkills.every(skill =>
                    typeof skill.name === "string" &&
                    typeof skill.description === "string" &&
                    Number.isFinite(skill.xp) &&
                    ["planned", "learning", "completed"].includes(skill.status)
                )
            ) {

                skills = loadedSkills;

            }

        }
        catch (error) {

            console.log("Nepavyko užkrauti išsaugotų įgūdžių.");

        }

    }

}


// ==========================================
// 9. VISŲ DUOMENŲ ATNAUJINIMAS
// ==========================================

function updateAll() {

    renderSkills();

    updateLevel();

    updateProgress();

    updateStatistics();

    saveSkills();

}


// ==========================================
// 10. PROGRAMOS PALEIDIMAS
// ==========================================

// Užkrauname anksčiau išsaugotus duomenis
loadSkills();

// Atnaujiname visą modulį
updateAll();
