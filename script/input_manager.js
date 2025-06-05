class RawInputData {
    constructor(docId, firstName, lastName, birthDate, salary) {
        this.docId = docId;
        this.firstName = firstName;
        this.lastName = lastName;
        this.birthDate = birthDate;
        this.salary = salary;
    }
}
class InputManager {
    _inDocId;
    _inFirstName;
    _inLastName;
    _inBirthDate;
    _inSalary;
    _inputs;
    constructor(inDocId, inFirstName, inLastName, inBirthDate, inSalary) {
        this._inDocId = inDocId;
        this._inFirstName = inFirstName;
        this._inLastName = inLastName;
        this._inBirthDate = inBirthDate;
        this._inSalary = inSalary;
        this._inputs = [inDocId, inFirstName, inLastName, inBirthDate, inSalary];
    }
    clear() {
        this._inDocId.value = '';
        this._inFirstName.value = '';
        this._inLastName.value = '';
        this._inBirthDate.value = '';
        this._inSalary.value = '';
    }
    getInputData() {
        console.log('InputManager.getInputData', this._inDocId.value, this._inFirstName.value);
        return new RawInputData(
            this._inDocId.value,
            this._inFirstName.value,
            this._inLastName.value,
            this._inBirthDate.value,
            this._inSalary.value,
        )
    }
    setInputs(...args) {
        console.log('inputManager.setInputs', args);
        [this._inDocId.value, this._inFirstName.value, this._inLastName.value, this._inBirthDate.value, this._inSalary.value] = args;
    }
    confirmEnter(eventTarget) {
        return this._inputs.includes(eventTarget);
    }
    catchFocus() {
        this._inDocId.focus();
    }
}