class Registry {
    _persons;
    constructor() {
        this._persons = new Map();
    }
    hasId(id) {
        return this._persons.has(id);
    }
    getById(id) {
        return this._persons.get(id);
    }
    remove({docId}) {
        if (this.hasId(id)) {
            this._persons.delete(id);
            return true;
        }
        return false;
    }
    validate(person) {
        let checkResult = person.validate();
        if (person.docId && this.hasId(person.docId)) {
            checkResult = checkResult.combine(
                new CheckResult(false, [`Person with ID ${person.docId} already exists`])
            );
        }
        return checkResult;
    }
    add(person, resolve, reject) {
        let validationResult = this.validate(person);
        if (validationResult.valid) {
            this._persons.set(person.docId, person);
            resolve(person);
            return true;
        }
        else {
            reject(validationResult);
            return false;
        }
    }
}