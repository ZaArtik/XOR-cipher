// Об'єкт який зберігає всю потрібну інформацію для гамма шифрування
let Gamma = {

    // Алфавіти
    alphabet: ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k', 'l', 'm', 'n', 'o', 'p', 'q', 'r',
        's',
        't', 'u', 'v', 'w', 'x', 'y', 'z'
    ],

    alphabetUp: ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R',
        'S',
        'T', 'U', 'V', 'W', 'X', 'Y', 'Z'
    ],

    // Створюємо массив для зберігання ундексів великих літер
    upperArr: [],

    // Індекси
    y1: document.querySelector('.maincontent__index-input--1'),
    y2: document.querySelector('.maincontent__index-input--2'),
    y3: document.querySelector('.maincontent__index-input--3'),

    // Текстові поля
    decText: document.querySelector('.maincontent__text--dec'),
    encText: document.querySelector('.maincontent__text--enc'),

    // Конпки
    encBtn: document.querySelector('.maincontent__btn--enc'),
    decBtn: document.querySelector('.maincontent__btn--dec'),

    // Метод для шифрування гамуванням
    encryptingChar: function (transformText, gamma, alphabet) {
        Gamma.encText.value = '';

        let encText = this.encText;
        let newNumbers = 0;
        let encryptedText = [];
        let encryptedNumbers = [];
        let c = alphabet.length;

        encText.value = '';

        // Цикл, який перебирає всі комірки массивів з зашифрованим в числа текстом та гамою і додає їх
        for (let i = 0; i < transformText.length; i++) {
            newNumbers = transformText[i] + gamma[i];

            if (newNumbers == 26) {
                newNumbers = 0;
            }

            if (newNumbers > c) {
                newNumbers = newNumbers % c;
            }

            encryptedNumbers.push(newNumbers);
            encryptedText.push(newNumbers);
        }

        upperContinue:
            for (let i = 0; i < encryptedText.length; i++) {
                // Добавляємо провірку на наявність індексу алфавіту в індексі массиву з нашими великими буквами
                for (let j = 0; j < Gamma.upperArr.length; j++) {
                    if (i == Gamma.upperArr[j]) {
                        encryptedText[i] = Gamma.alphabetUp[encryptedText[i]];
                        continue upperContinue;
                    }
                }
                encryptedText[i] = alphabet[encryptedText[i]];
            }

        for (let i = 0; i < encryptedText.length; i++) {
            if (encryptedText[i] === undefined) {
                encText.value += " ";
                continue;
            }
            encText.value += encryptedText[i];
        }

        console.log("EncryptedNumbers: " + encryptedNumbers);
        console.log("EncryptedText: " + encryptedText);
        console.log("gamma: " + gamma);
    },

    // Метод для дешифрування гамування
    decryptingChar: function (text, alphabet) {

        let transformingText = [];

        let alphabetUp = Gamma.alphabetUp;
        Gamma.upperArr = [];
        Gamma.encText.value = '';

        for (let i = 0; i < text.length; i++) {
            if (text[i] === " ") {
                transformingText.push(" ");
            }
            for (let j = 0; j < alphabet.length; j++) {
                if (text[i] === alphabet[j]) {
                    transformingText.push(j);
                }
                // Перевірка на наявність в тексті великих букв
                if (text[i] === alphabetUp[j]) {
                    transformingText.push(j);
                    Gamma.upperArr.push(i);
                }
            }
        }

        // Перетворюєм наші індекси в числові значення для подальшої  корректної роботи з ними
        y1 = +Gamma.y1.value;
        y2 = +Gamma.y2.value;
        y3 = +Gamma.y3.value;

        let c = alphabet.length;
        let numbers = [y1, y2, y3];
        let gammaArr = [];
        let newNumbers = 0;

        // цикл, який перетворює ключи у цифровий код
        for (let i = 0; numbers.length < transformingText.length + 1; i++) {
            newNumbers = +numbers[i] + +numbers[i + 2];
            if (newNumbers > c) {
                newNumbers = newNumbers % c;
            }
            numbers.push(newNumbers);
        }

        // цикл для перетворення цифрового коду у гаму
        for (let i = 0; i < numbers.length; i++) {
            if (!isNaN(numbers[i + 1])) {
                newNumbers = numbers[i] + numbers[i + 1];
                if (newNumbers > c) {
                    newNumbers = newNumbers % c;
                }
                gammaArr.push(newNumbers);
            }
        }

        // Свторюємо массив, який буде зберігати в собі результат віднімання від довжини массива числа гамми
        let gammaAlphabet = [];
        let decryptedText = [];
        let decryptedNumb = 0;
        for (let i = 0; i < gammaArr.length; i++) {
            gammaAlphabet[i] = c - gammaArr[i];
        }

        // Цикл для дадовання гамми до трансформованого тексту, ми отримаємо числові індекси які відповідають розшифрованим індексам букв в алфавіті
        for (let i = 0; i < gammaAlphabet.length; i++) {
            decryptedNumb = gammaAlphabet[i] + transformingText[i];
            if (decryptedNumb > c) {
                decryptedNumb = decryptedNumb % c;
            }
            decryptedText.push(decryptedNumb);
        }

        upperContinue:
            for (let i = 0; i < decryptedText.length; i++) {
                // Добавляємо провірку на наявність індексу алфавіту в індексі массиву з нашими великими буквами
                for (let j = 0; j < Gamma.upperArr.length; j++) {
                    if (i == Gamma.upperArr[j]) {
                        decryptedText[i] = Gamma.alphabetUp[decryptedText[i]];
                        continue upperContinue;
                    }
                }
                decryptedText[i] = alphabet[decryptedText[i]];
            }

        for (let i = 0; i < decryptedText.length; i++) {
            if (decryptedText[i] === undefined) {
                Gamma.encText.value += " ";
                continue;
            }
            Gamma.encText.value += decryptedText[i];
        }



        console.log(decryptedText);
    }
}

// Об'єкт для роботи і обробки логіки методів шифрування
let cipherController = {

    // Метод для перевірки вхідних значень об'єкту Gamma
    checkGammaProperties: function (y1, y2, y3, decText, encText, encBtn) {
        // Значення індексів
        y1 = y1.value;
        y2 = y2.value;
        y3 = y3.value;

        // Значення текстових полів, алфавіт
        let alphabet = Gamma.alphabet;
        let alphabetSum = 0; // змінна для підрахунку збігів з афлавітом
        decText = decText.value;
        encText = encText.value;

        // Перевірка індексів на корректність даних
        if ((y1 > 0 && y2 > 0 && y3 > 0) && (!isNaN(y1) && !isNaN(y2) && !isNaN(y3))) {
            true;
        } else {
            alert("Введіть корректні значення в індексах!");
            return false;
        }

        // Перевірка символів текстового поля на збіг з алфавітом та на пустий рядок
        for (let i = 0; i < decText.length; i++) {
            for (let j = 0; j < alphabet.length; j++) {
                if (decText[i] === alphabet[j] || decText[i] === alphabet[j].toUpperCase() || decText[i] === " ") {
                    alphabetSum += 1;
                    break;
                }
            }
        }
        if (alphabetSum == decText.length) {
            true;
            this.transformText(decText, alphabet);
        } else {
            alert("Допускаються тільки ті символи, які входять в обраний вами алфавіт!");
            return false;
        }
    },

    // Метод для перетворення певного тексту в числа, які відповідають його положенню в заданному алфавіті
    transformText: function (text, alphabet) {
        //  Масив для зберігання трансформованого в числа текста
        let transformingText = [];

        let alphabetUp = Gamma.alphabetUp;
        Gamma.upperArr = [];

        for (let i = 0; i < text.length; i++) {
            if (text[i] === " ") {
                transformingText.push(" ");
            }
            for (let j = 0; j < alphabet.length; j++) {
                if (text[i] === alphabet[j]) {
                    transformingText.push(j);
                }
                // Перевірка на наявність в тексті великих букв
                if (text[i] === alphabetUp[j]) {
                    transformingText.push(j);
                    Gamma.upperArr.push(i);
                }
            }
        }

        this.transformToGamma(transformingText, alphabet, Gamma.y1, Gamma.y2, Gamma.y3);
    },

    // Метод для перетворення трансформованого в числа тексту у числа по формулі та в кінці у гамму
    transformToGamma: function (transformingText, alphabet, y1, y2, y3) {
        // Перетворюєм наші індекси в числові значення для подальшої  корректної роботи з ними
        y1 = +y1.value;
        y2 = +y2.value;
        y3 = +y3.value;

        let c = alphabet.length;
        let numbers = [y1, y2, y3];
        let gammaArr = [];
        let newNumbers = 0;

        // цикл, який перетворює ключи у цифровий код
        for (let i = 0; numbers.length < transformingText.length + 1; i++) {
            newNumbers = +numbers[i] + +numbers[i + 2];
            if (newNumbers > c) {
                newNumbers = newNumbers % c;
            }
            numbers.push(newNumbers);
        }

        // цикл для перетворення цифрового коду у гаму
        for (let i = 0; i < numbers.length; i++) {
            if (!isNaN(numbers[i + 1])) {
                newNumbers = numbers[i] + numbers[i + 1];
                if (newNumbers > c) {
                    newNumbers = newNumbers % c;
                }
                gammaArr.push(newNumbers);
            }
        }

        Gamma.encryptingChar(transformingText, gammaArr, alphabet);
    }
}





Gamma.encBtn.onclick = function () {
    cipherController.checkGammaProperties(Gamma.y1, Gamma.y2, Gamma.y3, Gamma.decText, Gamma.encText);
};

Gamma.decBtn.onclick = function () {
    Gamma.decryptingChar(Gamma.decText.value, Gamma.alphabet);
}