/* Programa creado por Gerardo Santana */
function encryptText() {
    let originalText = document.getElementById("originalText").value;
    if(originalText.length === 0) {
        document.getElementById("resultText").placeholder = "Ingresa un texto válido...";
    } else {
        document.getElementById("resultText").style.backgroundImage = "none";

        let ignorePreviousEncrypt = [];
        let encryptedText = "";

        const encryptions = [
            {char: "e", replaceFor: "enter"},
            {char: "o", replaceFor: "ober"},
            {char: "u", replaceFor: "ufat"},
            {char: "i", replaceFor: "imes"},
            {char: "a", replaceFor: "ai"},
        ];

        for (let i = 0; i < originalText.length; i++) {
            let currentChar = originalText.charAt(i);
            let ignoreCurrentChar = false;

            for (let j = 0; j < ignorePreviousEncrypt.length; j++) {
                let ignoreEncrypt = ignorePreviousEncrypt[j];

                if (i >= ignoreEncrypt.start && i < ignoreEncrypt.end) {
                    encryptedText += currentChar;
                    ignoreCurrentChar = true;
                    break;
                }
            }

            if (!ignoreCurrentChar) {
                let foundEncrypt = encryptions.find(
                    (encrypt) => encrypt.char === currentChar
                );

                if (foundEncrypt) {
                    let encryptLength = foundEncrypt.char.length;
                    let start = i;
                    let end = i + encryptLength;

                    ignorePreviousEncrypt.push({start, end});
                    encryptedText += foundEncrypt.replaceFor;
                    i += encryptLength - 1;
                } else {
                    encryptedText += currentChar;
                }
            }
        }
        document.getElementById("resultText").value = encryptedText;
        document.getElementById("copyButton").style.display = "";
    }
}

function decryptText() {

}

function copyToClipboard() {

}