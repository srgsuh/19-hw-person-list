class Registry {
    _persons;
    constructor() {
        this._persons = new Map();
    }
    get size() {
        return this._persons.size;
    }
    isEmpty() {
        return this.size === 0;
    }
    hasId(id) {
        return this._persons.has(id);
    }
    remove({docId}) {
        if (this.hasId(docId)) {
            this._persons.delete(docId);
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
    add(person) {
        let validationResult = this.validate(person);
        if (!validationResult.valid) {
            return new AddResult(false, person, validationResult.errors);
        }
        this._persons.set(person.docId, person);
        return new AddResult(true, person, []);
    }
    getStatistics() {
        if (this.isEmpty()) {
            return Statistics.EMPTY;
        }
        let min = Number.MAX_SAFE_INTEGER, max = -1, sum = 0;
        for (let {age} of this._persons.values()) {
            min = Math.min(min, age);
            max = Math.max(max, age);
            sum += age;
        }
        return new Statistics(this.size, max, min, sum/this.size);
    }
}