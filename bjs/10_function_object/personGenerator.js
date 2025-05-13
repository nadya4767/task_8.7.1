const personGenerator = {
    MONTHS: {
        0: { name: "января", days: 31 },
        1: { name: "февраля", days: 28 },
        2: { name: "марта", days: 31 },
        3: { name: "апреля", days: 30 },
        4: { name: "мая", days: 31 },
        5: { name: "июня", days: 30 },
        6: { name: "июля", days: 31 },
        7: { name: "августа", days: 31 },
        8: { name: "сентября", days: 30 },
        9: { name: "октября", days: 31 },
        10: { name: "ноября", days: 30 },
        11: { name: "декабря", days: 31 }
    },

    professionByGender: {
        'Мужчина': ['Слесарь', 'Шахтёр', 'Солдат', 'Инженер', 'Программист', 'Механик'],
        'Женщина': ['Учительница', 'Медсестра', 'Секретарь', 'Флорист', 'Повар', 'Библиотекарь']
    },

    surnameJson: `{  
        "count": 16,
        "list": {
            "id_1": "Иванов",
            "id_2": "Смирнов",
            "id_3": "Кузнецов",
            "id_4": "Васильев",
            "id_5": "Петров",
            "id_6": "Михайлов",
            "id_7": "Новиков",
            "id_8": "Федоров",
            "id_9": "Кравцов",
            "id_10": "Николаев",
            "id_11": "Семёнов",
            "id_12": "Славин",
            "id_13": "Степанов",
            "id_14": "Павлов",
            "id_15": "Александров",
            "id_16": "Морозов"
        }
    }`,
    
    firstNameMaleJson: `{
        "count": 10,
        "list": {     
            "id_1": "Александр",
            "id_2": "Максим",
            "id_3": "Иван",
            "id_4": "Артем",
            "id_5": "Дмитрий",
            "id_6": "Никита",
            "id_7": "Михаил",
            "id_8": "Даниил",
            "id_9": "Егор",
            "id_10": "Андрей"
        }
    }`,
    
    firstNameFemaleJson: `{
        "count": 10,
        "list": {     
            "id_1": "Александра",
            "id_2": "Мария",
            "id_3": "Алёна",
            "id_4": "Ирина",
            "id_5": "Дарья",
            "id_6": "Надежда",
            "id_7": "Маргарита",
            "id_8": "Дарья",
            "id_9": "Елизавета",
            "id_10": "Анастасия"
        }
    }`,

    GENDER_MALE: 'Мужчина',
    GENDER_FEMALE: 'Женщина',

    randomIntNumber: function (max = 1, min = 0) {
        return Math.floor(Math.random() * (max - min + 1)) + min;
    },

    randomValue: function (json) {
        const obj = JSON.parse(json);
        const prop = `id_${this.randomIntNumber(obj.count, 1)}`;
        return obj.list[prop];
    },

    randomGender: function () {
        return this.randomIntNumber(1, 0) ? this.GENDER_MALE : this.GENDER_FEMALE;
    },

    randomFirstName: function (gender) {
        return gender === this.GENDER_FEMALE
            ? this.randomValue(this.firstNameFemaleJson)
            : this.randomValue(this.firstNameMaleJson);
    },

    randomSurname: function (gender) {
        let surname = this.randomValue(this.surnameJson);
        return gender === this.GENDER_FEMALE ? surname + 'а' : surname;
    },

    randomPatronymic: function (gender) {
        const fatherName = this.randomValue(this.firstNameMaleJson);
        let patronymic = '';

        if (gender === this.GENDER_MALE) {
            if (fatherName.endsWith('й')) {
                patronymic = fatherName.slice(0, -1) + 'евич';
            } else if (fatherName.endsWith('а')) {
                patronymic = fatherName.slice(0, -1) + 'ич';
            } else {
                patronymic = fatherName + 'ович';
            }
        } else {
            if (fatherName.endsWith('й')) {
                patronymic = fatherName.slice(0, -1) + 'евна';
            } else if (fatherName.endsWith('а')) {
                patronymic = fatherName.slice(0, -1) + 'ична';
            } else {
                patronymic = fatherName + 'овна';
            }
        }

        return patronymic;
    },

    randomYearOfBirth: function (min, max) {
        return this.randomIntNumber(min, max);
    },

    randomBirthDate: function () {
    const monthIndex = this.randomIntNumber(11, 0); // Порядок: max, min
    const month = this.MONTHS[monthIndex];

    if (!month) {
        console.error("Ошибка: не найден месяц по индексу", monthIndex);
        return "неизвестная дата";
    }

    const day = this.randomIntNumber(month.days, 1); // Порядок: max, min
    return `${day} ${month.name}`;
    },
 
    randomProfession: function (gender) {
        const professions = this.professionByGender[gender];
        return professions[this.randomIntNumber(professions.length - 1)];
    },

    getPerson: function () {
        this.person = {};
        this.person.gender = this.randomGender();
        this.person.firstName = this.randomFirstName(this.person.gender);
        this.person.surname = this.randomSurname(this.person.gender);
        this.person.patronymic = this.randomPatronymic(this.person.gender);
        this.person.yearOfBirth = this.randomYearOfBirth(1965, 2000);
        this.person.birthDate = this.randomBirthDate();
        this.person.profession = this.randomProfession(this.person.gender);

        return this.person;
   },
    
       
};