let minValue = parseInt(prompt('Введите минимальное значение (от -999 до 999):', '0')) || 0;
let maxValue = parseInt(prompt('Введите максимальное значение (от -999 до 999):', '100')) || 100;
alert(`Загадайте любое целое число от ${minValue} до ${maxValue}, а я его угадаю`);
let answerNumber  = Math.floor((minValue + maxValue) / 2);
let orderNumber = 1;
let gameRun = true;

const orderNumberField = document.getElementById('orderNumberField');
const answerField = document.getElementById('answerField');

// Используем тернарный оператор для корректировки значений
minValue = (minValue < -999) ? -999 : (minValue > 999 ? 999 : minValue);
maxValue = (maxValue < -999) ? -999 : (maxValue > 999 ? 999 : maxValue);

// Проверка, чтобы minValue всегда было меньше или равно maxValue
if (minValue > maxValue) {
    [minValue, maxValue] = [maxValue, minValue];
}

console.log(`Минимальное значение: ${minValue}`);
console.log(`Максимальное значение: ${maxValue}`);

// Массивы фраз
const questionPhrases = [
    number => `Да это легко! Ты загадал ${number}?`,
    number => `Наверное, это число ${number}?`,
    number => `Пусть будет ${number}. Угадал?`
 ];

const failurePhrases = [
    `Вы загадали неправильное число!\n\u{1F914}`,
    `Я сдаюсь..\n\u{1F92F}`,
    `Что-то не так...\n\u{1F615}`
];

const successPhrases = [
    number => `Да это легко! Ты загадал ${number}, верно?`,
    number => `Я угадал! Это точно ${number}!`,
    number => `Ха! ${number} — как я и думал!`
];


// Функции для случайных фраз
function numberToWordsRu(n) {
    const units = ['ноль','один','два','три','четыре','пять','шесть','семь','восемь','девять'];
    const teens = ['десять','одиннадцать','двенадцать','тринадцать','четырнадцать','пятнадцать','шестнадцать','семнадцать','восемнадцать','девятнадцать'];
    const tens = ['','','двадцать','тридцать','сорок','пятьдесят','шестьдесят','семьдесят','восемьдесят','девяносто'];
    const hundreds = ['','сто','двести','триста','четыреста','пятьсот','шестьсот','семьсот','восемьсот','девятьсот'];

    if (n < 0) return 'минус ' + numberToWordsRu(-n);
    if (n < 10) return units[n];
    if (n < 20) return teens[n - 10];
    if (n < 100) {
        let ten = Math.floor(n / 10);
        let unit = n % 10;
        return tens[ten] + (unit ? ' ' + units[unit] : '');
    }
    if (n < 1000) {
        let hundred = Math.floor(n / 100);
        let rest = n % 100;
        return hundreds[hundred] + (rest ? ' ' + numberToWordsRu(rest) : '');
    }
    return n.toString(); 
}

function getDisplayNumber(n) {
    const text = numberToWordsRu(n);
    return text.length <= 20 ? text : n;
}

function getRandomElement(array) {
    return array[Math.floor(Math.random() * array.length)];
}

function getQuestionPhrase(number) {
    return getRandomElement(questionPhrases)(number);
}

function getSuccessPhrase(number) {
    return getRandomElement(successPhrases)(number);
}

function getFailurePhrase() {
    return getRandomElement(failurePhrases);
}

// Первоначальный вывод
orderNumberField.innerText = `Попытка №${orderNumber}`;
answerField.innerText = getQuestionPhrase(answerNumber);

// Кнопка "Больше"
document.getElementById('btnOver').addEventListener('click', function () {
    if (gameRun) {
        if (minValue === maxValue) {
            answerField.innerText = getFailurePhrase();
            gameRun = false;
        } else {
            minValue = answerNumber + 1;
            answerNumber = Math.floor((minValue + maxValue) / 2);
            orderNumber++;
            orderNumberField.innerText = `Попытка №${orderNumber}`;
            answerField.innerText = getQuestionPhrase(answerNumber);
        }
    }
});

// Кнопка "Меньше"
document.getElementById('btnLess').addEventListener('click', function () {
    if (gameRun) {
        if (minValue === maxValue) {
            answerField.innerText = getFailurePhrase();
            gameRun = false;
        } else {
            maxValue = answerNumber + 1;
            answerNumber = Math.floor((minValue + maxValue) / 2);
            orderNumber++;
            orderNumberField.innerText = `Попытка №${orderNumber}`;
            answerField.innerText = getQuestionPhrase(answerNumber);
        }
    }
});

// Кнопка "Верно"
document.getElementById('btnEqual').addEventListener('click', function () {
    if (gameRun) {
        answerField.innerText = getSuccessPhrase(answerNumber);
        gameRun = false;
    }
});

// Кнопка "Заново"
document.getElementById('btnRetry').addEventListener('click', function () {
    minValue = parseInt(prompt('Введите минимальное значение:', '0')) || 0;
    maxValue = parseInt(prompt('Введите максимальное значение:', '100')) || 100;

    if (minValue > maxValue) {
        [minValue, maxValue] = [maxValue, minValue];
    }

orderNumber = 1;
    gameRun = true;
    answerNumber = Math.floor((minValue + maxValue) / 2);

    orderNumberField.innerText = `Попытка №${orderNumber}`;
    answerField.innerText = getQuestionPhrase(answerNumber);
});

orderNumberField.innerText = orderNumber;
answerField.innerText = `Вы загадали число ${answerNumber }?`;

document.getElementById('btnRetry').addEventListener('click', function () {
    minValue = parseInt(prompt('Введите минимальное значение:', '0')) || 0;
    maxValue = parseInt(prompt('Введите максимальное значение:', '100')) || 100;

    if (minValue > maxValue) {
        [minValue, maxValue] = [maxValue, minValue];
    }

    orderNumber = 1;
    gameRun = true;
    answerNumber = Math.floor((minValue + maxValue) / 2);

    orderNumberField.innerText = `Попытка №${orderNumber}`;
    answerField.innerText = getQuestionPhrase(answerNumber);
});


document.getElementById('btnOver').addEventListener('click', function () {
    if (gameRun){
        if (minValue === maxValue){
            const phraseRandom = Math.round( Math.random());
            const answerPhrase = (phraseRandom === 1) ?
                `Вы загадали неправильное число!\n\u{1F914}` :
                `Я сдаюсь..\n\u{1F92F}`;

            answerField.innerText = answerPhrase;
            gameRun = false;
        } else {
            minValue = answerNumber  + 1;
            answerNumber  = Math.floor((minValue + maxValue) / 2);
            orderNumber++;
            orderNumberField.innerText = orderNumber;
            answerField.innerText = `Вы загадали число ${answerNumber }?`;
        }
    }
})

document.getElementById('btnLess').addEventListener('click', function () {
    if (gameRun){
        if (minValue === maxValue){
            const phraseRandom = Math.round( Math.random());
            const answerPhrase = (phraseRandom === 1) ?
                `Вы загадали неправильное число!\n\u{1F914}` :
                `Я сдаюсь..\n\u{1F92F}`;

            answerField.innerText = answerPhrase;
            gameRun = false;
        } else {
            maxValue = answerNumber - 1;
            answerNumber = Math.floor((minValue + maxValue) / 2);
            orderNumber++;
            orderNumberField.innerText = orderNumber;
            answerField.innerText = `Вы загадали число ${answerNumber}?`;
        }
    }
});

document.getElementById('btnRetry').addEventListener('click', function () {
    minValue = parseInt(prompt('Введите минимальное значение:', '0')) || 0;
    maxValue = parseInt(prompt('Введите максимальное значение:', '100')) || 100;

    if (minValue > maxValue) {
        [minValue, maxValue] = [maxValue, minValue]; 

// Меняем местами, если введено наоборот
    }

    orderNumber = 1;
    gameRun = true;
    answerNumber = Math.floor((minValue + maxValue) / 2);

    orderNumberField.innerText = `Попытка №${orderNumber}`;
    answerField.innerText = `Вы загадали число ${answerNumber}?`;
});

document.getElementById('btnEqual').addEventListener('click', function () {
    if (gameRun){
        answerField.innerText = `Я всегда угадываю\n\u{1F60E}`
        gameRun = false;
    }
})