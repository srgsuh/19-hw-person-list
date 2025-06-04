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
        return new RawInputData(
            this._inDocId.value,
            this._inFirstName.value,
            this._inLastName.value,
            this._inBirthDate.value,
            this._inSalary.value,
        )
    }
    _setInputs({docId, firstName, lastName, birthDate, salary}) {
        this._inDocId.value = docId;
        this._inFirstName.value = firstName;
        this._inLastName.value = lastName;
        this._inBirthDate.value = birthDate;
        this._inSalary.value = salary;
    }
    confirmEnter(eventTarget) {
        return this._inputs.includes(eventTarget);
    }
    catchFocus() {
        this._inDocId.focus();
    }
}