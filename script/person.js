
class Person {
    _docId;
    _firstName;
    _lastName;
    _birthDate;

    constructor(docId, firstName, lastName, birthDate) {
        this._docId = docId ? docId.trim() : null;
        this._firstName = firstName? firstName.trim(): null;
        this._lastName = lastName? lastName.trim(): null;
        this._birthDate = new Date(birthDate);
    }
    get birthDate() {
        return this._birthDate;
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
    get fullName() {
        return `${this.firstName} ${this.lastName}`;
    }
    toString() {
        return `${this.fullName}, age ${this.age}, document ID ${this.docId}`;
    }
    get age() {
        return PersonDate.getAge(this.birthDate);
    }

    validate() {
        const errors = [];
        if (!this._docId) {
            errors.push("Document ID is required");
        }
        if (!this._firstName) {
            errors.push("First name is required");
        }
        if (!this._lastName) {
            errors.push("Last name is required");
        }
        const result = errors.length === 0? CheckResult.VALID_RESULT: new CheckResult(false, errors);

        return result.combine(PersonDate.validate(this._birthDate));
    }
}