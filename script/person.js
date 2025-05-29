class Person {
    _docId;
    _firstName;
    _lastName;
    _birthDate;

    constructor(docId, firstName, lastName, birthDate) {
        this._docId = docId ? docId.trim() : null;
        this._firstName = firstName? firstName.trim(): null;
        this._lastName = lastName? lastName.trim(): null;

        const dateValue = new Date(birthDate);
        this._birthDate = isNaN(dateValue.getTime())? null : dateValue;
    }
    get docId() {
        return this._docId;
    }
    get firstName() {
        return this._firstName;
    }
    get lastName() {
        return this._lastName;
    }

    get printText() {
        return `${this._firstName} ${this._lastName}, age ${this.age}, document ID ${this._docId}`;
    }

    get age() {
        const today = new Date();
        const birthDay = this._birthDate;
        const birthDayThisYear = new Date(today.getFullYear(), birthDay.getMonth(), birthDay.getDate());
        let years = today.getFullYear() - birthDay.getFullYear();
        if (birthDayThisYear < today) {
            years--;
        }
        return years;
    }
    validate() {
        const errors = [];
        if (!this._firstName) {
            errors.push("First name is required");
        }
        if (!this._lastName) {
            errors.push("Last name is required");
        }
        if (!this._birthDate) {
            errors.push("Birth date is required");
        }
        if (errors.length > 0) {
            return new CheckResult(false, errors);
        }
        return CheckResult.VALID_RESULT;
    }
}