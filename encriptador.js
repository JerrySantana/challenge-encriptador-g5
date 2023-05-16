/* Created by Gerardo Santana */
function encryptText() {    // function to encrypt text
    let originalText = document.getElementById("originalText").value;   // get the text from the input area
    if(originalText.length === 0) { // check if the input area is empty
        document.getElementById("resultText").placeholder = "Ingresa un texto válido...";
    } else {
        document.getElementById("resultText").style.backgroundImage = "none";   // remove background image from the Decrypted Text area

        let ignorePreviousEncrypt = []; // array to avoid encrypting the same character twice
        let encryptedText = ""; // variable to store the final encrypted text

        const encryptions = [   // array of objects with the character to encrypt and the replacement
            {char: "e", replaceFor: "enter"},
            {char: "o", replaceFor: "ober"},
            {char: "u", replaceFor: "ufat"},
            {char: "i", replaceFor: "imes"},
            {char: "a", replaceFor: "ai"},
        ];

        for (let i = 0; i < originalText.length; i++) { // loop through the original text
            let currentChar = originalText.charAt(i);   // get the current character
            let ignoreCurrentChar = false;  // variable to check if the current character should be ignored

            for (let j = 0; j < ignorePreviousEncrypt.length; j++) {    // loop through the array of characters to ignore
                let ignoreEncrypt = ignorePreviousEncrypt[j];   // get the current character to ignore

                if (i >= ignoreEncrypt.start && i < ignoreEncrypt.end) {    // check if the current character is between the start and end position of the character to ignore
                    encryptedText += currentChar;   // add the current character to the encrypted text
                    ignoreCurrentChar = true;   // set the variable to true to ignore the current character
                    break;
                }
            }

            if (!ignoreCurrentChar) {   // if the current character should not be ignored
                let foundEncrypt = encryptions.find(    // find the character to encrypt
                    (encrypt) => encrypt.char === currentChar   // check if the current character is the character to encrypt
                );

                if (foundEncrypt) { // if the character to encrypt is found
                    let encryptLength = foundEncrypt.char.length;   // get the length of the character to encrypt
                    let start = i;  // get the start of the replacement string
                    let end = i + encryptLength;    // get the end of the replacement string

                    ignorePreviousEncrypt.push({start, end});   // add the start and end position of the replacement string to the array of characters to ignore
                    encryptedText += foundEncrypt.replaceFor;   // add the replacement string to the encrypted text
                    i += encryptLength - 1; // set the index to the end of the replacement string
                } else {
                    encryptedText += currentChar;   // if not adds the current character to the encrypted text
                }
            }
        }
        document.getElementById("resultText").value = encryptedText;    // set the encrypted text to the Decrypted Text area
        document.getElementById("copyButton").style.display = "";   // show the copy button
    }
}

function decryptText() {    // function to decrypt text
    let encryptedText = document.getElementById("originalText").value;  // get the text from the input area
    if(encryptedText.length === 0) {    // checks if the input area is empty
        document.getElementById("resultText").placeholder = "Ingresa un texto válido...";
    } else {
        document.getElementById("resultText").style.backgroundImage = "none";    // remove background image from the Decrypted Text area
        let ignorePreviousDecrypt = []; // array to avoid decrypting the same character twice
        let decryptedText = ""; // variable to store the final decrypted text

        const decryptions = [   // array of objects with the character to decrypt and the replacement
            {encrypt: "enter", replaceFor: "e"},
            {encrypt: "ober", replaceFor: "o"},
            {encrypt: "ufat", replaceFor: "u"},
            {encrypt: "imes", replaceFor: "i"},
            {encrypt: "ai", replaceFor: "a"},
        ];

        for (let i = 0; i < encryptedText.length; i++) {    // loop through the encrypted text
            let currentChar = encryptedText.charAt(i);  // get the current character
            let ignoreCurrentChar = false;  // variable to check if the current character should be ignored

            for (let j = 0; j < ignorePreviousDecrypt.length; j++) {    // loop through the array of characters to ignore
                let ignoreDecrypt = ignorePreviousDecrypt[j];   // get the current character to ignore

                if (i >= ignoreDecrypt.start && i < ignoreDecrypt.end) {    // check if the current character is between the start and end position of the character to ignore
                    decryptedText += currentChar;   // add the current character to the decrypted text
                    ignoreCurrentChar = true;   // set the variable to true to ignore the current character
                    break;
                }
            }

            if (!ignoreCurrentChar) {    // if the current character should not be ignored
                let foundDecrypt = decryptions.find(    // find the character to decrypt
                    (decrypt) => decrypt.replaceFor === currentChar // check if the current character is the character to decrypt
                );

                if (foundDecrypt) { // if the character to decrypt is found
                    let encryptLength = foundDecrypt.encrypt.length;    // get the length of the character to decrypt
                    let start = i;  // get the start of the replacement string
                    let end = i + encryptLength;    // get the end of the replacement string

                    ignorePreviousDecrypt.push({start, end});   // add the start and end position of the encrypted string to the array of characters to ignore
                    decryptedText += foundDecrypt.replaceFor;   // add the encrypted string to the decrypted text
                    i += encryptLength - 1; // set the index to the end of the encrypted string
                } else {
                    decryptedText += currentChar;   // it not adds the current character to the decrypted text
                }
            }
        }
        document.getElementById("resultText").value = decryptedText;    // set the decrypted text to the Decrypted Text area
        document.getElementById("copyButton").style.display = "";   // show the copy button
    }
}

function copyToClipboard() {    // function to copy the text in the Decrypted Text area to the clipboard
    document.getElementById("copyButton").style.display = "none";   // hide the copy button
    let copiedText = document.getElementById("resultText").value;   // get the text from the Decrypted Text area and store it in a variable
    if (copiedText.length !== 0) {  // checks if the output text box is not empty
        document.getElementById("resultText").value = "";   // clear the Decrypted Text area
        document.getElementById("resultText").placeholder = "Sin texto para mostrar...";    // sets the original placeholder
        document.getElementById("resultText").style.backgroundImage = "";   // set the background image to the Decrypted Text area
        navigator.clipboard.writeText(copiedText);  // copy the text of the variable to the clipboard
    }
}