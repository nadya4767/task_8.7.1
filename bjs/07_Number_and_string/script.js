document.addEventListener('DOMContentLoaded', function () {
    let min = 1; // Минимальное значение диапазона
    let max = 100; // Максимальное значение диапазона
    let guess = Math.floor((min + max) / 2); // Первое предположение
    let questionCount = 0; // Счетчик вопросов

    // Функция для обновления текста в inputWindow
    function updateGuessText() {
        document.getElementById('inputWindow').value = `Ваше число: ${guess}?`;
    }

    // Обработчик для кнопки "Заново"
    document.getElementById('btn_restart').addEventListener('click', () => {
        // Используем prompt для ввода минимального и максимального значений
        const minValue = parseInt(prompt("Введите минимальное значение:", "0")) || 0;
        const maxValue = parseInt(prompt("Введите максимальное значение:", "100")) || 100;

        // Ограничиваем диапазон
        min = minValue < -999 ? -999 : minValue > 999 ? 999 : minValue;
        max = maxValue < -999 ? -999 : maxValue > 999 ? 999 : maxValue;

        // Пересчитываем начальное предположение
        guess = Math.floor((min + max) / 2);
        questionCount = 0;

        // Обновляем текст
        updateGuessText();
    });

    // Обработчики для кнопок "Больше", "Меньше"
    document.getElementById('btn_more').addEventListener('click', () => {
        min = guess + 1;
        guess = Math.floor((min + max) / 2);
        questionCount++;
        updateGuessText();
    });

    document.getElementById('btn_less').addEventListener('click', () => {
        max = guess - 1;
        guess = Math.floor((min + max) / 2);
        questionCount++;
        updateGuessText();
    });

    document.getElementById('btn_eq').addEventListener('click', () => {
        document.getElementById('inputWindow').value = `Угадал! Это число: ${guess}. Количество вопросов: ${questionCount}`;
    });

    // Инициализация первого предположения
    updateGuessText();
});