/* Created by Gerardo Santana */
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
    let encryptedText = document.getElementById("originalText").value;
    if(encryptedText.length === 0) {
        document.getElementById("resultText").placeholder = "Ingresa un texto válido...";
    } else {
        document.getElementById("resultText").style.backgroundImage = "none";
        let ignorePreviousDecrypt = [];
        let decryptedText = "";

        const decryptions = [
            {encrypt: "enter", replaceFor: "e"},
            {encrypt: "ober", replaceFor: "o"},
            {encrypt: "ufat", replaceFor: "u"},
            {encrypt: "imes", replaceFor: "i"},
            {encrypt: "ai", replaceFor: "a"},
        ];

        for (let i = 0; i < encryptedText.length; i++) {
            let currentChar = encryptedText.charAt(i);
            let ignoreCurrentChar = false;

            for (let j = 0; j < ignorePreviousDecrypt.length; j++) {
                let ignoreDecrypt = ignorePreviousDecrypt[j];

                if (i >= ignoreDecrypt.start && i < ignoreDecrypt.end) {
                    decryptedText += currentChar;
                    ignoreCurrentChar = true;
                    break;
                }
            }

            if (!ignoreCurrentChar) {
                let foundDecrypt = decryptions.find(
                    (decrypt) => decrypt.replaceFor === currentChar
                );

                if (foundDecrypt) {
                    let encryptLength = foundDecrypt.encrypt.length;
                    let start = i;
                    let end = i + encryptLength;

                    ignorePreviousDecrypt.push({start, end});
                    decryptedText += foundDecrypt.replaceFor;
                    i += encryptLength - 1;
                } else {
                    decryptedText += currentChar;
                }
            }
        }
        document.getElementById("resultText").value = decryptedText;
        document.getElementById("copyButton").style.display = "";
    }
}

function copyToClipboard() {
    document.getElementById("copyButton").style.display = "none";
    let copiedText = document.getElementById("resultText").value;
    if (copiedText.length !== 0) {
        document.getElementById("resultText").value = "";
        document.getElementById("resultText").placeholder = "Sin texto para mostrar...";
        document.getElementById("resultText").style.backgroundImage = "";
        navigator.clipboard.writeText(copiedText);
    }
}