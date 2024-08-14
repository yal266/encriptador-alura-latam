const inputText = document.querySelector("#input-text");
const outputText = document.querySelector("#output-text");
const warningElement = document.querySelector("#warning");
const defaultView = document.querySelector("#default");
const resultView = document.querySelector("#result");

const traduccion = {
    "a": "ai",
    "e": "enter",
    "i": "imes",
    "o": "ober",
    "u": "ufat"
};

function encriptar() {
    warningElement.removeAttribute("style");
    const texto = inputText.value.toLowerCase();

    if (texto === "") {
        showDefaultView();
        return;
    }

    if (!/^[a-z\s]*$/.test(texto)) {
        showWarning();
        return;
    }

    let out = "";
    for (let i = 0; i < texto.length; i++) {
        out += traduccion[texto[i]] || texto[i];
    }

    showResultView(out);
}

function desencriptar() {
    warningElement.removeAttribute("style");
    const texto = inputText.value.toLowerCase();

    if (texto === "") {
        showDefaultView();
        return;
    }

    if (!/^[a-z\s]*$/.test(texto)) {
        showWarning();
        return;
    }

    let out = texto;
    for (const [key, value] of Object.entries(traduccion)) {
        out = out.replace(new RegExp(value, "g"), key);
    }

    showResultView(out);
}

function clipboard() {
    navigator.clipboard.writeText(outputText.value)
        .then(() => alert("Texto copiado al portapapeles"))
        .catch(err => console.error('Error al copiar el texto: ', err));
}

function showWarning() {
    warningElement.style.color = "red";
    warningElement.style.fontSize = "16px";
}

function showDefaultView() {
    defaultView.classList.remove("invisible");
    resultView.classList.add("invisible");
}

function showResultView(text) {
    defaultView.classList.add("invisible");
    resultView.classList.remove("invisible");
    outputText.value = text;
}

document.querySelector('#encrypt').addEventListener('click', encriptar);
document.querySelector('#decrypt').addEventListener('click', desencriptar);
document.querySelector('#copy').addEventListener('click', clipboard);