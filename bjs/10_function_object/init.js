
window.onload = function () {
    // Назначаем функцию на глобальный объект, чтобы она была доступна из HTML
    window.generatePerson = function () {
        const person = personGenerator.getPerson();

        document.getElementById("surnameOutput").textContent = person.surname;
        document.getElementById("firstNameOutput").textContent = person.firstName;
        document.getElementById("patronymicOutput").textContent = person.patronymic;
        document.getElementById("genderOutput").textContent = person.gender;
        document.getElementById("birthYearOutput").textContent = person.yearOfBirth;
        document.getElementById("birthDateOutput").textContent = person.birthDate;
        document.getElementById("professionOutput").textContent = person.profession;
        document.getElementById("professionOutput").textContent = person.profession;
        

        console.log("Сгенерированный человек:", person);
    };

    // Функция для очистки сгенерированных данных
    window.clearGeneratedData = function () {
        document.getElementById("surnameOutput").textContent = 'Генерация фамилии';
        document.getElementById("firstNameOutput").textContent = 'Иван';
        document.getElementById("patronymicOutput").textContent = 'Генерация отчества';
        document.getElementById("genderOutput").textContent = 'Генерация пола';
        document.getElementById("birthYearOutput").textContent = 'Генерация года рождения';
        document.getElementById("birthDateOutput").textContent = 'Генерация даты рождения';
        document.getElementById("professionOutput").textContent = 'Генерация профессии';

        console.log("Данные очищены");
    };

    // Автоматическая генерация при загрузке
    generatePerson();
};
