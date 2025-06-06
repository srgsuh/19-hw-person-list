class CheckResult {
    constructor(valid = true, errors = []) {
        this.valid = valid;
        this.errors = errors;
    }

    combine(other) {
        if (this.valid && other.valid) {
            return this;
        }
        return new CheckResult(false, [...this.errors,...other.errors]);
    }
    static VALID_RESULT = Object.freeze(new CheckResult(true, Object.freeze([])));
}

class Statistics {
    constructor(personCount, maxAge, minAge, averageAge, salary, avgSalary) {
        this.personCount = personCount;
        this.maxAge = maxAge;
        this.minAge = minAge;
        this.averageAge = averageAge;
        this.salary = salary;
        this.avgSalary = avgSalary;
    }
    static EMPTY = Object.freeze(new Statistics(0, 0, 0, 0, 0, 0));
}

class RequestResult {
    constructor(success, itemId, itemText, errors) {
        this.success = success;
        this.itemId = itemId;
        this.itemText = itemText;
        this.errors = errors;
    }
}

class PersonDate {
    constructor() {}
    static MIN_AGE = 18;
    static MIN_BIRTH_DATE = new Date(1900, 0, 1);
    static MAX_BIRTH_DATE = PersonDate.getMaxDate()

    static validate(date, dateName = 'Date of birth') {
        const errors = [];
        if (!date) {
            errors.push(`${dateName} is required`);
        }
        else if (isNaN(date.getTime())) {
            errors.push(`${dateName} is invalid`);
        }
        else if (date < PersonDate.MIN_BIRTH_DATE) {
            errors.push(`${dateName} must be on or after ${PersonDate.format(PersonDate.MIN_BIRTH_DATE)}`);
        }
        else if (date > PersonDate.MAX_BIRTH_DATE) {
            errors.push(`${dateName} must be on or before ${PersonDate.format(PersonDate.MAX_BIRTH_DATE)}`);
        }
        return errors.length === 0? CheckResult.VALID_RESULT: new CheckResult(false, errors);
    }

    static getAge(birthDay) {
        const today = PersonDate.today();
        const birthDayThisYear = new Date(today.getFullYear(), birthDay.getMonth(), birthDay.getDate());
        let years = today.getFullYear() - birthDay.getFullYear();
        if (birthDayThisYear < today) {
            years--;
        }
        return years;
    }

    static today() {
        return [new Date()].map(d => new Date(d.getFullYear(), d.getMonth(), d.getDate())).pop();
    }

    static getMaxDate() {
        const today = PersonDate.today();
        return new Date(today.getFullYear() - PersonDate.MIN_AGE, today.getMonth(), today.getDate());
    }

    static format(date) {
        return date.toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'long',
            day: 'numeric'
        });
    }
}